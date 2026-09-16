import React from "react";
import { CaseStudyConfig } from "@/lib/case-studies";

export function HeroFrame({ study }: { study: CaseStudyConfig }) {
  return (
    <div className="flex flex-col gap-12 w-[85vw] max-w-[1200px]">
      <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] tracking-tight font-semibold text-foreground/90 leading-[0.9] text-balance">
        {study.title}
      </h1>
      <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-foreground/70 font-medium leading-snug max-w-4xl text-balance">
        {study.summary}
      </p>

      <div className="flex gap-12 font-sans text-sm md:text-base font-semibold tracking-normal text-foreground/50 mt-8 border-t border-foreground/20 pt-8">
        <div>
          <div className="mb-2 text-foreground/30">Client</div>
          <div className="text-foreground/80">{study.client}</div>
        </div>
        <div>
          <div className="mb-2 text-foreground/30">Role</div>
          <div className="text-foreground/80">{study.role}</div>
        </div>
        <div>
          <div className="mb-2 text-foreground/30">Timeline</div>
          <div className="text-foreground/80">{study.year}</div>
        </div>
      </div>
    </div>
  );
}
