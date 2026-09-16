import type { CasePayload, Slide } from "./notion.functions";

// FinPy assets
import caseFinpyPng from "@/assets/case-finpy.png"; // App mockup card (dark UI)
import caseFinpyJpg from "@/assets/case-finpy.jpg"; // Abstract geometric art

// Second Office assets
import caseSecondOfficePng from "@/assets/case-second-office.png"; // SUS methodology diagram
import caseSecondOfficeJpg from "@/assets/case-second-office.jpg"; // Growth bar chart

// Other rich project visuals
import caseGoglocal from "@/assets/case-goglocal.jpg"; // Product UI on world map
import caseZype from "@/assets/case-zype.jpg"; // Phone with trading chart
import caseMastercard from "@/assets/case-mastercard.jpg"; // Mastercard analytics
import creativeBluper from "@/assets/creative-bluper.jpg"; // Design sketching notebook
import creativeBrucira from "@/assets/creative-brucira.jpg"; // Figma on screen
import creativeFigmakeathon from "@/assets/creative-figmakeathon.jpg"; // Hackathon / design sprint
import creativeGoglocalMerch from "@/assets/creative-goglocal-merch.jpg"; // Merch / brand
import creativeTopmate from "@/assets/creative-topmate.jpg"; // Topmate creative
import creativeVa from "@/assets/creative-va.jpg"; // VA creative

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
//  FinPy — 10 slides, real content from the live case study
//  Images: https://www.pradyumnasrivastava.com/case-study/finpy/
// ──────────────────────────────────────────────────────
const FINPY_BASE = "https://www.pradyumnasrivastava.com/case-study/finpy";

