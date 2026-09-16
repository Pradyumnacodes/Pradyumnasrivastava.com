import React from "react";
import { SlideBlock } from "@/lib/notion.functions";

export function RenderBlock({
  block,
  onOpenLightbox,
}: {
  block: SlideBlock;
  onOpenLightbox: (src: string, alt: string, caption?: string) => void;
}) {
  if (block.type === "paragraph") {
    return (
      <div className="w-[85vw] md:w-[600px]">
        <p className="leading-relaxed text-2xl md:text-3xl text-foreground/70 font-medium tracking-normal text-balance">
          {block.rich?.map((r, i) => (
            <span
              key={i}
              className={r.bold ? "font-bold text-foreground" : r.italic ? "italic text-foreground/40" : ""}
            >
              {r.text}
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (block.type === "heading") {
    return (
      <div className="w-[85vw] md:w-[600px] mt-8">
        <h3 className="text-xl md:text-3xl font-semibold tracking-normal text-foreground/90 text-balance">
          {block.rich?.map((r, i) => (
            <span key={i} className={r.italic ? "italic text-foreground/50" : ""}>{r.text}</span>
          ))}
        </h3>
      </div>
    );
  }

  if (block.type === "bullet") {
    return (
      <div className="w-[85vw] md:w-[600px] flex gap-6 items-start">
        <div className="w-2 h-2 rounded-full bg-foreground/20 mt-3 shrink-0"></div>
        <p className="leading-relaxed text-xl md:text-2xl text-foreground/70 font-medium tracking-normal text-balance">
          {block.rich?.map((r, i) => (
            <span
              key={i}
              className={r.bold ? "font-bold text-foreground" : r.italic ? "italic text-foreground/40" : ""}
            >
              {r.text}
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (block.type === "image" && block.url) {
    return (
      <figure className="group relative w-auto max-w-[85vw]">
        <div
          className="cursor-crosshair relative bg-foreground/5 overflow-hidden border border-foreground/10"
          onClick={() => onOpenLightbox(block.url!, block.caption || "Case study image", block.caption)}
        >
          <img
            src={block.url}
            alt={block.caption || "Case study artifact"}
            className="w-auto h-[50vh] md:h-[65vh] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            loading="lazy"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-6 font-sans text-sm md:text-base font-medium tracking-tight text-foreground/40">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "quote") {
    return (
      <div className="w-[85vw] md:w-[900px]">
        <blockquote className="font-sans text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] text-balance">
          "{block.rich?.map((r) => r.text).join(" ")}"
        </blockquote>
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <div className="w-[85vw] md:w-[600px] border border-foreground/20 bg-foreground/5 p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <span className="text-6xl">{block.emoji || "—"}</span>
        </div>
        <div className="relative z-10">
           <div className="font-sans text-sm font-semibold tracking-normal text-foreground/60 flex items-center gap-3 mb-8">
             <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
             Key Metric
           </div>
           
           <div className="font-sans text-2xl md:text-3xl font-medium tracking-normal text-foreground/90 leading-relaxed text-balance">
            {block.rich?.map((r, i) => (
              <span key={i} className={r.bold ? "font-medium text-green-400" : ""}>
                {r.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
