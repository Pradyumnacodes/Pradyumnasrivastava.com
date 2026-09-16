import React from "react";

export function CompanyLogo({ company }: { company: string }) {
  if (company.includes("Mastercard")) {
    return (
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 rounded-full ring-[1.5px] ring-[#00FF00]/60 ring-offset-2 ring-offset-background transition-all duration-500 group-hover:ring-[#00FF00]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="16" r="10" fill="#EB001B" />
        <circle cx="20" cy="16" r="10" fill="#F79E1B" />
        <clipPath id="mc-clip">
          <circle cx="12" cy="16" r="10" />
        </clipPath>
        <circle cx="20" cy="16" r="10" fill="#FF5F00" clipPath="url(#mc-clip)" />
      </svg>
    );
  }
  if (company.includes("goGlocal")) {
    return (
      <img
        src="/logos/goglocal-hq.png"
        alt="goGlocal"
        className="w-8 h-8 object-contain bg-white p-1 rounded-md grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    );
  }
  if (company.includes("Zype")) {
    return (
      <img
        src="/logos/zype-hq.png"
        alt="Zype"
        className="w-8 h-8 object-contain rounded-md grayscale opacity-40 mix-blend-screen group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    );
  }
  if (company.includes("RedRob")) {
    return (
      <img
        src="/logos/redrob-hq.png"
        alt="RedRob"
        className="w-8 h-8 object-contain rounded-md grayscale opacity-40 mix-blend-screen group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    );
  }
  return null;
}
