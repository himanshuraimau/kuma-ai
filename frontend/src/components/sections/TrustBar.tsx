export function TrustBar() {
  const items = [
    "500K+ documents processed",
    "10M+ tokens reasoned",
    "99.9% uptime",
    "Trusted by researchers",
    "Used by developers",
    "Loved by students",
    "500K+ documents processed",
    "10M+ tokens reasoned",
    "99.9% uptime",
    "Trusted by researchers",
    "Used by developers",
    "Loved by students",
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-8">
      <p className="mb-6 text-center text-[13px] text-muted-foreground">
        Trusted by students, engineers, and researchers
      </p>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-4 pr-4">
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-[13px] text-[#52525b]"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee gap-4 pr-4" aria-hidden>
          {items.map((item, index) => (
            <div
              key={`${item}-dup-${index}`}
              className="flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-[13px] text-[#52525b]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Fade masks on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
