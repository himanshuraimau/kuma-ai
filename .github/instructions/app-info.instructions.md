---
applyTo: "**"
---
# Kuma App Information
- Monorepo has `backend` (Bun + Express + Better Auth + Prisma 7) and `frontend` (Next.js App Router + TypeScript + Tailwind).
- Product goal: "Your thinking system. Not just an AI." Keep UX focused on depth, memory, and structured output.
- Runtime defaults: frontend `http://localhost:3000`, backend `http://localhost:3001`.
- Auth is backend-owned at `/api/auth/{*any}` and frontend consumes it via `createAuthClient` wrappers.
- Keep email/password auth stable; avoid adding OAuth unless explicitly requested.
- Use existing feature-first layout and avoid broad refactors.
- Prefer Bun commands in this repo.
- Keep changes small, typed, and production-safe.
- Do not break server/client boundaries in Next.js modules.
- Validate with build/type checks after meaningful changes.
