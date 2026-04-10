"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = {
  free: {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    features: [
      "5 documents per day",
      "Basic memory (7 days)",
      "Standard response speed",
      "Community support",
    ],
    cta: "Get started",
    ctaVariant: "outline" as const,
  },
  pro: {
    name: "Pro",
    price: { monthly: 19, annual: 15 },
    features: [
      "Unlimited documents",
      "Unlimited memory",
      "Priority response speed",
      "Advanced reasoning",
      "Agent capabilities",
      "API access",
      "Priority support",
      "Early access to features",
    ],
    cta: "Start free trial",
    ctaVariant: "default" as const,
    popular: true,
  },
};

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-[40px]">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full bg-card p-1 border border-border">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !annual
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                annual
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual — save 20%
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <GlassCard className="flex flex-col">
            <h3 className="text-xl font-semibold text-foreground">
              {plans.free.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="mt-8 flex-1 space-y-3">
              {plans.free.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={16}
                    className="text-muted-foreground"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="mt-8 h-12 w-full rounded-full"
            >
              <Link href="/signup">{plans.free.cta}</Link>
            </Button>
          </GlassCard>

          {/* Pro Plan */}
          <GlassCard className="relative flex flex-col border-2 border-primary">
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-background">
              Most popular
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {plans.pro.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                ${annual ? plans.pro.price.annual : plans.pro.price.monthly}
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
            {annual && (
              <p className="mt-1 text-xs text-muted-foreground">
                Billed annually
              </p>
            )}
            <ul className="mt-8 flex-1 space-y-3">
              {plans.pro.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={16}
                    className="text-primary"
                  />
                  {feature}
                  {feature === "Unlimited memory" && (
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                      New
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-8 h-12 w-full rounded-full bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
            >
              <Link href="/signup">{plans.pro.cta}</Link>
            </Button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
