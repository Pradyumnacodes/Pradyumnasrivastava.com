import type { CasePayload, Slide } from "./notion.functions";

// Static, hand-authored deck for a global card network-inspired Portfolio Intelligence case study.

const slides: Slide[] = [
  {
    id: "meta",
    kicker: "At a glance",
    title: "Project at a glance",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "An 8-month zero-to-one product design effort for Portfolio Intelligence — a suite of predictive ML modules that helps mid-market Financial Institutions act on their own transactional data without an in-house data science army.",
          },
        ],
      },
      { type: "bullet", rich: [{ text: "Role — ", bold: true }, { text: "Lead Product Designer (UX strategy, interaction, cross-functional alignment, design systems)" }] },
      { type: "bullet", rich: [{ text: "Timeline — ", bold: true }, { text: "8 months · 3 mo discovery/strategy · 3 mo iterative design · 2 mo beta/QA" }] },
      { type: "bullet", rich: [{ text: "Platform — ", bold: true }, { text: "Enterprise desktop, B2B SaaS" }] },
      { type: "bullet", rich: [{ text: "Team — ", bold: true }, { text: "1 GPM · 3 Data Scientists · 6 Front-end Engineers · 1 Lead Designer (me)" }] },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text:
              "Impact: +28% more identified growth opportunities, driving a 14.2% average end-user revenue lift over 6 months — and an 85% drop in campaign launch time.",
          },
        ],
      },
    ],
  },
  {
    id: "landscape",
    kicker: "01 · The landscape",
    title: "Mid-market FIs are data-rich and capability-poor",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Regional banks and credit unions sit on terabytes of cardholder data, but lack the enterprise-grade data science teams to operationalize it. To survive against mega-banks, they need hyper-personalized engagement — fast.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "I led the zero-to-one product design for Portfolio Intelligence: a suite of specialized ML models — Cross-border, SME, EMOB (Early Months on Book), and Hidden SME — wrapped in a unified abstraction layer.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text:
              "The challenge wasn't building four dashboards — it was converging four disparate ML models into one decision-making workflow.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-launchpad.png",
        caption: "Module Launchpad — each ML model wrapped as its own subscription-ready workspace. No shared dashboards, no cross-module confusion.",
      },
    ],
  },
  {
    id: "executive-summary",
    kicker: "02 · Executive summary",
    title: "From passive exploration to a proactive, action-oriented feed",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "By shifting the product architecture from a passive data-exploration tool into a proactive, action-oriented feed, portfolio managers could launch targeted campaigns 85% faster — and drive a verifiable 14.2% lift in cardholder revenue.",
          },
        ],
      },
      { type: "bullet", rich: [{ text: "Aggregated insights from 4 ML modules into one triage feed" }] },
      { type: "bullet", rich: [{ text: "Replaced a 3-week, multi-tool, IT-ticket workflow with a 5-minute linear flow" }] },
      { type: "bullet", rich: [{ text: "Embedded Explainable AI so risk and compliance could audit every recommendation" }] },
      {
        type: "image",
        url: "/case-study/mastercard/launchpad.png",
        caption: "Module Launchpad — each ML module is a self-contained workspace, surfaced as a single triage feed.",
      },
    ],
  },


  {
    id: "discovery",
    kicker: "03 · Discovery",
    title: "The UI wasn't the problem. The architecture was.",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Leadership's brief was to \"modernize the dashboards.\" A heuristic evaluation of the legacy system surfaced the real issue: severe analysis paralysis caused by the underlying architecture, not the visual design.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Research under NDA constraints" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Live client sessions were prohibited under financial privacy regulations. I partnered with a third-party research firm to recruit 12 proxy users — verified Portfolio Managers and Marketing Directors at mid-sized banks — and ran 6 internal stakeholder interviews.",
          },
        ],
      },
    ],
  },
  {
    id: "pain-points",
    kicker: "04 · Pain points",
    title: "Three pains, one root cause",
    blocks: [
      {
        type: "bullet",
        rich: [
          { text: "Siloed data models. ", bold: true },
          { text: "Users hopped between tools to check new-user health vs. business-spend health. Cross-referencing took hours." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "The \"Jira bottleneck.\" ", bold: true },
          { text: "Pulling a specific user list took ~14 days through IT ticketing." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Disjointed execution. ", bold: true },
          { text: "Launching a campaign required logging into a separate third-party marketing tool — breaking the journey entirely." },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text:
              "I know our overall transaction volume dropped, but I don't have the time to cross-reference our EMOB data with our Cross-border data to figure out why.",
          },
        ],
      },
    ],
  },
  {
    id: "jtbd",
    kicker: "05 · JTBD",
    title: "Re-anchoring the team around outcomes, not features",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "To pull the product team out of \"feature thinking,\" I mapped the core Job to Be Done:",
          },
        ],
      },
      { type: "bullet", rich: [{ text: "When ", italic: true }, { text: "I see a dip in portfolio revenue…" }] },
      { type: "bullet", rich: [{ text: "I want ", italic: true }, { text: "to immediately identify which specific user segment is causing it…" }] },
      { type: "bullet", rich: [{ text: "So I can ", italic: true }, { text: "deploy a targeted offer to win back their top-of-wallet spend before the end of the quarter." }] },
      {
        type: "callout",
        emoji: "🎯",
        rich: [
          {
            text:
              "The redefined UX strategy: we're not building an analytics dashboard. We're building an intelligent campaign-deployment engine.",
            bold: true,
          },
        ],
      },
    ],
  },
  {
    id: "constraints",
    kicker: "06 · The messy middle",
    title: "Embedding with data science to map invisible constraints",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "I spent three weeks embedded with the Data Science and Backend Engineering teams to map the constraints that would silently dictate the UI.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Constraint 1 — Schema incompatibility" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "The Hidden SME model (personal cards behaving like businesses) and the EMOB model (first 90 days post-activation) used completely different database schemas. The UI could not force users to understand the backend.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "UX pivot: ", bold: true },
          {
            text:
              "I designed a universal abstraction layer that normalized every insight, regardless of source module, into a single semantic UI format.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Constraint 2 — False positives + compliance" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Cross-border was 92% accurate; Hidden SME launched at 78%. In regulated finance, you can't paper over that.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "UX pivot: ", bold: true },
          {
            text:
              "I authored a UX copy manifesto — the UI always speaks in probabilities (suggests, predicts, opportunity), never absolutes — and required manual overrides plus explicit audit trails on every AI recommendation.",
          },
        ],
      },
    ],
  },
  {
    id: "ia-before-after",
    kicker: "07 · Information Architecture",
    title: "Before vs. after: a 3-week spaghetti flow becomes a 5-minute line",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Legacy journey — ~3 weeks" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Log into BI tool → notice Q3 dip → open separate EMOB dashboard → can't find correlation → draft Jira ticket → wait 14 days in IT backlog → receive raw CSV → pivot in Excel → log into separate email tool → campaign goes live late.",
            italic: true,
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "New journey — under 5 minutes" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Log in → see unified AI alert (\"400 users showing Hidden SME behavior\") → click \"Why\" to validate → review auto-generated \"Business Upgrade\" campaign → adjust budget slider → deploy.",
            italic: true,
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-emob.png",
        caption: "The new triage surface — signals, funnels, top merchants, NBO recommendations and geographic footprint all stitched into one decision view.",
      },
    ],
  },
  {
    id: "ideation",
    kicker: "08 · Ideation",
    title: "Two failed concepts, one architectural pivot",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Iteration 1 — \"Module App Store\" · Failed" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "A dashboard where users clicked into the EMOB tool, the SME tool, etc. Proxy testing showed it reinforced the silos and caused decision fatigue — users didn't know which module to open on any given day.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Iteration 2 — Fully automated deployment · Rejected" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "AI runs campaigns silently, notifying the user after spending. Internal risk advisors killed it immediately — FIs will not hand the marketing budget to an unchecked algorithm.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Final pivot — Human-in-the-loop triage feed" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "The homepage became a unified triage feed. The backend suite scores insights from all modules by potential revenue impact and surfaces them. The human user is the editor and approver, not the analyst.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-audiences.png",
        caption: "Audience Orchestration — the editor's surface. Behavioural cohorts are stacked, prioritised and routed to channels, with the human always one click from approve, save, or activate.",
      },
    ],
  },
  {
    id: "card-anatomy",
    kicker: "09 · Hi-Fi · Pillar 1",
    title: "The anatomy of an Opportunity Card",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Built with Atomic Design principles so it could absorb future ML modules without a redesign.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Module badging — ", bold: true },
          { text: "subtle top-left tag (Source: EMOB, Source: Hidden SME) educating users on origin." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Hook & impact — ", bold: true },
          { text: "strict typography hierarchy: the trend (\"400 personal cards acting like businesses\") and the stakes (\"Est. $120k at risk\")." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Actionable CTA — ", bold: true },
          { text: "primary button launches the campaign workflow inline. No dead-ends, no tab switching." },
        ],
      },
      {
        type: "image",
        url: "/case-study/mastercard/emob.png",
        caption: "EMOB Cards workspace — Opportunity Cards stream live signals with confidence scores, est. impact and inline CTAs.",
      },
    ],

  },
  {
    id: "explainable-ai",
    kicker: "10 · Hi-Fi · Pillar 2",
    title: "\"Progressive Proof\" — Explainable AI in a contextual drawer",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Risk and compliance users won't trust a black box. Clicking an Insight Card never navigates away — it triggers a contextual slide-out drawer that translates the ML logic into plain English.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "EMOB alert — ", bold: true },
          { text: "\"AI trigger: segment dropped spend by 40% in month 2 of card ownership.\"" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Hidden SME alert — ", bold: true },
          { text: "\"AI trigger: 3+ weekly bulk purchases at wholesale merchants.\"" },
        ],
      },
      {
        type: "callout",
        emoji: "🔍",
        rich: [
          {
            text:
              "Every recommendation links to the underlying cohort, model version and assumptions, so risk and compliance can audit any decision without leaving the product.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/mastercard/travel.png",
        caption: "Cross-Border Travel module — an FX-leakage signal explains the cohort, corridor and modelled impact before any action is taken.",
      },
    ],

  },
  {
    id: "simulator",
    kicker: "11 · Hi-Fi · Pillar 3",
    title: "The 1-click Campaign Simulator",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "To replace the legacy 14-day execution loop, I designed a pre-populated deployment modal:",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Smart defaults — ", bold: true },
          { text: "parameters pre-filled from the module's logic." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Interactive ROI simulator — ", bold: true },
          { text: "a budget slider paired with a D3.js line graph that animates the projected 6-month revenue curve against baseline as the user drags." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "One-click deploy — ", bold: true },
          { text: "campaign hands off to execution without leaving the surface." },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-campaigns.png",
        caption: "Campaign Orchestration — briefs auto-generated from audience + signal pairs, ROI tracked against attributable revenue, status visible at a glance.",
      },
    ],
  },
  {
    id: "scalability",
    kicker: "12 · Scalability",
    title: "A design system built for ML modules that don't exist yet",
    blocks: [
      {
        type: "bullet",
        rich: [
          { text: "AI Pattern sub-library — ", bold: true },
          { text: "standardized spacing, tokens and logic for Opportunity Cards. When next year's \"Travel Churn\" module ships, engineers just map the new JSON to the existing component." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Accessibility — ", bold: true },
          { text: "WCAG AA contrast on every data visualization; aria-labels on the progressive disclosure drawers so screen readers can navigate AI insights safely." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "UX Matrix in Jira — ", bold: true },
          { text: "a master table mapping every component state (Empty, Loading, Error, Partial Data) to backend API responses — collapsing engineering ambiguity during build." },
        ],
      },
      {
        type: "image",
        url: "/case-study/global-network/app-signals.png",
        caption: "Signals registry — every active model surfaces its AUC / lift / confidence, so new modules slot into the same trust surface without bespoke UI.",
      },
    ],
  },
  {
    id: "humanising",
    kicker: "12.4 · Humanising the dashboard",
    title: "Built for analysts who live inside the chart",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Research told us analysts rarely look at one visualisation at a time — a single screen forces them to context-switch across stacked charts, legends, and filters. So every chart card carries four lightweight affordances in its top-right corner: zoom, AI insight, alternate chart style, and a tabular view. Same data, four lenses, no page reload.",
          },
        ],
      },
      { type: "image", url: "/case-study/global-network/humanise-default.png", caption: "Default card — four affordances tucked in the top-right of every visualisation." },
      { type: "heading", level: 3, rich: [{ text: "1 — Zoom into a single chart" }] },
      {
        type: "paragraph",
        rich: [
          { text: "Analysts can isolate any chart to a focused modal — the surrounding screen dims so the brain stops triaging and starts reading." },
        ],
      },
      { type: "image", url: "/case-study/global-network/humanise-zoom.png", caption: "Zoom mode — single chart, hover tooltips, no surrounding noise." },
      { type: "heading", level: 3, rich: [{ text: "2 — AI insight on demand" }] },
      {
        type: "paragraph",
        rich: [
          { text: "A one-click generated insight surfaces the peak, average, and variance — plus a recommended next action — without forcing the analyst to write a single query." },
        ],
      },
      { type: "image", url: "/case-study/global-network/humanise-ai-insight.png", caption: "AI insight — totals, peaks, variance and a recommended action." },
      { type: "heading", level: 3, rich: [{ text: "3 — A second chart style for a different read" }] },
      {
        type: "paragraph",
        rich: [
          { text: "Same data, switched from horizontal to vertical bars — useful when comparing magnitude rather than ranking." },
        ],
      },
      { type: "image", url: "/case-study/global-network/humanise-vertical.png", caption: "Alternate chart style — vertical bars for magnitude comparison." },
      { type: "heading", level: 3, rich: [{ text: "4 — Drop into a table view" }] },
      {
        type: "paragraph",
        rich: [
          { text: "When precision matters more than shape, analysts flip the chart into a clean tabular view they can scan, copy, or export." },
        ],
      },
      { type: "image", url: "/case-study/global-network/humanise-table.png", caption: "Tabular view — exact values, ready to copy into a deck or model." },
    ],
  },
  {
    id: "process-user-tests",
    kicker: "12.5 · Process & User-Test Results",
    title: "Process artefacts and unmoderated user-test screens",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "A selection of working artefacts from the design process and unmoderated usability rounds. Watermarked as confidential — shared here only for portfolio review.",
          },
        ],
      },
      { type: "heading", level: 3, rich: [{ text: "Brainstorms & process artefacts" }] },
      { type: "image", url: "/case-study/global-network/4202.jpg", caption: "Brainstorm — confidential" },
      { type: "image", url: "/case-study/global-network/4203.jpg", caption: "Brainstorm — confidential" },
      { type: "image", url: "/case-study/global-network/4204.jpg", caption: "Brainstorm — confidential" },
      { type: "image", url: "/case-study/global-network/4205.jpg", caption: "Brainstorm — confidential" },
      { type: "image", url: "/case-study/global-network/4208.jpg", caption: "Brainstorm — confidential" },
      { type: "heading", level: 3, rich: [{ text: "Unmoderated feedback results" }] },
      { type: "image", url: "/case-study/global-network/4206.jpg", caption: "Feedback result — confidential" },
      { type: "image", url: "/case-study/global-network/4207.jpg", caption: "Feedback result — confidential" },
      { type: "image", url: "/case-study/global-network/4209.jpg", caption: "Feedback result — confidential" },
      { type: "image", url: "/case-study/global-network/4210.jpg", caption: "Feedback result — confidential" },
    ],
  },
  {
    id: "outcomes",
    kicker: "13 · Outcomes",
    title: "Pilot results across 15 mid-sized institutions",
    blocks: [
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text:
              "Evaluated against a strict 6-month data check, baseline vs. new workflow.",
          },
        ],
      },
      { type: "bullet", rich: [{ text: "+28% — ", bold: true }, { text: "more highly-segmented user groups discovered and acted on vs. manual querying." }] },
      { type: "bullet", rich: [{ text: "+14.2% — ", bold: true }, { text: "average increase in targeted portfolio transaction volume." }] },
      { type: "bullet", rich: [{ text: "−85% — ", bold: true }, { text: "time-to-launch: from ~3 weeks to under 5 minutes." }] },
      { type: "bullet", rich: [{ text: "4 → 1 — ", bold: true }, { text: "siloed analytics tools converged into a single triage workflow." }] },
      {
        type: "image",
        url: "/case-study/global-network/app-sme-acquisition.png",
        caption: "SME & Hidden SME module — acquisition funnel, hidden-SME detection table and RM-ready talking points in a single triage view.",
      },
      {
        type: "image",
        url: "/case-study/global-network/app-hidden-engine.png",
        caption: "Hidden SME detection engine — top-scoring retail-profile customers showing business behaviour, scored, risk-tagged and ready for bulk pre-approval.",
      },
      {
        type: "image",
        url: "/case-study/global-network/app-rm-workspace.png",
        caption: "RM Workspace — AI-prioritised leads with auto-generated talking points, so relationship managers walk into every meeting prepared.",
      },
      {
        type: "image",
        url: "/case-study/global-network/app-geography.png",
        caption: "Geography view — hidden-SME density rolled up by metro, so portfolio leads can route hiring and campaign spend with conviction.",
      },
      {
        type: "image",
        url: "/case-study/global-network/app-travel.png",
        caption: "Cross-Border Travel module — same triage language, applied to FX leakage, corridor velocity and lounge utilisation.",
      },
    ],

  },
  {
    id: "reflections",
    kicker: "14 · Reflections",
    title: "What I'd carry into the next AI-for-enterprise build",
    blocks: [
      {
        type: "bullet",
        rich: [
          { text: "Systemic design beats feature design. ", bold: true },
          { text: "The win wasn't a beautiful card — it was an abstraction layer that let disparate ML modules speak one visual language." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "AI UX is about trust, not magic. ", bold: true },
          { text: "Transparency and explainability are the primary drivers of adoption in B2B fintech." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Cross-functional empathy accelerates velocity. ", bold: true },
          { text: "Learning the backend's limits early saved weeks of rework and produced a frictionless engineering handoff." },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text:
              "The real outcome wasn't a prettier chart — it was a portfolio manager closing their laptop knowing exactly which 400 cardholders to win back this week.",
          },
        ],
      },
    ],
  },
  {
    id: "disclaimer",
    kicker: "Disclaimer",
    title: "About this case study",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "For educational purposes only. The data and designs presented here are fictional and do not represent real or actual data.",
            italic: true,
          },
        ],
      },
    ],

  },
];

export const MASTERCARD_PAYLOAD: CasePayload = {
  title:
    "Enabling Financial Institutions to Uncover 28% More Growth Opportunities Using AI-Assisted Portfolio Intelligence",
  cover: null,
  icon: null,
  slides: [
    {
      id: "cover",
      kicker: "Case Study",
      title:
        "Enabling Financial Institutions to Uncover 28% More Growth Opportunities Using AI-Assisted Portfolio Intelligence",
      blocks: [],
    },
    ...slides,
  ],
  fetchedAt: Date.now(),
};
