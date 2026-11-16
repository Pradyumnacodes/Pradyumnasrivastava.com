import React, { useState } from "react";
import { Maximize2, X } from "lucide-react";

interface PaperViewProps {
  onZoomImage: (img: { src: string; alt: string; caption?: string }) => void;
}

function Fig({
  src,
  alt,
  caption,
  onZoom,
}: {
  src: string;
  alt: string;
  caption?: string;
  onZoom: (img: { src: string; alt: string; caption?: string }) => void;
}) {
  return (
    <figure className="my-10">
      <div
        className="relative group cursor-zoom-in overflow-hidden rounded-md border border-gray-200 bg-gray-50"
        onClick={() => onZoom({ src, alt, caption })}
      >
        <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3 h-3" />
          Zoom
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PaperView({ onZoomImage }: PaperViewProps) {
  return (
    <article className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-32 text-[18px] leading-[1.8] text-[#292929] font-sans antialiased">

      {/* ── HEADER ── */}
      <header className="mb-10">
        <h1 className="text-[36px] sm:text-[44px] md:text-[50px] leading-[1.15] font-bold text-[#191919] mb-6 tracking-tight max-w-5xl">
          Enabling FIs to uncover 28% more growth opportunities
        </h1>

        <div className="flex items-center gap-3 border-y border-gray-200 py-4 text-sm text-gray-500 max-w-5xl">
          <div className="w-9 h-9 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-xs shrink-0">
            PS
          </div>
          <div>
            <div className="font-medium text-[#191919]">Pradyumna Srivastava</div>
            <div className="text-xs mt-0.5">Lead Product Designer · 10 min read · Oct 2024</div>
          </div>
        </div>

        <blockquote className="mt-8 pl-5 border-l-2 border-[#191919] text-[20px] md:text-[22px] italic text-[#555] leading-[1.5] max-w-4xl">
          "Leadership asked me to modernize their dashboards. What I actually found was a three-week game of human telephone—costing mid-market banks millions in invisible revenue leaks."
        </blockquote>

        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Role</span>Lead Product Designer (Sole Designer)</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Domain</span>Global Card Network & Partner Banks</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Timeline</span>8 Months — Discovery to Beta & QA</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Squad</span>1 GPM · 3 Data Scientists · 6 Engineers · 1 Designer</div>
          <div className="sm:col-span-2 lg:col-span-4"><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Platform</span>Enterprise Desktop B2B SaaS</div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#191919]">
                <th className="pb-3 pr-6 font-semibold text-[#191919] text-base">Growth & Velocity</th>
                <th className="pb-3 pl-6 font-semibold text-[#191919] text-base">Governance & Guardrails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr><td className="py-3 pr-6"><strong className="text-[#191919]">+28%</strong> more growth opportunities uncovered vs. manual SQL/BI querying</td><td className="py-3 pl-6"><strong className="text-[#191919]">0%</strong> POC opt-out rate across the 6-month live enterprise pilot</td></tr>
              <tr><td className="py-3 pr-6"><strong className="text-[#191919]">+14.2%</strong> average portfolio revenue lift across targeted segments</td><td className="py-3 pl-6"><strong className="text-[#191919]">100%</strong> first-pass compliance approval on all deployed campaigns</td></tr>
              <tr><td className="py-3 pr-6"><strong className="text-[#191919]">−85%</strong> campaign launch time (from ~3 weeks to under 5 minutes)</td><td className="py-3 pl-6">Active false-positive feedback loop retraining the 78% Hidden SME model</td></tr>
              <tr><td className="py-3 pr-6"><strong className="text-[#191919]">4 → 1</strong> workflow convergence — siloed ML modules into one triage feed</td><td className="py-3 pl-6">Zero cross-module offer collisions via cardholder frequency caps</td></tr>
            </tbody>
          </table>
        </div>
      </header>

      <Fig
        src="/case-study/issuer-portfolio/portfolio-explorer.webp"
        alt="Mastercard Portfolio Optimizer"
        caption="Mastercard Portfolio Optimizer — the self-serve analytical workbench unifying issuing intelligence and behavioral segmentation."
        onZoom={onZoomImage}
      />

      {/* ── PROLOGUE ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mt-14 mb-5 tracking-tight leading-tight">
        Prologue: The Brief Was a Mirage
      </h2>

      <p>When I joined the product team as its sole designer, the mandate sounded deceptively straightforward: take an existing internal consulting service run by Subject Matter Experts (SMEs) and productize it into a self-serve B2B analytics platform.</p>

      <p className="mt-5">On paper, the business operated at the center of a <strong>four-party card network</strong>, generating revenue across three distinct touchpoints — authorization and switching, clearing and settlement, and cross-border FX/value-added services:</p>

      <ul className="mt-4 list-disc pl-6 space-y-2 text-[#555]">
        <li><strong className="text-[#292929]">Issuers:</strong> Financial institutions putting credit and debit cards into the hands of consumers, SMEs, and corporations.</li>
        <li><strong className="text-[#292929]">Acquirers:</strong> Financial institutions and processors onboarding merchants to accept card payments.</li>
      </ul>

      <p className="mt-5">Behind the scenes, our internal consultants were manually pulling transaction logs, assembling bespoke slide decks on quarterly cycles, and advising institutions on where their portfolios were bleeding margin. Within two weeks of sitting alongside those consultants and auditing their historical decks, I realized <strong>the UI wasn't the problem — the operating model was.</strong></p>

      <hr className="my-12 border-gray-200" />

      {/* ── 01 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        01 · The Landscape & Discovery Under NDA
      </h2>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">The "Data-Rich, Capability-Poor" Trap</h3>

      <p>Designing for a global card network meant accommodating an extreme spectrum of institutional scale — from <strong>$2M regional SMEs</strong> to <strong>$10B tier-one financial institutions</strong>. While mega-banks employ armies of quantitative analysts, mid-market regional banks sit on terabytes of transactional data without the data science infrastructure to operationalize it.</p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Research Behind Closed Financial Doors</h3>

      <p>Financial privacy laws and strict NDAs prohibited direct observational sessions on live client accounts. I triangulated from two directions:</p>

      <ol className="mt-4 list-decimal pl-6 space-y-3">
        <li><strong>Artifact Reverse-Engineering & Internal Shadowing:</strong> I audited dozens of historical SME consulting reports to reverse-engineer how analysts structured cohorts and framed P&L stories, paired with 6 deep-dive interviews across internal consultants, product leads, and compliance officers.</li>
        <li><strong>Proxy Field Research:</strong> I partnered with a third-party research firm to recruit 12 verified proxy users — real Portfolio Managers and Marketing Directors at mid-sized banks. We probed four questions: Would institutions pay for self-serve intelligence? How did analytics fit into their weekly rhythm? Which roles needed macro summaries vs. raw cohort slicing? How frequently would they engage?</li>
      </ol>

      <Fig
        src="/case-study/issuer-portfolio/user-personas-research.jpg"
        alt="User Personas & Target Demographics"
        caption="Figure 1 — User personas & target demographic profiles audited across mid-market banking tiers."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Four Symptoms, One Broken Architecture</h3>

      <blockquote className="pl-5 border-l-2 border-gray-300 italic text-[#555] my-6">
        "I know our overall transaction volume dropped this quarter, but I don't have the time — or the access — to cross-reference our new cardholders against our cross-border spenders to figure out why."
        <span className="block not-italic text-sm mt-1">— Portfolio Manager, Mid-Sized Regional Bank</span>
      </blockquote>

      <ul className="mt-4 list-disc pl-6 space-y-3">
        <li><strong>The 14-Day Jira & SME Bottleneck:</strong> Static consulting decks offered zero self-serve filtering. Any follow-up question forced a Portfolio Manager to file a ticket. Between SME queues and IT data-pull backlogs, pulling a targeted customer list took ~14 days — stretching a single campaign cycle to nearly three weeks.</li>
        <li><strong>Siloed Models & Disjointed Execution:</strong> Insights lived in disconnected tools. A manager had to inspect one system for new-account health, export a CSV, pivot it in Excel, and log into a separate marketing platform to launch an offer. By the time a campaign went live, the behavioral window had closed.</li>
        <li><strong>Analysis Paralysis at Scale:</strong> Showing multidimensional spend data without hierarchy overwhelmed mid-market operators who lacked dedicated analysts.</li>
        <li><strong>Security, Fraud & Consent Friction:</strong> Passing raw cardholder files back and forth manually created severe data-leakage exposure, burying every engagement under formal legal consents and compliance reviews.</li>
      </ul>

      <Fig
        src="/case-study/issuer-portfolio/critique-figma-board.jpg"
        alt="Critique Session Figma Board"
        caption="Figure 2 — Internal Figma critique board mapping friction across consulting deck workflows."
        onZoom={onZoomImage}
      />

      <hr className="my-12 border-gray-200" />

      {/* ── 02 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        02 · The Strategic Reframe: Killing the "Dashboard"
      </h2>

      <p>Every instinct in enterprise software pushes teams toward building a denser dashboard — more filters, more charts, bigger tables. Watching Portfolio Managers struggle proved that giving them <em>more data to explore</em> would only deepen their analysis paralysis.</p>

      <p className="mt-5">To pull our cross-functional squad out of feature-checklist thinking, I anchored the roadmap around a single <strong>Job to Be Done</strong>:</p>

      <blockquote className="pl-5 border-l-2 border-[#191919] my-6 font-medium text-[#191919]">
        <strong>When</strong> I see a dip in portfolio revenue,<br />
        <strong>I want to</strong> immediately identify which specific cardholder or merchant segment is driving it,<br />
        <strong>So I can</strong> deploy a targeted offer to win back their spend before the end of the quarter.
      </blockquote>

      <p>That single shift changed everything. <strong>We were no longer designing a passive analytics dashboard — we were designing an intelligent campaign-deployment engine.</strong></p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Role-Based Progressive Disclosure</h3>

      <p>Because multidimensional data cannot be dumped onto every user at once, I structured the Information Architecture around progressive disclosure tuned to four institutional personas:</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-4 font-semibold text-[#191919]">Persona</th>
              <th className="pb-2 px-4 font-semibold text-[#191919]">Workspace</th>
              <th className="pb-2 pl-4 font-semibold text-[#191919]">Analytical Depth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Head of Cards / Executive</td><td className="py-2.5 px-4">Executive Summary & P&L Overview</td><td className="py-2.5 pl-4">Macro alerts, no clutter</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Product & Marketing Managers</td><td className="py-2.5 px-4">Recommendations Triage & Audience Templates</td><td className="py-2.5 pl-4">AI signals + 1-click deploy</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Data Analysts</td><td className="py-2.5 px-4">Portfolio & Merchant Explorer</td><td className="py-2.5 pl-4">Granular multi-axis filtering</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Relationship Managers</td><td className="py-2.5 px-4">RM Lead & Merchant Threat Workspace</td><td className="py-2.5 pl-4">AI-ranked leads + talking points</td></tr>
          </tbody>
        </table>
      </div>

      <Fig
        src="/case-study/issuer-portfolio/information-architecture.jpg"
        alt="Information Architecture & Progressive Disclosure System Map"
        caption="Figure 3 — Information Architecture & Role-Based Progressive Disclosure System Map."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Collapsing 3 Weeks into 5 Minutes</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-4 font-semibold text-[#191919]">Phase</th>
              <th className="pb-2 px-4 font-semibold text-[#191919]">Legacy (~3 Weeks)</th>
              <th className="pb-2 pl-4 font-semibold text-[#191919]">Redesigned (Under 5 Minutes)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr><td className="py-2.5 pr-4 font-semibold text-[#191919]">1. Detect</td><td className="py-2.5 px-4">Log into BI tool; spot unexplained Q3 volume dip.</td><td className="py-2.5 pl-4">Log in; see a prioritized AI alert: "Cards that spend like small businesses."</td></tr>
            <tr><td className="py-2.5 pr-4 font-semibold text-[#191919]">2. Diagnose</td><td className="py-2.5 px-4">Open EMOB dashboard; fail to correlate; file Jira ticket; wait 14 days for IT.</td><td className="py-2.5 pl-4">Click "Why" — inspect cohort triggers, confidence tiers, and audit provenance inline.</td></tr>
            <tr><td className="py-2.5 pr-4 font-semibold text-[#191919]">3. Execute</td><td className="py-2.5 px-4">Receive raw CSV; pivot in Excel; log into external email tool; deploy late.</td><td className="py-2.5 pl-4">Adjust ROI slider; order audience in one click with compliance stamp.</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* ── 03 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        03 · Three Weeks in the Backend Trenches
      </h2>

      <p>Great enterprise UX rarely happens in Figma alone — it happens in the friction between design ambition and backend reality. Before locking high-fidelity screens, I spent three weeks embedded with our Data Science and Backend Engineering teams to map the invisible technical constraints that would dictate the interface.</p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">1. Universal Abstraction Layer</h3>

      <p>Our ML models spoke completely different languages. The <strong>Hidden SME</strong> model and the <strong>EMOB</strong> model relied on incompatible database schemas. Exposing that fragmentation in the UI would have forced bankers to understand backend data architecture.</p>

      <p className="mt-4">I architected a <strong>Universal Abstraction Layer</strong> — a normalized semantic UI grammar that translated every insight into four consistent primitives: <strong>Cohort Signal, Behavioral Evidence, Confidence Score, and Quantified P&L Impact.</strong></p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">2. The 92% vs. 78% Accuracy Gap</h3>

      <p>In regulated banking, an overconfident recommendation is a compliance liability. Our Cross-Border Travel model launched at <strong>92% accuracy</strong>; Hidden SME at <strong>78%</strong>. You cannot paper over a 14-point confidence gap with slick visuals.</p>

      <p className="mt-4">I authored a <strong>UX Copy Manifesto</strong> establishing strict linguistic guardrails — the UI always speaks in calibrated probabilities, not false absolutes:</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-3 font-semibold text-[#191919]">Context</th>
              <th className="pb-2 px-3 font-semibold text-red-700">Rejected</th>
              <th className="pb-2 pl-3 font-semibold text-green-700">Shipped</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr>
              <td className="py-2.5 pr-3 font-medium text-[#191919]">Hidden SME Cohort</td>
              <td className="py-2.5 px-3 text-red-600 font-mono text-xs">"These retail users are running businesses on personal cards."</td>
              <td className="py-2.5 pl-3 text-green-700 font-mono text-xs">"Consumer cards highly likely to spend like small businesses."</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-medium text-[#191919]">EMOB Churn Alert</td>
              <td className="py-2.5 px-3 text-red-600 font-mono text-xs">"These 1,200 users will churn in Month 6."</td>
              <td className="py-2.5 pl-3 text-green-700 font-mono text-xs">"1,200 accounts show early spend decay consistent with Month-6 churn."</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-medium text-[#191919]">ROI Projection</td>
              <td className="py-2.5 px-3 text-red-600 font-mono text-xs">"This offer will generate $120K."</td>
              <td className="py-2.5 pl-3 text-green-700 font-mono text-xs">"Modeled 6-month lift: $95K–$135K (historical cohort response)."</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">3. Data-Privacy & Compliance Boundaries</h3>

      <p>Working side by side with data scientists and compliance officers, I mapped strict aggregation boundaries — determining exactly which metrics could be rendered as granular visualizations versus which had to be abstracted into privacy-safe AI recommendations.</p>

      <hr className="my-12 border-gray-200" />

      {/* ── 04 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        04 · Failing on Purpose, Trade-Offs & Studio Gates
      </h2>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Two Rejected Architectures, One Breakthrough</h3>

      <ol className="list-decimal pl-6 space-y-4">
        <li><strong>Concept A — The "Module App Store" (Failed):</strong> A launcher grid for separate EMOB, SME, and Cross-Border workspaces. Proxy testing killed it immediately — the grid digitized existing silos. Users experienced decision fatigue, unsure which tile answered their revenue dip.</li>
        <li><strong>Concept B — Zero-Touch Autonomous AI (Rejected):</strong> AI automatically triggering campaigns and notifying managers afterward. Internal bank risk advisors vetoed it immediately — no regulated institution will hand marketing budgets to an unchecked algorithm.</li>
        <li><strong>The Breakthrough — Human-in-the-Loop Triage Feed:</strong> We inverted the architecture. The ML engine scores signals across all models by potential dollar impact, streaming them into a single prioritized feed. <strong>The AI does the heavy lifting. The human remains editor, auditor, and approver.</strong></li>
      </ol>

      {/* Wireframes */}
      <Fig
        src="/case-study/issuer-portfolio/wireframes-user-journeys.jpg"
        alt="Wireframes & User Journey Canvas"
        caption="Figure 4 — End-to-end user journeys, wireframe iterations, and triage state flows in Figma."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Two-Round Test-to-Fail Studio Gauntlet</h3>

      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Round 1 (Missed Threshold):</strong> Surfaced confusion around multi-module alert priority and skepticism about AI projection origins.</li>
        <li><strong>Round 2 (Threshold Surpassed):</strong> After restructuring alert hierarchy and introducing inline proof drawers, the design cleared the studio validation threshold.</li>
      </ul>

      {/* DQS + validation figures */}
      <Fig
        src="/case-study/issuer-portfolio/design-quality-score-93.jpg"
        alt="Design Quality Score 93/100"
        caption="Figure 5 — Design Quality Score (DQS) Review Board: 93/100 benchmark approval."
        onZoom={onZoomImage}
      />

      <div className="grid grid-cols-2 gap-5">
        <Fig
          src="/case-study/issuer-portfolio/user-emotions-study.jpg"
          alt="User Emotions Study"
          caption="Figure 6 — User emotions: UK/EU 94, US 93."
          onZoom={onZoomImage}
        />
        <Fig
          src="/case-study/issuer-portfolio/effectiveness-study.jpg"
          alt="Task Effectiveness Study"
          caption="Figure 7 — Task effectiveness: UK/EU 94, US 92."
          onZoom={onZoomImage}
        />
      </div>

      <Fig
        src="/case-study/issuer-portfolio/experience-scale-metrics.jpg"
        alt="Experience Scale Metrics"
        caption="Figure 8 — Experience Scale: Emotion 92, Ease 59, Effectiveness 99."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">What We Killed</h3>

      <ul className="list-disc pl-6 space-y-3">
        <li><strong>Pushed back on bespoke white-label dashboards:</strong> Enterprise Sales requested custom layouts for tier-one accounts. I fought to keep the PO Recommendations triage standardized, channeling customization needs into Portfolio Explorer's saved filter views.</li>
        <li><strong>Killed raw AUC model scores on Opportunity Cards:</strong> Data Scientists wanted to display statistical accuracy scores (<code className="font-mono text-sm bg-gray-100 px-1 rounded">AUC: 0.81</code>) directly on the feed. Proxy testing showed Portfolio Managers froze at ML jargon — moved model metadata into the progressive proof drawer.</li>
      </ul>

      <hr className="my-12 border-gray-200" />

      {/* ── 05 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        05 · Product Architecture & High-Craft Execution
      </h2>

      <p>During active engineering build, real-world API constraints and data anomalies surfaced continuously. I prioritized getting the core UX mechanics and decision workflows airtight first, resisting premature visual polish until workflows were validated.</p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">1. Executive Summary & Action-Based Segmentation</h3>

      <p>To eliminate cognitive overload for leadership, the executive landing view organizes the active cardholder base (<code className="font-mono text-sm bg-gray-100 px-1 rounded">101,024</code> cardholders) into three clear strategic tiers — Best cardholders, Low active/Lapsed, and Cardholders that can improve — each paired with exact cohort counts and potential growth opportunity.</p>

      <Fig
        src="/case-study/issuer-portfolio/executive-recommendations.webp"
        alt="Executive Summary & PO Recommendations UI"
        caption="Figure 9 — Executive Summary & PO Recommendations triage feed grouping 101,024 cardholders into action clusters."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">2. "Progressive Proof" — Explainable AI in Context</h3>

      <p>Risk and compliance officers will never approve a black box. Clicking any recommendation card surfaces plain-English behavioral definitions, visual evidence comparing the selected cohort against the rest of the portfolio, and direct <strong>Order audience</strong> and <strong>Recommendation details</strong> triggers.</p>

      <p className="mt-4">To account for the <strong>22% false-positive margin</strong> in the Hidden SME model, analysts can inspect sampled accounts inside the audit drawer and uncheck misclassified edge cases — immediately recalculating cohort size and logging structured feedback to Data Science for model retraining.</p>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">3. Multi-Cohort Audience Templates & 1-Click Campaign Simulator</h3>

      <p>Marketing and portfolio managers can browse pre-built behavioral templates — checking multiple cohorts simultaneously while a sticky sidebar dynamically tallies unique cardholders, total portfolio share, and combined growth opportunity.</p>

      <Fig
        src="/case-study/issuer-portfolio/audience-templates.webp"
        alt="Audience Templates & Segment Selector UI"
        caption="Figure 10 — Audience Templates with multi-cohort selection (33,553 cardholders) and one-click ordering."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">4. Deep-Dive Portfolio Explorer & Analyst Ergonomics</h3>

      <p>For hands-on analysts, Portfolio Explorer provides multi-axis filtering comparing selected cohort benchmarks against portfolio baselines — complete with instant CSV/PDF export and four lightweight micro-affordances per visualization card: Focus Zoom, AI Insight on Demand, Alternate Chart Style, and Instant Table View.</p>

      <Fig
        src="/case-study/issuer-portfolio/portfolio-explorer.webp"
        alt="Portfolio Explorer Analytical Workbench"
        caption="Figure 11 — Portfolio Explorer analytical workbench with multi-axis filtering and instant export affordances."
        onZoom={onZoomImage}
      />

      <hr className="my-12 border-gray-200" />

      {/* ── 06 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        06 · Commercialization, PLG Packaging & Consent-Tiered Governance
      </h2>

      <p>We launched our live Proof of Concept with one to two anchor client institutions. Over a rigorous six-month pilot, neither client opted out — converting directly into enterprise customers. We expanded to a <strong>five-module commercial suite</strong>:</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-4 font-semibold text-[#191919]">Module</th>
              <th className="pb-2 px-4 font-semibold text-[#191919]">Scope</th>
              <th className="pb-2 pl-4 font-semibold text-[#191919]">Core Lever</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Portfolio Optimizer (Hub)</td><td className="py-2.5 px-4">Full credit & debit card lifecycle</td><td className="py-2.5 pl-4">Holistic P&L diagnostics and cross-module triage</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">SME Optimizer</td><td className="py-2.5 px-4">Dedicated SME cardholders</td><td className="py-2.5 pl-4">Benchmarks for commercial purchasing cycles</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Hidden SME</td><td className="py-2.5 px-4">Retail cards showing business spend</td><td className="py-2.5 pl-4">Flags personal cardholders for SME tier upgrade</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">Travel & Cross-Border</td><td className="py-2.5 px-4">International corridors & FX spend</td><td className="py-2.5 pl-4">Pinpoints FX leakage and corridor velocity shifts</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#191919]">EMOB (Early Month on Book)</td><td className="py-2.5 px-4">First 12 months post-activation</td><td className="py-2.5 pl-4">Predicts 6-month churn risk; prescribes early retention plays</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6">We solved modular pricing friction by creating an <strong>Essentials P&L view</strong> relied on by 95% of users — with locked modules surfacing sampled preview hooks so institutions could cherry-pick à la carte without buying a full suite they didn't need.</p>

      <hr className="my-12 border-gray-200" />

      {/* ── 07 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        07 · Pilot Outcomes & What Stays With Me
      </h2>

      <p>Evaluated across 15 mid-sized financial institutions over a strict 6-month baseline-versus-post-launch benchmark:</p>

      <ul className="mt-4 list-disc pl-6 space-y-2">
        <li><strong>+28%</strong> more highly segmented user groups discovered and acted upon vs. manual querying</li>
        <li><strong>+14.2%</strong> average increase in targeted portfolio transaction volume over six months</li>
        <li><strong>−85%</strong> reduction in time-to-launch — from ~3 weeks to under 5 minutes</li>
        <li><strong>4 → 1</strong> convergence of disconnected analytics tools into a single auditable decision surface</li>
      </ul>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Three Lessons I Carry Forward</h3>

      <ol className="list-decimal pl-6 space-y-4">
        <li><strong>Systemic design beats feature design.</strong> The defining breakthrough wasn't a polished card — it was the Universal Abstraction Layer that taught four incompatible ML models to speak a single visual and behavioral language.</li>
        <li><strong>In enterprise AI, trust is the UX.</strong> In regulated finance, adoption isn't driven by AI magic. It's earned through calibrated probabilistic copy, explainable logic drawers, and human-in-the-loop governance.</li>
        <li><strong>The best design happens in the backend trenches.</strong> Embedding with Data Science early surfaced schema and accuracy constraints before hi-fi design began, preventing weeks of downstream rework.</li>
      </ol>

      <blockquote className="pl-5 border-l-2 border-[#191919] mt-10 font-semibold text-[#191919] text-[20px] md:text-[22px] leading-[1.4] tracking-tight">
        "Real enterprise design isn't about prettier charts—it's about operational conviction. We took three weeks of institutional friction and collapsed it into five minutes of decisive, auditable execution."
      </blockquote>

      <p className="mt-10 text-sm text-gray-400 italic border-t border-gray-200 pt-6">
        For educational and portfolio case study purposes only. Specific institutional figures, datasets, and interface examples are composited and anonymized to protect proprietary client confidentiality.
      </p>

    </article>
  );
}
