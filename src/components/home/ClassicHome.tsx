import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import caseMastercard from "@/assets/case-mastercard.jpg";
import caseFinpy from "@/assets/case-finpy.jpg";
import caseSecondOffice from "@/assets/case-second-office.jpg";

const EMAIL = "pradyumna.s.edu@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/pradyumnasrivastava/";
const MEDIUM = "https://medium.com/@ecapsdesign";
const RESUME_URL = "/pradyumna_srivastava_resume.pdf";

type CaseCard = {
  slug: "mastercard" | "finpy" | "second-office";
  year: string;
  title: string;
  blurb: string;
  image: string;
  locked?: boolean;
};

const CASES: CaseCard[] = [
  {
    slug: "mastercard",
    year: "2024",
    title: "Enabling FIs to uncover 28% more growth opportunities.",
    blurb:
      "An AI-assisted launchpad converging four siloed analytics products into one decision surface.",
    image: caseMastercard,
    locked: true,
  },
  {
    slug: "finpy",
    year: "2023",
    title: "From stigma to empowerment — loans, reframed through FinPy.",
    blurb:
      "Field research across Tier-2/3 India turned credit from a source of shame into a tool of dignity.",
    image: caseFinpy,
  },
  {
    slug: "second-office",
    year: "2022",
    title: "Measuring design impact with the System Usability Scale.",
    blurb:
      "A defensible, repeatable measurement loop that quantifies the impact of every design decision.",
    image: caseSecondOffice,
  },
];

const STORIES = [
  {
    title: "Hug Content or Fill Container? From Zero to Hero of Responsive Designs",
    link: "https://medium.com/design-bootcamp/hug-content-or-fill-container-from-zero-to-hero-of-responsive-designs-be036e8a21ba",
    date: "Aug 2022",
  },
  {
    title: "Starting with design system? Make sure you know these 10 points",
    link: "https://medium.com/design-bootcamp/starting-with-design-system-make-sure-you-know-these-ten-points-2ddc1662efdb",
    date: "Feb 2022",
  },
  {
    title: "Brutalism to Neu-brutalism — What, Why and How?",
    link: "https://medium.com/design-bootcamp/brutalism-to-neu-brutalism-what-why-and-how-456c6a7f081a",
    date: "May 2022",
  },
  {
    title: "Protect yourself from arguments at workplace like a pro",
    link: "https://medium.com/design-bootcamp/protect-yourself-from-arguments-at-workplace-like-a-pro-879e71fbf477",
    date: "Apr 2023",
  },
];

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

export function ClassicHome() {
  return (
    <main className="min-h-dvh bg-background text-foreground font-serif">
      {/* Top bar */}
      <header className="max-w-2xl mx-auto px-6 pt-8 flex items-center justify-between">
        <span className="font-mono text-[12px] tracking-[0.15em] uppercase text-muted-foreground">
          Pradyumna Srivastava
        </span>
        <ThemeToggle />
      </header>

      <article className="max-w-2xl mx-auto px-6 py-20 md:py-28 space-y-28">
        {/* Hero */}
        <section>
          <h1 className="text-4xl md:text-5xl leading-[1.15] tracking-tight font-medium text-balance">
            I'm a senior product designer working at the intersection of{" "}
            <em className="italic text-muted-foreground">finance, data and AI</em> — shaping
            interfaces used by millions and tied to hundreds of millions in business impact.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground font-sans">
            Currently based in Pune, India. Open to senior IC and lead roles, remote or
            relocating.
          </p>
        </section>

        {/* Résumé */}
        <section>
          <SectionRule label="Résumé" />
          <div className="space-y-6 text-lg leading-relaxed">
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
                className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                Download the full résumé (PDF)
                <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
            </p>
          </div>
        </section>

        {/* Work */}
        <section>
          <SectionRule label="Selected work" />
          <ol className="space-y-12">
            {CASES.map((c, i) => (
              <li key={c.slug}>
                <Link
                  to="/case-study/$slug"
                  params={{ slug: c.slug }}
                  className="group block"
                >
                  <div className="flex items-baseline gap-4 mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>0{i + 1}</span>
                    <span>{c.year}</span>
                    {c.locked && (
                      <span className="inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" aria-hidden /> NDA
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl leading-snug tracking-tight font-medium text-balance group-hover:text-muted-foreground transition-colors">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-base font-sans text-muted-foreground leading-relaxed">
                    {c.blurb}
                  </p>
                  <div className="mt-5 overflow-hidden rounded-lg ring-1 ring-border bg-muted">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="w-full aspect-[16/9] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500"
                    />
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-sans underline underline-offset-4 decoration-foreground/30 group-hover:decoration-foreground">
                    Read the case study
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Writing */}
        <section>
          <SectionRule label="Writing" />
          <ul className="space-y-5">
            {STORIES.map((s) => (
              <li key={s.link}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline gap-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground shrink-0 w-20">
                    {s.date}
                  </span>
                  <span className="text-lg leading-snug underline underline-offset-4 decoration-foreground/20 group-hover:decoration-foreground transition-colors text-balance">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-sans">
            <a
              href={MEDIUM}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground inline-flex items-center gap-1"
            >
              More on Medium
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
            </a>
          </p>
        </section>

        {/* Contact */}
        <section>
          <SectionRule label="Contact" />
          <p className="text-2xl md:text-3xl leading-snug tracking-tight font-medium text-balance">
            If you're building something significant in finance, data or AI — I'd like to hear
            about it.
          </p>
          <ul className="mt-8 space-y-3 text-lg">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
              >
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground inline-flex items-center gap-1"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={MEDIUM}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground inline-flex items-center gap-1"
              >
                Medium
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </section>

        <footer className="pt-12 border-t border-border font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Pradyumna</span>
          <span>Pune · IST</span>
        </footer>
      </article>
    </main>
  );
}
