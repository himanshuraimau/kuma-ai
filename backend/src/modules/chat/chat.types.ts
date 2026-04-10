export type ChatMessageRole = "user" | "assistant";
export type ChatStreamTrigger = "submit-message" | "regenerate-message";

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

export interface ChatThread {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: ChatMessageRole;
  content: string;
  parts?: ChatMessagePart[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateThreadInput {
  title?: string;
}

export interface SendMessageInput {
  threadId?: string;
  message?: string;
  parts?: ChatMessagePart[];
  trigger?: ChatStreamTrigger;
  messageId?: string;
}

export interface EditMessageInput {
  threadId: string;
  messageId: string;
  message?: string;
  parts?: ChatMessagePart[];
}

export interface DeleteMessageInput {
  threadId: string;
  messageId: string;
}

export interface RegenerateMessageInput {
  threadId: string;
  messageId?: string;
}