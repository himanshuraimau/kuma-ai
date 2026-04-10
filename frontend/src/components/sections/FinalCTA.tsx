import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[600px] px-6 text-center md:px-8">
        {/* Eyebrow */}
        <span className="inline-block text-xs font-medium uppercase tracking-[2px] text-primary">
          Start today
        </span>

        {/* Headline */}
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-[40px]">
          Build your <span className="gradient-text">thinking system</span>
        </h2>

        {/* Body */}
        <p className="mt-6 text-muted-foreground">
          Join thousands of researchers, developers, and students who think
          deeper with Kuma.
        </p>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="mt-10 h-[52px] rounded-full bg-primary px-10 text-base font-semibold text-background hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(249,115,22,0.4)]"
        >
          <Link href="/signup">Get Started Free →</Link>
        </Button>

        <p className="mt-4 text-[13px] text-[#52525b]">
          No credit card required
        </p>
      </div>
    </section>
  );
}
