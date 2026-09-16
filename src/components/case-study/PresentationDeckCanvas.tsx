import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowDown,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import type { Slide, SlideBlock, RichText } from "@/lib/notion.functions";
import type { CaseStudyConfig } from "@/lib/case-studies";

interface Props {
  study: CaseStudyConfig;
  slides: Slide[];
  imagePool?: { url: string; caption?: string }[];
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

// 10 Standard Executive Presentation Deck Categories
const slideCategoryNames = [
  "01 · Cover & Project Overview",
  "02 · Problem Statement",
  "03 · User Research & Insights",
  "04 · Market Audit & Gaps",
  "05 · Design Strategy & Flows",
  "06 · System Architecture",
  "07 · Core UI Solutions",
  "08 · Usability & Micro-interactions",
  "09 · Business Impact & Metrics",
  "10 · Learnings & Reflection",
];

export function PresentationDeckCanvas({ study, slides, imagePool, onExpandFullCaseStudy }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 10 slides for short deck
  const deckSlides = slides.slice(0, 10);
  const totalSlides = deckSlides.length;
  const currentSlide = deckSlides[currentIndex] || deckSlides[0];

  // Use imagePool from parent (all unique Notion images across ALL slides).
  // Fall back to harvesting from current slide list if no pool provided.
  const allCaseStudyImages = useMemo(() => {
    if (imagePool && imagePool.length > 0) return imagePool;
    const list: { url: string; caption?: string }[] = [];
    slides.forEach((s) => {
      s.blocks.forEach((b) => {
        if (b.type === "image" && b.url) {
          if (!list.some((img) => img.url === b.url)) {
            list.push({ url: b.url, caption: b.caption });
          }
        }
      });
    });
    return list;
  }, [imagePool, slides]);

  // Current slide image: pick from the pool using slideIndex so each slide gets a different image
  const currentImage = useMemo(() => {
    if (allCaseStudyImages.length === 0) return null;
    return allCaseStudyImages[currentIndex % allCaseStudyImages.length];
  }, [allCaseStudyImages, currentIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

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

  const paragraphs = currentSlide?.blocks.filter((b) => b.type === "paragraph") as Extract<
    SlideBlock,
    { type: "paragraph" }
  >[];

  const bulletBlocks = currentSlide?.blocks.filter((b) => b.type === "bullet") as Extract<
    SlideBlock,
    { type: "bullet" }
  >[];

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto space-y-6 ${
        isFullscreen
          ? "h-screen bg-background p-6 flex flex-col justify-between overflow-y-auto"
          : ""
      }`}
    >
      {/* Slide Deck Top Header Controls */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground px-1">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-foreground font-semibold text-[11px] uppercase tracking-wider"
            style={{ backgroundColor: `${study.accent}20`, color: study.accent }}
          >
            Slide {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline opacity-60">Use ← → arrow keys to navigate slides</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hidden md:inline">
            10-Slide Deck (Featuring Images from Long-Form)
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

      {/* 16:9 Widescreen Presentation Slide Card */}
      <div
        className="w-full bg-card ring-1 ring-border/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between min-h-[540px] transition-all duration-300 relative"
        style={{ borderTop: `4px solid ${study.accent}` }}
      >
        {/* Slide Meta Bar */}
        <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between gap-4 bg-foreground/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: study.accent }} />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground font-semibold">
              {slideCategoryNames[currentIndex] || currentSlide?.kicker || study.eyebrow}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            {study.client} · {study.year}
          </span>
        </div>

        {/* Slide Layout Area with Visual Image */}
        <div className="p-8 md:p-12 space-y-6 my-auto">
          {currentSlide?.title && (
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold leading-tight tracking-tight text-balance">
              {currentSlide.title}
            </h2>
          )}

          {/* 2-Column Deck Grid: Left Summary Text, Right Image from Longer Version */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content Area */}
            <div className="md:col-span-6 space-y-4">
              {paragraphs && paragraphs.length > 0 && (
                <div className="space-y-3 font-sans text-base text-foreground/80 leading-relaxed">
                  {paragraphs.slice(0, 2).map((p, idx) => (
                    <p key={idx}>
                      <Rich rich={p.rich} />
                    </p>
                  ))}
                </div>
              )}

              {bulletBlocks && bulletBlocks.length > 0 && (
                <ul className="space-y-2 mt-3">
                  {bulletBlocks.slice(0, 3).map((b, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm font-sans text-foreground/80"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: study.accent }}
                      />
                      <span>
                        <Rich rich={b.rich} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {study.highlights && (
                <div className="pt-2">
                  <div
                    className="p-4 rounded-xl bg-foreground/[0.03] ring-1 ring-border/40 flex items-center justify-between gap-4"
                    style={{ borderLeft: `3px solid ${study.accent}` }}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground block">
                        Key Metric Impact
                      </span>
                      <div className="text-xl font-bold text-foreground font-sans mt-0.5">
                        {
                          study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                            ?.value
                        }
                      </div>
                    </div>
                    <span className="text-xs font-sans text-muted-foreground max-w-[24ch] text-right">
                      {
                        study.highlights.metrics[currentIndex % study.highlights.metrics.length]
                          ?.label
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Visual Image from Longer Version */}
            <div className="md:col-span-6">
              {currentImage ? (
                <figure className="rounded-2xl overflow-hidden ring-1 ring-border/50 bg-foreground/[0.02] shadow-lg group relative">
                  <img
                    src={currentImage.url}
                    alt={currentImage.caption || currentSlide?.title || ""}
                    className="w-full h-auto max-h-[380px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {currentImage.caption && (
                    <figcaption className="p-3 text-center text-xs font-mono text-muted-foreground bg-foreground/5 border-t border-border/40">
                      {currentImage.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <div className="p-8 rounded-2xl bg-foreground/[0.03] ring-1 ring-border/40 space-y-4">
                  <Lightbulb className="w-6 h-6" style={{ color: study.accent }} />
                  <p className="text-sm font-sans text-foreground leading-relaxed">
                    {
                      study.highlights?.keyTakeaways[
                        currentIndex % (study.highlights.keyTakeaways.length || 1)
                      ]
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide Deck Footer Controls & Scrubber */}
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
            {deckSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                title={`Slide ${idx + 1}: ${slideCategoryNames[idx] || ""}`}
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
            Want to read the full in-depth case study documentation?
          </h3>
          <p className="text-xs md:text-sm text-background/80 font-sans max-w-[50ch]">
            Explore complete research transcripts, end-to-end user flows, and full long-form
            editorial case study notes.
          </p>
        </div>

        <button
          onClick={onExpandFullCaseStudy}
          className="inline-flex items-center gap-2 bg-background text-foreground hover:bg-background/90 font-sans font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Full In-Depth Case Study</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
