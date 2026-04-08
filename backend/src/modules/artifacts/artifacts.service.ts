import type { ArtifactDraft } from "./artifacts.types";

export function describeArtifactsFeature() {
  return "Structured outputs such as pages, docs, charts, and slide drafts.";
}

export function createArtifactDraft(title: string): ArtifactDraft {
  return {
    title,
    kind: "doc",
  };
}