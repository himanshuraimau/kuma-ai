import { env } from "./config/env";
import { createApp } from "./app";

const app = createApp();

app.listen(env.port, env.host, () => {
  console.log(`Kuma AI backend running on http://${env.host}:${env.port}`);
});