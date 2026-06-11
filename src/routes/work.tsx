import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraFooter } from "@/components/AuroraFooter";
import { Magnetic } from "@/components/Magnetic";
import { ExpandCard } from "@/components/ExpandCard";
import { Parallax } from "@/components/Parallax";
import { useState } from "react";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Pradyumna Srivastava" },
      {
        name: "description",
        content:
          "Three case studies in depth: FinPy, a global card network's analytics, and Second-Office. Research, decisions, and measurable outcomes.",
      },
      { property: "og:title", content: "Selected Work — Pradyumna Srivastava" },
      {
        property: "og:description",
        content:
          "Three case studies in depth: FinPy, a global card network's analytics, and Second-Office.",
      },
    ],
  }),
  component: WorkPage,
});

const CASES = [
  {
    slug: "finpy",
    eyebrow: "FinPy · Disrupting loans",
    years: "Independent · Tier-2 / Tier-3 India",
    title: "Reshaping how loans are perceived in emerging Indian markets.",
    summary:
      "A user-centred overhaul anchored in field research, cultural sensitivity, and structured assumption-testing: not a UI revamp, but a perception reset for users who associate credit with risk and shame.",
    bullets: [
      "Ethnographic interviews across Tier-2 / Tier-3 cities to map mental models around borrowing.",
      "Reframed onboarding around dignity and clarity: language, iconography, and disclosure patterns rebuilt from scratch.",
      "Tested core assumptions with structured prototypes before any high-fidelity work.",
    ],
  },
  {
    slug: "mastercard",
    eyebrow: "A global card network · B2B Analytics",
    years: "Aug 2024 - Present",
    title: "Enabling FIs to uncover 28% more growth opportunities with AI-assisted portfolio intelligence.",
    summary:
      "Led interaction design across cross-border travel, spend optimisation, EMOB monitoring, and SME portfolio tools, converging four siloed products into one AI-assisted launchpad bankers actually use.",
    bullets: [
      "Unified IA across four analytics products previously shipped on separate stacks.",
      "Modelled to lift identified growth opportunities by 28% and end-user revenue by 14.2%.",
      "Drove cross-sell pathways between products without adding cognitive load.",
    ],
  },
  {
    slug: "second-office",
    eyebrow: "Second-Office · Remote work",
    years: "Research case study",
    title: "Measuring the impact of design decisions with the System Usability Scale.",
    summary:
      "A research-led case study quantifying how individual design decisions move usability scores on a remote-work product, turning qualitative critique into a defensible, repeatable measurement loop.",
    bullets: [
      "Set up SUS as the continuous benchmark across release cycles.",
      "Ran controlled A/B comparisons on critical flows; mapped each delta back to a specific design decision.",
      "Built a lightweight scorecard the team still uses to defend trade-offs in roadmap reviews.",
    ],
  },
];

function WorkPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-ink font-sans">
      <nav className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Magnetic stiffness={200}>
            <Link to="/" className="font-medium tracking-tight text-deep-ink block p-2 -ml-2">
              Pradyumna <span className="opacity-50">Srivastava</span>
            </Link>
          </Magnetic>
          <div className="hidden md:flex gap-8 text-sm font-medium opacity-60">
            <Magnetic>
              <Link to="/" className="hover:opacity-100 transition-opacity block p-2">Home</Link>
            </Magnetic>
            <Magnetic>
              <Link to="/work" className="hover:opacity-100 transition-opacity block p-2" activeProps={{ className: "opacity-100" }}>Work</Link>
            </Magnetic>
          </div>
        </div>
      </nav>

      <header className="pt-40 pb-16 px-6">
        <Parallax offset={30} className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12 opacity-50">
            <span className="font-mono text-xs tabular">/work</span>
            <div className="h-px w-12 bg-current" />
            <span className="text-xs font-medium uppercase tracking-[0.18em]">Selected work</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-deep-ink leading-[0.95] tracking-tight font-medium text-balance mb-8 max-w-[18ch]">
            Three case studies, in depth.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl opacity-75 max-w-[44ch]">
            The decisions, the research, and the trade-offs behind each one, not the highlight reel.
          </p>
        </Parallax>
      </header>

      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {CASES.map((c, idx) => {
            const hasDeck = c.slug === "second-office" || c.slug === "mastercard" || c.slug === "finpy";
            const isLocked = c.slug === "mastercard";
            const Inner = (
              <>
                <div className="lg:col-span-1 font-mono text-xs opacity-50 tabular">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="lg:col-span-11">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-xs font-medium opacity-70 uppercase tracking-[0.15em]">
                      {c.eyebrow}
                    </span>
                    <span className="font-mono text-[11px] opacity-50">{c.years}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-deep-ink leading-tight text-balance mb-5">
                    {c.title}
                  </h2>
                  <p className="text-base md:text-lg opacity-75 max-w-[56ch] mb-6 text-pretty">
                    {c.summary}
                  </p>
                  <ul className="space-y-3 mb-7">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm opacity-75">
                        <span className="font-mono opacity-50 mt-1">-</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {hasDeck && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-deep-ink group-hover:gap-3 transition-all">
                      {isLocked ? "Unlock the deck" : "Open the deck"}
                      <span aria-hidden>→</span>
                      {isLocked && (
                        <span className="text-[10px] font-mono opacity-50 uppercase tracking-[0.15em] ml-2">
                          · Password
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </>
            );
            const isCardHovered = hoveredSlug === c.slug;
            const isDimmed = hoveredSlug !== null && hoveredSlug !== c.slug;

            return (
              <div 
                key={c.slug}
                onMouseEnter={() => setHoveredSlug(c.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="h-full block"
              >
                <ExpandCard isHovered={isCardHovered} isDimmed={isDimmed}>
                  {hasDeck ? (
                    <Link
                      to="/case-study/$slug"
                      params={{ slug: c.slug }}
                      className="group block bg-surface ring-1 ring-black/5 hover:ring-black/20 rounded-3xl p-8 md:p-12 transition-shadow h-full"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {Inner}
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-surface ring-1 ring-black/5 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 opacity-60 grayscale h-full">
                      {Inner}
                    </div>
                  )}
                </ExpandCard>
              </div>
            );
          })}
        </div>
      </section>

      <AuroraFooter>
        <Link to="/" className="font-serif italic text-xl underline underline-offset-8 text-paper">
          ← Back home
        </Link>
      </AuroraFooter>
    </div>
  );
}
