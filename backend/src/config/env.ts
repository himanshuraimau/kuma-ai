export const env = {
  host: Bun.env.HOST ?? "0.0.0.0",
  port: Number(Bun.env.PORT ?? "3001"),
  frontendUrl: Bun.env.FRONTEND_URL ?? "http://localhost:3000",
  betterAuthUrl: Bun.env.BETTER_AUTH_URL ?? "http://localhost:3001",
  betterAuthSecret:
    Bun.env.BETTER_AUTH_SECRET ?? "dev-only-secret-change-me-in-production",
  openaiApiKey: Bun.env.OPENAI_API_KEY,
  openaiModel: Bun.env.OPENAI_MODEL ?? "gpt-4.1-mini",
};