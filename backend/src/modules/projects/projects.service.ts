import type { ProjectSpace } from "./projects.types";

export function describeProjectsFeature() {
  return "Workspace isolation for topic-based chats, assets, and instructions.";
}

export function createProjectSpace(name: string): ProjectSpace {
  return {
    id: crypto.randomUUID(),
    name,
  };
}