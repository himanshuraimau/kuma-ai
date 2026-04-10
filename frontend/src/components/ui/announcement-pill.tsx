"use client";

import { cn } from "@/lib/utils";
import { ArrowRight01Icon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type { HTMLAttributes } from "react";

interface AnnouncementPillProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  icon?: boolean;
}

export function AnnouncementPill({
  className,
  children,
  href = "#",
  icon = true,
  ...props
}: AnnouncementPillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-full animate-shimmer" />
      {icon && (
        <HugeiconsIcon icon={SparklesIcon} size={14} className="text-primary" />
      )}
      <span className="relative z-10">{children}</span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={14}
        className="relative z-10 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
