import { createFeatureModule } from "../../lib/module";
import { describeMemoryFeature } from "./memory.service";

export const memoryModule = createFeatureModule({
  key: "memory",
  title: "Memory",
  description: describeMemoryFeature(),
  routes: [
    {
      method: "POST",
      path: "/memory",
      summary: "Store or update memory",
    },
  ],
});

export type { MemoryItem } from "./memory.types";
export { createMemoryItem, describeMemoryFeature } from "./memory.service";