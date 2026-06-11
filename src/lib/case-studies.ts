import type { CasePayload } from "./notion.functions";
import { FINPY_PAYLOAD } from "./case-studies.finpy";
import { SECOND_OFFICE_PAYLOAD } from "./case-studies.second-office";

export interface CaseStudyConfig {
  slug: string;
  title: string;
  eyebrow: string;
  client: string;
  role: string;
  year: string;
  summary: string;
  notionPageId: string;
  /**
   * When true, the deck content lives server-side and is only returned
   * after a server-validated password unlock. The client bundle never
   * contains the deck content or the password.
   */
  serverProtected?: boolean;
  accent: string; // tailwind color class or hex used for slide accent
  staticPayload?: CasePayload; // bypass Notion when provided
}

// Notion page IDs (with or without dashes — Notion accepts both)
export const CASE_STUDIES: CaseStudyConfig[] = [
  {
    slug: "finpy",
    title: "From stigma to empowerment — the evolution of loans through FinPy",
    eyebrow: "FinPy · Disrupting loans",
    client: "FinPy",
    role: "UX Research · Product Design · Field studies",
    year: "Independent · Tier-2 / Tier-3 India",
    summary:
      "A user-centred overhaul anchored in field research, cultural sensitivity and structured assumption-testing — reframing credit from shame to dignity.",
    notionPageId: "cb28f77717cc4a6e9128ba91006c9b4f",
    accent: "#2C7A4E",
    staticPayload: FINPY_PAYLOAD,
  },
  {
    slug: "second-office",
    title: "Measuring design with the System Usability Scale",
    eyebrow: "Second-Office · Remote Work Platform",
    client: "Second-Office",
    role: "Market Researcher · UX/UI Designer · MVP Audit",
    year: "Research Case Study",
    summary:
      "Turning qualitative critique into a defensible, repeatable measurement loop — using SUS to quantify the impact of every design decision.",
    notionPageId: "996ca0e0a0844c6b974372467b1e49e8",
    accent: "#E85D3A",
    staticPayload: SECOND_OFFICE_PAYLOAD,
  },
  {
    slug: "mastercard",
    title: "Enabling FIs to uncover 28% more growth opportunities with AI-assisted portfolio intelligence",
    eyebrow: "Case study · B2B Portfolio Intelligence",
    client: "Global card network + partner FIs (composited)",
    role: "Lead Product Designer · UX Strategy · Interaction · Design Systems",
    year: "8 months · 3 mo discovery · 3 mo design · 2 mo beta/QA",
    summary:
      "An AI-assisted launchpad that converges four siloed analytics products into one decision surface — modelled to lift identified growth opportunities by 28% and end-user revenue by 14.2%.",
    notionPageId: "",
    serverProtected: true,
    accent: "#EB001B",
  },
];

export function getCaseStudy(slug: string): CaseStudyConfig | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
