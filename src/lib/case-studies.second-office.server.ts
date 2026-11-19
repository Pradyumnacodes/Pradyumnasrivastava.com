import type { CasePayload, Slide } from "./notion.functions";

// Static, hand-authored deck for the SecondOffice B2B hiring platform case study.

const slides: Slide[] = [
  {
    id: "meta",
    kicker: "At a glance",
    title: "Measuring Design Impact with the System Usability Scale",
    blocks: [
      {
        type: "quote",
        rich: [
          {
            text: "We weren't just asked to redesign a product — we were handed a failing SUS score of 51.87 and told to figure out why a US entrepreneur couldn't trust the platform enough to hire his first Indian employee through it.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Role — ", bold: true },
          {
            text: "Market Researcher · User Interviews · UX & UI Design · MVP Audit · Social Media",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Team — ", bold: true },
          {
            text: "Rajat Saini (Team Lead) · Vishal Chandwani (Associate UX Designer) · Sagar Mahato (Deputy UX Designer) · Kaushal Batra (Graduate Design Trainee)",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Platform — ", bold: true },
          { text: "B2B SaaS · Cross-border hiring" },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "Impact: SUS score lifted from 51.87 → 72.57 — a 20.70-point improvement — after 5 targeted redesigns shipped in response to 4 usability issues uncovered through structured testing.",
          },
        ],
      },
    ],
  },
  {
    id: "prologue",
    kicker: "Prologue",
    title: "The Problem Was Never the UI",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "SecondOffice is a B2B hiring platform built for US entrepreneurs who want to hire full-time employees in India — not freelancers, not contractors, but actual team members with an office presence. The proposition is compelling. The execution, when we first got involved, was not.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Our anchor persona was Alex — an entrepreneur in the US building an iOS app. He needed affordable, talented engineers in India. He wanted them on payroll, not on platforms like Upwork. But he had no idea how to legally set up an entity in India, no existing HR infrastructure to run the search, and no budget to burn on a botched hire.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "When I looked at the platform through his eyes for the first time, the cracks were obvious. The experience assumed cultural and financial context that Alex simply didn't have. And the SUS score confirmed it — 51.87, well below the 60-point threshold that marks the boundary between 'failing' and 'acceptable'.",
          },
        ],
      },
    ],
  },
  {
    id: "discovery",
    kicker: "01 · Discovery",
    title: "Three Problems Under the Surface",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Before touching any wireframe, we ran structured interviews with a group of 8 HR professionals who worked within the SecondOffice ecosystem. I wanted to understand the hiring process from the inside — what made clients hesitate, what made them trust, and what made them give up.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We card-sorted their responses and watched three themes surface again and again. These became our three core design problems.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 1 — Trust" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Alex isn't going to wire money overseas to a staffing agency he doesn't know. Trust isn't a soft UX concern here — it's a hard blocker. He needs constant visibility into the recruitment process, verifiable market reputation, and a platform that signals legitimacy through every interaction. The existing product asked him to trust without giving him a reason to.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 2 — Liability of Hiring" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Setting up a legal entity in India takes months and significant capital. Alex doesn't want that burden — he wants SecondOffice to absorb it. But even after hiring, he's worried about accountability: what happens if an employee stops delivering? The platform gave no answer to that question.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 3 — Resources" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Alex's HR team is already stretched thin. He can't divert them to managing a cross-border hiring process they've never run before. He needs SecondOffice to do the heavy lifting — but the platform, as it stood, surfaced complexity instead of absorbing it.",
          },
        ],
      },
    ],
  },
  {
    id: "target-audience",
    kicker: "02 · Audience",
    title: "Knowing Exactly Who We Were Designing For",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "One of the harder tasks in product design is drawing a sharp line between who your user is and who they aren't. We used three axes to define the SecondOffice core audience: age, occupation, and location. Getting this right mattered because the platform sits at a cross-cultural intersection — a US client, an Indian talent pool, and a team bridging both.",
          },
        ],
      },
      {
        type: "numbered",
        rich: [{ text: "Age" }],
      },
      {
        type: "numbered",
        rich: [{ text: "Occupation" }],
      },
      {
        type: "numbered",
        rich: [{ text: "Location" }],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/target_audience.png",
        caption: "Target audience breakdown — age, occupation, and location mapped to identify the core hiring decision-maker.",
      },
    ],
  },
  {
    id: "user-persona",
    kicker: "03 · Persona",
    title: "Putting a Face to the Frustration",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Research only becomes design when it crystallizes into a person. We built two personas from our interview data to hold our assumptions accountable throughout the project.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed.png",
        caption: "User Persona 1 — the US-based entrepreneur navigating cross-border hiring for the first time.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(1).png",
        caption: "User Persona 2 — the Indian HR contact managing expectations across time zones.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Two Frustrations That Defined the Design Brief" }],
      },
      {
        type: "quote",
        rich: [
          {
            text: "Currency Variation — Our user is rattled by the constant fluctuation between USD and INR and can't quickly evaluate whether a compensation figure is competitive.",
            bold: true,
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "Keeping up with the recruiting process — Time zone gaps and no proactive status updates meant Alex had to chase every update manually. The platform offered no way to stay in the loop without pinging someone.",
            bold: true,
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/information_architecture.png",
        caption: "Information architecture — mapping the product's structure to identify where the experience broke down.",
      },
    ],
  },
  {
    id: "proposed-solution",
    kicker: "04 · Solutions",
    title: "Early Solutions Before We Had Data",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Before running formal usability testing, we proposed two foundational fixes based on what the persona and IA work revealed. These weren't final designs — they were hypotheses we could test.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "1. For Currency Variation" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We proposed building in automatic currency conversion that defaults to the user's local currency on first login. The idea was simple: the platform should normalize all salary figures the moment a US-based user opens it, so they never have to do the mental math themselves.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/pr_sol_2.png",
        caption: "Proposed solution for currency variation — standardized conversion defaulting to the user's currency.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "2. For Keeping Up with the Recruiting Process" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We designed a candidate progress table — a dashboard that shows each applicant's status at a glance, without requiring any communication. The goal was to give Alex the feeling of control he needed, without adding workload to the HR team managing his search.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/pr_sol_1.png",
        caption: "Proposed recruiting dashboard — intuitive status tracking for every candidate in the pipeline.",
      },
    ],
  },
  {
    id: "usability-testing",
    kicker: "05 · Testing",
    title: "Watching Real Users Hit Real Walls",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Usability testing isn't about validating what you think works — it's about catching what you missed. We gave a group of users four tasks and watched without interfering. The first task alone — posting a job on SecondOffice — surfaced more friction than we expected.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Four Issues Found in Testing" }],
      },
      {
        type: "bullet",
        rich: [
          { text: "Issue 1 — Currency conversion: ", bold: true },
          {
            text: "Users consistently paused when evaluating salary fields. Computing the USD equivalent of an INR figure mid-task broke their flow. This confirmed our hypothesis and pushed currency conversion from 'nice to have' to 'must ship'.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Issue 2 — CTC & ECTC jargon: ", bold: true },
          {
            text: "Terms like 'CTC' (Cost to Company) and 'ECTC' (Expected CTC) are second nature in Indian HR contexts. For a US user, they're meaningless. We watched people skip over them entirely or misinterpret them — both outcomes equally dangerous for the hiring process.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Issue 3 — Salary standardization: ", bold: true },
          {
            text: "India uses 'Lakh per annum' as its salary baseline. The US uses thousands of dollars. The platform was surfacing Indian-formatted salary chips to US users without translation — a 0–3 LPA chip read as 0–3.7K USD, which looks absurdly low by American standards.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Issue 4 — No onboarding or profile guidance: ", bold: true },
          {
            text: "Users were rushing straight to posting a job before completing their company profile. That's a credibility problem — candidates can't evaluate a company they know nothing about. The platform offered no guardrails to catch this.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "We gathered these insights directly from our two key stakeholder groups — the client and the HR team. These are the people who actually use the platform every day, and their friction was real.",
          },
        ],
      },
    ],
  },
  {
    id: "sus-evaluation",
    kicker: "06 · Evaluation",
    title: "Before the Redesign: A Failing Score",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "To establish a baseline, we ran a formal SUS evaluation with eight participants. The System Usability Scale is a 10-question questionnaire that produces a score from 0–100. A score below 60 is considered failing — it means users are actively struggling with the product.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We asked participants to complete four tasks: post a job, edit the job description, use the dashboard to sort and filter candidates, and navigate through the platform's pages to assess overall clarity.",
          },
        ],
      },
      {
        type: "numbered",
        rich: [{ text: "Post a job on the platform." }],
      },
      {
        type: "numbered",
        rich: [{ text: "Edit the job description once posted." }],
      },
      {
        type: "numbered",
        rich: [
          {
            text: "Use the dashboard to sort through candidate lists and apply filters.",
          },
        ],
      },
      {
        type: "numbered",
        rich: [
          {
            text: "Navigate pages and sub-pages and assess the overall ease and clarity of the product.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "🛠",
        rich: [
          { text: "Result: ", bold: true },
          {
            text: "SUS score of 51.87 — below the 60-point threshold. The product, as shipped, was failing its users. Easability, accessibility, and clarity all needed serious reconsideration.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/Frame_1.png",
        caption: "SUS analysis prior to redesigns — individual question scores and aggregate breakdown.",
      },
    ],
  },
  {
    id: "redesigns",
    kicker: "07 · Design Iterations",
    title: "Five Redesigns, Four Problems Solved",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 1 — Demystifying CTC & ECTC" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "CTC and ECTC are deeply embedded in Indian HR vocabulary — but invisible to anyone outside that context. Rather than removing the terms (which would confuse the Indian HR side of the platform), I added an information icon next to each label. Hovering reveals a plain-English definition. A small change, but it eliminated a moment of confusion that was quietly destroying trust.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(3).png",
        caption: "Before — CTC/ECTC labels with no context or explanation for non-Indian users.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(4).png",
        caption: "After — information icon with hover-state definition explaining the jargon in plain English.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 2 — Standardizing Salary Representation" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The salary chips (0–3 LPA, 3–6 LPA, etc.) made sense within the Indian context they were designed for. But for a US user, '0–3 LPA' converts to roughly \$0–3,700 — a figure that reads as poverty wages, not an entry-level developer salary. The underlying data was fine; the presentation was doing real damage.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We replaced the preset chips with an open input field. Users type their own salary range in their own currency. The platform handles conversion on the backend. The result is a field that works for every market without forcing either side to decode the other's conventions.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed.jpg",
        caption: "Before — preset salary chips formatted in LPA, unreadable to US-based users.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(5).png",
        caption: "After — open input fields with currency standardization, flexible for any market.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 3 — Date Filtering on Assessments" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The original assessment view had no date filtering. If you wanted to review a candidate's performance on a specific date, you had to scroll and manually locate it. As the pipeline grows, that becomes genuinely unworkable. We introduced date-based sorting that also automatically orders the accompanying ratings — turning a manual search into a one-click lookup.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(6).png",
        caption: "Before — no date filter on assessments, requiring manual search through unsorted entries.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(7).png",
        caption: "After — date-based filtering with automatic rating sort, making assessment review instant.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 4 — Onboarding Overlays" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "New users were diving straight into job posting without filling out their company profile. This isn't just a UX problem — it's a credibility problem. Candidates can't evaluate a company they know nothing about. We introduced one-time onboarding overlays that walk users through the platform's information architecture on their first session, and gently block job posting until a minimum company profile is in place.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(8).png",
        caption: "Before — no onboarding, users landed directly in the platform with no orientation.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(9).png",
        caption: "After — guided onboarding overlays surfacing the platform's information architecture on first use.",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 5 — Profile Completion Progress Bar" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "To reinforce the onboarding, we added a persistent profile-completion progress bar. It surfaces how far along a user is before they're ready to hire, and creates a subtle motivation to finish what they started. The goal wasn't to gate the platform — it was to make the right action feel like the obvious one.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(10).png",
        caption: "Profile completion — step 1 of the progress journey.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(11).png",
        caption: "Profile completion — step 2, filling in company details.",
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/unnamed_(12).png",
        caption: "Profile completion — step 3, ready to post.",
      },
    ],
  },
  {
    id: "sus-after",
    kicker: "08 · Evaluation Post-Redesign",
    title: "After the Redesign: A Meaningful Lift",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "We ran a second round of SUS testing with a fresh group of eight participants — different people, same tasks. This matters: repeating the test with the same users risks inflated scores from familiarity rather than actual usability improvement. We wanted a clean read.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          { text: "Result: ", bold: true },
          {
            text: "SUS score of 72.57 — a 20.70-point improvement over the pre-redesign baseline of 51.87. The product crossed above the 60-point threshold and entered 'good' usability territory. Task success rates climbed measurably across all four scenarios.",
          },
        ],
      },
      {
        type: "image",
        url: "https://www.pradyumnasrivastava.com/case-study/second-office/Frame_2.png",
        caption: "SUS evaluation after redesigns — 72.57 aggregate score, a 20.70-point lift from the baseline.",
      },
    ],
  },
  {
    id: "closure",
    kicker: "09 · Reflection",
    title: "What This Project Taught Me",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "From the first stakeholder interview to the final SUS evaluation, this project reinforced something I think about on every engagement: the most damaging usability problems are almost never the ones users complain about. Alex wasn't going to tell us that 'CTC' confused him — he'd just quietly disengage. The job is to find those invisible blockers before they become churned users.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The 20.70-point SUS improvement didn't come from a single dramatic redesign. It came from five small, precise interventions — each one targeting a specific moment where the product was asking more of the user than it should. That's the job: reduce the gap between what the product expects and what the user can reasonably give.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The lean UX loop — test, identify, fix, retest — will continue throughout the product lifecycle. Future iterations will build on this foundation: a store page for employers to procure local office resources, expanded profile verification, and richer candidate progress transparency are all on the roadmap.",
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
            text: "For educational and portfolio case study purposes only. Interface examples, usability scores, and user research details referenced in this case study are presented with participant consent and have been appropriately anonymized to protect user and client confidentiality.",
            italic: true,
          },
        ],
      },
    ],
  },
];

export const SECOND_OFFICE_PAYLOAD: CasePayload = {
  title: "Measuring design impact with the System Usability Scale",
  cover:
    "https://www.pradyumnasrivastava.com/case-study/second-office/Frame_1.png",
  icon: null,
  slides: [
    {
      id: "cover",
      kicker: "Case Study",
      title: "Measuring design impact with the System Usability Scale",
      blocks: [],
    },
    ...slides,
  ],
  fetchedAt: Date.now(),
};
