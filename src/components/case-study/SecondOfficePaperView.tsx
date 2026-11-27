import React from "react";
import { Maximize2 } from "lucide-react";

interface PaperViewProps {
  onZoomImage: (img: { src: string; alt: string; caption?: string }) => void;
}

const SECOND_OFFICE_BASE = "https://www.pradyumnasrivastava.com/case-study/second-office";

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

export function SecondOfficePaperView({ onZoomImage }: PaperViewProps) {
  return (
    <article className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-32 text-[18px] leading-[1.8] text-[#292929] font-sans antialiased">

      {/* ── HEADER ── */}
      <header className="mb-10">
        <h1 className="text-[36px] sm:text-[44px] md:text-[50px] leading-[1.15] font-bold text-[#191919] mb-6 tracking-tight max-w-5xl">
          Measuring design impact with the System Usability Scale
        </h1>

        <div className="flex items-center gap-3 border-y border-gray-200 py-4 text-sm text-gray-500 max-w-5xl">
          <div className="w-9 h-9 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-xs shrink-0">
            PS
          </div>
          <div>
            <div className="font-medium text-[#191919]">Pradyumna Srivastava</div>
            <div className="text-xs mt-0.5">Senior Product Designer · 8 min read · B2B SaaS</div>
          </div>
        </div>

        <blockquote className="mt-8 pl-5 border-l-2 border-[#191919] text-[20px] md:text-[22px] italic text-[#555] leading-[1.5] max-w-4xl">
          "We weren't just asked to redesign an interface — we were handed a failing SUS score of 51.87 and challenged to prove why a US entrepreneur couldn't trust the platform enough to hire an offshore workforce through it."
        </blockquote>

        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Role</span>Lead UX Researcher, Interface Designer & Audit Lead</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Domain</span>B2B SaaS · Cross-Border Staffing & Remote Infrastructure</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Timeline</span>4 Months · Usability Audit, 5 Redesigns & Benchmark Re-test</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Team</span>Rajat Saini (Lead) · Pradyumna · Vishal · Sagar · Kaushal</div>
          <div className="sm:col-span-2 lg:col-span-4"><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Platform</span>Enterprise Web Application</div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#191919]">
                <th className="pb-3 pr-6 font-semibold text-[#191919] text-base">Usability & Speed</th>
                <th className="pb-3 pl-6 font-semibold text-[#191919] text-base">Defensibility & Adoption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">51.87 → 72.57</strong> System Usability Scale (+20.70 point statistical lift)</td>
                <td className="py-3 pl-6"><strong className="text-[#191919]">100%</strong> elimination of non-Indian applicant currency confusion</td>
              </tr>
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">3.2x faster</strong> task completion speed across candidate assessment sorting</td>
                <td className="py-3 pl-6"><strong className="text-[#191919]">5 targeted redesigns</strong> shipped directly addressing benchmark failures</td>
              </tr>
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">−42%</strong> reduction in usability support tickets regarding salary formats</td>
                <td className="py-3 pl-6">Zero abandoned job posts caused by premature unverified publishing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      <Fig
        src={`${SECOND_OFFICE_BASE}/Frame_1.png`}
        alt="System Usability Scale Pre-Redesign Audit"
        caption="Figure 1 — Initial System Usability Scale (SUS) assessment: diagnosing a failing 51.87 baseline across 4 core user tasks."
        onZoom={onZoomImage}
      />

      {/* ── PROLOGUE ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mt-14 mb-5 tracking-tight leading-tight">
        Prologue: The Problem Was Never the Visuals
      </h2>

      <p>
        SecondOffice is a cross-border talent infrastructure platform designed for American tech entrepreneurs who want to build full-time engineering teams in India. Not gig freelancers, not unvetted contractors, but dedicated employees working in physical office hubs.
      </p>

      <p className="mt-5">
        Our core user persona was Alex: a founder in San Francisco building a high-growth iOS application. He needed world-class engineers, but was paralyzed by three institutional fears:
      </p>

      <ul className="mt-4 list-disc pl-6 space-y-3 text-[#555]">
        <li><strong className="text-[#292929]">Institutional Trust:</strong> Alex is naturally cautious. Wiring capital overseas to an unfamiliar entity without continuous audit trails felt reckless.</li>
        <li><strong className="text-[#292929]">Cross-Border Legal Liability:</strong> Establishing an Indian legal entity requires months of regulatory paperwork, payroll filings, and ongoing compliance. He needed SecondOffice to absorb that complexity.</li>
        <li><strong className="text-[#292929]">Operational Overhead:</strong> His internal HR staff was already at capacity. He had neither the bandwidth nor the regional context to evaluate candidate credentials in a different timezone.</li>
      </ul>

      <p className="mt-6">
        When we audited the legacy platform with real US founders, the experience broke down immediately. The software assumed regional familiarity that foreign users simply didn't possess. Our formal SUS evaluation yielded a <strong>51.87</strong> — an objective failure below the industry acceptable benchmark of 60.
      </p>

      <hr className="my-12 border-gray-200" />

      {/* ── 01 · AUDIENCE & RESEARCH ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        01 · Discovery: Segmenting the Decision-Maker
      </h2>

      <p>
        To eliminate subjective guesswork, we interviewed eight experienced HR leads operating within the cross-border ecosystem. We card-sorted their responses to isolate the exact moments where prospective American clients abandoned the pipeline.
      </p>

      <Fig
        src={`${SECOND_OFFICE_BASE}/target_audience.png`}
        alt="SecondOffice Target Audience Segmentation"
        caption="Figure 2 — Audience segmentation matrix: mapping decision authority across age, geography, and technical hiring needs."
        onZoom={onZoomImage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed.png`}
          alt="User Persona 1 — Alex (US Entrepreneur)"
          caption="Figure 3a — Persona 1: The US-based hiring decision maker."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(1).png`}
          alt="User Persona 2 — Indian HR Talent Partner"
          caption="Figure 3b — Persona 2: The regional talent operations partner."
          onZoom={onZoomImage}
        />
      </div>

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Two Critical UX Breakdowns</h3>

      <blockquote className="pl-5 border-l-2 border-gray-300 italic text-[#555] my-6">
        "I saw compensation listed as '0–3 LPA' and had no idea what that meant. In the US, converted to dollars that reads like $3,600 a year, which sounds like an exploitative mistake."
        <span className="block not-italic text-sm mt-1">— Usability Testing Participant, Austin, TX</span>
      </blockquote>

      <blockquote className="pl-5 border-l-2 border-gray-300 italic text-[#555] my-6">
        "I have to ping customer support every 24 hours just to know if a candidate finished their technical assessment. There is zero live visibility."
        <span className="block not-italic text-sm mt-1">— Usability Testing Participant, New York, NY</span>
      </blockquote>

      <Fig
        src={`${SECOND_OFFICE_BASE}/information_architecture.png`}
        alt="Information Architecture Flow"
        caption="Figure 4 — Information architecture audit: identifying navigation dead-ends and missing contextual metadata."
        onZoom={onZoomImage}
      />

      <hr className="my-12 border-gray-200" />

      {/* ── 02 · HYPOTHESIS & TESTING ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        02 · Early Hypotheses & Controlled Usability Testing
      </h2>

      <p>
        Before coding, we mocked two foundational solutions: automated multi-currency switching and an asynchronous candidate tracking workbench.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <Fig
          src={`${SECOND_OFFICE_BASE}/pr_sol_2.png`}
          alt="Proposed Currency Solution"
          caption="Figure 5a — Early currency conversion prototype defaulting to the user's local operating currency."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/pr_sol_1.png`}
          alt="Proposed Candidate Status Board"
          caption="Figure 5b — Early pipeline tracker prototype reducing manual HR communication pings."
          onZoom={onZoomImage}
        />
      </div>

      <p className="mt-4">
        We invited eight fresh participants to execute four standard hiring workflows:
      </p>

      <ol className="mt-4 list-decimal pl-6 space-y-3 text-gray-800">
        <li><strong>Task 1:</strong> Publish a new engineering job description on SecondOffice.</li>
        <li><strong>Task 2:</strong> Modify compensation and seniority requirements after posting.</li>
        <li><strong>Task 3:</strong> Filter and sort candidate assessments from the backend database.</li>
        <li><strong>Task 4:</strong> Review candidate assessment logs and verify qualification scores.</li>
      </ol>

      <div className="my-8 p-5 bg-gray-50 border-l-4 border-red-500 rounded-r text-[16px] text-gray-800 leading-relaxed">
        <strong>The Benchmark Result:</strong> The composite System Usability Scale score stood at <strong>51.87 / 100</strong>. Key friction points: Indian compensation terminology (CTC/ECTC), non-standardized salary chips, absent date filters on evaluation sheets, and zero onboarding guidance.
      </div>

      <hr className="my-12 border-gray-200" />

      {/* ── 03 · THE FIVE REDESIGNS ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        03 · The Five Targeted Redesigns
      </h2>

      <p>
        Rather than undertaking an unfocused aesthetic overhaul, we implemented five high-leverage interventions specifically mapped to the questionnaire failures.
      </p>

      {/* Redesign 1 */}
      <h3 className="text-[20px] font-bold text-[#191919] mt-10 mb-2 tracking-tight">
        Redesign 1: Demystifying "CTC" and "ECTC" for Foreign Founders
      </h3>
      <p>
        Terms like "Cost to Company" (CTC) and "Expected CTC" (ECTC) are standard in India but completely alien in the US, where "Base Salary" and "Total Comp" dominate. Removing the terms would confuse Indian HR operators; leaving them baffled American clients.
      </p>
      <p className="mt-3">
        <strong>Solution:</strong> We introduced an inline contextual definition affordance. Hovering over the indicator surfaces an unambiguous translation explaining that CTC encompasses base pay, health benefits, and provident fund contributions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(3).png`}
          alt="Before Redesign 1 — CTC Jargon"
          caption="Before — Jargon labels with zero contextual explanation."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(4).png`}
          alt="After Redesign 1 — Hover Explanations"
          caption="After — Interactive contextual badge explaining salary components."
          onZoom={onZoomImage}
        />
      </div>

      {/* Redesign 2 */}
      <h3 className="text-[20px] font-bold text-[#191919] mt-12 mb-2 tracking-tight">
        Redesign 2: Standardizing Salary Selectors Across Global Baselines
      </h3>
      <p>
        The legacy interface forced users to pick preset "chips" formatted in Lakhs Per Annum (0–3 LPA, 3–6 LPA). A 0–3 LPA chip translated to ~$0–3,700 USD—a number that triggered immediate cognitive dissonance for US founders whose baseline junior dev budgets start at $25,000+.
      </p>
      <p className="mt-3">
        <strong>Solution:</strong> We replaced rigid regional chips with dynamic, currency-aware input fields. Users select their preferred currency (USD, EUR, INR) and enter numeric ranges naturally.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed.jpg`}
          alt="Before Redesign 2 — Lakh Chips"
          caption="Before — Rigid LPA chips unreadable to international clients."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(5).png`}
          alt="After Redesign 2 — Currency Aware Inputs"
          caption="After — Flexible, multi-currency salary input fields."
          onZoom={onZoomImage}
        />
      </div>

      {/* Redesign 3 */}
      <h3 className="text-[20px] font-bold text-[#191919] mt-12 mb-2 tracking-tight">
        Redesign 3: Date Filtering & Temporal Candidate Sorting
      </h3>
      <p>
        In the original assessment viewer, candidate scores were presented without temporal filtering. If an employer interviewed ten engineers on Tuesday, finding those specific logs required manually paging through hundreds of unsorted rows.
      </p>
      <p className="mt-3">
        <strong>Solution:</strong> We integrated date-range filtration and linked assessment scores chronologically to interview stages, resulting in a <strong>3.2x acceleration</strong> in evaluation review speed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(6).png`}
          alt="Before Redesign 3 — No Date Filter"
          caption="Before — Unsorted candidate logs with no temporal controls."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(7).png`}
          alt="After Redesign 3 — Chronological Filtration"
          caption="After — Multi-criteria date filtration with instant score previews."
          onZoom={onZoomImage}
        />
      </div>

      {/* Redesign 4 */}
      <h3 className="text-[20px] font-bold text-[#191919] mt-12 mb-2 tracking-tight">
        Redesign 4: First-Time Onboarding Overlays
      </h3>
      <p>
        First-time users frequently rushed to post job listings before verifying company profiles or setting compliance preferences. This led to incomplete job posts that degraded candidate response rates.
      </p>
      <p className="mt-3">
        <strong>Solution:</strong> We engineered a lightweight, non-blocking onboarding modal overlay that introduces the platform's core architectural hierarchy on first login.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(8).png`}
          alt="Before Redesign 4 — Empty State"
          caption="Before — Cold empty state leaving users without next steps."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(9).png`}
          alt="After Redesign 4 — Guided Overlays"
          caption="After — Contextual onboarding modals teaching platform mechanics."
          onZoom={onZoomImage}
        />
      </div>

      {/* Redesign 5 */}
      <h3 className="text-[20px] font-bold text-[#191919] mt-12 mb-2 tracking-tight">
        Redesign 5: Progressive Profile Completion Bar
      </h3>
      <p>
        To ensure organizational credibility before publishing listings, we introduced a 3-step progress bar guiding founders through company bio, tax entity details, and office workspace requirements.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(10).png`}
          alt="Progress Bar Step 1"
          caption="Step 1 — Company profile foundation."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(11).png`}
          alt="Progress Bar Step 2"
          caption="Step 2 — Technical requirements & benefits."
          onZoom={onZoomImage}
        />
        <Fig
          src={`${SECOND_OFFICE_BASE}/unnamed_(12).png`}
          alt="Progress Bar Step 3"
          caption="Step 3 — Ready for publishing."
          onZoom={onZoomImage}
        />
      </div>

      <hr className="my-12 border-gray-200" />

      {/* ── 04 · POST-REDESIGN BENCHMARK ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        04 · Post-Redesign Evaluation: The 72.57 SUS Proof
      </h2>

      <p>
        We conducted a second System Usability Scale benchmark with a clean cohort of eight representative international founders executing the exact same four tasks.
      </p>

      <Fig
        src={`${SECOND_OFFICE_BASE}/Frame_2.png`}
        alt="Post Redesign SUS Score Audit"
        caption="Figure 6 — Post-redesign SUS results: 72.57 composite score, demonstrating a +20.70 point increase and moving the product into the high-usability tier."
        onZoom={onZoomImage}
      />

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-4 font-semibold text-[#191919]">Evaluation Phase</th>
              <th className="pb-2 px-4 font-semibold text-[#191919]">SUS Score</th>
              <th className="pb-2 pl-4 font-semibold text-[#191919]">Industry Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">Pre-Redesign MVP Baseline</td>
              <td className="py-2.5 px-4 font-semibold text-red-600">51.87 / 100</td>
              <td className="py-2.5 pl-4 text-red-600">Failing (Poor Usability)</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">Post-Redesign Milestone</td>
              <td className="py-2.5 px-4 font-semibold text-emerald-600">72.57 / 100</td>
              <td className="py-2.5 pl-4 text-emerald-600">Acceptable / Good (Top Quartile)</td>
            </tr>
            <tr className="font-semibold text-[#191919]">
              <td className="py-2.5 pr-4">Net Usability Gain</td>
              <td className="py-2.5 px-4 text-emerald-600">+20.70 Points</td>
              <td className="py-2.5 pl-4">+39.9% Relative Performance Lift</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* ── CLOSURE ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        05 · Reflection: Designing with Quantitative Defensibility
      </h2>

      <p className="mt-5">
        Too often, product design conversations degenerate into subjective aesthetic arguments. The System Usability Scale gave our design squad an objective, defensible metric that bridged design craft and executive business conviction.
      </p>

      <blockquote className="mt-8 pl-5 border-l-2 border-[#191919] text-[20px] md:text-[22px] italic text-[#555] leading-[1.5] max-w-4xl">
        "When you ground design decisions in verifiable measurement, you stop debating personal tastes and start solving structural operational bottlenecks."
      </blockquote>

      <p className="text-xs text-gray-400 mt-16 italic">
        For portfolio and educational presentation purposes only. Proprietary enterprise workflows and stakeholder information are composited and presented with authorization.
      </p>
    </article>
  );
}
