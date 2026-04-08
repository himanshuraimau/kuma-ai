import { createFeatureModule } from "../../lib/module";
import { describeIntegrationsFeature } from "./integrations.service";

export const integrationsModule = createFeatureModule({
  key: "integrations",
  title: "Integrations",
  description: describeIntegrationsFeature(),
  routes: [
    {
      method: "POST",
      path: "/integrations",
      summary: "Register or update a connector",
    },
  ],
});

export type { IntegrationTarget } from "./integrations.types";
export { createIntegrationTarget, describeIntegrationsFeature } from "./integrations.service";