import { agentModule } from "./agent";
import { artifactsModule } from "./artifacts";
import { chatModule } from "./chat";
import { filesModule } from "./files";
import { healthModule } from "./health";
import { integrationsModule } from "./integrations";
import { memoryModule } from "./memory";
import { projectsModule } from "./projects";
import { researchModule } from "./research";

export { agentModule } from "./agent";
export { artifactsModule } from "./artifacts";
export { chatModule } from "./chat";
export { filesModule } from "./files";
export { healthModule } from "./health";
export { integrationsModule } from "./integrations";
export { memoryModule } from "./memory";
export { projectsModule } from "./projects";
export { researchModule } from "./research";

export const featureModules = [
  healthModule,
  chatModule,
  agentModule,
  researchModule,
  memoryModule,
  filesModule,
  projectsModule,
  integrationsModule,
  artifactsModule,
];