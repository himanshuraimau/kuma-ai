import { env } from "./config/env";
import { createApp } from "./app";

const app = createApp();

Bun.serve({
  fetch: app.fetch,
  hostname: env.host,
  port: env.port,
});

console.log(`Kuma AI backend running on http://${env.host}:${env.port}`);