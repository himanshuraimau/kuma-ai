import {
  Upload01Icon,
  Brain01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const steps = [
  {
    icon: Upload01Icon,
    title: "Give Kuma anything",
    body: "Chat, file upload, paste a link — any format works.",
    label: "INPUT",
  },
  {
    icon: Brain01Icon,
    title: "Deep reasoning kicks in",
    body: "Long context, memory lookup, multi-step thinking.",
    label: "PROCESS",
  },
  {
    icon: File01Icon,
    title: "Get structured insights",
    body: "Not a wall of text. Clean notes, summaries, workflows.",
    label: "OUTPUT",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-card/30">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-[40px]">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps to deeper understanding.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute left-0 right-0 top-12 hidden h-px border-t border-dashed border-primary/30 md:block"
            style={{ marginLeft: "16.67%", marginRight: "16.67%" }}
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <div key={step.label} className="relative text-center">
                {/* Step Icon */}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-background border border-border">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <HugeiconsIcon
                      icon={step.icon}
                      size={28}
                      className="text-primary"
                    />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-background">
                    {index + 1}
                  </div>
                </div>

                {/* Label */}
                <span className="mt-6 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                  {step.label}
                </span>

                {/* Title & Body */}
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
