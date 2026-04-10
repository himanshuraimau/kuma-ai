import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  generateText,
  streamText,
  type UIMessage,
} from "ai";
import type { Response as ExpressResponse } from "express";
import { env } from "../../config/env";
import { prisma } from "../../lib/prisma";
import type {
  ChatFileMessagePart,
  ChatMessagePart,
  ChatMessageRole,
  ChatTextMessagePart,
  ChatThread,
  DeleteMessageInput,
  EditMessageInput,
  RegenerateMessageInput,
  SendMessageInput,
} from "./chat.types";

const openai = createOpenAI({
  apiKey: env.openaiApiKey,
});

export function describeChatFeature() {
  return "Conversational assistant with editable history and streaming responses.";
}

type PersistedMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  parts: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeTextPart(part: unknown): ChatTextMessagePart | null {
  if (!isRecord(part) || part.type !== "text") {
    return null;
  }

  const text = typeof part.text === "string" ? part.text.trim() : "";
  if (!text) {
    return null;
  }

  return {
    type: "text",
    text,
  };
}

function normalizeFilePart(part: unknown): ChatFileMessagePart | null {
  if (!isRecord(part) || part.type !== "file") {
    return null;
  }

  const url = typeof part.url === "string" ? part.url.trim() : "";
  const mediaType =
    typeof part.mediaType === "string" && part.mediaType.trim()
      ? part.mediaType.trim()
      : "application/octet-stream";

  if (!url) {
    return null;
  }

  return {
    type: "file",
    url,
    mediaType,
    filename:
      typeof part.filename === "string" && part.filename.trim()
        ? part.filename.trim()
        : undefined,
    key:
      typeof part.key === "string" && part.key.trim() ? part.key.trim() : undefined,
    size: typeof part.size === "number" ? part.size : undefined,
  };
}

function normalizeParts(rawParts: unknown, fallbackText?: string): ChatMessagePart[] {
  const normalized: ChatMessagePart[] = [];

  if (Array.isArray(rawParts)) {
    for (const part of rawParts) {
      const textPart = normalizeTextPart(part);
      if (textPart) {
        normalized.push(textPart);
        continue;
      }

      const filePart = normalizeFilePart(part);
      if (filePart) {
        normalized.push(filePart);
      }
    }
  }

  if (normalized.length > 0) {
    return normalized;
  }

  const text = fallbackText?.trim() ?? "";
  if (!text) {
    return [];
  }

  return [{ type: "text", text }];
}

