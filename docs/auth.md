# Better Auth — Express Backend + Next.js Frontend

> Complete integration guide for a **separate** Express API backend and Next.js (App Router) frontend.
> Uses **Bun**, **Prisma**, and **PostgreSQL**. Covers setup, database, session retrieval, route protection, CORS, and cross-origin cookie handling.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Backend — Express Setup](#3-backend--express-setup)
   - [Install](#31-install)
   - [Environment Variables](#32-environment-variables)
   - [Prisma + PostgreSQL Setup](#33-prisma--postgresql-setup)
   - [auth.ts — Core Instance](#34-authts--core-instance)
   - [Generate Better Auth Schema into Prisma](#35-generate-better-auth-schema-into-prisma)
   - [Mount the Handler](#36-mount-the-handler)
   - [CORS Configuration](#37-cors-configuration)
   - [Session Middleware (Protecting Routes)](#38-session-middleware-protecting-routes)
4. [Frontend — Next.js Setup](#4-frontend--nextjs-setup)
   - [Install](#41-install)
   - [Environment Variables](#42-environment-variables)
   - [Auth Client](#43-auth-client)
   - [Sign Up / Sign In Forms](#44-sign-up--sign-in-forms)
   - [Using Session in Client Components](#45-using-session-in-client-components)
   - [Using Session in Server Components](#46-using-session-in-server-components)
   - [Middleware (Route Protection)](#47-middleware-route-protection)
5. [Cross-Origin Setup (Separate Domains)](#5-cross-origin-setup-separate-domains)
6. [Social OAuth Providers](#6-social-oauth-providers)
7. [Common Pitfalls](#7-common-pitfalls)
8. [Quick Reference](#8-quick-reference)

---

## 1. Architecture Overview

```
┌────────────────────────────────────────────────────┐
│                    Browser                         │
│  Next.js Frontend  (localhost:3000)                │
│  - better-auth/react client                        │
│  - authClient.signIn / signUp / useSession()       │
└───────────────────┬────────────────────────────────┘
                    │ HTTP + credentials: 'include'
                    │ (session cookie forwarded)
┌───────────────────▼────────────────────────────────┐
│             Express Backend  (localhost:8000)       │
│  - Better Auth mounted at /api/auth/*              │
│  - Prisma adapter connected to PostgreSQL          │
│  - auth.api.getSession() for protected routes      │
│  - CORS allows Next.js origin + credentials        │
└───────────────────┬────────────────────────────────┘
                    │ Prisma Client
┌───────────────────▼────────────────────────────────┐
│               PostgreSQL Database                   │
│  - user, session, account, verification tables     │
│  - managed via Prisma migrations                   │
└────────────────────────────────────────────────────┘
```

**Key principle:** Better Auth lives on the **backend**. The frontend uses the lightweight `createAuthClient` to talk to the backend's `/api/auth` endpoints over HTTP. Sessions are tracked via an HTTP-only cookie (`better-auth.session_token`).

---

## 2. Prerequisites

- **Bun** v1.1+ — used for all package management and running scripts
- ESM project (`"type": "module"` in `package.json`) — **CommonJS is not supported**
- PostgreSQL database (local or hosted — Neon, Supabase, Railway all work)
- TypeScript recommended

Install Bun if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## 3. Backend — Express Setup

### 3.1 Install

```bash
bun add better-auth express cors prisma @prisma/client @prisma/adapter-pg pg
bun add -d @types/express @types/cors typescript
```

### 3.2 Environment Variables

```env
# .env (backend)
BETTER_AUTH_SECRET=your-secret-min-32-chars   # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:8000          # your backend base URL
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
```

### 3.3 Prisma + PostgreSQL Setup

**Initialize Prisma:**

```bash
bunx --bun prisma init --datasource-provider postgresql
```

With Prisma 7, connection URLs are configured in `prisma.config.ts` (not inside `schema.prisma`).

Set up these files:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

```ts
// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

**Create and export the Prisma client** — do this once, import everywhere:

```ts
// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize Prisma Client.");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 3.4 `auth.ts` — Core Instance

Better Auth's Prisma adapter wires directly into your existing Prisma client. Place this in `src/lib/auth.ts`:

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  // ── Database via Prisma ─────────────────────────────────
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ── Base URL (must match BETTER_AUTH_URL) ───────────────
  baseURL: process.env.BETTER_AUTH_URL,

  // ── Trusted Origins (your Next.js frontend URL) ─────────
  trustedOrigins: [
    "http://localhost:3000",     // dev
    "https://yourapp.com",       // prod
  ],

  // ── Email + Password auth ───────────────────────────────
  emailAndPassword: {
    enabled: true,
  },

  // ── Social Providers (add as needed) ────────────────────
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
```

### 3.5 Generate Better Auth Schema into Prisma

Better Auth needs four core tables: `user`, `session`, `account`, and `verification`. Run the CLI to generate the Prisma model definitions:

```bash
bunx auth@latest generate
```

This command reads your `auth.ts`, detects the Prisma adapter, and **appends the required models** directly into `prisma/schema.prisma`. The generated models look like this:

```prisma
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?
}
```

Once the schema is updated, push it to your PostgreSQL database:

```bash
# Create and apply the migration
bunx --bun prisma migrate dev --name init-better-auth

# Regenerate the Prisma client
bunx --bun prisma generate
```

> If you add your own models (e.g. `Post`, `Profile`), add them to the same `schema.prisma` file alongside Better Auth's models and run `migrate dev` again — they coexist without conflict.

### 3.6 Mount the Handler

```ts
// src/index.ts
import express from "express";
import cors from "cors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();

// ── CORS must come BEFORE Better Auth handler ────────────
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourapp.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // required for cookie-based sessions
  })
);

// ── Better Auth handler (catch-all) ─────────────────────
// Express v4:
app.all("/api/auth/*", toNodeHandler(auth));
// Express v5 — use this instead:
// app.all("/api/auth/{*any}", toNodeHandler(auth));

// ── express.json() AFTER Better Auth ────────────────────
// NEVER place express.json() before the auth handler —
// the client will hang on "pending" indefinitely.
app.use(express.json());

// ── Your other routes ────────────────────────────────────
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true });
});

app.listen(8000, () => console.log("Server running on :8000"));
```

Run the server:

```bash
bun run src/index.ts
```

Verify it's working:

```bash
curl http://localhost:8000/api/auth/ok
# → { "ok": true }
```

### 3.7 CORS Configuration

The two non-negotiable CORS settings for cross-origin auth:

| Option | Value | Why |
|--------|-------|-----|
| `credentials: true` | `true` | Lets cookies travel cross-origin |
| `origin` | Exact frontend URL(s) | Wildcard `*` breaks credentialed requests |

### 3.8 Session Middleware (Protecting Routes)

```ts
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { prisma } from "./lib/prisma.js";
import type { Request, Response, NextFunction } from "express";

// ── Reusable auth guard ──────────────────────────────────
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.locals.session = session;
  next();
}

// ── Protected route examples ─────────────────────────────
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: res.locals.session.user });
});

app.get("/api/dashboard/data", requireAuth, async (_req, res) => {
  const userId = res.locals.session.user.id;

  // Use Prisma directly alongside the auth session
  const posts = await prisma.post.findMany({ where: { authorId: userId } });
  res.json({ posts });
});
```

---

## 4. Frontend — Next.js Setup

### 4.1 Install

```bash
bun add better-auth
```

### 4.2 Environment Variables

```env
# .env.local (Next.js frontend)
NEXT_PUBLIC_API_URL=http://localhost:8000   # your Express backend URL
```

### 4.3 Auth Client

Create `lib/auth-client.ts`:

```ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Points to your Express backend, NOT the Next.js app itself
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### 4.4 Sign Up / Sign In Forms

**Sign Up:**

```tsx
// app/sign-up/page.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const { error } = await authClient.signUp.email({
      email: form.get("email") as string,
      password: form.get("password") as string,
      name: form.get("name") as string,
    });

    if (error) {
      setError(error.message ?? "Sign up failed");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Create Account</button>
    </form>
  );
}
```

**Sign In:**

```tsx
// app/sign-in/page.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const { error } = await authClient.signIn.email({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });

    if (!error) router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

**Sign Out button:**

```tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => authClient.signOut().then(() => router.push("/sign-in"))}
    >
      Sign Out
    </button>
  );
}
```

### 4.5 Using Session in Client Components

```tsx
"use client";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending, error } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session || error) redirect("/sign-in");

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
```

### 4.6 Using Session in Server Components

Since Next.js server components can't import the auth instance directly (it lives on the Express backend), fetch the session by forwarding the incoming cookies:

```ts
// lib/session.ts — server-only helper
import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
    {
      headers: { cookie: cookieHeader },
      cache: "no-store", // never cache auth state
    }
  );

  if (!res.ok) return null;
  return res.json();
}
```

```tsx
// app/dashboard/page.tsx — Server Component
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");

  return <h1>Welcome, {session.user.name}</h1>;
}
```

### 4.7 Middleware (Route Protection)

`getSessionCookie` does a fast, edge-compatible cookie **existence** check — no DB call, no cryptographic validation. Use it only for redirects. Real session validation always happens inside server components or API routes.

```ts
// middleware.ts (Next.js project root)
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
```

---

## 5. Cross-Origin Setup (Separate Domains)

When frontend and backend run on different origins (different ports in dev, different domains in prod), add this to your backend `auth.ts`:

```ts
export const auth = betterAuth({
  // ...
  trustedOrigins: ["http://localhost:3000", "https://yourapp.com"],

  advanced: {
    crossSubdomainCookies: {
      enabled: true,
      domain: ".yourapp.com", // shared parent domain (prod only)
    },
    defaultCookieAttributes: {
      sameSite: "none", // required for cross-site cookies
      secure: true,     // sameSite: 'none' requires HTTPS
    },
  },
});
```

For any manual `fetch` from Next.js to the backend, always include credentials:

```ts
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/some-route`, {
  credentials: "include", // sends the session cookie cross-origin
});
```

