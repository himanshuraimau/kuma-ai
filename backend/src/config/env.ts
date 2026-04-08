export const env = {
  host: Bun.env.HOST ?? "0.0.0.0",
  port: Number(Bun.env.PORT ?? "3001"),
};