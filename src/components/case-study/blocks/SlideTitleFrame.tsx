import React from "react";
import { Slide } from "@/lib/notion.functions";

export function SlideTitleFrame({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col gap-6 w-[85vw] max-w-[800px]">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-foreground/20"></span>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground/60">{slide.kicker}</span>
        <span className="h-px flex-1 bg-foreground/20"></span>
      </div>
      <h2 className="text-4xl md:text-6xl font-semibold tracking-normal text-center text-foreground/90 text-balance">
        {slide.title}
      </h2>
    </div>
  );
}
