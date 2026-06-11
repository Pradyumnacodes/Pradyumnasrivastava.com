import caseMastercard from "@/assets/case-mastercard.jpg";
import caseFinpy from "@/assets/case-finpy.png";
import caseSecondOffice from "@/assets/case-second-office.png";
import type { Story } from "@/components/StoryList";

export const EMAIL = "pradyumna.s.edu@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/pradyumnasrivastava/";
export const MEDIUM = "https://medium.com/@ecapsdesign";
export const RESUME_URL = "/pradyumna_srivastava_resume.pdf";

export type CaseCard = {
  slug: "mastercard" | "finpy" | "second-office";
  year: string;
  title: string;
  blurb: string;
  image: string;
  locked?: boolean;
};

export const CASES: CaseCard[] = [
  {
    slug: "mastercard",
    year: "2024",
    title: "Enabling FIs to uncover 28% more growth opportunities.",
    blurb:
      "An AI-assisted launchpad converging four siloed analytics products into one decision surface.",
    image: caseMastercard,
    locked: true,
  },
  {
    slug: "finpy",
    year: "2023",
    title: "From stigma to empowerment: loans, reframed through FinPy.",
    blurb:
      "Field research across Tier-2/3 India turned credit from a source of shame into a tool of dignity.",
    image: caseFinpy,
  },
  {
    slug: "second-office",
    year: "2022",
    title: "Measuring design impact with the System Usability Scale.",
    blurb:
      "A defensible, repeatable measurement loop that quantifies the impact of every design decision.",
    image: caseSecondOffice,
  },
];

export const STORIES: Story[] = [
  {
    title: "Hug Content or Fill Container? From Zero to Hero of Responsive Designs",
    link: "https://medium.com/design-bootcamp/hug-content-or-fill-container-from-zero-to-hero-of-responsive-designs-be036e8a21ba",
    img: "https://cdn-images-1.medium.com/max/800/1*Co2Vg-61aaE4fQVwZxcycA.gif",
    date: "Aug 2022",
    readMin: 5,
    views: "20K",
    reads: "9.7K",
  },
  {
    title: "Starting with design system? Make sure you know these 10 points",
    link: "https://medium.com/design-bootcamp/starting-with-design-system-make-sure-you-know-these-ten-points-2ddc1662efdb",
    img: "https://cdn-images-1.medium.com/max/1024/1*0dDoRnJ9mU3tHMIHWQt1IQ.png",
    date: "Feb 2022",
    readMin: 6,
    views: "3.9K",
    reads: "1.5K",
  },
  {
    title: "Brutalism to Neu-brutalism — What, Why and How?",
    link: "https://medium.com/design-bootcamp/brutalism-to-neu-brutalism-what-why-and-how-456c6a7f081a",
    img: "https://cdn-images-1.medium.com/max/498/1*5UIVqf7Uh5VgGSqGV7y3KA.gif",
    date: "May 2022",
    readMin: 4,
    views: "610",
    reads: "306",
  },
  {
    title: "Protect yourself from arguments at workplace like a pro",
    link: "https://medium.com/design-bootcamp/protect-yourself-from-arguments-at-workplace-like-a-pro-879e71fbf477",
    img: "https://cdn-images-1.medium.com/max/1024/0*-cuaGTiC_O4yx0Cq",
    date: "Apr 2023",
    readMin: 5,
    views: "432",
    reads: "223",
  },
  {
    title: "Creativity and Corporate | The Hidden Struggle",
    link: "https://medium.com/design-bootcamp/creativity-and-corporate-the-hidden-struggle-b44b1eaa0026",
    img: "https://cdn-images-1.medium.com/max/1024/0*jFlbXoh3BlMmg9zZ",
    date: "Jun 2024",
    readMin: 3,
  },
  {
    title: "The Art and Science of User Research",
    link: "https://medium.com/nyc-design/the-art-and-science-of-user-research-5a485e5675cb",
    img: "https://cdn-images-1.medium.com/max/1024/1*7bI-n-o5ErZYQoQwjV4Dkw.jpeg",
    date: "Apr 2024",
    readMin: 7,
  },
  {
    title: "BECOME THE TOP 1% DESIGNER",
    link: "https://ecapsdesign.medium.com/why-you-suck-as-a-designer-and-how-i-can-change-your-life-bc821be6b533",
    img: "https://cdn-images-1.medium.com/max/1024/1*sYp_8CTJq0LeiNMCjjT1yQ.jpeg",
    date: "May 2023",
    readMin: 6,
  },
  {
    title: "The Paradox of Questionable UI in Popular Products",
    link: "https://medium.com/design-bootcamp/the-paradox-of-questionable-ui-in-popular-products-bed596f8e6a3",
    img: "https://cdn-images-1.medium.com/max/1024/0*x12fLJZwXtbiYUib",
    date: "Apr 2023",
    readMin: 4,
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
