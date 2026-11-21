import type { CasePayload, Slide } from "./notion.functions";

// Static, hand-authored deck for the FinPy case study.

const FINPY_BASE = "https://www.pradyumnasrivastava.com/case-study/finpy";

const slides: Slide[] = [
  {
    id: "meta",
    kicker: "At a glance",
    title: "From Stigma to Empowerment — The Evolution of Loans Through FinPy",
    blocks: [
      {
        type: "quote",
        rich: [
          {
            text: "I had only one intention in mind when I joined FinPy — to reach the needful and whisper in their ears: 'not all debt is bad debt.'",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Role — ", bold: true },
          {
            text: "Product Designer (UX Research, Interaction Design, User Testing, Strategy)",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Domain — ", bold: true },
          { text: "Consumer Fintech · Personal Loans · Credit Access" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Platform — ", bold: true },
          { text: "Mobile (Android)" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Methods — ", bold: true },
          {
            text: "Field Surveys · In-Depth Interviews · Competitive Benchmarking · Prototype Testing · Post-Launch CX Analysis",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "Impact: +33% users selecting 12-EMI plans · +45% successful salary account uploads · 276/320 users accepted credit limit increase · 167 shared the news · 16 organic 5-star Play Store ratings.",
          },
        ],
      },
    ],
  },
  {
    id: "prologue",
    kicker: "Prologue",
    title: "A Product Built on an Uncomfortable Truth",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "In India, borrowing money carries a quiet shame. For a generation of young professionals navigating rising rents, medical emergencies, and the gap between ambition and income, the word 'loan' still conjures images of desperation — of having failed to manage your finances. That cultural weight was the first problem I needed to understand before I touched a single wireframe.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "It is not my intention to simply pretend that a UI change increased adoption by a significant percentage. What I want to walk through here are the three real problems we identified through live customer experience data after launch — and how letting go of my own assumptions about the business model led us to asking the questions that actually mattered.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/Section_852773771_(1)-min.png`,
        caption: "Target demographic overview",
      },
    ],
  },
  {
    id: "discovery",
    kicker: "01 · Discovery",
    title: "Who We Were Designing For",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Before writing a single requirement, we needed to understand who was actually underserved by the existing credit landscape. Our target audience quickly crystallised: primarily young professionals between 25 and 40, with varying income levels, who valued speed and convenience above almost everything else. Many had limited credit histories or low scores — which made traditional bank loans effectively inaccessible, not through any fault of their own, but through the design of the system itself.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/Group_852773780.png`,
        caption: "User Personas synthesised from online and offline interviews",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The pain points we uncovered were consistent across every interview: traditional banks were slow, opaque, and bureaucratic. Users didn't understand what they were signing up for. Interest rates, fees, and repayment schedules were buried in fine print. The process felt designed to intimidate rather than to serve. These were not edge cases — they were the rule.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "The process felt like it was designed to catch you out, not to help you.",
          },
        ],
      },
    ],
  },
  {
    id: "research",
    kicker: "01 · Discovery",
    title: "Research That Met People Where They Were",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "We ran a mix of online and offline interviews deliberately. Online sessions gave us reach and allowed screen sharing; offline, face-to-face conversations gave us something harder to fake — non-verbal cues, moments of hesitation, the slight embarrassment some participants felt when discussing their financial situations. That discomfort was data.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "To avoid leading the conversation, we asked situational questions rather than direct ones. Instead of 'do you find loan applications stressful?', we asked 'tell us about a time you needed money quickly and what you did.' The answers were far richer, and the patterns were impossible to ignore.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/Screenshot_2023-05-17_at_11.31_1.jpg`,
        caption: "Benchmarking competitors across the personal loan landscape",
      },
    ],
  },
  {
    id: "strategy",
    kicker: "02 · Strategy",
    title: "Finding the Gap in a Saturated Market",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "The personal loan app market was crowded. Finding a defensible position required more than features — it required a genuine point of view. Through competitive benchmarking, we confirmed what our interviews had already told us: virtually every existing product spoke the language of the institution, not the borrower. Terms, eligibility criteria, and approval flows were all optimised for the lender's risk model, not the user's understanding.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/Frame_1.jpg`,
        caption: "Differentiating the FinPy product offering from existing players",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Our thesis became simple: lead with personalization, transparency, and speed — in that order. Tailor credit limits and loan terms to each user's actual financial profile. Show interest rates and fees upfront, clearly, without burying them. And get the application process down to something a person could complete in minutes rather than days.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/MoScoW_(2).png`,
        caption: "MoSCoW prioritisation framework applied to MVP feature set",
      },
    ],
  },
  {
    id: "execution",
    kicker: "03 · Execution",
    title: "Designing Flows That Respect People's Intelligence",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Every user flow we designed was anchored to one question: does this feel like it was made for the person using it, or for the company behind it? Transparency wasn't a feature we bolted on — it was the structural logic of every screen. Repayment schedules, total cost of borrowing, and what happened if a payment was missed were all surfaced proactively, not buried behind a 'terms and conditions' link.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/process_1.jpg`,
        caption: "Mapping the transparent user journey from application to disbursement",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We launched the MVP with enough to test our core hypotheses in the market. What happened next is where the real work began.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-1",
    kicker: "04 · Post-Launch",
    title: "Problem One: When Good Intentions Cause Defaults",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Post-launch data surfaced a troubling pattern. Users at the lower end of the income range were disproportionately selecting the minimum loan tenure — the shortest repayment window available. On the surface, this made sense: shorter tenure, less total interest. But the financial reality was different. For someone with tight monthly cash flow, a compressed repayment schedule created a burden they couldn't sustain, and default rates climbed.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/1.jpg`,
        caption: "Locked tenures with clear, achievable unlock criteria",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The instinctive product response would have been to remove those tenure options for certain user profiles — to simply tell people they weren't eligible. We decided that was the wrong approach. Telling someone they can't have something, without explaining why, breeds resentment and distrust. Instead, we hypothesised a different framing: show that tenures are 'locked', and make the path to unlocking them visible, specific, and achievable. White-hat gamification — not to manipulate behaviour, but to make a genuinely better financial decision feel like a goal rather than a restriction.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "+33% increase in monthly users selecting 12 EMIs. 34 users proactively reclassified as unsuitable for 3 or 6 EMI options — before they could make a costly mistake.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-2",
    kicker: "05 · Post-Launch",
    title: "Problem Two: The Wrong Account",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "A second pattern emerged in post-launch CX data: a significant portion of users were uploading bank statements from accounts that were not their salary accounts. The loan application required salary account details specifically — for income verification — but users were providing savings or secondary accounts instead. Applications were failing, and users were frustrated.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "My first assumption was privacy. I suspected users might be deliberately avoiding their salary account out of discomfort with sharing primary financial data. I was wrong. Direct conversations with affected users revealed something more prosaic and more fixable: they simply hadn't noticed the distinction. The requirement was present on screen, but it wasn't landing. The interface had failed to communicate something it considered obvious.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/io.png`,
        caption: "Positive Friction UI — slowing users down to ensure comprehension before proceeding",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The solution was what we called 'Positive Friction.' Rather than simply adding a warning label, we introduced a dedicated screen with a step-by-step animation walking users through exactly what a salary account was and why it was needed. Crucially, the call-to-action button remained inactive for a brief, deliberate duration — long enough to ensure the user had read the content before proceeding. It was a small act of designed patience, and it worked.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "+45% increase in monthly users who successfully uploaded a salary account bank statement.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-3",
    kicker: "06 · Post-Launch",
    title: "Problem Three: Repayment Without Recognition",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "The third problem was subtler, and in some ways the most interesting. Users who repaid on time — who did exactly the right thing, consistently — felt nothing about it. No sense of achievement. No reinforcement. No reason to tell a friend. Good financial behaviour was happening in silence, and the product was squandering it.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We wanted to change that. The solution was an animated badge system that rewarded on-time repayment with something tangible: a credit limit increase, delivered with the kind of moment that actually felt like a milestone. We called it the 'superhero feeling.' No raw financial data was displayed — no percentages, no algorithmic scores. Just a clear, emotionally resonant signal that your behaviour had been noticed and rewarded.",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/op.png`,
        caption: "Gamified achievement UI rewarding on-time repayment with a credit limit increase",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The results exceeded what we'd modelled. Of 320 users offered a limit increase, 276 accepted it. 167 of those clicked 'Share the news' — an organic referral mechanic we hadn't had to pay for. And the feature drove 16 new 5-star ratings on the Google Play Store, entirely unprompted.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "🏆",
        rich: [
          {
            text: "320 users offered limit increase · 276 accepted · 167 shared · 16 organic 5-star Play Store ratings.",
          },
        ],
      },
    ],
  },
  {
    id: "outcomes",
    kicker: "07 · Reflection",
    title: "What This Work Actually Taught Me",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Looking back, the numbers matter — but they're not what I carry with me from this project. What I carry is the reminder that the most consequential design decisions are rarely about visual craft. They're about whether you've understood the real problem well enough to solve it without making things worse.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "+33% ", bold: true },
          { text: "increase in users selecting 12-EMI repayment plans." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "+45% ", bold: true },
          {
            text: "increase in users successfully uploading salary account bank statements.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "276 of 320 ", bold: true },
          {
            text: "users accepted their credit limit increase when it was framed as an achievement.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "167 users ", bold: true },
          {
            text: "shared the news organically — a referral loop that cost us nothing.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "16 new 5-star Play Store ratings ", bold: true },
          { text: "driven entirely by the repayment achievement feature." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Three Things I'd Tell a Designer Starting This Work" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "1. Question your first assumption. ", bold: true },
          {
            text: "When users weren't uploading the right account, my instinct was privacy. The reality was attention. Direct conversation is irreplaceable.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "2. Restriction is not the only lever. ", bold: true },
          {
            text: "Instead of blocking users from choosing short tenures, we locked them — and showed the path to unlocking. The difference in how that lands is significant.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "3. Emotion is a product feature. ", bold: true },
          {
            text: "On-time repayment was happening quietly and generating nothing. The moment we gave it ceremony, it generated word-of-mouth, ratings, and loyalty. Recognition is infrastructure.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "Not all debt is bad debt. And not all design is about adding — sometimes the most important thing you can do is make someone feel that they made the right choice.",
          },
        ],
      },
    ],
  },
];

export const FINPY_PAYLOAD: CasePayload = {
  title: "From stigma to empowerment — the evolution of loans through FinPy",
  cover: null,
  icon: null,
  slides: [
    {
      id: "cover",
      kicker: "Case Study",
      title:
        "From stigma to empowerment — the evolution of loans through FinPy",
      blocks: [],
    },
    ...slides,
  ],
  fetchedAt: Date.now(),
};
