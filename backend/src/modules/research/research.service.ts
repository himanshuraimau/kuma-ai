import type { ResearchQuery } from "./research.types";

export function describeResearchFeature() {
  return "Web search and synthesis with citations for grounded answers.";
}

export function createResearchQuery(topic: string): ResearchQuery {
  return {
    topic,
    depth: "standard",
  };
}