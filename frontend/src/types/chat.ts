import type { UIMessage } from "ai";

export interface ChatThreadDto {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type ChatMessageRole = "user" | "assistant";

export interface ChatTextMessagePart {
  type: "text";
  text: string;
}

export interface ChatFileMessagePart {
  type: "file";
  url: string;
  mediaType: string;
  filename?: string;
  key?: string;
  size?: number;
}

export type ChatMessagePart = ChatTextMessagePart | ChatFileMessagePart;

export interface ChatMessageDto {
  id: string;
  threadId: string;
  role: ChatMessageRole;
  content: string;
  parts?: ChatMessagePart[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadListResponse {
  threads: ChatThreadDto[];
}

export interface ThreadCreateResponse {
  thread: ChatThreadDto;
}

export interface ThreadMessagesResponse {
  thread: ChatThreadDto;
  messages: ChatMessageDto[];
}

export interface MessageActionResponse {
  messages: ChatMessageDto[];
}

function toUiParts(message: ChatMessageDto): UIMessage["parts"] {
  const normalizedParts =
    message.parts
      ?.map((part) => {
        if (part.type === "text") {
          const text = part.text.trim();
          return text ? { type: "text" as const, text } : null;
        }

        const url = part.url.trim();
        if (!url) {
          return null;
        }

        return {
          type: "file" as const,
          mediaType: part.mediaType,
          filename: part.filename,
          url,
        };
      })
      .filter((part): part is NonNullable<typeof part> => part !== null) ?? [];

  if (normalizedParts.length > 0) {
    return normalizedParts;
  }

  return [{ type: "text", text: message.content }];
}

export function toUiMessages(messages: ChatMessageDto[]): UIMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    parts: toUiParts(message),
  }));
}
