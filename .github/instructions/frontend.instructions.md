---
applyTo: "frontend/**"
---
# Frontend Instructions
- Stack: Next.js App Router + React + TypeScript + Tailwind.
- Keep visual language aligned with docs: dark zinc surfaces + orange accent (`#f97316`).
- Preserve existing component structure: `src/app`, `src/components`, `src/lib`, `src/types`.
- Auth API usage rules:
  - Client code imports from `@/lib/api/auth`.
  - Server session code imports from `@/lib/api/session`.
  - Avoid barrels that mix server-only modules (`next/headers`) with client imports.
- Keep auth payload/session types in `src/types/auth.ts`.
- Use existing wrappers (`authApi`) instead of raw calls scattered in components.
- Protected workspace pages should validate session server-side and redirect if missing.
- Ensure environment fallback for API URL to avoid `undefined/api/...` runtime errors.
- Keep forms accessible and typed (`React.FormEvent<HTMLFormElement>` for submit).
- Respect current auth UX paths: `/login`, `/signup`, `/workspace`.
- Run `bun run build` after significant UI/auth changes.
