import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  "Available for AI / full-stack engagements",
  "Stack · React · Next.js · TypeScript · Python · AWS",
  "Specializing in RAG · Vector Search · AI Agents",
  "Production systems · 99.98% uptime",
  "Remote · UTC+5:30 · Global teams",
  "Open source · 6 active repositories",
  "Response time · Under 24 hours",
];

export function StatusTicker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-border/60 bg-surface/40 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap py-4">
        {row.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground"
          >
            <ArrowUpRight className="size-3 text-accent" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
