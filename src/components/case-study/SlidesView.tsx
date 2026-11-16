import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  ShieldCheck,
  Maximize2,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  SlidersHorizontal,
} from "lucide-react";

interface SlidesViewProps {
  onZoomImage: (image: { src: string; alt: string; caption?: string }) => void;
}

export const SLIDES = [
  { id: "slide-00", number: "00", tag: "Overview", title: "Executive Brief" },
  { id: "slide-01", number: "01", tag: "The Problem", title: "The Brief Was a Mirage" },
  { id: "slide-02", number: "02", tag: "Discovery", title: "Landscape & NDA Discovery" },
  { id: "slide-03", number: "03", tag: "Reframe", title: "Killing the Dashboard" },
  { id: "slide-04", number: "04", tag: "Backend", title: "Backend Trenches & Accuracy" },
  { id: "slide-05", number: "05", tag: "Validation", title: "Studio Gates & Trade-Offs" },
  { id: "slide-06", number: "06", tag: "Architecture", title: "Product Architecture & UI" },
  { id: "slide-07", number: "07", tag: "PLG & Scale", title: "Commercialization & Packaging" },
  { id: "slide-08", number: "08", tag: "Outcomes", title: "Pilot Outcomes & Reflection" },
];

const AFFORDANCE_SLIDES = [
  {
    id: "default",
    name: "Default View",
    tag: "Base State",
    image: "/case-study/global-network/humanise-default.png",
    description: "Four micro-affordances quietly embedded in the top-right corner of every analytical card without cluttering the canvas.",
  },
  {
    id: "zoom",
    name: "Focus Zoom",
    tag: "Isolation Mode",
    image: "/case-study/global-network/humanise-zoom.png",
    description: "Isolates a single chart in a dimmed modal with deep tooltips, so the eye stops triaging and starts reading.",
  },
  {
    id: "insight",
    name: "AI Insight on Demand",
    tag: "Explainable Synthesis",
    image: "/case-study/global-network/humanise-ai-insight.png",
    description: "One-click natural language synthesis highlighting totals, peaks, variance, and a recommended next action without writing a query.",
  },
  {
    id: "vertical",
    name: "Alternate Chart Style",
    tag: "Cognitive Pivot",
    image: "/case-study/global-network/humanise-vertical.png",
    description: "Seamlessly flips between horizontal ranking bars and vertical magnitude columns on the same underlying dataset.",
  },
  {
    id: "table",
    name: "Instant Table View",
    tag: "Financial Modeling",
    image: "/case-study/global-network/humanise-table.png",
    description: "Transforms any visualization into a clean, copy-ready tabular grid for financial modeling and Excel export.",
  },
];

