export interface AgentTask {
  goal: string;
  status: "queued" | "running" | "done";
}