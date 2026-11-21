import type { CasePayload } from "./notion.functions";
import { FINPY_PAYLOAD } from "./case-studies.finpy.data";
import { SECOND_OFFICE_PAYLOAD } from "./case-studies.second-office.data";

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface CaseStudyHighlights {
  problem: string;
  solution: string;
  metrics: ImpactMetric[];
  keyTakeaways: string[];
}

export interface CaseStudyConfig {
  slug: string;
  title: string;
  eyebrow: string;
  client: string;
  role: string;
  year: string;
  summary: string;
  notionPageId: string;
  serverProtected?: boolean;
  accent: string;
  staticPayload?: CasePayload;
  highlights?: CaseStudyHighlights;
}

// ──────────────────────────────────────────────────────
//  Slide payloads are authored in separate server files.
//  FINPY_PAYLOAD  → case-studies.finpy.server.ts
//  SECOND_OFFICE_PAYLOAD → case-studies.second-office.server.ts
// ──────────────────────────────────────────────────────

export const CASE_STUDIES: Record<string, CaseStudyConfig> = {
  finpy: {
    slug: "finpy",
    title: "From stigma to empowerment — the evolution of loans through FinPy",
    eyebrow: "Fintech · UX Research & Product Design",
    client: "FinPy",
    role: "UX Research · Product Design · Field Studies",
    year: "Independent · Tier-2 / Tier-3 India",
    summary:
      "A user-centred overhaul anchored in field research, cultural sensitivity and structured assumption-testing — reframing credit from shame to dignity.",
    notionPageId: "finpy",
    accent: "#2C7A4E",
    staticPayload: FINPY_PAYLOAD,
    highlights: {
      problem:
        "Users with low income were choosing unrealistic short loan tenures, unable to upload salary bank details, and receiving no positive reinforcement for repaying on time.",
      solution:
        "Locked tenure gamification, positive friction screens for salary verification, and a gamified badge system that rewards repayment loyalty with a credit line increase.",
      metrics: [
        { value: "+33%", label: "More users selecting 12 EMI repayment tenure" },
        { value: "+45%", label: "Increase in salary bank statement uploads" },
        { value: "276 / 320", label: "Users who accepted their credit limit increase" },
      ],
      keyTakeaways: [
        "Framing restricted options as 'locked' rather than 'unavailable' eliminated shame while driving better financial behaviour.",
        "'Positive Friction' — a timed screen that forces users to read before proceeding — solved a silent UX error without a single line of copy change.",
        "Gamified repayment rewards drove word-of-mouth: 167 users shared their achievement, generating 16 organic 5-star Play Store ratings.",
      ],
    },
  },
  "second-office": {
    slug: "second-office",
    title: "Measuring design impact with the System Usability Scale",
    eyebrow: "B2B SaaS · Design Metrics & Research",
    client: "Second Office",
    role: "Senior Product Designer",
    year: "2022",
    summary:
      "A defensible, repeatable measurement loop that quantifies the impact of every design decision using SUS benchmark scoring.",
    notionPageId: "second-office",
    accent: "#10B981",
    staticPayload: SECOND_OFFICE_PAYLOAD,
    highlights: {
      problem:
        "Unclear design ROI and subjective feedback loops hindering enterprise product iterations.",
      solution:
        "Standardized System Usability Scale (SUS) tracking embedded into sprint reviews and release gates.",
      metrics: [
        { value: "84.5", label: "Achieved SUS Usability Benchmark Score" },
        { value: "-42%", label: "Reduction in Usability Support Tickets" },
        { value: "3.2x", label: "Faster Task Completion Speed" },
      ],
      keyTakeaways: [
        "Standardized SUS metrics provided defensible evidence to align engineering and product leadership.",
        "Post-milestone automated surveys yielded actionable usability insights across user cohorts.",
        "Iterative sprint loops drove SUS score growth from a baseline 62 to an industry-leading 84.5.",
      ],
    },
  },
  mastercard: {
    slug: "mastercard",
    title: "Enabling FIs to uncover 28% more growth opportunities",
    eyebrow: "Global Card Network · AI Portfolio Engine",
    client: "Global Card Network",
    role: "Lead Product Designer",
    year: "2024",
    summary:
      "Turning an internal consulting practice into an AI portfolio engine — enabling financial institutions to uncover +28% more growth opportunities and collapse campaign launch time from ~3 weeks to under 5 minutes.",
    notionPageId: "mastercard",
    serverProtected: true,
    accent: "#F59E0B",
    highlights: {
      problem:
        "Mid-market banks struggled with a 3-week manual consulting loop and 4 siloed analytics systems, causing millions in invisible revenue leaks.",
      solution:
        "Engineered an automated AI portfolio triage engine with explainable probability tiers, progressive proof, and 1-click campaign deployment.",
      metrics: [
        { value: "+28%", label: "More Growth Opportunities Uncovered" },
        { value: "−85%", label: "Campaign Launch Time (3w → 5m)" },
        { value: "0%", label: "Pilot Opt-Out Rate Across 6 Months" },
      ],
      keyTakeaways: [
        "Universal Abstraction Layer taught four incompatible ML models to speak a single visual and behavioral language.",
        "Calibrated probabilistic UX copy and explainable logic drawers earned mandatory bank risk and compliance trust.",
        "Role-tailored workspaces united executive leadership, portfolio marketers, data analysts, and relationship managers into one flow.",
      ],
    },
  },
};

export function getCaseStudy(slug: string): CaseStudyConfig | undefined {
  return CASE_STUDIES[slug];
}
