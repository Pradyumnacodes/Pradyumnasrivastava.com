import React from "react";
import { Maximize2 } from "lucide-react";

interface PaperViewProps {
  onZoomImage: (img: { src: string; alt: string; caption?: string }) => void;
}

const FINPY_BASE = "https://www.pradyumnasrivastava.com/case-study/finpy";

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

export function FinpyPaperView({ onZoomImage }: PaperViewProps) {
  return (
    <article className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-32 text-[18px] leading-[1.8] text-[#292929] font-sans antialiased">

      {/* ── HEADER ── */}
      <header className="mb-10">
        <h1 className="text-[36px] sm:text-[44px] md:text-[50px] leading-[1.15] font-bold text-[#191919] mb-6 tracking-tight max-w-5xl">
          From stigma to empowerment — the evolution of loans through FinPy
        </h1>

        <div className="flex items-center gap-3 border-y border-gray-200 py-4 text-sm text-gray-500 max-w-5xl">
          <div className="w-9 h-9 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-xs shrink-0">
            PS
          </div>
          <div>
            <div className="font-medium text-[#191919]">Pradyumna Srivastava</div>
            <div className="text-xs mt-0.5">Product Designer · 9 min read · Tier-2 / Tier-3 India</div>
          </div>
        </div>

        <blockquote className="mt-8 pl-5 border-l-2 border-[#191919] text-[20px] md:text-[22px] italic text-[#555] leading-[1.5] max-w-4xl">
          "I had only one intention in mind when I joined FinPy — to reach the needful and whisper in their ears: 'not all debt is bad debt.'"
        </blockquote>

        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Role</span>Lead UX Researcher & Product Designer</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Domain</span>Consumer Fintech · Personal Credit & Micro-Loans</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Timeline</span>6 Months · Field Research to Post-Launch Optimization</div>
          <div><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Squad</span>1 PM · 2 Researchers · 5 Engineers · 1 Designer</div>
          <div className="sm:col-span-2 lg:col-span-4"><span className="font-semibold text-[#191919] block text-xs uppercase tracking-wider text-gray-500 mb-0.5">Platform</span>Native Mobile (Android)</div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#191919]">
                <th className="pb-3 pr-6 font-semibold text-[#191919] text-base">Adoption & Conversion</th>
                <th className="pb-3 pl-6 font-semibold text-[#191919] text-base">Financial Wellness & Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">+33%</strong> monthly users selecting sustainable 12-month EMIs</td>
                <td className="py-3 pl-6"><strong className="text-[#191919]">276 / 320</strong> users accepted performance-based credit line upgrades</td>
              </tr>
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">+45%</strong> increase in valid salary bank statement uploads via positive friction</td>
                <td className="py-3 pl-6"><strong className="text-[#191919]">167</strong> users organically shared repayment milestones with family and peers</td>
              </tr>
              <tr>
                <td className="py-3 pr-6"><strong className="text-[#191919]">34 users</strong> proactively redirected away from unsustainable short tenures</td>
                <td className="py-3 pl-6"><strong className="text-[#191919]">16</strong> unprompted 5-star Google Play Store ratings driven by repayment celebrations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      <Fig
        src={`${FINPY_BASE}/Section_852773771_(1)-min.png`}
        alt="FinPy Target Demographic Overview"
        caption="Figure 1 — Target demographic mapping: bridging young working professionals in Tier-2 and Tier-3 Indian cities with transparent micro-credit."
        onZoom={onZoomImage}
      />

      {/* ── PROLOGUE ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mt-14 mb-5 tracking-tight leading-tight">
        Prologue: A Product Built on an Uncomfortable Truth
      </h2>

      <p>
        In India, borrowing money carries a quiet, persistent shame. For millions of young professionals navigating rising urban rents, sudden medical expenses, and the gap between entry-level paychecks and family commitments, the word <em>loan</em> conjures up images of institutional intimidation and personal failure.
      </p>

      <p className="mt-5">
        It is not my intention to pretend that a few aesthetic UI adjustments suddenly surged adoption. Instead, this case study documents the <strong>three critical behavioral bottlenecks</strong> uncovered through real-time customer experience data after launch, and how confronting our own flawed assumptions about borrower intent unlocked sustainable adoption.
      </p>

      <hr className="my-12 border-gray-200" />

      {/* ── 01 · DISCOVERY ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        01 · Discovery: Who We Were Actually Designing For
      </h2>

      <p>
        Before sketching user flows, we immersed ourselves in the lived realities of borrowers across non-metro regions. Our core audience emerged clearly: <strong>young professionals aged 25 to 40</strong> with modest, verifiable monthly incomes. They valued speed and discretion above all else. Because traditional credit bureaus frequently penalize thin-file borrowers, conventional banks treated them as credit-invisible.
      </p>

      <Fig
        src={`${FINPY_BASE}/Group_852773780.png`}
        alt="FinPy User Personas"
        caption="Figure 2 — Behavioral user personas synthesised from ethnographic field interviews and remote screen-sharing sessions."
        onZoom={onZoomImage}
      />

      <h3 className="text-[20px] font-bold text-[#191919] mt-8 mb-4 tracking-tight">Research That Met People Where They Were</h3>

      <p>
        We conducted both structured remote interviews and face-to-face field conversations across Tier-2 and Tier-3 hubs. In financial research, body language is data: the awkward pause when discussing bank balances, the hesitation before handing over a phone, the reluctance to admit that an EMI was missed.
      </p>

      <p className="mt-5">
        We replaced leading survey questions with situational inquiries: <em>"Tell us about a time you needed urgent funds before payday and what choices you had."</em> The answers revealed a recurring cycle of informal high-interest borrowing driven by fear of bank bureaucracy.
      </p>

      <blockquote className="pl-5 border-l-2 border-gray-300 italic text-[#555] my-6">
        "Banks make you feel like you are begging for help. Every document feels like an interrogation. I just need to pay my sister's college tuition fee this week."
        <span className="block not-italic text-sm mt-1">— Field Interview Participant, Kanpur</span>
      </blockquote>

      <Fig
        src={`${FINPY_BASE}/Screenshot_2023-05-17_at_11.31_1.jpg`}
        alt="Competitive Benchmarking Matrix"
        caption="Figure 3 — Competitive audit of existing personal loan apps: uncovering predatory fee structures and hidden repayment traps."
        onZoom={onZoomImage}
      />

      <hr className="my-12 border-gray-200" />

      {/* ── 02 · STRATEGY ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        02 · The Strategy: Finding the Gap in a Saturated Market
      </h2>

      <p>
        The Indian instant loan ecosystem was flooded with predatory micro-lending apps characterized by hidden processing charges, aggressive collection tactics, and confusing daily interest calculations. Our competitive benchmarking showed that while competitors optimized for immediate transaction volume, they created severe churn and resentment.
      </p>

      <p className="mt-5">
        Our thesis was straightforward: <strong>radical transparency creates retention</strong>. We established three non-negotiable product pillars:
      </p>

      <ul className="mt-4 list-disc pl-6 space-y-3 text-[#555]">
        <li><strong className="text-[#292929]">Upfront Total Cost:</strong> Every rupee of interest, processing fee, and GST displayed in large type before loan confirmation.</li>
        <li><strong className="text-[#292929]">Calibrated Credit Lines:</strong> Proactive limit matching that prevents vulnerable users from taking debt they cannot service.</li>
        <li><strong className="text-[#292929]">Respectful Communication:</strong> Zero threatening notices, zero deceptive countdown timers, and zero hidden penalties.</li>
      </ul>

      <Fig
        src={`${FINPY_BASE}/Frame_1.jpg`}
        alt="Market Differentiation Framework"
        caption="Figure 4 — Product differentiation: positioning FinPy as a transparent, dignity-first credit companion."
        onZoom={onZoomImage}
      />

      <Fig
        src={`${FINPY_BASE}/MoScoW_(2).png`}
        alt="MoSCoW Prioritisation Matrix"
        caption="Figure 5 — MoSCoW prioritization framework used to align engineering and product on MVP feature scope."
        onZoom={onZoomImage}
      />

      <hr className="my-12 border-gray-200" />

      {/* ── 03 · EXECUTION ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        03 · Execution: Transparent User Flows
      </h2>

      <p>
        We designed the end-to-end loan journey around cognitive ease and instant reassurance. By integrating instant KYC via DigiLocker and automated bank statement parsing, we compressed what traditionally took four days into five minutes of clear, step-by-step progress.
      </p>

      <Fig
        src={`${FINPY_BASE}/process_1.jpg`}
        alt="End to End Process Flow"
        caption="Figure 6 — Information architecture and user journey from initial mobile registration to bank disbursement."
        onZoom={onZoomImage}
      />

      <p className="mt-6">
        We launched the MVP into the wild with high expectations. But live production data quickly proved that good intentions on paper do not always translate to sound borrower decisions.
      </p>

      <hr className="my-12 border-gray-200" />

      {/* ── 04 · PROBLEM 1 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        04 · Problem 1: Unrealistic Loan Tenures & The Locked-State Solution
      </h2>

      <p>
        Post-launch data surfaced an alarming pattern: users with lower monthly incomes were disproportionately choosing the shortest repayment tenures (3 months instead of 12 months). They assumed a shorter loan was always cheaper and wanted to "get it over with."
      </p>

      <p className="mt-5">
        The result was predictable: compressed EMI amounts exceeded their monthly disposable income, leading to payment distress and rising default rates.
      </p>

      <div className="my-8 p-5 bg-gray-50 border-l-4 border-amber-500 rounded-r text-[16px] text-gray-800 leading-relaxed">
        <strong>The Design Dilemma:</strong> Traditional banking simply denies ineligible options with an abrupt error message ("You do not qualify"). In consumer testing, this triggered instant humiliation and app abandonment.
      </div>

      <p>
        Instead of treating users like credit risks, we introduced <strong>Locked Tenures with Transparent Milestones</strong>. Short-term options were shown with a lock icon and clear, empowering copy: <em>"Unlock 3-Month EMI after 6 consecutive on-time payments."</em>
      </p>

      <Fig
        src={`${FINPY_BASE}/1.jpg`}
        alt="Locked Loan Tenures UI"
        caption="Figure 7 — Locked tenures with explicit behavioral unlock criteria: converting institutional rejection into achievable progress."
        onZoom={onZoomImage}
      />

      <blockquote className="pl-5 border-l-2 border-[#191919] my-6 font-medium text-[#191919]">
        <strong>Outcome:</strong> A <strong>+33% increase</strong> in monthly users selecting balanced 12-month EMIs, while 34 high-risk borrowers were successfully steered away from unsustainable debt burdens.
      </blockquote>

      <hr className="my-12 border-gray-200" />

      {/* ── 05 · PROBLEM 2 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        05 · Problem 2: Missing Salary Details & "Positive Friction"
      </h2>

      <p>
        The second hurdle was a high drop-off rate during bank verification. Over 40% of applicants submitted bank statements from inactive savings or secondary accounts rather than their primary salary account, resulting in automatic underwriting rejections.
      </p>

      <p className="mt-5">
        My initial hypothesis was that users were concerned about privacy and reluctant to share their main paycheck data. User interviews proved this wrong: <strong>they simply hadn't noticed the requirement</strong> in their haste to complete the form.
      </p>

      <Fig
        src={`${FINPY_BASE}/io.png`}
        alt="Positive Friction UI Screen"
        caption="Figure 8 — Positive Friction screen: deliberate step-by-step micro-interaction with a timed CTA to ensure comprehension."
        onZoom={onZoomImage}
      />

      <p className="mt-6">
        The solution was <strong>Positive Friction</strong>. Instead of speeding users through, we introduced an intentional pause screen with an animated visual breakdown explaining why a salary account is required. The primary action button was held inactive for 3 seconds, requiring users to digest the requirement before continuing.
      </p>

      <blockquote className="pl-5 border-l-2 border-[#191919] my-6 font-medium text-[#191919]">
        <strong>Outcome:</strong> A <strong>+45% increase</strong> in successful salary account verifications on first attempt, virtually eliminating verification rejections.
      </blockquote>

      <hr className="my-12 border-gray-200" />

      {/* ── 06 · PROBLEM 3 ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        06 · Problem 3: Promoting Good Repayment with the "Superhero Feeling"
      </h2>

      <p>
        In digital finance, negative behavior is punished immediately with fines and phone calls, but good behavior passes in silence. When a user paid an EMI on time, our app quietly displayed a cold receipt. There was no reinforcement, no validation, and no incentive to maintain the habit.
      </p>

      <p className="mt-5">
        We replaced static receipts with an animated achievement sequence that celebrated on-time repayments as financial victories. Users unlocked milestone badges and earned automated credit limit increases without filing requests.
      </p>

      <Fig
        src={`${FINPY_BASE}/op.png`}
        alt="Repayment Reward UI"
        caption="Figure 9 — Gamified milestone reward: turning timely repayments into a shareable moment of personal achievement."
        onZoom={onZoomImage}
      />

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#191919]">
              <th className="pb-2 pr-4 font-semibold text-[#191919]">Funnel Stage</th>
              <th className="pb-2 px-4 font-semibold text-[#191919]">Metric</th>
              <th className="pb-2 pl-4 font-semibold text-[#191919]">Behavioral Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">Limit Upgrade Offer</td>
              <td className="py-2.5 px-4 font-semibold text-[#191919]">320 Eligible Users</td>
              <td className="py-2.5 pl-4">Proactively awarded based on 6 months of spotless repayments</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">Offer Acceptance</td>
              <td className="py-2.5 px-4 font-semibold text-[#191919]">276 Accepted (86.2%)</td>
              <td className="py-2.5 pl-4">Instant adoption without customer service intervention</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">Social Sharing</td>
              <td className="py-2.5 px-4 font-semibold text-[#191919]">167 Shares</td>
              <td className="py-2.5 pl-4">Organic word-of-mouth referral loop driven by pride, not shame</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#191919]">App Store Advocacy</td>
              <td className="py-2.5 px-4 font-semibold text-[#191919]">16 Organic 5-Star Reviews</td>
              <td className="py-2.5 pl-4">Genuine user testimonials praising dignity and transparency</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="my-12 border-gray-200" />

      {/* ── REFLECTION ── */}
      <h2 className="text-[26px] font-bold text-[#191919] mb-5 tracking-tight leading-tight">
        07 · Reflection & Horizons: Three Lessons for FinTech Designers
      </h2>

      <p className="mt-5">
        Designing FinPy taught me that in consumer finance, <strong>emotional tone is a functional requirement</strong>. The most impactful changes we shipped had nothing to do with visual decoration and everything to do with understanding the psychological vulnerability of borrowing money:
      </p>

      <ol className="mt-6 list-decimal pl-6 space-y-4 text-gray-800">
        <li>
          <strong>Never design rejection without a path to redemption.</strong> Framing restrictions as locked milestones preserved user dignity and drove long-term creditworthiness.
        </li>
        <li>
          <strong>Friction can be an act of empathy.</strong> Intentionally slowing users down at critical decision gates prevented costly verification errors and increased overall pipeline velocity.
        </li>
        <li>
          <strong>Celebrate what you want repeated.</strong> Acknowledging financial responsibility transformed borrowing from a covert necessity into an empowering milestone.
        </li>
      </ol>

      <blockquote className="mt-10 pl-5 border-l-2 border-[#191919] text-[20px] md:text-[22px] italic text-[#555] leading-[1.5] max-w-4xl">
        "Not all debt is bad debt. When designed with clarity and dignity, credit isn't a trap—it's a springboard."
      </blockquote>

      <p className="text-xs text-gray-400 mt-16 italic">
        For portfolio and educational presentation purposes only. Real user identifiers and proprietary underwriting metrics have been aggregated and anonymized in compliance with regulatory privacy frameworks.
      </p>
    </article>
  );
}