> In local development with `localhost`, `sameSite: 'lax'` works fine without needing `secure: true`. Only apply `none + secure` for production cross-domain deployments.

---

## 6. Social OAuth Providers

```ts
// auth.ts — add inside betterAuth({})
socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
},
```

```tsx
// Frontend trigger
<button
  onClick={() =>
    authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    })
  }
>
  Continue with GitHub
</button>
```

Set your OAuth app's authorized callback URI in the provider dashboard to:

```
http://localhost:8000/api/auth/callback/github
http://localhost:8000/api/auth/callback/google
```

---

## 7. Common Pitfalls

| Problem | Cause | Fix |
|---|---|---|
| Client stuck on "pending" | `express.json()` before auth handler | Move `app.use(express.json())` **after** `app.all("/api/auth/*", ...)` |
| `Missing parameter name` error | Express v4/v5 wildcard mismatch | v4: `/api/auth/*` · v5: `/api/auth/{*any}` |
| `401` despite being logged in | Cookie not sent cross-origin | `credentials: true` in CORS + `credentials: 'include'` in fetch |
| Session null in server component | Cookies not forwarded | Forward the `cookie` header manually in server-side fetches (see §4.6) |
| CJS import error | CommonJS not supported | Set `"type": "module"` in `package.json` |
| Prisma client not found after schema change | Missing `generate` step | Run `bunx --bun prisma generate` after every schema change |
| Prisma 7 config validation error | `url` left inside `schema.prisma` | Move datasource URL into `prisma.config.ts` and keep only `provider` in datasource block |
| Tables don't exist on first run | Migration not applied | Run `bunx --bun prisma migrate dev --name init-better-auth` before starting the server |
| Duplicate models after re-running `generate` | `bunx auth@latest generate` is additive | Check `schema.prisma` for duplicate model definitions and remove them |

