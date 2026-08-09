import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StaggerText } from "@/components/StaggerText";
import { Parallax } from "@/components/Parallax";
import { AnimateIn } from "@/components/AnimateIn";
import { StoryList } from "@/components/StoryList";
import { MobileContactCard } from "@/components/MobileContactCard";
import { ImmersiveToggle } from "@/components/ImmersiveToggle";
import { CaseStack } from "@/components/CaseStack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pradyumna Srivastava — Senior Product Designer" },
      {
        name: "description",
        content:
          "Senior Product Designer shaping B2B SaaS and financial interfaces — 20M+ users, $435M+ in business impact.",
      },
      { property: "og:title", content: "Pradyumna Srivastava — Senior Product Designer" },
      {
        property: "og:description",
        content:
          "Senior Product Designer shaping B2B SaaS and financial interfaces — 20M+ users, $435M+ in business impact.",
      },
    ],
  }),
  component: Index,
});
import { 
  EMAIL, 
  LINKEDIN, 
  MEDIUM, 
  RESUME_URL, 
  CASES, 
  STORIES, 
  EXPERIENCE 
} from "@/data/portfolio";

function SectionRule({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-dvh bg-transparent text-foreground font-serif">
      {/* Top bar */}
      <header className="w-full md:w-[72%] max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <span className="font-mono text-[12px] tracking-[0.15em] uppercase text-muted-foreground">
          Pradyumna Srivastava
        </span>
        <div className="flex items-center gap-3">
          <ImmersiveToggle />
          <ThemeToggle />
        </div>
      </header>

      <article className="w-full md:w-[72%] max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-16 md:space-y-28">
        {/* Hero */}
        <AnimateIn as="section" animation="fade-up" duration={800}>
          <Parallax offset={25}>
            <StaggerText 
              className="text-4xl md:text-[3.5rem] leading-[1.1] tracking-tighter font-medium text-balance"
              text="I'm a senior product designer working at the intersection of *finance,* *data* and *AI* — shaping interfaces used by millions and tied to hundreds of millions in business impact."
            />
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground font-sans max-w-[65ch]">
              Currently based in Pune, India. Open to senior IC and lead roles, remote or
              relocating.
            </p>

            {/* "Trusted By" / "Currently At" style section */}
            <div className="mt-16 flex flex-col gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Currently Designing At
              </span>
              <div className="flex items-center">
                <svg width="60" height="36" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
                  <circle cx="7.5" cy="8" r="8" fill="#EB001B"/>
                  <circle cx="16.5" cy="8" r="8" fill="#F79E1B"/>
                  <path d="M12 14.665C13.568 13.064 14.5 10.871 14.5 8.5C14.5 6.129 13.568 3.936 12 2.335C10.432 3.936 9.5 6.129 9.5 8.5C9.5 10.871 10.432 13.064 12 14.665Z" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </Parallax>
        </AnimateIn>

        {/* Résumé */}
        <AnimateIn as="section" animation="fade-up" delay={100}>
          <SectionRule label="Résumé" />
          <div className="space-y-6 text-lg leading-relaxed max-w-[68ch]">
            <p>
              Eight years designing decision tools, analytics surfaces and consumer-facing
              fintech products. Most recently leading product design on an AI-assisted portfolio
              intelligence platform for a global card network.
            </p>
            <p className="text-muted-foreground font-sans text-base">
              20M+ users reached · $435M+ in modelled business impact · Design systems, UX
              strategy, research and interaction design.
            </p>
            <p>
              <a
                href={RESUME_URL}
                className="group/link underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                Download the full résumé (PDF)
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
              </a>
            </p>
          </div>
        </AnimateIn>

        {/* Experience */}
        <AnimateIn as="section" animation="fade-up" delay={100}>
          <SectionRule label="Experience" />
          <ol className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <AnimateIn
                as="li"
                key={exp.company}
                animation="fade-up"
                delay={i * 80}
                className="group relative pl-6 py-6 border-l-2 border-border hover:border-foreground/40 transition-colors duration-300"
              >
                {/* Timeline dot */}
                <span className="absolute left-[-5px] top-8 w-2 h-2 rounded-full bg-border group-hover:bg-foreground group-hover:scale-125 transition-all duration-300" />
                <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                  <h3 className="text-xl md:text-2xl tracking-tighter font-medium group-hover:text-foreground transition-colors">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground shrink-0">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-base font-sans text-muted-foreground">
                    {exp.role}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    ·
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground/60">
                    {exp.location}
                  </span>
                </div>
                {exp.note && (
                  <p className="mt-3 text-[15px] sm:text-base font-sans text-muted-foreground leading-relaxed">
                    {exp.note}
                  </p>
                )}
              </AnimateIn>
            ))}
          </ol>
        </AnimateIn>


        {/* Work */}
        <AnimateIn as="section" animation="fade-up" delay={100}>
          <SectionRule label="Selected work" />
          <CaseStack cases={CASES} />
        </AnimateIn>

        {/* Writing */}
        <AnimateIn as="section" animation="fade-up" delay={100}>
          <div className="flex items-baseline justify-between mb-10">
            <SectionRule label="Writing" />
          </div>
          <div className="pt-4">
            <StoryList stories={STORIES} />
          </div>
          <p className="mt-8 text-sm font-sans text-center">
            <a
              href={MEDIUM}
              target="_blank"
              rel="noreferrer"
              className="group/link underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
            >
              All stories on Medium
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
            </a>
          </p>
        </AnimateIn>

        {/* Contact (Desktop) */}
        <AnimateIn as="section" animation="fade-up" delay={100} className="hidden md:block">
          <SectionRule label="Contact" />
          <p className="text-3xl md:text-[2.75rem] leading-[1.1] tracking-tighter font-medium text-balance">
            If you're building something significant in finance, data or AI — I'd like to hear
            about it.
          </p>
          <ul className="mt-8 space-y-3 text-lg">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="group/link underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                {EMAIL}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="group/link underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={MEDIUM}
                target="_blank"
                rel="noreferrer"
                className="group/link underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                Medium
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
              </a>
            </li>
          </ul>
        </AnimateIn>

        <MobileContactCard />

        <AnimateIn as="footer" animation="fade-in" delay={200} className="pt-12 border-t border-border font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Pradyumna</span>
          <span>Pune · IST</span>
        </AnimateIn>
      </article>
    </main>
  );
}
