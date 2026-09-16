import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowDown,
  Layers,
} from "lucide-react";
import type { Slide, SlideBlock, RichText } from "@/lib/notion.functions";
import type { CaseStudyConfig } from "@/lib/case-studies";

interface Props {
  study: CaseStudyConfig;
  slides: Slide[];
  onExpandFullCaseStudy: () => void;
}

function Rich({ rich }: { rich: RichText[] }) {
  return (
    <>
      {rich.map((r, i) => {
        let node: React.ReactNode = r.text;
        if (r.code)
          node = (
            <code className="font-mono text-[0.88em] bg-foreground/10 px-1.5 py-0.5 rounded">
              {node}
            </code>
          );
        if (r.bold) node = <strong className="font-semibold text-foreground">{node}</strong>;
        if (r.italic) node = <em className="italic">{node}</em>;
        if (r.underline) node = <u>{node}</u>;
        if (r.href)
          node = (
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-foreground/60 hover:decoration-foreground transition"
            >
              {node}
            </a>
          );
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

export function VisualSlideDeck({ study, slides, onExpandFullCaseStudy }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Short version consists of 10 slides
  const shortSlides = slides.slice(0, 10);
  const totalSlides = shortSlides.length;
  const currentSlide = shortSlides[currentIndex] || shortSlides[0];

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (e.key === " ") e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const imageBlock = currentSlide?.blocks.find((b) => b.type === "image") as
    | Extract<SlideBlock, { type: "image" }>
    | undefined;

  const paragraphBlock = currentSlide?.blocks.find((b) => b.type === "paragraph") as
    | Extract<SlideBlock, { type: "paragraph" }>
    | undefined;

  const quoteBlock = currentSlide?.blocks.find((b) => b.type === "quote") as
    | Extract<SlideBlock, { type: "quote" }>
    | undefined;

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto space-y-6 ${
        isFullscreen
          ? "h-screen bg-background p-6 flex flex-col justify-between overflow-y-auto"
          : ""
      }`}
    >
      {/* Slide Deck Meta Chrome */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground px-1">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-foreground font-semibold text-[11px] uppercase tracking-wider"
            style={{ backgroundColor: `${study.accent}20`, color: study.accent }}
          >
            Slide {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline opacity-60">Use ← → arrow keys to navigate</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hidden md:inline">
            10-Slide Presentation Deck
          </span>
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 rounded-full hover:bg-foreground/5 transition text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 16:9 Visual Slide Presentation Frame */}
      <div
        className="w-full bg-card ring-1 ring-border/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative"
        style={{ borderTop: `4px solid ${study.accent}` }}
      >
        {/* Slide Top Banner */}
        <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between gap-4 bg-foreground/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: study.accent }} />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground font-semibold">
              {currentSlide?.kicker || study.eyebrow}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            {study.client}
          </span>
        </div>

        {/* Core Visual Slide Content Area */}
        <div className="p-8 md:p-12 space-y-6 my-auto">
          {currentSlide?.title && (
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold leading-tight tracking-tight text-balance">
              {currentSlide.title}
            </h2>
          )}

          {/* Visual Slide Image or High-Impact Content Layout */}
          {imageBlock ? (
            <figure className="my-4 rounded-2xl overflow-hidden ring-1 ring-border/50 bg-foreground/[0.02] shadow-sm">
              <img
                src={imageBlock.url}
                alt={imageBlock.caption || currentSlide?.title || ""}
                className="w-full h-auto max-h-[420px] object-contain mx-auto"
              />
              {imageBlock.caption && (
                <figcaption className="p-3 text-center text-xs font-mono text-muted-foreground bg-foreground/5 border-t border-border/40">
                  {imageBlock.caption}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 items-center">
              <div className="md:col-span-7 space-y-4">
                {paragraphBlock && (
                  <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed">
                    <Rich rich={paragraphBlock.rich} />
                  </p>
                )}
                {quoteBlock && (
                  <blockquote
                    className="pl-5 border-l-2 font-serif italic text-lg md:text-xl text-foreground my-4"
                    style={{ borderColor: study.accent }}
                  >
                    <Rich rich={quoteBlock.rich} />
                  </blockquote>
                )}
              </div>

              {study.highlights && (
                <div className="md:col-span-5 space-y-3">
                  <div
                    className="p-5 rounded-2xl bg-foreground/[0.03] ring-1 ring-border/50"
                    style={{ borderLeft: `3px solid ${study.accent}` }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground block mb-1">
                      Key Metric Highlight
                    </span>
                    <div className="text-2xl font-bold text-foreground font-sans">
                      {
                        study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                          ?.value
                      }
                    </div>
                    <div className="text-xs font-sans text-muted-foreground mt-0.5">
                      {
                        study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                          ?.label
                      }
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-foreground/[0.03] ring-1 ring-border/50">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground block mb-1">
                      Core Takeaway
                    </span>
                    <p className="text-xs md:text-sm font-sans text-foreground leading-relaxed">
                      {
                        study.highlights.keyTakeaways[
                          currentIndex % study.highlights.keyTakeaways.length
                        ]
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Slide Footer Navigation Bar */}
        <div className="px-8 py-5 border-t border-border/40 flex items-center justify-between gap-4 bg-foreground/[0.02]">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs border border-border hover:bg-foreground/5 transition disabled:opacity-30 disabled:pointer-events-none text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Slide Scrubber Strip */}
          <div className="flex items-center gap-2 overflow-x-auto px-2">
            {shortSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                title={`Slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-7" : "w-2.5 opacity-30 hover:opacity-70"
                }`}
                style={{
                  backgroundColor: idx === currentIndex ? study.accent : "currentColor",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex === totalSlides - 1}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs border border-border hover:bg-foreground/5 transition disabled:opacity-30 disabled:pointer-events-none text-foreground"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Option Banner to Expand Full Long-Form Case Study */}
      <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-background/15 text-background">
            <Sparkles className="w-3.5 h-3.5" />
            Completed 10-Slide Deck
          </div>
          <h3 className="font-sans text-xl md:text-2xl font-semibold leading-snug">
            Want to read the full in-depth case study?
          </h3>
          <p className="text-xs md:text-sm text-background/80 font-sans max-w-[50ch]">
            Explore complete research notes, high-res UI mockups, and end-to-end design iterations.
          </p>
        </div>

        <button
          onClick={onExpandFullCaseStudy}
          className="inline-flex items-center gap-2 bg-background text-foreground hover:bg-background/90 font-sans font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shrink-0"
        >
          <span>View Full In-Depth Case Study</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