---

## 8. Quick Reference

**Bun commands cheat sheet:**

```bash
bun add <pkg>                                   # install a dependency
bun add -d <pkg>                                # install a dev dependency
bun run src/index.ts                            # run the backend
bunx --bun prisma init --datasource-provider postgresql
bunx auth@latest generate                       # generate Better Auth schema into Prisma
bunx --bun prisma migrate dev --name init-better-auth # apply migration to PostgreSQL
bunx --bun prisma generate                      # regenerate Prisma client
bunx --bun prisma studio                        # open Prisma Studio (DB GUI)
```

**Backend endpoints exposed by Better Auth** (all under `/api/auth/`):

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/ok` | Health check |
| POST | `/api/auth/sign-up/email` | Register with email/password |
| POST | `/api/auth/sign-in/email` | Login with email/password |
| POST | `/api/auth/sign-out` | Invalidate session |
| GET | `/api/auth/get-session` | Get current session (used for SSR) |
| GET | `/api/auth/callback/:provider` | OAuth callback handler |

**authClient methods:**

```ts
authClient.signUp.email({ email, password, name })
authClient.signIn.email({ email, password })
authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" })
authClient.signOut()
authClient.useSession()      // React hook — client components only
authClient.getSession()      // Promise — server actions
```

---

*Based on Better Auth docs as of April 2026. Always cross-check with [better-auth.com/docs](https://better-auth.com/docs) for the latest.*