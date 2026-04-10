import { GlassCard } from "@/components/ui/glass-card";
import { Brain01Icon, File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function ProductDemo() {
  return (
    <section id="demo" className="relative py-24 md:py-32">
      {/* Background blob */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Interactive UI Preview */}
          <GlassCard hover={false} className="relative overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-border pb-4">
              {["Chat", "Memory", "Agent"].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={`text-sm transition-colors ${
                    i === 0
                      ? "text-foreground border-b-2 border-primary pb-0.5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-6 space-y-4">
              {/* File upload indicator */}
              <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 w-fit">
                <HugeiconsIcon
                  icon={File01Icon}
                  size={14}
                  className="text-primary"
                />
                <span className="text-xs text-muted-foreground">
                  quarterly-report.pdf
                </span>
                <div className="h-1 w-12 overflow-hidden rounded-full bg-border">
                  <div className="h-full w-full bg-primary animate-pulse" />
                </div>
              </div>

              {/* AI Response */}
              <div className="rounded-xl bg-card/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <HugeiconsIcon
                      icon={Brain01Icon}
                      size={12}
                      className="text-primary"
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    Kuma
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    Q3 2024 Report Analysis
                  </p>
                  <ul className="space-y-1 list-disc pl-4 text-xs">
                    <li>Revenue increased 18% YoY to $4.2M</li>
                    <li>Operating margins improved to 23%</li>
                    <li>Key risk: Supply chain delays noted</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Right: Explanation */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-[40px]">
              See how deep it goes
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  num: "1",
                  text: "Drop in any file or paste any link",
                },
                {
                  num: "2",
                  text: "Kuma reads, reasons, and structures the response",
                },
                {
                  num: "3",
                  text: "Get notes, summaries, or action plans — instantly",
                },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {step.num}
                  </div>
                  <p className="text-muted-foreground pt-1">{step.text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center gap-1 text-primary hover:underline"
            >
              Try it yourself →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
