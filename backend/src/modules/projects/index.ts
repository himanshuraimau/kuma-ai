import { createFeatureModule } from "../../lib/module";
import { describeProjectsFeature } from "./projects.service";

export const projectsModule = createFeatureModule({
  key: "projects",
  title: "Projects",
  description: describeProjectsFeature(),
  routes: [
    {
      method: "POST",
      path: "/projects",
      summary: "Create a project workspace",
    },
  ],
});

export type { ProjectSpace } from "./projects.types";
export { createProjectSpace, describeProjectsFeature } from "./projects.service";