import type {
  ChatMessageDto,
  ChatMessagePart,
  ChatThreadDto,
  MessageActionResponse,
  ThreadCreateResponse,
  ThreadListResponse,
  ThreadMessagesResponse,
} from "@/types/chat";

export const CHAT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function buildAltPath(path: string): string | null {
  if (path.startsWith("/api/chat/")) {
    return path.replace("/api/chat/", "/chat/");
  }

  return null;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${CHAT_API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const bodyText = (await response.text()) || "Chat API request failed.";
    const routeMissing =
      bodyText.includes("Cannot GET") ||
      bodyText.includes("Cannot POST") ||
      bodyText.includes("Cannot PATCH") ||
      bodyText.includes("Cannot DELETE") ||
      bodyText.includes("<!DOCTYPE html>");

    if (routeMissing) {
      const altPath = buildAltPath(path);
      if (altPath) {
        return fetchJson<T>(altPath, init);
      }

      throw new Error(
        "Chat route not found on backend. Restart backend and verify NEXT_PUBLIC_API_URL points to the current API server.",
      );
    }

    throw new Error(bodyText);
  }

  return (await response.json()) as T;
}

export async function listChatThreads(): Promise<ChatThreadDto[]> {
  const data = await fetchJson<ThreadListResponse>("/api/chat/threads");
  return data.threads;
}

export async function createChatThread(title?: string): Promise<ChatThreadDto> {
  const data = await fetchJson<ThreadCreateResponse>("/api/chat/threads", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return data.thread;
}

export async function getChatThreadMessages(threadId: string) {
  const data = await fetchJson<ThreadMessagesResponse>(
    `/api/chat/threads/${threadId}/messages`,
  );

  return data;
}

export async function updateChatMessage(
  threadId: string,
  messageId: string,
  input: {
    message?: string;
    parts?: ChatMessagePart[];
  },
): Promise<ChatMessageDto[]> {
  const data = await fetchJson<MessageActionResponse>(
    `/api/chat/threads/${threadId}/messages/${messageId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );

  return data.messages;
}

export async function deleteChatMessage(
  threadId: string,
  messageId: string,
): Promise<ChatMessageDto[]> {
  const data = await fetchJson<MessageActionResponse>(
    `/api/chat/threads/${threadId}/messages/${messageId}`,
    {
      method: "DELETE",
    },
  );

  return data.messages;
}

export async function regenerateChatMessage(
  threadId: string,
  messageId?: string,
): Promise<ChatMessageDto[]> {
  const path = messageId
    ? `/api/chat/threads/${threadId}/messages/${messageId}/regenerate`
    : `/api/chat/threads/${threadId}/regenerate`;

  const data = await fetchJson<MessageActionResponse>(path, {
    method: "POST",
    body: JSON.stringify({}),
  });

  return data.messages;
}
