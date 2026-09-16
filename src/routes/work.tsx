import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraFooter } from "@/components/AuroraFooter";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Pradyumna Srivastava" },
      {
        name: "description",
        content:
          "Three case studies in depth — FinPy, a global card network's analytics, and Second-Office. Research, decisions, and measurable outcomes.",
      },
      { property: "og:title", content: "Selected Work — Pradyumna Srivastava" },
      {
        property: "og:description",
        content:
          "Three case studies in depth — FinPy, a global card network's analytics, and Second-Office.",
      },
    ],
  }),
  component: WorkPage,
});

export type WorkCase = {
  slug: "finpy" | "mastercard" | "second-office";
  eyebrow: string;
  years: string;
  title: string;
  summary: string;
  bullets: string[];
};

const CASES: WorkCase[] = [
  {
    slug: "finpy",
    eyebrow: "FinPy · Disrupting loans",
    years: "Independent · Tier-2 / Tier-3 India",
    title: "Reshaping how loans are perceived in emerging Indian markets.",
    summary:
      "A user-centred overhaul anchored in field research, cultural sensitivity, and structured assumption-testing — not a UI revamp, but a perception reset for users who associate credit with risk and shame.",
    bullets: [
      "Ethnographic interviews across Tier-2 / Tier-3 cities to map mental models around borrowing.",
      "Reframed onboarding around dignity and clarity — language, iconography, and disclosure patterns rebuilt from scratch.",
      "Tested core assumptions with structured prototypes before any high-fidelity work.",
    ],
  },
  {
    slug: "mastercard",
    eyebrow: "A global card network · B2B Analytics",
    years: "Aug 2024 — Present",
    title:
      "Enabling FIs to uncover 28% more growth opportunities with AI-assisted portfolio intelligence.",
    summary:
      "Led interaction design across cross-border travel, spend optimisation, EMOB monitoring, and SME portfolio tools — converging four siloed products into one AI-assisted launchpad bankers actually use.",
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
      "A research-led case study quantifying how individual design decisions move usability scores on a remote-work product — turning qualitative critique into a defensible, repeatable measurement loop.",
    bullets: [
      "Set up SUS as the continuous benchmark across release cycles.",
      "Ran controlled A/B comparisons on critical flows; mapped each delta back to a specific design decision.",
      "Built a lightweight scorecard the team still uses to defend trade-offs in roadmap reviews.",
    ],
  },
];

function WorkCaseCard({ caseItem, index }: { caseItem: WorkCase; index: number }) {
  const isLocked = caseItem.slug === "mastercard";

  return (
    <Link
      to="/case-study/$slug"
      params={{ slug: caseItem.slug }}
      className="group block border-t border-border/40 py-12 md:py-16 hover:bg-foreground/[0.02] px-6 md:px-12 transition-colors relative"
    >
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        <div className="lg:col-span-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[11px] font-mono text-foreground/80 uppercase tracking-[0.2em] bg-foreground/10 px-2 py-0.5 rounded">
              {caseItem.eyebrow}
            </span>
          </div>
          <h2 className="font-sans text-3xl md:text-5xl text-foreground font-semibold tracking-tight leading-tight text-balance mb-6 group-hover:text-foreground/90 transition-colors">
            {caseItem.title}
          </h2>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-[60ch] mb-8 text-pretty font-light">
            {caseItem.summary}
          </p>
          <ul className="space-y-4 mb-10 max-w-[60ch]">
            {caseItem.bullets.map((b) => (
              <li key={b} className="flex gap-4 text-sm md:text-base text-foreground/70 font-light">
                <span className="font-mono text-muted-foreground mt-0.5 opacity-50">+</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:gap-4 transition-all">
            {isLocked ? "Unlock Presentation Deck" : "Explore Case Study"}
            <span aria-hidden>→</span>
            {isLocked && (
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-2">
                · Secured
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground/20">
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="font-medium tracking-tight text-foreground hover:text-foreground/80 transition-colors py-2">
            Pradyumna <span className="text-foreground/70">Srivastava</span>
          </Link>
          <div className="hidden md:flex gap-10 text-sm font-medium text-foreground/70">
            <Link to="/" className="hover:text-foreground transition-colors py-2">
              Home
            </Link>
            <Link
              to="/work"
              className="hover:text-foreground transition-colors py-2"
              activeProps={{ className: "text-foreground" }}
            >
              Work
            </Link>
            <Link to="/creatives" className="hover:text-foreground transition-colors py-2">
              Creatives
            </Link>
          </div>
        </div>
      </nav>

      <header className="pt-48 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12 text-muted-foreground">
            <span className="font-mono text-xs tabular-nums uppercase tracking-widest">/work</span>
            <div className="h-px w-12 bg-border" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">Selected Cases</span>
          </div>
          <h1 className="font-sans text-5xl md:text-7xl lg:text-[6rem] text-foreground font-semibold leading-[1.1] tracking-tighter text-balance mb-8 max-w-[14ch]">
            Three case studies, in depth.
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/70 font-light max-w-[48ch] leading-relaxed">
            The decisions, the research, and the trade-offs behind each one — not the highlight reel.
          </p>
        </div>
      </header>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto flex flex-col border-b border-border/40">
          {CASES.map((c, idx) => (
            <WorkCaseCard key={c.slug} caseItem={c} index={idx} />
          ))}
        </div>
      </section>

      <AuroraFooter>
        <Link to="/" className="font-sans font-medium text-lg md:text-xl underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground text-foreground transition-colors">
          ← Back home
        </Link>
        <Link
          to="/creatives"
          className="font-sans font-medium text-lg md:text-xl underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground text-foreground transition-colors"
        >
          See the creatives dump →
        </Link>
      </AuroraFooter>
    </div>
  );
}
