import {
  AddCircleIcon,
  AnalyticsUpIcon,
  RocketIcon,
  SparklesIcon,
  StarIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 text-foreground md:px-10 md:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f97316]/20 blur-3xl" />
        <div className="absolute -right-20 top-32 h-72 w-72 rounded-full bg-[#fbbf24]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl md:p-10">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#a1a1aa]">
              kuma-ai design system
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-[1.15] md:text-5xl">
              Dark theme with bold typography
            </h1>
          </div>
          <HugeiconsIcon
            icon={SparklesIcon}
            size={56}
            className="text-[#f97316]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-secondary/40 p-5">
            <HugeiconsIcon
              icon={RocketIcon}
              size={40}
              className="text-[#f97316]"
            />
            <h2 className="mt-4 text-2xl font-semibold">Theme Tokens</h2>
            <p className="mt-2 text-[15px] leading-normal text-muted-foreground">
              Background, surfaces, borders, and semantic colors now follow the
              DESIGN.md palette.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-secondary/40 p-5">
            <HugeiconsIcon
              icon={AnalyticsUpIcon}
              size={40}
              className="text-[#2dd4bf]"
            />
            <h2 className="mt-4 text-2xl font-semibold">Typography</h2>
            <p className="mt-2 text-[15px] leading-normal text-muted-foreground">
              Type scale uses strong hierarchy from display headlines to compact
              body copy.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-secondary/40 p-5">
            <HugeiconsIcon
              icon={UserCircleIcon}
              size={40}
              className="text-[#3b82f6]"
            />
            <h2 className="mt-4 text-2xl font-semibold">Huge Icons</h2>
            <p className="mt-2 text-[15px] leading-normal text-muted-foreground">
              Free Hugeicons are used at large sizes to match the updated icon
              guideline.
            </p>
          </article>
        </div>

        <div className="rounded-2xl border border-border bg-background/70 p-6 md:p-8">
          <h3 className="text-3xl font-semibold leading-tight md:text-4xl">
            Type Scale Preview
          </h3>
          <p className="mt-4 text-[18px] leading-[1.6] text-[#d4d4d8]">
            This screen demonstrates the design language in a single page: deep
            zinc surfaces, coral emphasis, larger icon rhythm, and shadcn
            component primitives.
          </p>
          <p className="mt-3 text-[15px] leading-normal text-[#a1a1aa]">
            Body copy intentionally tracks the spec from the design document for
            readable UI text.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-13 rounded-xl px-6 text-sm font-medium"
            >
              <HugeiconsIcon icon={AddCircleIcon} size={24} />
              Start Session
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-xl border-border bg-card px-6 text-sm"
            >
              <HugeiconsIcon icon={StarIcon} size={24} />
              View Components
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-5 text-[13px] text-[#71717a]">
          <span>Dark mode only</span>
          <span>kuma-ai • April 2026</span>
        </div>
      </section>
    </main>
  );
}
