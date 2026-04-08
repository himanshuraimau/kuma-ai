import { createFeatureModule } from "../../lib/module";
import { describeAgentFeature } from "./agent.service";

export const agentModule = createFeatureModule({
  key: "agent",
  title: "Agent",
  description: describeAgentFeature(),
  routes: [
    {
      method: "POST",
      path: "/agent",
      summary: "Run an autonomous task",
    },
  ],
});

export type { AgentTask } from "./agent.types";
export { createAgentTask, describeAgentFeature } from "./agent.service";