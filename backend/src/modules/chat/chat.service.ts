import type { ChatThread } from "./chat.types";

export function describeChatFeature() {
  return "Conversational assistant with editable history and streaming responses.";
}

export function createChatThread(title: string): ChatThread {
  return {
    id: crypto.randomUUID(),
    title,
  };
}