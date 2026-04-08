import { json, notFound } from "./lib/http";
import { featureModules } from "./modules";

export function createApp() {
  return {
    fetch(request: Request) {
      const url = new URL(request.url);

      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, service: "kuma-backend" });
      }

      if (request.method === "GET" && url.pathname === "/") {
        return json({
          app: "Kuma AI Backend",
          modules: featureModules,
        });
      }

      return notFound();
    },
  };
}