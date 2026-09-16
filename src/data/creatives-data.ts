import caseGoglocal from "@/assets/case-goglocal.jpg";
import caseZype from "@/assets/case-zype.jpg";
import creativeTopmate from "@/assets/creative-topmate.jpg";
import creativeFigmakeathon from "@/assets/creative-figmakeathon.jpg";
import creativeBrucira from "@/assets/creative-brucira.jpg";
import creativeGoglocalMerch from "@/assets/creative-goglocal-merch.jpg";
import creativeVa from "@/assets/creative-va.jpg";
import creativeBluper from "@/assets/creative-bluper.jpg";
import type { MediumStory } from "@/components/MediumMarquee";

export type CreativeItem = {
  tag: string;
  title: string;
  body: string;
  image: string | null;
  span: string;
  dark: boolean;
  href?: string;
};

export const MEDIUM_STORIES: MediumStory[] = [
  {
    title: "Hug Content or Fill Container? From Zero to Hero of Responsive Designs",
    link: "https://medium.com/design-bootcamp/hug-content-or-fill-container-from-zero-to-hero-of-responsive-designs-be036e8a21ba",
    img: "https://cdn-images-1.medium.com/max/800/1*Co2Vg-61aaE4fQVwZxcycA.gif",
    date: "Aug 16, 2022",
    readMin: 5,
    views: "20K",
    reads: "9.7K",
  },
  {
    title: "Starting with design system? Make sure you know these 10 points",
    link: "https://medium.com/design-bootcamp/starting-with-design-system-make-sure-you-know-these-ten-points-2ddc1662efdb",
    img: "https://cdn-images-1.medium.com/max/1024/1*0dDoRnJ9mU3tHMIHWQt1IQ.png",
    date: "Feb 9, 2022",
    readMin: 6,
    views: "3.9K",
    reads: "1.5K",
  },
  {
    title: "Brutalism to Neu-brutalism ~ What, Why and How?",
    link: "https://medium.com/design-bootcamp/brutalism-to-neu-brutalism-what-why-and-how-456c6a7f081a",
    img: "https://cdn-images-1.medium.com/max/498/1*5UIVqf7Uh5VgGSqGV7y3KA.gif",
    date: "May 30, 2022",
    readMin: 4,
    views: "610",
    reads: "306",
  },
  {
    title: "Protect yourself from arguments at workplace like a pro",
    link: "https://medium.com/design-bootcamp/protect-yourself-from-arguments-at-workplace-like-a-pro-879e71fbf477",
    img: "https://cdn-images-1.medium.com/max/1024/0*-cuaGTiC_O4yx0Cq",
    date: "Apr 17, 2023",
    readMin: 5,
    views: "432",
    reads: "223",
  },
  {
    title: "Creativity and Corporate | The Hidden Struggle",
    link: "https://medium.com/design-bootcamp/creativity-and-corporate-the-hidden-struggle-b44b1eaa0026",
    img: "https://cdn-images-1.medium.com/max/1024/0*jFlbXoh3BlMmg9zZ",
    date: "Jun 12, 2024",
    readMin: 3,
  },
  {
    title: "The Art and Science of User Research",
    link: "https://medium.com/nyc-design/the-art-and-science-of-user-research-5a485e5675cb",
    img: "https://cdn-images-1.medium.com/max/1024/1*7bI-n-o5ErZYQoQwjV4Dkw.jpeg",
    date: "Apr 16, 2024",
    readMin: 7,
  },
  {
    title: "BECOME THE TOP 1% DESIGNER",
    link: "https://ecapsdesign.medium.com/why-you-suck-as-a-designer-and-how-i-can-change-your-life-bc821be6b533",
    img: "https://cdn-images-1.medium.com/max/1024/1*sYp_8CTJq0LeiNMCjjT1yQ.jpeg",
    date: "May 16, 2023",
    readMin: 6,
  },
  {
    title: "The Paradox of Questionable UI in Popular Products",
    link: "https://medium.com/design-bootcamp/the-paradox-of-questionable-ui-in-popular-products-bed596f8e6a3",
    img: "https://cdn-images-1.medium.com/max/1024/0*x12fLJZwXtbiYUib",
    date: "Apr 13, 2023",
    readMin: 4,
  },
  {
    title: "iOS Design for Beginners: A Guide for Android Designers",
    link: "https://medium.com/design-bootcamp/iosios-design-for-beginners-a-guide-for-android-designers-b07f2489ee9",
    img: "https://cdn-images-1.medium.com/max/1024/1*fLDWHlXj8pZEAoG7WlwrgA.jpeg",
    date: "Apr 1, 2023",
    readMin: 3,
  },
  {
    title: "Learning Type for Web Design? Make Sure You Know These 5 Tips",
    link: "https://medium.com/design-bootcamp/learning-typography-make-sure-you-know-these-5-tips-da35bb178ddc",
    img: "https://cdn-images-1.medium.com/max/1024/1*-bqsaK-Y3QIpFGoQ1kDj6Q.png",
    date: "Apr 5, 2022",
    readMin: 6,
  },
];