export function SlidesView({ onZoomImage }: SlidesViewProps) {
  const [activeSlide, setActiveSlide] = useState<string>("slide-00");
  const [activeAffordance, setActiveAffordance] = useState<string>("default");

  // Track active slide on scroll for slide index
  useEffect(() => {
    const handleScroll = () => {
      for (let i = SLIDES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SLIDES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSlide(SLIDES[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 88;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const currentSlideIndex = SLIDES.findIndex((s) => s.id === activeSlide);
  const activeSlideNumber = currentSlideIndex >= 0 ? currentSlideIndex : 0;

  return (
    <div className="relative">
      {/* ──────────────── Left-Hand Floating Slide Deck Index (Desktop) ──────────────── */}
      <nav
        aria-label="Slide Deck Index"
        className="hidden xl:block fixed left-6 2xl:left-12 top-1/2 -translate-y-1/2 z-40 w-[210px]"
      >
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60 dark:border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-white/40">
              Slide Index
            </span>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
              {String(activeSlideNumber).padStart(2, "0")}/{String(SLIDES.length - 1).padStart(2, "0")}
            </span>
          </div>

          <ul className="space-y-1 text-xs font-sans">
            {SLIDES.map((s) => {
              const isActive = activeSlide === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSlide(s.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between gap-2 group ${
                      isActive
                        ? "bg-amber-500/15 text-slate-900 dark:text-white font-semibold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="font-mono text-[10px] opacity-50 shrink-0">{s.number}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ──────────────── Main Slide Cards Stack ──────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-28 flex flex-col gap-10 md:gap-14">
        
        {/* ──────── SLIDE 00: HERO & EXECUTIVE BRIEF ──────── */}
        <section
          id="slide-00"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          {/* Top colored accent indicator */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

          {/* Slide Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
                SLIDE 00 / 08
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                Executive Brief · Quick Readout
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-60" /> 8 Months
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-60" /> 3 Min Scan
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.14] mb-8 text-balance">
            Enabling FIs to uncover 28% more growth opportunities
          </h1>

          {/* Executive Quote Card */}
          <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border-l-4 border-amber-500 border-y border-r border-slate-200/80 dark:border-white/10 p-6 md:p-8 mb-10">
            <blockquote className="font-sans font-medium text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-snug tracking-tight text-balance">
              &ldquo;Leadership asked me to modernize their dashboards. What I actually found was a three-week game of human telephone—costing mid-market banks millions in invisible revenue leaks.&rdquo;
            </blockquote>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-white/10 text-xs mb-10">
            <div>
              <span className="block font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Role</span>
              <p className="font-semibold text-slate-900 dark:text-white">Lead Product Designer</p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">Sole Designer (UX Strategy, Interaction, Systems)</p>
            </div>
            <div>
              <span className="block font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Domain</span>
              <p className="font-semibold text-slate-900 dark:text-white">Global Card Network</p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">Issuing & Acquiring Financial Ecosystem</p>
            </div>
            <div>
              <span className="block font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Timeline</span>
              <p className="font-semibold text-slate-900 dark:text-white">8 Months Lifecycle</p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">3 mo Strategy · 3 mo Design · 2 mo Pilot</p>
            </div>
            <div>
              <span className="block font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Squad</span>
              <p className="font-semibold text-slate-900 dark:text-white">Enterprise Squad</p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">1 GPM · 3 Data Scientists · 6 Engs · 1 Designer</p>
            </div>
          </div>

          {/* Two-Column Outcomes Presentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            {/* Growth & Velocity */}
            <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                  Growth & Velocity Outcomes
                </h3>
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 shrink-0">+28%</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">More growth opportunities</strong> uncovered vs. manual SQL/BI querying.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 shrink-0">+14.2%</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">Average portfolio revenue lift</strong> across targeted cardholder cohorts.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 shrink-0">−85%</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">Campaign launch time</strong> collapsed from ~3 weeks to under 5 minutes.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 shrink-0">4 → 1</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">Workflow convergence</strong> unifying siloed ML modules into one triage feed.
                  </p>
                </li>
              </ul>
            </div>

            {/* Governance & Guardrails */}
            <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                  Governance & Guardrails
                </h3>
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">0%</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">POC opt-out rate</strong> across our initial 6-month live enterprise pilot.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">100%</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">First-pass compliance approval</strong> on deployed campaigns via audit trails.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">Active</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">False-positive feedback loop</strong> retraining the 78% Hidden SME model.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">Zero</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-semibold">Cross-module offer collisions</strong> enforced via cardholder frequency caps.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 00 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-01")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: The Problem <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 01: THE PROBLEM ──────── */}
        <section
          id="slide-01"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 01 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">The Problem</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            The Brief Was a Mirage: The Operating Model Was Broken
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Leadership framed the project as a simple UI modernization: take an internal consulting practice and turn it into self-serve dashboards. But within two weeks of auditing historical consulting decks, I discovered the root bottleneck was not the visualization—it was a <strong className="text-slate-900 dark:text-white font-semibold">three-week game of human telephone</strong>.
            </p>

            {/* Operating Model Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                  Card Issuers (Bank Side)
                </span>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Consumer & SME Cardholders</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Financial institutions putting credit and debit cards into consumer and business hands—bleeding top-of-wallet share because marketing teams could not access actionable cohorts in time.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                  Merchant Acquirers (Acceptance Side)
                </span>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Processors & Merchants</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Entities onboarding merchants to accept card payments—unable to detect terminal attrition or foreign transaction (FX) leakage before the quarter closed.
                </p>
              </div>
            </div>

            {/* Contrast Callout */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              <strong className="font-semibold text-slate-900 dark:text-white">The Human Telephone Loop:</strong> Static PDF decks offered no self-serve slicing. Every follow-up required filing a Jira ticket with internal Subject Matter Experts (SMEs), waiting 14 days for a custom SQL pull, pivoting in Excel, and manually importing CSVs into third-party tools. By launch, the customer behavioral window had closed.
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 01 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-02")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Discovery Under NDA <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 02: DISCOVERY UNDER NDA ──────── */}
        <section
          id="slide-02"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 02 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Discovery Under NDA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            The &ldquo;Data-Rich, Capability-Poor&rdquo; Trap
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              In regulated banking, researchers cannot screen-share live cardholder databases. Financial privacy laws and strict NDAs prohibited observational sessions on client accounts. I triangulated evidence through two rigorous proxies:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold block mb-1">Method 01</span>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Artifact Reverse-Engineering</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Audited dozens of historical consulting decks; conducted <strong>6 deep-dive interviews</strong> with internal consultants and compliance officers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold block mb-1">Method 02</span>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Proxy Field Research</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Partnered with a third-party firm to recruit <strong>12 verified proxy Portfolio Managers & Marketing Directors</strong> at mid-sized institutions.
                </p>
              </div>
            </div>

            {/* Two Visual Artifacts: User Personas & Critique Board */}
            <div className="my-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-3">
                Discovery Artifacts (Click to inspect)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <figure 
                  className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"
                  onClick={() => onZoomImage({
                    src: "/case-study/issuer-portfolio/user-personas-research.jpg",
                    alt: "Proxy Banking User Personas & Interview Matrix",
                    caption: "Proxy Banking User Personas — Synthesizing 12 field interviews into institutional archetypes, analytical depth tiers, and cadence needs."
                  })}
                >
                  <div className="p-3 bg-white dark:bg-black/20 relative overflow-hidden">
                    <img
                      src="/case-study/issuer-portfolio/user-personas-research.jpg"
                      alt="Proxy Banking User Personas"
                      className="w-full h-auto rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" /> Zoom
                    </div>
                  </div>
                  <figcaption className="p-3.5 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between font-medium">
                    <span>Proxy Persona Research Matrix</span>
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">12 Bank Leaders</span>
                  </figcaption>
                </figure>

                <figure 
                  className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"
                  onClick={() => onZoomImage({
                    src: "/case-study/issuer-portfolio/critique-figma-board.jpg",
                    alt: "Cross-Border Critique & Whiteboarding Session",
                    caption: "Cross-Border Critique Whiteboard — Deconstructing historical consulting slide decks with internal SMEs and product leads."
                  })}
                >
                  <div className="p-3 bg-white dark:bg-black/20 relative overflow-hidden">
                    <img
                      src="/case-study/issuer-portfolio/critique-figma-board.jpg"
                      alt="Cross-Border Critique Whiteboard"
                      className="w-full h-auto rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" /> Zoom
                    </div>
                  </div>
                  <figcaption className="p-3.5 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between font-medium">
                    <span>Critique Session Whiteboard</span>
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">SME Consulting Audit</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* 4 Symptoms Quick Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                <span className="font-mono text-red-500 font-bold block mb-1">01 · 14-Day Wait</span>
                <p className="text-slate-600 dark:text-slate-400">Jira ticket queues created 3-week campaign delays.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                <span className="font-mono text-red-500 font-bold block mb-1">02 · Siloed Tools</span>
                <p className="text-slate-600 dark:text-slate-400">Manual CSV exports between fragmented tools.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                <span className="font-mono text-red-500 font-bold block mb-1">03 · Analysis Paralysis</span>
                <p className="text-slate-600 dark:text-slate-400">Unfiltered data dumps overwhelmed mid-market teams.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                <span className="font-mono text-red-500 font-bold block mb-1">04 · Data Leak Risk</span>
                <p className="text-slate-600 dark:text-slate-400">Manual file transfers created security liabilities.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 02 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-03")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Strategic Reframe <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 03: STRATEGIC REFRAME ──────── */}
        <section
          id="slide-03"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 03 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Strategic Reframe</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Killing the &ldquo;Dashboard&rdquo;: An Automated Capital Engine
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            {/* Core JTBD Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block mb-2">
                Core Job to Be Done (JTBD)
              </span>
              <p className="text-lg md:text-xl font-sans font-medium leading-relaxed text-slate-900 dark:text-white">
                <strong>When</strong> I see a dip in portfolio revenue, <br />
                <strong>I want to</strong> immediately identify which specific cardholder or merchant segment is driving it, <br />
                <strong>So I can</strong> deploy a targeted offer to win back their spend before the end of the quarter.
              </p>
            </div>

            {/* Information Architecture Figure */}
            <figure className="my-6 border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.02]">
              <div 
                className="cursor-zoom-in relative group overflow-hidden bg-white dark:bg-black/20 p-3 md:p-6"
                onClick={() => onZoomImage({
                  src: "/case-study/issuer-portfolio/information-architecture.jpg",
                  alt: "Information Architecture & Role-Based Progressive Disclosure Board",
                  caption: "Information Architecture Board — Structuring progressive disclosure from executive macro alerts down to analyst cohort slicing."
                })}
              >
                <img
                  src="/case-study/issuer-portfolio/information-architecture.jpg"
                  alt="Information Architecture Board"
                  className="w-full h-auto rounded-xl shadow-xs border border-slate-200/60 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                </div>
              </div>
              <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span>Figure 1: Information Architecture mapping progressive disclosure across institutional tiers.</span>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">Confidential</span>
              </figcaption>
            </figure>

            {/* Workflow Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                <span className="font-mono text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider block mb-2">
                  Legacy Flow (~3 Weeks)
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>• Spot unexplained Q3 volume dip in generic BI.</li>
                  <li>• File Jira ticket; <strong>wait 14 days</strong> for internal IT data pull.</li>
                  <li>• Pivot raw CSV in Excel; format manual mail merge.</li>
                  <li>• Deploy late after the behavioral window closes.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                  Redesigned Flow (&lt; 5 Minutes)
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>• Log in; see prioritized signal: <em>&ldquo;Cards spending like small businesses&rdquo;</em>.</li>
                  <li>• Click <strong>&ldquo;Recommendation details&rdquo;</strong> to inspect confidence tiers inline.</li>
                  <li>• Review audience cart; adjust budget slider on live 6-month ROI curve.</li>
                  <li>• <strong>Order selected audience in 1 click</strong> with automated audit trail.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 03 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-04")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Backend Trenches <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 04: BACKEND TRENCHES ──────── */}
        <section
          id="slide-04"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 04 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Technical Foundations</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Three Weeks in the Backend Trenches
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              I spent three weeks embedded directly with Data Science and Backend Engineering to map invisible technical constraints before locking UI screens:
            </p>

            {/* Universal Abstraction Layer */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-2">
                1. Universal Abstraction Layer
              </span>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 mb-4">
                Our ML models spoke completely different languages (relational tables vs event logs). I normalized them into <strong>four universal UI primitives</strong>:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-center font-bold text-slate-900 dark:text-white">Cohort Signal</div>
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-center font-bold text-slate-900 dark:text-white">Behavioral Evidence</div>
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-center font-bold text-slate-900 dark:text-white">Confidence Score</div>
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-center font-bold text-slate-900 dark:text-white">Quantified P&L Impact</div>
              </div>
            </div>

            {/* UX Copy Probability Manifesto */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-2">
                2. Navigating the 92% vs 78% Accuracy Gap (UX Copy Manifesto)
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Our Travel model launched at <strong>92% accuracy</strong>, while Hidden SME launched at <strong>78% accuracy</strong>. We authored a strict UX Copy Manifesto ensuring probability calibration:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                  <span className="text-[10px] font-mono text-red-600 uppercase font-bold block mb-1">Rejected False Certainty:</span>
                  <p className="line-through text-slate-500 italic">&ldquo;These retail users are running businesses on personal cards.&rdquo;</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/30">
                  <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold block mb-1">Shipped Calibrated Probability:</span>
                  <p className="text-slate-900 dark:text-white font-medium">&ldquo;Consumer cards that are highly likely to spend like small businesses and exhibit recurring commercial spend patterns.&rdquo;</p>
                  <span className="text-[11px] text-slate-500 mt-1 block">Protects institutions from accusing cardholders of terms-of-service breaches at 78% model confidence.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 04 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-05")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Validation & Studio Gates <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 05: VALIDATION & METRICS ──────── */}
        <section
          id="slide-05"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 05 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Empirical Validation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Failing on Purpose, Trade-Offs & Studio Gates
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            {/* Executive Clearance: DQS 93 */}
            <div className="border border-emerald-500/30 rounded-2xl p-6 bg-slate-50 dark:bg-white/[0.02] flex flex-col md:flex-row items-center gap-6">
              <figure 
                className="w-full md:w-1/2 cursor-zoom-in relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 group"
                onClick={() => onZoomImage({
                  src: "/case-study/issuer-portfolio/design-quality-score-93.jpg",
                  alt: "Design Quality Score (DQS) - 93",
                  caption: "XB SO DQS Study - Executives — Achieving a 93 Design Quality Score, surpassing the institutional benchmark required for engineering handoff."
                })}
              >
                <img
                  src="/case-study/issuer-portfolio/design-quality-score-93.jpg"
                  alt="DQS Score 93"
                  className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" /> Zoom
                </div>
              </figure>
              <div className="w-full md:w-1/2 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  Studio Benchmark Clearance
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  Design Quality Score: 93 / 100
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Executive evaluation validated that the redesigned triage flow eliminated analysis paralysis while meeting strict audit standards. Cleared the independent review board before active sprint engineering commenced.
                </p>
              </div>
            </div>

            {/* Dual Study Comparison: Emotions vs Effectiveness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <figure 
                className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex flex-col justify-between"
                onClick={() => onZoomImage({
                  src: "/case-study/issuer-portfolio/user-emotions-study.jpg",
                  alt: "User Emotions Study - UK + EU: 94, US: 93",
                  caption: "Unmoderated Testing Study — Customer emotional response and qualitative first impressions across UK/EU (94) and US (93) banking cohorts."
                })}
              >
                <div className="p-3 bg-white dark:bg-black/20 relative overflow-hidden">
                  <img
                    src="/case-study/issuer-portfolio/user-emotions-study.jpg"
                    alt="User Emotions Study"
                    className="w-full h-auto rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" /> Zoom
                  </div>
                </div>
                <figcaption className="p-4 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>User Emotions Rating</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">UK: 94 · US: 93</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    &ldquo;The experience is intuitive and easy to navigate.&rdquo; — Relationship Manager, Acquiring Bank
                  </p>
                </figcaption>
              </figure>

              <figure 
                className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex flex-col justify-between"
                onClick={() => onZoomImage({
                  src: "/case-study/issuer-portfolio/effectiveness-study.jpg",
                  alt: "Effectiveness & Trust Study - UK + EU: 94, US: 92",
                  caption: "Unmoderated Effectiveness Study — Value, relevance, and trust metrics across UK/EU (94) and US (92)."
                })}
              >
                <div className="p-3 bg-white dark:bg-black/20 relative overflow-hidden">
                  <img
                    src="/case-study/issuer-portfolio/effectiveness-study.jpg"
                    alt="Effectiveness & Trust Study"
                    className="w-full h-auto rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" /> Zoom
                  </div>
                </div>
                <figcaption className="p-4 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>Effectiveness & Trust Rating</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">UK: 94 · US: 92</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    &ldquo;Streamlines and automates workflow processes into an engaging user experience.&rdquo; — VP, Acquiring Bank
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Experience Scale Diagnostic */}
            <figure 
              className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"
              onClick={() => onZoomImage({
                src: "/case-study/issuer-portfolio/experience-scale-metrics.jpg",
                alt: "Experience Scale Diagnostics: Emotion 92, Ease 59, Effectiveness 99",
                caption: "Experience Scale Diagnostics — Emotion: 92, Ease: 59, Effectiveness: 99. The Ease 59 score reflected onboarding depth that was offset by 99% task effectiveness."
              })}
            >
              <div className="p-3 md:p-6 bg-white dark:bg-black/20 relative overflow-hidden">
                <img
                  src="/case-study/issuer-portfolio/experience-scale-metrics.jpg"
                  alt="Experience Scale Diagnostics"
                  className="w-full h-auto rounded-xl shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                </div>
              </div>
              <figcaption className="p-4 md:p-5 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Experience Scale Diagnostics: </span>
                  <span>Emotion (92) · Ease (59) · Effectiveness (99) · Engaging (98)</span>
                </div>
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider shrink-0">
                  Quantitative Testing Metric
                </span>
              </figcaption>
            </figure>

            {/* Wireframes & User Journey Canvas */}
            <figure 
              className="group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"
              onClick={() => onZoomImage({
                src: "/case-study/issuer-portfolio/wireframes-user-journeys.jpg",
                alt: "CRW-02 Workshop Wireframes and User Journeys Canvas",
                caption: "CRW-02 Co-Lab Workshop — Figma wireframe canvas mapping user journeys, exception paths, and multi-tier banking interactions."
              })}
            >
              <div className="p-3 md:p-6 bg-white dark:bg-black/20 relative overflow-hidden">
                <img
                  src="/case-study/issuer-portfolio/wireframes-user-journeys.jpg"
                  alt="CRW-02 Workshop Wireframe Canvas"
                  className="w-full h-auto rounded-xl shadow-xs group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                </div>
              </div>
              <figcaption className="p-4 md:p-5 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>Figure 4: CRW-02 Co-Lab Workshop wireframe canvas mapping branching logic across banking tiers.</span>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">Figma Canvas</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 05 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-06")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Flagship Product UI <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 06: FLAGSHIP PRODUCT UI ──────── */}
        <section
          id="slide-06"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 06 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Live Product UI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Product Architecture & High-Craft Execution
          </h2>

          <div className="space-y-8 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            
            {/* UI 1: Executive Recommendations */}
            <div>
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                  1. Executive Summary & Recommendation Details
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Organizes active cardholders (<code className="font-mono text-xs bg-slate-100 dark:bg-white/10 px-1 py-0.5 rounded">101,024</code> cards) into action tiers: <strong>Best cardholders</strong> (<em>Nurture</em>, <em>Upgrade to commercial</em>), <strong>Low active</strong> (<em>Divest</em>, <em>Reactivate</em>), and <strong>Cardholders that can improve</strong> (<em>Diversify</em>, <em>Retain</em>).
                </p>
              </div>
              <figure className="border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.02]">
                <div 
                  className="cursor-zoom-in relative group overflow-hidden bg-white dark:bg-black/20 p-3 md:p-6"
                  onClick={() => onZoomImage({
                    src: "/case-study/issuer-portfolio/executive-recommendations.webp",
                    alt: "Mastercard Portfolio Optimizer - Executive Recommendations",
                    caption: "Executive summary action donut (101,024 cardholders) and recommendation details for Nurture ($1.7K lift, 7,045 cards) and Upgrade to Commercial ($1.9K lift, 9,183 cards)."
                  })}
                >
                  <img
                    src="/case-study/issuer-portfolio/executive-recommendations.webp"
                    alt="Executive Recommendations"
                    className="w-full h-auto rounded-xl shadow-xs border border-slate-200/60 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                  </div>
                </div>
                <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <span>Figure 5: Executive Summary Action Donut (101,024 Cards) & Recommendation Details.</span>
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">Live Product UI</span>
                </figcaption>
              </figure>
            </div>

            {/* UI 2: Audience Templates & Cart Assembly */}
            <div>
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                  2. Multi-Cohort Cart Assembly & Sticky Summary
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Managers check multiple pre-built templates simultaneously while the sticky <strong>Selected audience summary</strong> dynamically tallies deduplicated cardholders (<code className="font-mono text-xs font-semibold">33,553</code> / <code className="font-mono text-xs font-semibold">33%</code> of portfolio) and combined revenue uplift.
                </p>
              </div>
              <figure className="border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.02]">
                <div 
                  className="cursor-zoom-in relative group overflow-hidden bg-white dark:bg-black/20 p-3 md:p-6"
                  onClick={() => onZoomImage({
                    src: "/case-study/issuer-portfolio/audience-templates.webp",
                    alt: "Mastercard Portfolio Optimizer - Audience Templates",
                    caption: "Audience Templates Workspace showing pre-built behavioral templates (Travel: 5,796 cards, Small Business: 10,341 cards) with sticky deduplicated audience summary (33,553 cardholders / 33% of portfolio) and 1-click Order selected audience(s)."
                  })}
                >
                  <img
                    src="/case-study/issuer-portfolio/audience-templates.webp"
                    alt="Audience Templates"
                    className="w-full h-auto rounded-xl shadow-xs border border-slate-200/60 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                  </div>
                </div>
                <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <span>Figure 6: Audience Templates — Multi-cohort cart assembly tallying 33,553 unique cardholders.</span>
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">Live Product UI</span>
                </figcaption>
              </figure>
            </div>

            {/* UI 3: Portfolio Explorer Workbench */}
            <div>
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                  3. Portfolio Explorer & Analyst Ergonomics
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Granular multi-axis workbench comparing selected cohorts (<code className="font-mono text-xs">38,593</code> cards representing <code className="font-mono text-xs">45%</code> of portfolio and <code className="font-mono text-xs">$39,451,764</code> in spend) with instant <strong>Save as custom audience</strong> and PDF/CSV export.
                </p>
              </div>
              <figure className="border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.02]">
                <div 
                  className="cursor-zoom-in relative group overflow-hidden bg-white dark:bg-black/20 p-3 md:p-6"
                  onClick={() => onZoomImage({
                    src: "/case-study/issuer-portfolio/portfolio-explorer.webp",
                    alt: "Mastercard Portfolio Optimizer - Portfolio Explorer",
                    caption: "Portfolio Explorer analytical workbench with multi-dimensional filtering, 38,593 cards (45% of portfolio), and $39.4M spend breakdown."
                  })}
                >
                  <img
                    src="/case-study/issuer-portfolio/portfolio-explorer.webp"
                    alt="Portfolio Explorer"
                    className="w-full h-auto rounded-xl shadow-xs border border-slate-200/60 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to Zoom
                  </div>
                </div>
                <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <span>Figure 7: Portfolio Explorer — 38,593 cards (45% of book) with multi-axis segmentation distributions.</span>
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">Live Product UI</span>
                </figcaption>
              </figure>
            </div>

            {/* Interactive Affordance Switcher Postcard */}
            <div className="border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 md:p-8 bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                    Analyst Micro-Affordances
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Four Affordances Tucked in Every Chart
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">Interactive Demo</span>
              </div>

              {/* Selector Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {AFFORDANCE_SLIDES.map((slide) => {
                  const isSelected = activeAffordance === slide.id;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setActiveAffordance(slide.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        isSelected
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-xs"
                          : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                      }`}
                    >
                      {slide.name}
                    </button>
                  );
                })}
              </div>

              {/* Active Affordance Preview Frame */}
              {(() => {
                const current = AFFORDANCE_SLIDES.find((s) => s.id === activeAffordance) || AFFORDANCE_SLIDES[0];
                return (
                  <div>
                    <div 
                      className="cursor-zoom-in relative rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white dark:bg-black/20 p-3 md:p-5 mb-3 group"
                      onClick={() => onZoomImage({
                        src: current.image,
                        alt: current.name,
                        caption: `${current.name} (${current.tag}) — ${current.description}`,
                      })}
                    >
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-full h-auto rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform"
                      />
                      <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-xs font-mono font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" /> Fullscreen
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="text-slate-900 dark:text-white font-semibold">{current.tag}: {current.description}</span>
                      <span>Click to zoom</span>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 06 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-07")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Commercial Suite & PLG <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 07: COMMERCIALIZATION & PLG ──────── */}
        <section
          id="slide-07"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 07 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Commercial Suite & PLG</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            From 0% POC Opt-Out to a 5-Module Commercial Suite
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              Over a rigorous six-month pilot with anchor institutions, <strong>neither client opted out</strong> (0% opt-out rate)—converting directly into enterprise contracts. We expanded from our core hub into a 5-module commercial suite:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">Hub</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Portfolio Optimizer</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Holistic P&L diagnostics across credit & debit books.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">Module 02</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Hidden SME Engine</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Flags personal cardholders behaving like businesses for commercial upgrades.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">Module 03</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Cross-Border Travel</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Pinpoints FX spend leakage, corridor shifts, and lounge engagement.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">Module 04</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">EMOB Lifecycle</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Predicts at the 6-month mark whether a cardholder will churn or become high-LTV.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">Module 05</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">SME Optimizer</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Dedicated commercial purchasing retention and spend benchmarks.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
                <span className="font-mono text-[10px] text-amber-600 uppercase font-bold block mb-1">PLG Architecture</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Sampled Hooks & Bridge</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Contextual locks (<em>&ldquo;180 latent signals detected&rdquo;</em>) and tokenized consent bridges.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slide 07 of 08</span>
            <button
              onClick={() => scrollToSlide("slide-08")}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 font-sans font-medium transition"
            >
              Next Slide: Pilot Outcomes <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* ──────── SLIDE 08: PILOT OUTCOMES & REFLECTION ──────── */}
        <section
          id="slide-08"
          className="w-full bg-white dark:bg-[#141416] rounded-3xl md:rounded-[32px] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-14 relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              SLIDE 08 / 08
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Outcomes & Reflection</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Pilot Outcomes & What Stays With Me
          </h2>

          <div className="space-y-6 text-base md:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
            {/* Impact Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="block text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">+28%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Cohort Discovery</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="block text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">+14.2%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Portfolio Revenue Lift</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="block text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">−85%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Launch Time (3w → 5m)</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-center">
                <span className="block text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">4 → 1</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Tools Converged</span>
              </div>
            </div>

            {/* Three Systemic Lessons */}
            <div className="space-y-3.5 my-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Systemic design beats feature design</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    The defining breakthrough wasn&apos;t a polished card—it was the Universal Abstraction Layer that taught four incompatible ML models to speak a single visual and behavioral language.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">In enterprise AI, trust is the UX</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Adoption is not won with &ldquo;AI magic.&rdquo; It is earned through calibrated probabilistic copy, explainable logic drawers, and human-in-the-loop governance.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">The best design happens in the backend trenches</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Embedding with Data Science early surfaced schema and accuracy constraints before hi-fi design began, preventing weeks of downstream engineering rework.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Quote Postcard */}
            <div className="border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-10 bg-slate-50 dark:bg-white/[0.02] my-8 text-center">
              <blockquote className="font-sans font-medium text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-white leading-relaxed max-w-2xl mx-auto mb-4 text-balance">
                &ldquo;Real enterprise design isn&apos;t about prettier charts—it&apos;s about operational conviction. We took three weeks of institutional friction and collapsed it into five minutes of decisive, auditable execution.&rdquo;
              </blockquote>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Pradyumna Srivastava · Lead Product Designer
              </span>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-slate-200/80 dark:border-white/10 pt-4 text-center">
              <p className="text-xs text-slate-400 italic max-w-xl mx-auto">
                For educational and portfolio case study purposes only. Proprietary figures and datasets have been composited and anonymized under NDA.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
