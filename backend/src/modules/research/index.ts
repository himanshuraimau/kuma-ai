import { createFeatureModule } from "../../lib/module";
import { describeResearchFeature } from "./research.service";

export const researchModule = createFeatureModule({
  key: "research",
  title: "Research",
  description: describeResearchFeature(),
  routes: [
    {
      method: "POST",
      path: "/research",
      summary: "Run a deep research workflow",
    },
  ],
});

export type { ResearchQuery } from "./research.types";
export { createResearchQuery, describeResearchFeature } from "./research.service";