export const CREATIVE_ITEMS: CreativeItem[] = [
  {
    tag: "goGlocal · Cross-border",
    title: "Global commerce infrastructure.",
    body: "SKU management, logistics, warehousing, and global payment-settlement software, plus pitch decks for funding rounds.",
    image: caseGoglocal,
    span: "md:col-span-8",
    dark: false,
  },
  {
    tag: "Brucira · Figma study",
    title: "Brucira UI deconstruction.",
    body: "Reverse-engineering a design system — palette, type, rhythm, placement — to reproduce it pixel-faithful.",
    image: creativeBrucira,
    span: "md:col-span-4",
    dark: false,
    href: "https://www.figma.com/design/KrkXdRMxMELvPyjGPS6qSs/Brucira-Clone?node-id=0-1",
  },
  {
    tag: "Zype · D2C Fintech",
    title: "Gamified credit UX.",
    body: "Habit loops, repayment nudges, and progress framing — small interface decisions that compound into measurable financial behaviour.",
    image: caseZype,
    span: "md:col-span-6",
    dark: false,
  },
  {
    tag: "RedRob · India × South Korea",
    title: "Early craft, fast feedback.",
    body: "Usability audits, design sprints, user surveys, and clean dev handoff with cross-border teams.",
    image: null,
    span: "md:col-span-6",
    dark: false,
  },
  {
    tag: "Topmate · 1:1 sessions",
    title: "Mentorship, in the open.",
    body: "Portfolio reviews, design-system audits, and career sparring — bookable directly. Where I trade hours for sharper hands.",
    image: creativeTopmate,
    span: "md:col-span-4",
    dark: false,
    href: "https://topmate.io/dashboard/services/edit/basic-details?id=1026949&type=5",
  },
  {
    tag: "Figmakeathon · Hackathon",
    title: "Built in one weekend.",
    body: "A small, scrappy build for the Figma Makeathon — design, prototype, ship before the clock runs out.",
    image: creativeFigmakeathon,
    span: "md:col-span-4",
    dark: true,
    href: "https://www.linkedin.com/posts/pradyumnasrivastava_figmamakeathon-activity-7434506545545187328-0KLR",
  },
  {
    tag: "goGlocal · Merchandise",
    title: "Brand, off the screen.",
    body: "Apparel, packaging, and unboxing moments — translating a cross-border SaaS identity into objects you can hold.",
    image: creativeGoglocalMerch,
    span: "md:col-span-4",
    dark: false,
    href: "https://www.instagram.com/goglocal.live/",
  },
  {
    tag: "VA · Product design",
    title: "Voice-first interactions.",
    body: "Designing for an assistant where the interface mostly listens — quiet states, fallbacks, and trust signals.",
    image: creativeVa,
    span: "md:col-span-6",
    dark: false,
    href: "https://www.figma.com/design/8gZZrqoVtVIusGyumviPwm/VA?node-id=0-1",
  },
  {
    tag: "Bluper · Problem framing",
    title: "Start with the question.",
    body: "Before pixels: untangling user, business, and edge-case constraints into a problem worth solving.",
    image: creativeBluper,
    span: "md:col-span-6",
    dark: false,
    href: "https://www.figma.com/design/FtSwp5JD484VCnA1e02Kst/Bluper-problem-statement?node-id=84-1506",
  },
  {
    tag: "More coming",
    title: "This page grows.",
    body: "A working dump — explorations, deconstructions, and shipped odds-and-ends get parked here as I make them.",
    image: null,
    span: "md:col-span-12",
    dark: true,
  },
];
