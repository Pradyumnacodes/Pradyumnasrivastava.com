import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CaseStudyConfig } from "@/lib/case-studies";
import { CasePayload, SlideBlock, Slide } from "@/lib/notion.functions";
import { ImageLightbox } from "./ImageLightbox";
import { Lock, ArrowLeft } from "lucide-react";
import { CaseStudyScrubber } from "./CaseStudyScrubber";
import { HeroFrame } from "./blocks/HeroFrame";
import { SlideTitleFrame } from "./blocks/SlideTitleFrame";
import { RenderBlock } from "./blocks/RenderBlock";

interface CaseStudyArticleProps {
  study: CaseStudyConfig;
  payload: CasePayload;
}

interface Frame {
  id: string;
  slide: Slide;
  block: SlideBlock | "HERO" | "SLIDE_TITLE";
  index: number;
}

export function CaseStudyArticle({ study, payload }: CaseStudyArticleProps) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const frames: Frame[] = useMemo(() => {
    const arr: Frame[] = [];
    arr.push({ id: "hero", slide: { id: "hero", title: study.title, kicker: "00 · Intro", blocks: [] }, block: "HERO", index: 0 });
    
    let idx = 1;
    payload.slides.forEach(slide => {
      // If slide has a title, insert a title block frame to introduce the section
      if (slide.title && slide.id !== "cover") {
        arr.push({ id: `${slide.id}-title`, slide, block: "SLIDE_TITLE", index: idx++ });
      }
      slide.blocks.forEach(block => {
        arr.push({ id: `${slide.id}-${idx}`, slide, block, index: idx++ });
      });
    });
    return arr;
  }, [study, payload]);

  // Map vertical wheel to horizontal scroll (Optimized)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let rafId: number;

    const handleWheel = (e: WheelEvent) => {
      // If deltaX is significant, user is using horizontal scroll natively (trackpad horizontal swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      // Otherwise map vertical to horizontal
      if (e.deltaY !== 0) {
        e.preventDefault();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.scrollLeft += e.deltaY;
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <article className="fixed inset-0 bg-background text-foreground font-sans selection:bg-foreground/20 overflow-hidden flex flex-col">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-40 p-6 md:p-8 mix-blend-difference pointer-events-none flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-3 text-sm md:text-base font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          <span>Pradyumna Srivastava</span>
        </Link>

        {study.serverProtected && (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium tracking-tight border border-foreground/20 text-foreground/60 rounded-full pointer-events-auto">
            <Lock className="w-3 h-3" /> NDA
          </span>
        )}
      </nav>

      {/* Main Continuous Horizontal Track */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 w-full h-full overflow-x-auto overflow-y-hidden flex items-center gap-16 md:gap-32 px-12 md:px-32 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {frames.map((frame) => (
          <div 
            key={frame.id}
            data-slide-id={frame.slide.id}
            className="scrub-frame shrink-0 flex items-center h-full animate-entrance-glass"
          >
            {frame.block === "HERO" ? (
              <HeroFrame study={study} />
            ) : frame.block === "SLIDE_TITLE" ? (
              <SlideTitleFrame slide={frame.slide} />
            ) : (
              <RenderBlock
                block={frame.block}
                onOpenLightbox={(src, alt, caption) =>
                  setActiveImage({ src, alt, caption })
                }
              />
            )}
          </div>
        ))}
        {/* End padding */}
        <div className="shrink-0 w-32 h-full"></div>
      </main>

      <CaseStudyScrubber study={study} payload={payload} scrollContainerRef={scrollContainerRef} />

      {/* Fullscreen Image Lightbox Modal */}
      {activeImage && (
        <ImageLightbox
          src={activeImage.src}
          alt={activeImage.alt}
          caption={activeImage.caption}
          onClose={() => setActiveImage(null)}
        />
      )}
    </article>
  );
}
