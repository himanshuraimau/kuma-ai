import { createFeatureModule } from "../../lib/module";
import { describeArtifactsFeature } from "./artifacts.service";

export const artifactsModule = createFeatureModule({
  key: "artifacts",
  title: "Artifacts",
  description: describeArtifactsFeature(),
  routes: [
    {
      method: "POST",
      path: "/artifacts",
      summary: "Generate an editable artifact",
    },
  ],
});

export type { ArtifactDraft } from "./artifacts.types";
export { createArtifactDraft, describeArtifactsFeature } from "./artifacts.service";