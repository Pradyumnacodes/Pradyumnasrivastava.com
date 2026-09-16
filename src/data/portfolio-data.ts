import caseMastercard from "@/assets/case-mastercard.jpg";
import caseFinpy from "@/assets/case-finpy.png";
import caseSecondOffice from "@/assets/case-second-office.png";

export const EMAIL = "pradyumna.s.edu@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/pradyumnasrivastava/";
export const MEDIUM = "https://medium.com/@ecapsdesign";
export const RESUME_URL = "/pradyumna_srivastava_resume.pdf";

export type CategoryFilter = "All" | "Applied AI" | "Fintech" | "UX Strategy & Systems";

export type CaseCard = {
  slug: "mastercard" | "finpy" | "second-office";
  year: string;
  title: string;
  blurb: string;
  image: string;
  locked?: boolean;
  metric?: string;
  tags?: string[];
  url?: string;
  category: CategoryFilter;
  role: string;
  team: string;
  impact: string;
  tldr: {
    problem: string;
    solution: string;
    impact: string;
  };
};

export const CASES: CaseCard[] = [
  {
    slug: "mastercard",
    year: "2024",
    title: "Enabling FIs to uncover 28% more growth opportunities.",
    blurb:
      "An AI-assisted launchpad converging four siloed analytics products into one decision surface for financial institutions.",
    image: caseMastercard,
    locked: true,
    metric: "28% Opportunity Lift",
    tags: ["Issuer Portfolio", "B2B SaaS", "Applied AI"],
    url: "mastercard.com/analytics",
    category: "Applied AI",
    role: "Lead Product Designer",
    team: "Mastercard Labs · 8 Engineers, 2 PMs, 1 Data Scientist",
    impact: "$435M+ Modelled Opportunity",
    tldr: {
      problem: "Financial Institutions suffered from 4 disconnected analytics tools, taking weeks to identify portfolio growth opportunities.",
      solution: "Designed a unified AI-assisted launchpad consolidating risk, spend, and portfolio intelligence into one action surface.",
      impact: "Uncovered 28% additional growth opportunities across card portfolios with $435M+ modelled business value.",
    },
  },
  {
    slug: "finpy",
    year: "2023",
    title: "From stigma to empowerment — loans, reframed through FinPy.",
    blurb:
      "Field research across Tier-2/3 India turned credit from a source of shame into a tool of transparent dignity.",
    image: caseFinpy,
    metric: "+65% Application Rate",
    tags: ["Repayment UX", "Field Research", "Fintech"],
    url: "finpy.in/credit",
    category: "Fintech",
    role: "Senior UX Designer",
    team: "Zype · 5 Engineers, 1 PM, 2 Researchers",
    impact: "+65% Loan Applications · 35% Repayments",
    tldr: {
      problem: "Traditional micro-loans in Tier-2/3 India carried social stigma, complex fee jargon, and opaque interest calculations.",
      solution: "Ran 40+ field interviews to build a gamified credit flow with transparent fee breakdowns and milestone repayment rewards.",
      impact: "Boosted loan applications by 65%, increased repayment rates by 35%, and raised 30-day user retention by 20%.",
    },
  },
  {
    slug: "second-office",
    year: "2022",
    title: "A cross-border recruitment dashboard designed to eliminate the friction of offshore hiring.",
    blurb:
      "A centralized dashboard solving currency standardization, candidate tracking, and cross-border jargon for US entrepreneurs.",
    image: caseSecondOffice,
    metric: "Quantified UX Metrics",
    tags: ["SUS Loop", "Design Systems", "Analytics"],
    url: "sus-framework.internal",
    category: "UX Strategy & Systems",
    role: "Lead Systems Designer",
    team: "Second Office · Design & Product Operations",
    impact: "78.2 SUS Score (+6 pts) · 15% Dev Time Saved",
    tldr: {
      problem: "Product decisions lacked quantitative UX metrics, making design ROI difficult to justify to executive stakeholders.",
      solution: "Created an automated System Usability Scale (SUS) measurement framework integrated directly into sprint release cycles.",
      impact: "Elevated average usability score from 72.2 to 78.2 and reduced frontend development iteration time by 15%.",
    },
  },
];

export type StoryEntry = {
  title: string;
  link: string;
  date: string;
};

export const STORIES: StoryEntry[] = [
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

export type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  location: string;
  note?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Mastercard",
    role: "User Experience Designer",
    duration: "Aug 2024 — Present",
    location: "Pune, India",
    note: "Leading product design on an AI-assisted portfolio intelligence platform — cross-border travel, spend optimisation, EMOB monitoring, and SME portfolio tools.",
  },
  {
    company: "goGlocal",
    role: "User Experience Designer",
    duration: "Oct 2023 — Aug 2024",
    location: "Mumbai, India",
    note: "Shaped product vision from the founder's office — end-to-end design execution, pitch decks for funding rounds, and global payments-settlement software.",
  },
  {
    company: "Zype (Respo Financial Capital)",
    role: "User Experience Designer",
    duration: "Oct 2022 — Sep 2023",
    location: "Mumbai, India",
    note: "Gamified credit UX that boosted repayments by 35%, retention by 20%, and new loan applications by 65%.",
  },
  {
    company: "RedRob (McKinley Rice)",
    role: "User Experience Designer",
    duration: "Feb 2022 — Jul 2022",
    location: "Pune, India",
    note: "Cross-border design support across India and South Korea — usability audits, design sprints, and developer handoff.",
  },
];
