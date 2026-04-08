import { createFeatureModule } from "../../lib/module";
import { describeHealthFeature } from "./health.service";

export const healthModule = createFeatureModule({
  key: "health",
  title: "Health",
  description: describeHealthFeature(),
  routes: [
    {
      method: "GET",
      path: "/health",
      summary: "Check backend status",
    },
  ],
});

export type { HealthStatus } from "./health.types";
export { createHealthStatus, describeHealthFeature } from "./health.service";