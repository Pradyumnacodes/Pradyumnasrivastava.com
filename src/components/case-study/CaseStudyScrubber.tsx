import React, { useState, useEffect } from "react";
import { CaseStudyConfig } from "@/lib/case-studies";
import { CasePayload } from "@/lib/notion.functions";

interface CaseStudyScrubberProps {
  study: CaseStudyConfig;
  payload: CasePayload;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function CaseStudyScrubber({ study, payload, scrollContainerRef }: CaseStudyScrubberProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlideId, setActiveSlideId] = useState<string>("hero");

  // Track horizontal scroll progress
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        setScrollProgress(progress);
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      el.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollContainerRef]);

  // Update active slide based on IntersectionObserver
  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersection = 0;
        let mostVisibleSlideId = activeSlideId;
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersection) {
            maxIntersection = entry.intersectionRatio;
            const slideId = entry.target.getAttribute("data-slide-id");
            if (slideId) mostVisibleSlideId = slideId;
          }
        });

        if (maxIntersection > 0.3 && mostVisibleSlideId !== activeSlideId) {
          setActiveSlideId(mostVisibleSlideId);
        }
      },
      { threshold: [0.3, 0.5, 0.8], root, rootMargin: "-20% 0px -20% 0px" }
    );

    // Initial query
    const elements = document.querySelectorAll(".scrub-frame");
    elements.forEach(el => observer.observe(el));

    // Optional: a MutationObserver to watch for newly added slides if they load asynchronously.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.classList.contains("scrub-frame")) {
            observer.observe(node);
          }
        });
      });
    });
    
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeSlideId, scrollContainerRef]);

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background to-transparent pt-12 pb-6 px-6 md:px-12 pointer-events-none">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-4 pointer-events-auto">
        {/* Progress Track */}
        <div className="w-full h-[2px] bg-foreground/10 relative rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-foreground transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Active Context & Instruction */}
        <div className="flex items-center justify-between font-sans text-xs md:text-sm font-medium tracking-tight text-foreground/50">
          <div className="flex gap-4">
            <span className="text-foreground/80">
              {payload.slides.find(s => s.id === activeSlideId)?.kicker || "00 · Intro"}
            </span>
            <span className="hidden md:inline">/</span>
            <span className="hidden md:inline">
              {payload.slides.find(s => s.id === activeSlideId)?.title || study.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-foreground/20 animate-pulse"></span>
            Scroll normally to explore
          </div>
        </div>
      </div>
    </footer>
  );
}
