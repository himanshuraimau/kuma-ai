import { GlassCard } from "@/components/ui/glass-card";
import {
  BookOpen01Icon,
  CodeSquareIcon,
  MicroscopeIcon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const useCases = [
  {
    icon: BookOpen01Icon,
    title: "Study smarter",
    body: "Summarize lectures, extract key concepts, build revision notes.",
    audience: "Students",
  },
  {
    icon: CodeSquareIcon,
    title: "Understand any codebase",
    body: "Paste repos, ask architecture questions, get docs generated.",
    audience: "Developers",
  },
  {
    icon: MicroscopeIcon,
    title: "Navigate papers fast",
    body: "Upload 50 papers. Ask cross-paper questions. Find patterns.",
    audience: "Researchers",
  },
  {
    icon: Briefcase01Icon,
    title: "Automate knowledge work",
    body: "Contracts, reports, decks — read, summarize, extract action items.",
    audience: "Professionals",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-[40px]">
            Built for how you work
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whatever your workflow, Kuma adapts to it.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <GlassCard
              key={useCase.title}
              className="relative overflow-hidden border-l-4 border-l-primary"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background">
                  <HugeiconsIcon
                    icon={useCase.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {useCase.audience}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {useCase.body}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
