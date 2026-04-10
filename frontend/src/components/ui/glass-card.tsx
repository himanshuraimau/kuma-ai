"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  className,
  children,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-200",
        hover && "glass-card-hover hover:-translate-y-0.5",
        glow && "shadow-[0_8px_32px_rgba(249,115,22,0.12)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
