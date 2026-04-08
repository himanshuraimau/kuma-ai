import type { IntegrationTarget } from "./integrations.types";

export function describeIntegrationsFeature() {
  return "Connector layer for external tools, apps, and workflows.";
}

export function createIntegrationTarget(provider: string): IntegrationTarget {
  return {
    provider,
    enabled: false,
  };
}