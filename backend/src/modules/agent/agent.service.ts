import type { AgentTask } from "./agent.types";

export function describeAgentFeature() {
  return "Goal-driven agent workflows with planning, execution, and verification.";
}

export function createAgentTask(goal: string): AgentTask {
  return {
    goal,
    status: "queued",
  };
}