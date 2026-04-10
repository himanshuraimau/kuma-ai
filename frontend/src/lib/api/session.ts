import { cookies } from "next/headers";
import type { ServerSession } from "@/types/auth";

export async function getServerSession(): Promise<ServerSession | null> {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_URL ??
    "http://localhost:3001";

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const sessionUrl = new URL("/api/auth/get-session", apiBaseUrl).toString();

  const response = await fetch(sessionUrl, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as ServerSession;
}
