import { createFeatureModule } from "../../lib/module";
import { describeChatFeature } from "./chat.service";

export const chatModule = createFeatureModule({
  key: "chat",
  title: "Chat",
  description: describeChatFeature(),
  routes: [
    {
      method: "POST",
      path: "/chat",
      summary: "Start or continue a conversation",
    },
  ],
});

export type { ChatThread } from "./chat.types";
export {
  createThread,
  deleteMessage,
  describeChatFeature,
  editMessage,
  listThreadMessages,
  listThreads,
  regenerateMessage,
  streamAssistantResponse,
} from "./chat.service";