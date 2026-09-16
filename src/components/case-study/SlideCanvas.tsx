import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Sparkles, Layers } from "lucide-react";
import type { Slide, SlideBlock, RichText } from "@/lib/notion.functions";
import type { CaseStudyConfig } from "@/lib/case-studies";

interface Props {
  study: CaseStudyConfig;
  slides: Slide[];
  deckMode: "short" | "full";
  onDeckModeChange: (mode: "short" | "full") => void;
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

export function SlideCanvas({ study, slides, deckMode, onDeckModeChange }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clamp current index if slides array length changes
  const activeSlides = deckMode === "short" ? slides.slice(0, 10) : slides;
  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const totalSlides = activeSlides.length;

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  // Keyboard Navigation (Left / Right Arrow Keys)
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

  // Fullscreen Handler
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

  // Extract images & blocks from current slide
  const imageBlock = currentSlide?.blocks.find((b) => b.type === "image") as
    | Extract<SlideBlock, { type: "image" }>
    | undefined;

  const quoteBlock = currentSlide?.blocks.find((b) => b.type === "quote") as
    | Extract<SlideBlock, { type: "quote" }>
    | undefined;

  const calloutBlock = currentSlide?.blocks.find((b) => b.type === "callout") as
    | Extract<SlideBlock, { type: "callout" }>
    | undefined;

  const textBlocks = currentSlide?.blocks.filter(
    (b) => b.type === "paragraph" || b.type === "bullet" || b.type === "heading",
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto flex flex-col justify-between select-none ${
        isFullscreen ? "h-screen bg-background p-8" : ""
      }`}
    >
      {/* Presentation Control Header */}
      <div className="flex items-center justify-between gap-4 mb-4 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span
            className="px-2.5 py-1 rounded-md text-foreground font-semibold text-[11px] uppercase tracking-wider"
            style={{ backgroundColor: `${study.accent}20`, color: study.accent }}
          >
            Slide {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline opacity-60">Use ← → arrow keys to navigate</span>
        </div>

        {/* Deck Mode Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-full text-[11px]">
            <button
              onClick={() => {
                onDeckModeChange("short");
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                deckMode === "short"
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Short Deck (10 Slides)</span>
            </button>
            <button
              onClick={() => {
                onDeckModeChange("full");
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                deckMode === "full"
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Deck ({slides.length} Slides)</span>
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            title="Toggle fullscreen presentation"
            className="p-2 rounded-full hover:bg-foreground/5 transition text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 16:9 Widescreen Slide Frame Canvas */}
      <div
        className="w-full aspect-[16/9] min-h-[480px] md:min-h-[540px] bg-card ring-1 ring-border shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
        style={{ borderTop: `4px solid ${study.accent}` }}
      >
        {/* Top Header of the Slide */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: study.accent }} />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
              {currentSlide?.kicker || study.eyebrow}
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
            {study.client}
          </span>
        </div>

        {/* Core Slide Content (2-Column Split Widescreen Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-4 overflow-y-auto max-h-[calc(100%-120px)]">
          {/* Left Column: Title & Key Copy */}
          <div className={`${imageBlock ? "lg:col-span-6" : "lg:col-span-12"} space-y-6`}>
            {currentSlide?.title && (
              <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold leading-snug tracking-tight text-balance">
                {currentSlide.title}
              </h2>
            )}

            {textBlocks && textBlocks.length > 0 && (
              <div className="space-y-4 text-base md:text-lg text-foreground/90 font-sans leading-relaxed">
                {textBlocks.map((blk, idx) => (
                  <div key={idx}>{"rich" in blk && <Rich rich={blk.rich} />}</div>
                ))}
              </div>
            )}

            {quoteBlock && (
              <blockquote
                className="pl-5 border-l-2 font-sans italic text-lg text-foreground/90 my-4"
                style={{ borderColor: study.accent }}
              >
                <Rich rich={quoteBlock.rich} />
              </blockquote>
            )}

            {calloutBlock && (
              <div
                className="p-4 rounded-xl text-sm font-sans flex items-start gap-3 bg-foreground/[0.03] ring-1 ring-border"
                style={{ borderColor: `${study.accent}30` }}
              >
                {calloutBlock.emoji && <span className="text-xl">{calloutBlock.emoji}</span>}
                <div className="text-foreground">
                  <Rich rich={calloutBlock.rich} />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visual Artifact Image or Highlights Card */}
          {imageBlock ? (
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <figure className="w-full rounded-2xl overflow-hidden ring-1 ring-border bg-foreground/[0.02]">
                <img
                  src={imageBlock.url}
                  alt={imageBlock.caption || currentSlide?.title || ""}
                  className="w-full h-auto max-h-[340px] object-contain mx-auto"
                />
                {imageBlock.caption && (
                  <figcaption className="p-2 text-center text-xs font-mono text-muted-foreground bg-foreground/5">
                    {imageBlock.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          ) : (
            study.highlights && (
              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                <div
                  className="p-6 rounded-2xl bg-foreground/[0.02] ring-1 ring-border relative"
                  style={{ borderLeft: `3px solid ${study.accent}` }}
                >
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground block mb-2">
                    Key Metric Highlight
                  </span>
                  <div className="text-3xl font-bold text-foreground font-sans">
                    {
                      study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                        ?.value
                    }
                  </div>
                  <div className="text-xs font-sans text-muted-foreground mt-1">
                    {
                      study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                        ?.label
                    }
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-foreground/[0.02] ring-1 ring-border">
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground block mb-2">
                    Execution Takeaway
                  </span>
                  <p className="text-sm font-sans text-foreground leading-relaxed">
                    {
                      study.highlights.keyTakeaways[
                        currentIndex % study.highlights.keyTakeaways.length
                      ]
                    }
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer Scrubber & Deck Nav Buttons */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs border border-border hover:bg-foreground/5 transition disabled:opacity-30 disabled:pointer-events-none text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Interactive Slide Scrubber Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                title={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-6" : "w-2 hover:w-3 opacity-40 hover:opacity-80"
                }`}
                style={{
                  backgroundColor: i === currentIndex ? study.accent : "currentColor",
                }}
              />
            ))}
          </div>

          {currentIndex === totalSlides - 1 && deckMode === "short" ? (
            <button
              onClick={() => {
                onDeckModeChange("full");
                setCurrentIndex(10);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-xs font-semibold bg-foreground text-background hover:opacity-90 transition shadow-md"
            >
              <span>View Full Deck ({slides.length} Slides)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextSlide}
              disabled={currentIndex === totalSlides - 1}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs border border-border hover:bg-foreground/5 transition disabled:opacity-30 disabled:pointer-events-none text-foreground"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
