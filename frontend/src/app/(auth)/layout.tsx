import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Orange blob behind card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px]" />

        {/* Dot Grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-lg font-bold text-foreground">
            Kuma Station
          </span>
        </Link>

        {/* Auth Card */}
        <div className="w-full max-w-[420px] glass-card rounded-3xl p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
