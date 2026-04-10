import { GlassCard } from "@/components/ui/glass-card";
import {
  File01Icon,
  Brain01Icon,
  Layers01Icon,
  FlashIcon,
  GridTableIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const features = [
  {
    icon: File01Icon,
    title: "Understands everything you give it",
    body: "Upload entire PDFs, books, codebases, or research papers. Kuma reads the full context — not just a chunk.",
    size: "large",
  },
  {
    icon: Brain01Icon,
    title: "Persistent Memory",
    body: "Remembers across every session. Builds on what it knows.",
    size: "small",
  },
  {
    icon: Layers01Icon,
    title: "Text, files, links — unified",
    body: "One interface. Every input type.",
    size: "small",
  },
  {
    icon: FlashIcon,
    title: "Doesn't just answer. Executes.",
    body: "Multi-step tasks, automated workflows, tool use — Kuma acts, not just responds.",
    size: "large",
  },
  {
    icon: GridTableIcon,
    title: "Output that's actually useful",
    body: "Notes, summaries, timelines, tables — not walls of text.",
    size: "medium",
  },
  {
    icon: Clock01Icon,
    title: "Faster than your current stack",
    body: "Response latency optimized. No waiting around.",
    size: "medium",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-[40px]">
            Built for real work
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to think deeper and work faster.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Row 1: Large + Small */}
          <GlassCard className="md:col-span-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[0].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[0].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[0].body}
            </p>
            {/* Visual: File chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["paper.pdf", "notes.md", "codebase.zip"].map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <HugeiconsIcon
                    icon={File01Icon}
                    size={12}
                    className="text-primary"
                  />
                  {file}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[1].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[1].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[1].body}
            </p>
            {/* Visual: Memory dots */}
            <div className="mt-6 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary/30"
                  style={{ opacity: 0.3 + i * 0.1 }}
                />
              ))}
            </div>
          </GlassCard>

          {/* Row 2: Small + Large */}
          <GlassCard>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[2].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[2].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[2].body}
            </p>
          </GlassCard>

          <GlassCard className="md:col-span-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[3].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[3].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[3].body}
            </p>
            {/* Visual: Step pipeline */}
            <div className="mt-6 flex items-center gap-3">
              {["Research", "Analyze", "Execute"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-lg bg-card px-3 py-1.5 text-xs text-foreground">
                    {step}
                  </div>
                  {i < 2 && <div className="h-px w-6 bg-primary/30" />}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Row 3: Medium + Medium */}
          <GlassCard className="md:col-span-1 lg:col-span-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[4].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[4].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[4].body}
            </p>
          </GlassCard>

          <GlassCard className="md:col-span-2 lg:col-span-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
              <HugeiconsIcon
                icon={features[5].icon}
                size={20}
                className="text-primary"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {features[5].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[5].body}
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
