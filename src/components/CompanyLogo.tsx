import React from "react";

export function CompanyLogo({ company }: { company: string }) {
  if (company.includes("Mastercard")) {
    return (
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background transition-all duration-500 group-hover:ring-foreground/40"
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
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-foreground/[0.04] dark:bg-foreground/[0.06] border border-border p-1">
        <img
          src="/logos/goglocal.png"
          alt="goGlocal"
          className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-500"
        />
      </div>
    );
  }
  if (company.includes("Zype")) {
    return (
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-foreground/[0.04] dark:bg-foreground/[0.06] border border-border p-1">
        <img
          src="/logos/zype-hq.png"
          alt="Zype"
          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        />
      </div>
    );
  }
  if (company.includes("RedRob")) {
    return (
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-foreground/[0.04] dark:bg-foreground/[0.06] border border-border p-1">
        <img
          src="/logos/redrob-hq.png"
          alt="RedRob"
          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        />
      </div>
    );
  }
  return null;
}