function getTextFromParts(parts: ChatMessagePart[]): string {
  return parts
    .filter((part): part is ChatTextMessagePart => part.type === "text")
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function getTitleFromParts(parts: ChatMessagePart[]): string {
  const text = getTextFromParts(parts);
  if (text) {
    return text.slice(0, 80);
  }

  const firstFile = parts.find(
    (part): part is ChatFileMessagePart => part.type === "file",
  );
  const filename = firstFile?.filename?.trim();

  if (filename) {
    return `Attachment: ${filename}`.slice(0, 80);
  }

  return "New chat";
}

function toUiMessage(message: PersistedMessage): UIMessage {
  const parts = normalizeParts(message.parts, message.content);

  return {
    id: message.id,
    role: message.role,
    parts:
      parts.length > 0
        ? parts.map((part) =>
            part.type === "text"
              ? { type: "text", text: part.text }
              : {
                  type: "file",
                  mediaType: part.mediaType,
                  filename: part.filename,
                  url: part.url,
                },
          )
        : [{ type: "text", text: message.content }],
  };
}

export async function listThreads(userId: string): Promise<ChatThread[]> {
  return prisma.chatThread.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createThread(userId: string, title?: string): Promise<ChatThread> {
  return prisma.chatThread.create({
    data: {
      userId,
      title: title?.trim() || "New chat",
    },
  });
}

export async function listThreadMessages(threadId: string, userId: string) {
  const thread = await prisma.chatThread.findFirst({
    where: { id: threadId, userId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return thread;
}

export async function streamAssistantResponse(
  input: SendMessageInput,
  userId: string,
  res: ExpressResponse,
) {
  if (input.trigger === "regenerate-message") {
    res.status(400).json({
      error: "Regeneration uses /messages/:messageId/regenerate endpoint.",
    });
    return;
  }

  const messageParts = normalizeParts(input.parts, input.message);
  const userMessage = getTextFromParts(messageParts);

  if (messageParts.length === 0) {
    res.status(400).json({ error: "Message text or files are required." });
    return;
  }

  if (!env.openaiApiKey) {
    res.status(500).json({
      error: "OPENAI_API_KEY is not configured on backend.",
    });
    return;
  }

  let thread = input.threadId
    ? await prisma.chatThread.findFirst({
        where: { id: input.threadId, userId },
      })
    : null;

  if (!thread) {
    thread = await createThread(userId, getTitleFromParts(messageParts));
  }

  const threadId = thread.id;

  await prisma.chatMessage.create({
    data: {
      threadId,
      role: "user",
      content: userMessage || "[Attachment]",
      parts: messageParts as unknown as any,
    },
  });

  await prisma.chatThread.update({
    where: { id: threadId },
    data: {
      title:
        thread.title === "New chat" ? getTitleFromParts(messageParts) : thread.title,
    },
  });

  const allMessages = await prisma.chatMessage.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
  });

  const uiMessages = allMessages.map((message) =>
    toUiMessage({
      id: message.id,
      role: message.role as ChatMessageRole,
      content: message.content,
      parts: message.parts,
    }),
  );

  const modelMessages = await convertToModelMessages(uiMessages);

  const stream = streamText({
    model: openai(env.openaiModel),
    messages: modelMessages,
  });

  // Persist final assistant message after stream completes.
  void Promise.resolve(stream.text)
    .then(async (assistantText) => {
      const content = assistantText.trim();
      if (!content) {
        return;
      }

      await prisma.chatMessage.create({
        data: {
          threadId,
          role: "assistant",
          content,
          parts: [{ type: "text", text: content }] as unknown as any,
        },
      });
    })
    .catch(() => {
      // Ignore persistence errors in fire-and-forget path.
    });

  const webResponse = stream.toUIMessageStreamResponse({
    originalMessages: uiMessages,
  });

  await pipeWebResponseToExpress(webResponse, res);
}

export async function editMessage(input: EditMessageInput, userId: string) {
  const thread = await prisma.chatThread.findFirst({
    where: { id: input.threadId, userId },
  });

  if (!thread) {
    throw new Error("Thread not found.");
  }

  const message = await prisma.chatMessage.findFirst({
    where: { id: input.messageId, threadId: input.threadId },
  });

  if (!message) {
    throw new Error("Message not found.");
  }

  if (message.role !== "user") {
    throw new Error("Only user messages can be edited.");
  }

  const parts = normalizeParts(input.parts, input.message ?? message.content);
  if (parts.length === 0) {
    throw new Error("Message text or files are required.");
  }

  const content = getTextFromParts(parts) || "[Attachment]";

  await prisma.chatMessage.update({
    where: { id: input.messageId },
    data: {
      content,
      parts: parts as unknown as any,
    },
  });

  const updatedThread = await listThreadMessages(input.threadId, userId);
  return updatedThread?.messages ?? [];
}

export async function deleteMessage(input: DeleteMessageInput, userId: string) {
  const thread = await prisma.chatThread.findFirst({
    where: { id: input.threadId, userId },
  });

  if (!thread) {
    throw new Error("Thread not found.");
  }

  const message = await prisma.chatMessage.findFirst({
    where: { id: input.messageId, threadId: input.threadId },
  });

  if (!message) {
    throw new Error("Message not found.");
  }

  await prisma.chatMessage.delete({ where: { id: input.messageId } });

  const updatedThread = await listThreadMessages(input.threadId, userId);
  return updatedThread?.messages ?? [];
}

export async function regenerateMessage(
  input: RegenerateMessageInput,
  userId: string,
) {
  const thread = await prisma.chatThread.findFirst({
    where: { id: input.threadId, userId },
  });

  if (!thread) {
    throw new Error("Thread not found.");
  }

  const messages = await prisma.chatMessage.findMany({
    where: { threadId: input.threadId },
    orderBy: { createdAt: "asc" },
  });

  const assistantTarget = input.messageId
    ? messages.find((message) => message.id === input.messageId)
    : [...messages].reverse().find((message) => message.role === "assistant");

  if (!assistantTarget || assistantTarget.role !== "assistant") {
    throw new Error("Assistant message not found.");
  }

  const targetIndex = messages.findIndex((message) => message.id === assistantTarget.id);
  const contextMessages = messages.slice(0, targetIndex);

  if (contextMessages.length === 0) {
    throw new Error("Not enough context to regenerate this message.");
  }

  const uiMessages = contextMessages.map((message) =>
    toUiMessage({
      id: message.id,
      role: message.role as ChatMessageRole,
      content: message.content,
      parts: message.parts,
    }),
  );

  const modelMessages = await convertToModelMessages(uiMessages);
  const result = await generateText({
    model: openai(env.openaiModel),
    messages: modelMessages,
  });

  const content = result.text.trim();
  if (!content) {
    throw new Error("Regeneration produced no content.");
  }

  await prisma.chatMessage.update({
    where: { id: assistantTarget.id },
    data: {
      content,
      parts: [{ type: "text", text: content }] as unknown as any,
    },
  });

  const updatedThread = await listThreadMessages(input.threadId, userId);
  return updatedThread?.messages ?? [];
}

async function pipeWebResponseToExpress(
  webResponse: Response,
  res: ExpressResponse,
) {
  res.status(webResponse.status);

  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!webResponse.body) {
    res.end();
    return;
  }

  const reader = webResponse.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    if (value) {
      res.write(Buffer.from(value));
    }
  }

  res.end();
}