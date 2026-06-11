import type { CasePayload, Slide } from "./notion.functions";

const slides: Slide[] = [
  {
    id: "meta",
    kicker: "SecondOffice- A Case Study",
    title: "Project Understanding",
    blocks: [
      {
        type: "paragraph",
        rich: [
          {
            text:
              "Alex is an entrepreneur in the USA, who has a vision of developing an iOS app for his ongoing project. He wants to hire a team from India as they are affordable and talented. Yet, he does not want to hire them as freelancers or on a contract basis. He wants to hire them as his employees and establish an office in India itself.",
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
          {
            text:
              "We conducted the first stage interview with the concerned HR workforce. We made a group of 8 HR individuals. And then we interviewed them upon a few open-ended statements about the end-user. And then we card-sorted their thoughts, ideas and suggestions as these 3 main pointers.",
          },
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
          {
            text:
              "Here, trust is a key component; Alex won't give his money to untrustworthy market participants to hire on his behalf. Alex is naturally cautious, therefore he will require ongoing input from the recruiting authority. Alex will require a well-known market participant with enough publicly available information about them to be able to trust staffing agencies.",
          },
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
          {
            text:
              "Alex does not want to go through the time consuming legal requirements to open an office in India because doing so takes a lot of effort and money. Management in India is a difficulty for him since even after recruiting, there is a chance that workers won't complete their responsibilities.",
          },
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
          {
            text:
              "Alex doesn't have enough funds to spare for hiring an immense workforce in India, all alone. He does not want to assign the same work to his own HR staff. Alex finds it difficult to put resources in place for hiring in India.",
          },
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
          {
            text:
              "We must first determine who will be our user and audience. Finding a good user is simple, but distinguishing who is not our user is difficult. These characteristics determine who our core audience is.",
          },
        ],
      },
      { type: "numbered", rich: [{ text: "Age" }] },
      { type: "numbered", rich: [{ text: "Occupation" }] },
      { type: "numbered", rich: [{ text: "Location" }] },
      {
        type: "image",
        url: "/case-study/second-office/target_audience.png",
        caption: "Target audience breakdown",
      },
    ],
  },
  {
    id: "user-persona",
    kicker: "03 · Persona",
    title: "User Persona from the Earlier Research",
    blocks: [
      {
        type: "image",
        url: "/case-study/second-office/unnamed.png",
        caption: "User Persona 1",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(1).png",
        caption: "User Persona 2",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Persona Insights for User Frustrations" }],
      },
      {
        type: "quote",
        rich: [
          { text: "Currency Variation – Our User is concerned about the continual change in currency.", bold: true },
        ],
      },
      {
        type: "quote",
        rich: [
          { text: "Keeping up with the recruiting process – Our user is upset with the lack of contact from HR, which is due to time zone differences, high communication costs, and tapping for every update.", bold: true },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/information_architecture.png",
        caption: "Information Architecture",
      },
    ],
  },
  {
    id: "proposed-solution",
    kicker: "04 · Solutions",
    title: "Proposed Solution",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "1. For the Currency Variation issue" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "We recognized that currency adjustment would be a significant influence, thus we proposed adopting a standard conversion for the same. Once selected, the platform's currency will be set to the user's default currency.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/pr_sol_2.png",
        caption: "Currency variation solution",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "2. For Keeping up with the Recruiting Process issue" }],
      },
      {
        type: "paragraph",
        rich: [
          {
            text:
              "For the second frustration, we decided to create a table that will indicate each candidate's progress. So, the true problem is to design an intuitive dashboard with tremendous ease to reduce any such discomfort.",
          },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/pr_sol_1.png",
        caption: "Recruiting process dashboard",
      },
    ],
  },
  {
    id: "usability-testing",
    kicker: "05 · Testing",
    title: "Conducting Usability Testing",
    blocks: [
      {
        type: "callout",
        emoji: "😃",
        rich: [
          {
            text:
              "Usability testing assesses whether our audience can effectively accomplish activities on their own. We gave simple tasks to testers and watched their behaviour throughout usability testing. The user's first step was to post a job on SecondOffice.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Insights from the User Testing" }],
      },
      {
        type: "quote",
        rich: [
          {
            text:
              "We gathered overall insights from our key stakeholders, Our Client and Human Resources. These are the individuals who will make use of our platform.",
          },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Key issue 1: ", bold: true },
          { text: "During the testing, we saw that it took our user longer to compute the currency conversion. We identified this as a feature that should be included in our platform." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Key issue 2: ", bold: true },
          { text: "We also discovered that the phrases \"CTC\" and \"ECTC\" made very little sense to users from demographics other than INDIA." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Key issue 3: ", bold: true },
          { text: "Currency standardisation. We discovered that currency jargon changed from nation to country. For example, in INDIA, normal payroll is expressed as Salary * Lakh per annum, but in the US, it is salary * $10k per annum." },
        ],
      },
      {
        type: "bullet",
        rich: [
          { text: "Key issue 4: ", bold: true },
          { text: "It was also mentioned by a client that their organisation has a distinct hiring process for different profiles, thus they would want some control over the hiring process." },
        ],
      },
    ],
  },
  {
    id: "sus-evaluation",
    kicker: "06 · Evaluation",
    title: "S.U.S. Evaluation prior to re-design",
    blocks: [
      {
        type: "quote",
        rich: [
          { text: "We asked a group of eight people to use our platform and complete the tasks listed below." },
        ],
      },
      { type: "numbered", rich: [{ text: "Post a job on the platform." }] },
      { type: "numbered", rich: [{ text: "Edit the Job Description once done with the job post." }] },
      { type: "numbered", rich: [{ text: "Then, use the dashboard to sort out through various lists and filters, prompted by the data from backend." }] },
      { type: "numbered", rich: [{ text: "Navigate to the pages and sub-pages and examine the overall ease and clarity of the product." }] },
      {
        type: "callout",
        emoji: "🛠",
        rich: [
          { text: "Inference: ", bold: true },
          { text: "Since the overall SUS score is less than 60, i.e. 51.87 - the product needs to be seriously re-considered in terms of easability, accesibility and clarity." },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/Frame_1.png",
        caption: "SUS analysis prior to re-designs",
      },
    ],
  },
  {
    id: "redesigns",
    kicker: "07 · Design Iterations",
    title: "‘Before and After’ Designs for specific problems",
    blocks: [
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 1" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "CTC and ECTC are industrial buzzwords used in INDIA that are widely known in the demography. In other nations, however, this was not the case. As a result, we included an information indicator icon to assist the user in determining what the jargon meant.", bold: true },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(3).png",
        caption: "Information indicator icon",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(4).png",
        caption: "Hover state for definition",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 2" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "Another concern raised during user testing was the standardisation of currencies in compensation. We discovered that the salary chips provided above were not assisting users since they were not standard in their currency.", bold: true },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "A 0-3 LPA chip is OK for INDIA, but when translated to USD, it becomes 0-3.7K, which is horrible because the baseline in the US should be 0-10K. We turned them into an input field, which solved our issue of standardising the salary fields." },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed.jpg",
        caption: "Before: Salary chips",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(5).png",
        caption: "After: Standardized input fields",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 3" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "Because there was no filtration of dates in this design, it was difficult to examine the assessment of an employee for any given date. Instead, we used to evaluate the person directly. Following the adoption of the new design, we are now arranging them based on dates, which also sorts the ratings for each employee.", bold: true },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(6).png",
        caption: "Before: No date filtration",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(7).png",
        caption: "After: Arranging based on dates",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 4" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "We also observed that consumers require a preliminary platform explanation for a better understanding of the flow. Users were also rushing to hire rather than filling out the firm details, which might jeopardise the organization's reliability. We made one time onboarding overlays which helped users to understand the basic information architecture of the platform.", bold: true },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(8).png",
        caption: "Before: No onboarding",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(9).png",
        caption: "After: Onboarding overlays",
      },
      {
        type: "heading",
        level: 3,
        rich: [{ text: "Redesign 5" }],
      },
      {
        type: "paragraph",
        rich: [
          { text: "We agreed that users should be prompted to finish their profiles before proceeding with job posting, thus we established a progress bar to assist users in traversing to complete their profiles.", bold: true },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(10).png",
        caption: "Progress bar step 1",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(11).png",
        caption: "Progress bar step 2",
      },
      {
        type: "image",
        url: "/case-study/second-office/unnamed_(12).png",
        caption: "Progress bar step 3",
      },
    ],
  },
  {
    id: "sus-after",
    kicker: "08 · Evaluation Post-Redesign",
    title: "S.U.S Evaluation after the redesigns",
    blocks: [
      {
        type: "quote",
        rich: [
          { text: "Once again, we asked a different group of eight people, to use our platform and complete the tasks listed below. It is important to continually keep the stakeholders and the end-users in loop with the modifications." },
        ],
      },
      {
        type: "callout",
        emoji: "🛠",
        rich: [
          { text: "Inference: ", bold: true },
          { text: "Gladly, the overall end SUS score is more than 60, i.e. 72.57 - the product is now ready to get to use. The success rate of tasks has significantly increased. Furthermore, when we compared the former score (51.87) to the improved value (72.57), we saw a 20.70 percent rise in the System Usability Score." },
        ],
      },
      {
        type: "image",
        url: "/case-study/second-office/Frame_2.png",
        caption: "SUS evaluation of the product after re-designs",
      },
    ],
  },
  {
    id: "closure",
    kicker: "09 · Conclusion",
    title: "Closure",
    blocks: [
      {
        type: "paragraph",
        rich: [
          { text: "In the early stage of this product, from ideas to concepts to hand-offs, we as designers put our best to involve and adapt the best practices for the best results. And, looking upon the results, the efforts felt worth it. Based on user feedback, we have chosen to add several features in the future. We will also create a store page to assist our customer in obtaining actual assets required by their personnel." },
        ],
      },
      {
        type: "paragraph",
        rich: [
          { text: "The constant process of testing, finding flaws, and correcting them will continue throughout the product cycle with this lean UX design process." },
        ],
      },
    ],
  },
];

export const SECOND_OFFICE_PAYLOAD: CasePayload = {
  title: "Measuring design with the System Usability Scale",
  cover: "/case-study/second-office/metatagImg.jpg",
  icon: null,
  slides: [
    {
      id: "cover",
      kicker: "Case Study",
      title: "Measuring design with the System Usability Scale",
      blocks: [],
    },
    ...slides,
  ],
  fetchedAt: Date.now(),
};
