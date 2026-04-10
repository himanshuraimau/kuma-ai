import { Button } from "@/components/ui/button";
import { AnnouncementPill } from "@/components/ui/announcement-pill";
import { GlassCard } from "@/components/ui/glass-card";
import {
  PlayCircleIcon,
  File01Icon,
  Brain01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Blobs */}
        <div className="absolute -left-32 top-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] animate-blob-drift" />
        <div className="absolute -right-32 top-60 h-[500px] w-[500px] rounded-full bg-[#f59e0b]/4 blur-[120px] animate-blob-drift-alt" />

        {/* Dot Grid */}
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Announcement Pill */}
          <AnnouncementPill href="#" className="animate-fade-up">
            New: Kuma Station 2.0 — Now with persistent memory
          </AnnouncementPill>

          {/* Headline */}
          <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[72px] animate-fade-up animate-delay-100">
            Think faster.
            <br />
            Understand <span className="gradient-text">everything.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-[520px] text-base text-muted-foreground md:text-lg animate-fade-up animate-delay-200">
            AI that reads, remembers, and reasons across everything you give it.
            <br className="hidden md:block" />
            Not a chatbot. A thinking system built for depth.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-up animate-delay-300">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-background hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-border px-8 text-base hover:border-primary/50 hover:bg-primary/5"
            >
              <Link href="#demo" className="flex items-center gap-2">
                Watch Demo
                <HugeiconsIcon icon={PlayCircleIcon} size={16} />
              </Link>
            </Button>
          </div>

          {/* Hero Visual - Mockup Card */}
          <div className="mt-16 w-full max-w-3xl perspective-1000 animate-fade-up animate-delay-400">
            <GlassCard
              hover={false}
              className="relative animate-float overflow-hidden p-6 md:p-8 shadow-[0_4px_80px_rgba(249,115,22,0.08)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow on bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* File Upload Indicator */}
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2">
                  <HugeiconsIcon
                    icon={File01Icon}
                    size={16}
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    research-paper.pdf
                  </span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                    47 pages
                  </span>
                </div>
              </div>

              {/* AI Response */}
              <div className="mt-4 space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <HugeiconsIcon
                      icon={Brain01Icon}
                      size={14}
                      className="text-primary"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Kuma
                  </span>
                </div>

                <div className="space-y-2 pl-8 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    Key Findings Summary:
                  </p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Methodology uses novel transformer architecture</li>
                    <li>Results show 23% improvement over baseline</li>
                    <li>Limitations noted in section 4.2 regarding scale</li>
                  </ul>
                  <span className="inline-block w-2 h-4 bg-primary animate-blink" />
                </div>
              </div>

              {/* Memory Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>Remembering 47 notes...</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
