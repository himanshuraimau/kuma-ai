import type { HealthStatus } from "./health.types";

export function describeHealthFeature() {
  return "Basic availability and readiness checks.";
}

export function createHealthStatus(): HealthStatus {
  return {
    ok: true,
    service: "kuma-backend",
  };
}