const finpySlides: Slide[] = [
  {
    id: "cover",
    kicker: "FinPy · Disrupting Loans",
    title: "From stigma to empowerment — the evolution of loans through FinPy",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/Section_852773771_(1)-min.png`,
        caption: "Target demographic overview",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "A user-centred overhaul anchored in field research, cultural sensitivity and structured assumption-testing — reframing credit from shame to dignity.",
          },
        ],
      },
    ],
  },
  {
    id: "context",
    kicker: "01 · Context",
    title: "From Stigma to Empowerment",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "It is not my intention to simply pretend that a UI change increased adoption by a significant percentage, but to discuss in detail the three big problems identified through real-time CX, and how personal criticisms of the business model led to asking the right questions.",
          },
        ],
      },
      {
        type: "quote",
        rich: [
          {
            text: "I had only one intention in mind when I joined FinPy — to reach to the needful and whisper in their ears: 'not all debt is bad debt.'",
          },
        ],
      },
      {
        type: "image",
        url: `${FINPY_BASE}/Group_852773780.png`,
        caption: "User Personas",
      },
    ],
  },
  {
    id: "research-goals",
    kicker: "01 · Before Launch",
    title: "Research Goals & Methodology",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/MoScoW_(2).png`,
        caption: "MoSCoW Prioritization Framework",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We initiated the MVP to get into the market, involving users at every major research stage. Research goals: understand target audience demographics, explore user needs and pain points with traditional loans, determine key features and user flows, and validate initial design concepts through user feedback.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Methodology: offline surveys, in-depth interviews, competitive analysis of existing personal loan apps, and prototype usability testing.",
          },
        ],
      },
    ],
  },
  {
    id: "key-findings",
    kicker: "02 · Insights",
    title: "Key Findings & Audience",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/Screenshot_2023-05-17_at_11.31_1.jpg`,
        caption: "Benchmarking competitors",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Target audience: primarily young professionals aged 25–40 with varying incomes who value convenience, speed, and flexibility. Many have limited credit histories or low credit scores, making traditional bank loans difficult to access.",
          },
        ],
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Core pain points: traditional banks are time-consuming and bureaucratic. Transparency in loan terms, interest rates, and fees is crucial for building trust. Users prefer simple, intuitive applications that minimise paperwork.",
          },
        ],
      },
    ],
  },
  {
    id: "interviews",
    kicker: "03 · Strategy",
    title: "Interviews & Benchmarking",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/Group_852773780.png`,
        caption: "User Personas — online and offline interview synthesis",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We conducted online interviews using screen sharing and offline face-to-face interviews to observe non-verbal cues and build rapport. Bias was addressed by asking situational questions — 'Tell us about a time when you faced challenges paying bills on time' — instead of leading yes/no questions.",
          },
        ],
      },
    ],
  },
  {
    id: "benchmarking",
    kicker: "03 · Strategy",
    title: "Benchmarking a Saturated Market",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/Frame_1.jpg`,
        caption: "Differentiating the product offering",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "The personal loan app market was highly saturated, making a unique value proposition difficult to find. By placing strong emphasis on personalization, transparency, and speed, we aimed to create a compelling and differentiated offering that traditional players had ignored.",
          },
        ],
      },
    ],
  },
  {
    id: "user-flows",
    kicker: "04 · Execution",
    title: "Transparent User Flows",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/process_1.jpg`,
        caption: "Mapping the user journey",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "We focused on user flows that embody simplicity, personalization, and transparency. Leveraging user data, the journey was personalised — tailoring credit limits and loan terms to each user's unique financial profile. Transparency was central: interest rates, fees, and repayment schedules were communicated clearly upfront, empowering informed decisions.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-1",
    kicker: "05 · After Launch",
    title: "Problem 1: Unrealistic Loan Tenures",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/1.jpg`,
        caption: "Locked tenures with clear unlock criteria",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "Post-launch data showed a pattern: users with very low income were choosing the minimum loan tenure — leading to defaults. The solution hypothesis: do not say tenures are unavailable, but show they are 'locked' and can be unlocked by completing specific steps. White-hat gamification without stigma.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "33% increase in monthly users selecting 12 EMIs. 34 users proactively reclassified as unsuitable for 3 or 6 EMI options.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-2",
    kicker: "06 · After Launch",
    title: "Problem 2: Missing Salary Bank Details",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/io.png`,
        caption: "Positive Friction UI",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "When customers provided account details, it was not a salary account. We initially assumed privacy concerns. Direct user conversations revealed the real problem: users were simply not noticing that salary account details were specifically required. The solution was 'Positive Friction' — a dedicated screen with step-by-step animation, and a CTA that stays inactive for a brief duration to ensure the user reads the information before proceeding.",
          },
        ],
      },
      {
        type: "callout",
        emoji: "📈",
        rich: [
          {
            text: "45% increase in monthly users who successfully upload a salary account bank statement.",
          },
        ],
      },
    ],
  },
  {
    id: "problem-3",
    kicker: "07 · After Launch",
    title: "Problem 3: Promoting Good Repayment Behavior",
    blocks: [
      {
        type: "image",
        url: `${FINPY_BASE}/op.png`,
        caption: "Gamified achievement UI",
      },
      {
        type: "paragraph",
        rich: [
          {
            text: "On-time repayment triggered no emotional response — no sense of achievement, no word-of-mouth. The solution: an animated badge system with a 'superhero feeling' that rewards loyalty with an increased credit line. No raw financial data shared, just a compelling feeling of progress. Result: 276 of 320 users accepted the limit increase, 167 clicked 'Share the news', and the feature drove 16 new 5-star Google Play ratings.",
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
];

const SECOND_OFFICE_BASE = "https://www.pradyumnasrivastava.com";

const secondOfficeSlides: Slide[] = [
  {
    id: "cover",
    kicker: "SecondOffice- A Case Study",
    title: "Project Understanding",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text: "Alex is an entrepreneur in the USA, who has a vision of developing an iOS app for his ongoing project. He wants to hire a team from India as they are affordable and talented. Yet, he does not want to hire them as freelancers or on a contract basis. He wants to hire them as his employees and establish an office in India itself.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "My Role — ", bold: true },
          { text: "Market Researcher, User Interviews, UX | User Interface Design, MVP Audit Volunteer, SM manager" },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Team — ", bold: true },
          { text: "Rajat Saini (Team Lead), Vishal Chandwani (Associate UX Designer), Sagar Mahato (Deputy UX Designer), Kaushal Batra (Graduate Design Trainee)" },
        ],
      },
    ],
  },
  {
    id: "problem-hypothesis",
    kicker: "01 · Hypothesis",
    title: "Problem Hypothesis' to Understand the User",
    blocks: [
      {
        type: "callout",
        emoji: "😃",
        rich: [
          { text: "We conducted the first stage interview with the concerned HR workforce. We made a group of 8 HR individuals. And then we interviewed them upon a few open-ended statements about the end-user. And then we card-sorted their thoughts, ideas and suggestions as these 3 main pointers." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 1 - TRUST" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "Here, trust is a key component; Alex won't give his money to untrustworthy market participants to hire on his behalf. Alex is naturally cautious, therefore he will require ongoing input from the recruiting authority. Alex will require a well-known market participant with enough publicly available information about them to be able to trust staffing agencies." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 2 - LIABILITY OF HIRING" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "Alex does not want to go through the time consuming legal requirements to open an office in India because doing so takes a lot of effort and money. Management in India is a difficulty for him since even after recruiting, there is a chance that workers won't complete their responsibilities." },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Problem 3 - RESOURCES" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "Alex doesn't have enough funds to spare for hiring an immense workforce in India, all alone. He does not want to assign the same work to his own HR staff. Alex finds it difficult to put resources in place for hiring in India." },
        ],
      },
    ],
  },
  {
    id: "target-audience",
    kicker: "02 · Audience",
    title: "Target Audience",
    blocks: [
      {
        type: "callout",
        emoji: "😃",
        rich: [
          { text: "We must first determine who will be our user and audience. Finding a good user is simple, but distinguishing who is not our user is difficult. These characteristics determine who our core audience is." },
        ],
      },
      { type: "numbered", rich: [{ text: "Age" }] },
      { type: "numbered", rich: [{ text: "Occupation" }] },
      { type: "numbered", rich: [{ text: "Location" }] },
      {
        type: "image",
        url: `${SECOND_OFFICE_BASE}/case-study/second-office/target_audience.png`,
        caption: "Target audience breakdown",
      },
    ],
  },
  {
    id: "user-persona",
    kicker: "03 · Persona",
    title: "User Persona from the Earlier Research",
    blocks: [
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed.png`, caption: "User Persona 1" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(1).png`, caption: "User Persona 2" },
      { type: "heading", level: 3, rich: [{ text: "Persona Insights for User Frustrations" }] },
      { type: "quote", rich: [{ text: "Currency Variation – Our User is concerned about the continual change in currency.", bold: true }] },
      { type: "quote", rich: [{ text: "Keeping up with the recruiting process – Our user is upset with the lack of contact from HR, which is due to time zone differences, high communication costs, and tapping for every update.", bold: true }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/information_architecture.png`, caption: "Information Architecture" },
    ],
  },
  {
    id: "proposed-solution",
    kicker: "04 · Solutions",
    title: "Proposed Solution",
    blocks: [
      { type: "heading", level: 3, rich: [{ text: "1. For the Currency Variation issue" }] },
      { type: "paragraph", rich: [{ text: "We recognized that currency adjustment would be a significant influence, thus we proposed adopting a standard conversion for the same. Once selected, the platform's currency will be set to the user's default currency." }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/pr_sol_2.png`, caption: "Currency variation solution" },
      { type: "heading", level: 3, rich: [{ text: "2. For Keeping up with the Recruiting Process issue" }] },
      { type: "paragraph", rich: [{ text: "For the second frustration, we decided to create a table that will indicate each candidate's progress. So, the true problem is to design an intuitive dashboard with tremendous ease to reduce any such discomfort." }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/pr_sol_1.png`, caption: "Recruiting process dashboard" },
    ],
  },
  {
    id: "usability-testing",
    kicker: "05 · Testing",
    title: "Conducting Usability Testing",
    blocks: [
      { type: "callout", emoji: "😃", rich: [{ text: "Usability testing assesses whether our audience can effectively accomplish activities on their own. We gave simple tasks to testers and watched their behaviour throughout usability testing. The user's first step was to post a job on SecondOffice." }] },
      { type: "heading", level: 3, rich: [{ text: "Insights from the User Testing" }] },
      { type: "quote", rich: [{ text: "We gathered overall insights from our key stakeholders, Our Client and Human Resources. These are the individuals who will make use of our platform." }] },
      { type: "bullet", rich: [{ text: "Key issue 1: ", bold: true }, { text: "During the testing, we saw that it took our user longer to compute the currency conversion. We identified this as a feature that should be included in our platform." }] },
      { type: "bullet", rich: [{ text: "Key issue 2: ", bold: true }, { text: "We also discovered that the phrases \"CTC\" and \"ECTC\" made very little sense to users from demographics other than INDIA." }] },
      { type: "bullet", rich: [{ text: "Key issue 3: ", bold: true }, { text: "Currency standardisation. We discovered that currency jargon changed from nation to country. For example, in INDIA, normal payroll is expressed as Salary * Lakh per annum, but in the US, it is salary * $10k per annum." }] },
      { type: "bullet", rich: [{ text: "Key issue 4: ", bold: true }, { text: "It was also mentioned by a client that their organisation has a distinct hiring process for different profiles, thus they would want some control over the hiring process." }] },
    ],
  },
  {
    id: "sus-evaluation",
    kicker: "06 · Evaluation",
    title: "S.U.S. Evaluation prior to re-design",
    blocks: [
      { type: "quote", rich: [{ text: "We asked a group of eight people to use our platform and complete the tasks listed below." }] },
      { type: "numbered", rich: [{ text: "Post a job on the platform." }] },
      { type: "numbered", rich: [{ text: "Edit the Job Description once done with the job post." }] },
      { type: "numbered", rich: [{ text: "Then, use the dashboard to sort out through various lists and filters, prompted by the data from backend." }] },
      { type: "numbered", rich: [{ text: "Navigate to the pages and sub-pages and examine the overall ease and clarity of the product." }] },
      { type: "callout", emoji: "🛠", rich: [{ text: "Inference: ", bold: true }, { text: "Since the overall SUS score is less than 60, i.e. 51.87 - the product needs to be seriously re-considered in terms of easability, accesibility and clarity." }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/Frame_1.png`, caption: "SUS analysis prior to re-designs" },
    ],
  },
  {
    id: "redesigns",
    kicker: "07 · Design Iterations",
    title: "‘Before and After’ Designs for specific problems",
    blocks: [
      { type: "heading", level: 3, rich: [{ text: "Redesign 1" }] },
      { type: "paragraph", rich: [{ text: "CTC and ECTC are industrial buzzwords used in INDIA that are widely known in the demography. In other nations, however, this was not the case. As a result, we included an information indicator icon to assist the user in determining what the jargon meant.", bold: true }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(3).png`, caption: "Information indicator icon" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(4).png`, caption: "Hover state for definition" },
      { type: "heading", level: 3, rich: [{ text: "Redesign 2" }] },
      { type: "paragraph", rich: [{ text: "Another concern raised during user testing was the standardisation of currencies in compensation. We discovered that the salary chips provided above were not assisting users since they were not standard in their currency.", bold: true }] },
      { type: "paragraph", rich: [{ text: "A 0-3 LPA chip is OK for INDIA, but when translated to USD, it becomes 0-3.7K, which is horrible because the baseline in the US should be 0-10K. We turned them into an input field, which solved our issue of standardising the salary fields." }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed.jpg`, caption: "Before: Salary chips" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(5).png`, caption: "After: Standardized input fields" },
      { type: "heading", level: 3, rich: [{ text: "Redesign 3" }] },
      { type: "paragraph", rich: [{ text: "Because there was no filtration of dates in this design, it was difficult to examine the assessment of an employee for any given date. Instead, we used to evaluate the person directly. Following the adoption of the new design, we are now arranging them based on dates, which also sorts the ratings for each employee.", bold: true }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(6).png`, caption: "Before: No date filtration" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(7).png`, caption: "After: Arranging based on dates" },
      { type: "heading", level: 3, rich: [{ text: "Redesign 4" }] },
      { type: "paragraph", rich: [{ text: "We also observed that consumers require a preliminary platform explanation for a better understanding of the flow. Users were also rushing to hire rather than filling out the firm details, which might jeopardise the organization's reliability. We made one time onboarding overlays which helped users to understand the basic information architecture of the platform.", bold: true }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(8).png`, caption: "Before: No onboarding" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(9).png`, caption: "After: Onboarding overlays" },
      { type: "heading", level: 3, rich: [{ text: "Redesign 5" }] },
      { type: "paragraph", rich: [{ text: "We agreed that users should be prompted to finish their profiles before proceeding with job posting, thus we established a progress bar to assist users in traversing to complete their profiles.", bold: true }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(10).png`, caption: "Progress bar step 1" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(11).png`, caption: "Progress bar step 2" },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/unnamed_(12).png`, caption: "Progress bar step 3" },
    ],
  },
  {
    id: "sus-after",
    kicker: "08 · Evaluation Post-Redesign",
    title: "S.U.S Evaluation after the redesigns",
    blocks: [
      { type: "quote", rich: [{ text: "Once again, we asked a different group of eight people, to use our platform and complete the tasks listed below. It is important to continually keep the stakeholders and the end-users in loop with the modifications." }] },
      { type: "callout", emoji: "🛠", rich: [{ text: "Inference: ", bold: true }, { text: "Gladly, the overall end SUS score is more than 60, i.e. 72.57 - the product is now ready to get to use. The success rate of tasks has significantly increased. Furthermore, when we compared the former score (51.87) to the improved value (72.57), we saw a 20.70 percent rise in the System Usability Score." }] },
      { type: "image", url: `${SECOND_OFFICE_BASE}/case-study/second-office/Frame_2.png`, caption: "SUS evaluation of the product after re-designs" },
    ],
  },
  {
    id: "closure",
    kicker: "09 · Conclusion",
    title: "Closure",
    blocks: [
      { type: "paragraph", rich: [{ text: "In the early stage of this product, from ideas to concepts to hand-offs, we as designers put our best to involve and adapt the best practices for the best results. And, looking upon the results, the efforts felt worth it. Based on user feedback, we have chosen to add several features in the future. We will also create a store page to assist our customer in obtaining actual assets required by their personnel." }] },
      { type: "paragraph", rich: [{ text: "The constant process of testing, finding flaws, and correcting them will continue throughout the product cycle with this lean UX design process." }] },
    ],
  },
];

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
    staticPayload: {
      title: "From stigma to empowerment — the evolution of loans through FinPy",
      cover: `https://www.pradyumnasrivastava.com/case-study/finpy/Section_852773771_(1)-min.png`,
      icon: null,
      slides: finpySlides,
      fetchedAt: Date.now(),
    },
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
    staticPayload: {
      title: "Measuring design impact with the System Usability Scale",
      cover: caseSecondOfficePng,
      icon: null,
      slides: secondOfficeSlides,
      fetchedAt: Date.now(),
    },
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
    eyebrow: "Enterprise Fintech · AI Launchpad Design",
    client: "Mastercard",
    role: "Senior Product Designer",
    year: "2024",
    summary:
      "An AI-assisted launchpad converging four siloed analytics products into a unified decision surface for financial institutions.",
    notionPageId: "mastercard",
    serverProtected: true,
    accent: "#F59E0B",
    highlights: {
      problem:
        "Financial institutions struggled to extract cross-portfolio insights due to 4 fragmented analytics tools.",
      solution:
        "Unified AI-assisted launchpad consolidating data streams into real-time opportunity cards.",
      metrics: [
        { value: "+28%", label: "More Uncovered Growth Opportunities" },
        { value: "4 → 1", label: "Siloed Analytics Tools Consolidated" },
        { value: "-55%", label: "Faster Decision Analysis Time" },
      ],
      keyTakeaways: [
        "Unifying fragmented data surfaces unlocked high-margin opportunity discovery for FI analysts.",
        "AI-assisted recommendations reduced manual cross-referencing from hours to seconds.",
        "Role-tailored dashboards enabled executive and analyst alignment on high-priority portfolio actions.",
      ],
    },
  },
};

export function getCaseStudy(slug: string): CaseStudyConfig | undefined {
  return CASE_STUDIES[slug];
}
