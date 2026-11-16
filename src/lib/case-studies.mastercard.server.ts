import type { CasePayload, Slide } from "./notion.functions";

// Static, hand-authored deck for the refreshed Global Card Network AI Portfolio Engine case study.

const slides: Slide[] = [
  {
    id: "meta",
    kicker: "At a glance",
    title: "Designing Trust into Automated Capital",
    blocks: [
      {
        type: "quote",
        rich: [
          {
            text: "Leadership asked me to modernize their dashboards. What I actually found was a three-week game of human telephone—costing mid-market banks millions in invisible revenue leaks.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Role — ", bold: true },
          {
            text: "Lead Product Designer (Sole Designer — UX Strategy, Interaction Design, Research, Design Systems)",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Domain — ", bold: true },
          { text: "Global Card Network & Partner Financial Institutions (Issuing & Acquiring Ecosystem)" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Timeline — ", bold: true },
          { text: "8 Months (3 mo Discovery & Strategy · 3 mo Iterative Design · 2 mo Beta & QA)" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Squad — ", bold: true },
          { text: "1 Group Product Manager · 3 Data Scientists · 6 Front-End Engineers · 1 Lead Designer" },
        ],
      },
      {
        type: "bullet",
        rich: [{ text: "Platform — ", bold: true }, { text: "Enterprise Desktop B2B SaaS" }],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "Impact: +28% more growth opportunities uncovered, +14.2% portfolio revenue lift, −85% launch time (3w → 5m), 0% pilot opt-out across 6 months.",
          },
        ],
      },
    ],
  },
  {
    id: "prologue",
    kicker: "Prologue",
    title: "The Brief Was a Mirage",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "When I joined the product team as its sole designer, the mandate sounded deceptively straightforward: take an existing internal consulting service run by Subject Matter Experts (SMEs) and productize it into a self-serve B2B analytics platform.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "On paper, the business operated at the center of a four-party card network, generating revenue across three distinct touchpoints—authorization and switching, clearing and settlement, and cross-border FX/value-added services—spanning both Issuers and Acquirers.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Behind the scenes, internal consultants manually pulled transaction logs and assembled bespoke decks. Within two weeks of auditing historical decks and shadowing consultants, I realized: the UI wasn't the problem—the operating model was.",
          },
        ],
      },
    ],
  },
  {
    id: "discovery",
    kicker: "01 · Landscape & Discovery",
    title: "The 'Data-Rich, Capability-Poor' Trap",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Designing for a global card network meant accommodating an extreme spectrum of institutional scale—from $2M regional SMEs to $10B tier-one financial institutions. Mid-market regional banks sit on terabytes of transactional data without in-house data science teams to operationalize it.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Research Behind Closed Financial Doors" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "Artifact Reverse-Engineering & Shadowing: ", bold: true },
          {
            text: "Audited dozens of historical SME consulting reports and conducted 6 deep-dive interviews across consultants, product leads, and compliance officers.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Proxy Field Research: ", bold: true },
          {
            text: "Recruited 12 verified proxy users (Portfolio Managers and Marketing Directors at mid-sized banks) to probe willingness to pay, operational rhythms, and analytical depth.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "I know our overall transaction volume dropped this quarter, but I don't have the time—or the access—to cross-reference our new cardholders against our cross-border spenders to figure out why.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Four Symptoms, One Broken Architecture" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "The 14-Day Jira Bottleneck: ", bold: true },
          { text: "Static decks required filing tickets, stretching campaign turnaround to ~3 weeks." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Siloed Models & Disjointed Execution: ", bold: true },
          { text: "CSV exports, Excel pivoting, and manual email tool uploads missed the behavioral window." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Analysis Paralysis at Scale: ", bold: true },
          { text: "Multidimensional spend tables overwhelmed mid-market operators without analysts." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Security & Consent Friction: ", bold: true },
          { text: "Passing raw files created severe data-leakage and compliance audit risks." },
        ],
      },
    ],
  },
  {
    id: "reframe",
    kicker: "02 · Strategic Reframe",
    title: "Killing the 'Dashboard'",
    blocks: [
      {
        type: "callout",
        emoji: "🎯",
        rich: [
          {
            text: "Job to Be Done: When I see a dip in portfolio revenue, I want to immediately identify which specific cardholder segment is driving it, So I can deploy a targeted offer before quarter-end.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We were no longer designing a passive analytics dashboard; we were designing an intelligent campaign-deployment engine.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-launchpad.png",
        caption: "Unified Triage Feed & Module Launchpad — streaming prioritized signals into a single decision view.",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Role-Based Progressive Disclosure: Executive Summary (Heads of Cards), Recommendations Triage (Product Managers), Portfolio Explorer (Data Analysts), and RM Threat Workspace (Relationship Managers).",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Collapsing a 3-Week Spaghetti Flow into a 5-Minute Line: 1. Detection (prioritized AI alert) → 2. Diagnosis (inline why/proof drawer) → 3. Execution (1-click audience ordering).",
          },
        ],
      },
    ],
  },
  {
    id: "backend",
    kicker: "03 · Backend Trenches",
    title: "Three Weeks in the Backend Trenches",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "I spent three weeks embedded directly with Data Science and Backend Engineering to map invisible technical constraints before locking UI designs.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "1. Universal Abstraction Layer" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Normalized disparate ML schemas into four consistent UI primitives: Cohort Signal, Behavioral Evidence, Confidence Score, and Quantified P&L Impact.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "2. The 92% vs 78% Accuracy Gap & UX Copy Manifesto" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "Calibrated Probability: ", bold: true },
          {
            text: "Replaced false certainty ('These retail users are running businesses') with calibrated probability ('Consumer cards that are highly likely to spend like small businesses').",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Intervention Windows: ", bold: true },
          {
            text: "Framed churn predictions as actionable intervention windows rather than guaranteed inevitabilities.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-signals.png",
        caption: "Signals Registry — calibrating model accuracy, AUC, and compliance boundaries across modules.",
      },
    ],
  },
  {
    id: "validation",
    kicker: "04 · Validation & Trade-Offs",
    title: "Failing on Purpose & Studio Gates",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Two Rejected Architectures" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "Concept A (Module App Store): ", bold: true },
          { text: "Digitized existing silos and overwhelmed users with decision fatigue. Killed." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Concept B (Zero-Touch Autonomous AI): ", bold: true },
          { text: "Bank risk advisors vetoed unchecked automated outreach immediately. Killed." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "The Breakthrough: ", bold: true },
          { text: "Human-in-the-Loop Triage Feed — AI prioritizes signals by dollar impact; human acts as editor and approver." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Key Trade-Offs (What We Killed)" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "Killed bespoke white-label dashboards for $10B banks: ", bold: true },
          { text: "Protected engineering velocity by standardizing recommendations and providing saved filters in Explorer." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Killed raw ROC/AUC scores on Opportunity Cards: ", bold: true },
          { text: "Moved statistical jargon into proof drawers and led cards with plain-English behavioral triggers." },
        ],
      },
      {
        type: "image",
        url: "/case-study/issuer-portfolio/design-quality-score-93.jpg",
        caption: "Studio validation gauntlet — achieving a 93 Design Quality Score (DQS) in executive benchmarking.",
      },
    ],
  },
  {
    id: "architecture",
    kicker: "05 · Architecture & Execution",
    title: "Product Architecture & High-Craft Execution",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "1. Executive Summary & Action-Based Segmentation" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Issuing: 101,024 cardholders structured into Best, Low active, and Can improve tiers with direct growth projections.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/issuer-portfolio/executive-recommendations.webp",
        caption: "Mastercard Portfolio Optimizer — Executive Summary Donut (101,024 cardholders) and Recommendation Details for Nurture and Upgrade to Commercial cohorts.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "2. Progressive Proof — Explainable AI in Context" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Surfacing underlying cohort triggers, spending distributions, and an active false-positive override drawer to retrain data science models.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-hidden-engine.png",
        caption: "Hidden SME Engine — identifying commercial spend patterns on retail cards with explainable similarity metrics.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "3. Audience Templates & 1-Click Campaign Simulator" }],
      },
      {
        type: "image",
        url: "/case-study/issuer-portfolio/audience-templates.webp",
        caption: "Mastercard Portfolio Optimizer — Audience Templates multi-cohort assembly (33,553 cardholders / 33% portfolio share).",
      },
      {
        type: "image",
        url: "/case-study/global-network/app-campaigns.png",
        caption: "Campaign Simulator — live 6-month ROI curve modeling incremental revenue against baseline.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "4. Portfolio Explorer & Analyst Ergonomics" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Comparing 38,593 cards (45% of portfolio) and $39.4M in spend across multi-axis segmentation distributions.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/issuer-portfolio/portfolio-explorer.webp",
        caption: "Mastercard Portfolio Optimizer — Portfolio Explorer analytical workbench with multi-dimensional filtering.",
      },
      {
        type: "image",
        url: "/case-study/global-network/humanise-default.png",
        caption: "Default visualization card featuring the four top-right analyst micro-affordances.",
      },
    ],
  },
  {
    id: "commercialization",
    kicker: "06 · Growth & Packaging",
    title: "Commercialization, PLG Packaging & Governance",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Expanded from core hub into a 5-module commercial suite: Portfolio Optimizer (Hub), SME Optimizer, Hidden SME, Travel & Cross-Border, and EMOB (Early Month on Book).",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-travel.png",
        caption: "Cross-Border Travel Module — corridor velocity and FX spend leakage translated into high-impact campaigns.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "PLG Packaging & À La Carte Access" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Eliminated rigid all-or-nothing modular bundles with an Essentials P&L tier (meeting 95% of bank needs) + à la carte locked model preview hooks.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Consent-Tiered Governance: Full-consent clients unlocked granular deep analytics; restricted-consent clients received compliant baselines with tokenized cross-platform bridges.",
          },
        ],
      },
    ],
  },
  {
    id: "outcomes",
    kicker: "07 · Reflection & Horizons",
    title: "Pilot Outcomes & What Stays With Me",
    blocks: [
      {
        type: "bullet",
        rich: [
          { text: "+28% ", bold: true },
          { text: "more segmented user groups discovered and acted upon vs manual SQL querying." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "+14.2% ", bold: true },
          { text: "average increase in targeted portfolio transaction volume over six months." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "−85% ", bold: true },
          { text: "reduction in campaign launch time, collapsed from ~3 weeks to under 5 minutes." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "4 → 1 ", bold: true },
          { text: "convergence of siloed analytics tools into one auditable decision surface." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Three Lessons Carried Forward" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "1. Systemic design beats feature design. ", bold: true },
          { text: "The Universal Abstraction Layer unified four incompatible ML models into one grammar." },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "2. In enterprise AI, trust is the UX. ", bold: true },
          { text: "Calibrated probability, explainability drawers, and human governance drive adoption in regulated finance." },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "3. The best design happens in the backend trenches. ", bold: true },
          { text: "Mapping schema and accuracy constraints with Data Science early prevented months of downstream rework." },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "Real enterprise design isn't about prettier charts—it's about operational conviction. We took three weeks of institutional friction and collapsed it into five minutes of decisive, auditable execution.",
          },
        ],
      },
    ],
  },
  {
    id: "disclaimer",
    kicker: "Disclaimer",
    title: "Confidentiality & Provenance",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "For educational and portfolio case study purposes only. Specific institutional figures, datasets, and interface examples referenced in this case study are composited and anonymized to protect proprietary client confidentiality.",
            italic: true,
          },
        ],
      },
    ],
  },
];

export const MASTERCARD_PAYLOAD: CasePayload = {
  title:
    "Enabling FIs to uncover 28% more growth opportunities",
  cover: null,
  icon: null,
  slides: [
    {
      id: "cover",
      kicker: "Case Study",
      title:
        "Enabling FIs to uncover 28% more growth opportunities",
      blocks: [],
    },
    ...slides,
  ],
  fetchedAt: Date.now(),
};
