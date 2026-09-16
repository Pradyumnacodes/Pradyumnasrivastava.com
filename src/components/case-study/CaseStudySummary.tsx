import { ArrowDown, CheckCircle2, Lightbulb, Target, Sparkles } from "lucide-react";
import type { CaseStudyConfig } from "@/lib/case-studies";

interface Props {
  study: CaseStudyConfig;
  onExpand: () => void;
}

export function CaseStudySummary({ study, onExpand }: Props) {
  const highlights = study.highlights;

  return (
    <div className="space-y-16 py-8">
      {/* Executive TL;DR Badge */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ backgroundColor: `${study.accent}15`, color: study.accent }}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden />
          Executive Summary · 2 min read
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Impact Stat Grid */}
      {highlights?.metrics && highlights.metrics.length > 0 && (
        <section aria-label="Key Impact Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlights.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-foreground/[0.03] ring-1 ring-border rounded-2xl p-6 relative overflow-hidden group hover:ring-foreground/20 transition"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: study.accent }}
                />
                <div className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground mb-2">
                  {m.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Problem & Solution Grid */}
      {highlights && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-foreground/[0.02] ring-1 ring-border rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <Target className="w-4 h-4 text-destructive" aria-hidden />
                <span>The Problem & Challenge</span>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground leading-relaxed text-pretty">
                {highlights.problem}
              </p>
            </div>
          </div>

          {/* Solution Card */}
          <div
            className="bg-foreground/[0.03] ring-1 rounded-2xl p-8 flex flex-col justify-between"
            style={{ borderColor: `${study.accent}40` }}
          >
            <div>
              <div
                className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-[0.18em]"
                style={{ color: study.accent }}
              >
                <Lightbulb className="w-4 h-4" aria-hidden />
                <span>The Solution & Approach</span>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground leading-relaxed text-pretty">
                {highlights.solution}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {highlights?.keyTakeaways && highlights.keyTakeaways.length > 0 && (
        <section className="bg-foreground/[0.02] ring-1 ring-border rounded-2xl p-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Key Execution Highlights
          </h3>
          <ul className="space-y-4">
            {highlights.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: study.accent }}
                  aria-hidden
                />
                <span className="font-sans text-base md:text-lg text-foreground leading-relaxed">
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Action Banner to Expand Full Case Study */}
      <section className="rounded-3xl bg-foreground text-background p-8 md:p-12 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-background/70">
            Deep Dive Available
          </span>
          <h3 className="font-sans text-2xl md:text-3xl font-semibold leading-tight text-balance">
            Want to explore all design iterations, user research, and interaction flows?
          </h3>
          <p className="text-sm md:text-base text-background/80 font-sans leading-relaxed">
            Expand the full long-form case study with all 10+ slides, research diagrams, and
            complete artifact walk-throughs.
          </p>
          <div className="pt-4">
            <button
              onClick={onExpand}
              className="inline-flex items-center gap-2 bg-background text-foreground hover:bg-background/90 font-sans font-semibold text-sm px-6 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>Expand Full In-Depth Case Study</span>
              <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
