import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import type { CasePayload, Slide, RichText, SlideBlock } from "@/lib/notion.functions";
import { type CaseStudyConfig, CASE_STUDIES } from "@/lib/case-studies";

function optimizeImg(url: string, _width: number): string {
  // In a production environment, this would rewrite the Notion S3 URL 
  // to a Cloudinary or Next.js Image Optimizer proxy URL.
  return url;
}

interface Props {
  study: CaseStudyConfig;
  payload: CasePayload;
}

const Rich = React.memo(function Rich({ rich }: { rich: RichText[] }) {
  return (
    <>
      {rich.map((r, i) => {
        let node: React.ReactNode = r.text;
        if (r.code)
          node = (
            <code className="font-mono text-[0.85em] bg-foreground/[0.05] border border-border/50 px-1.5 py-0.5 rounded">
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
              className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
            >
              {node}
            </a>
          );
        return <span key={i}>{node}</span>;
      })}
    </>
  );
});

const RenderBlock = React.memo(function RenderBlock({ 
  block, 
  accent, 
  onImageClick 
}: { 
  block: SlideBlock; 
  accent: string; 
  onImageClick: (url: string) => void 
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-foreground/80 mb-6 text-pretty max-w-[65ch] mx-auto w-full">
          <Rich rich={block.rich} />
        </p>
      );
    case "heading":
      const Tag = `h${block.level + 2}` as keyof JSX.IntrinsicElements;
      return (
        <Tag className="font-sans font-semibold text-foreground mt-16 mb-6 text-[22px] md:text-[26px] tracking-tight max-w-[65ch] mx-auto w-full text-balance">
          <Rich rich={block.rich} />
        </Tag>
      );
    case "quote":
      return (
        <div className="max-w-[65ch] mx-auto w-full my-12">
          <blockquote
            className="pl-6 py-2 border-l-[3px] font-serif italic text-[22px] md:text-[26px] leading-[1.5] text-foreground font-normal text-pretty"
            style={{ borderColor: accent }}
          >
            <Rich rich={block.rich} />
          </blockquote>
        </div>
      );
    case "callout":
      return (
        <div className="max-w-[65ch] mx-auto w-full my-10">
          <aside className="rounded-xl border border-border/40 bg-foreground/[0.02] p-6 flex gap-5 shadow-sm">
            {block.emoji && (
              <span aria-hidden className="text-[20px] leading-none mt-0.5 select-none">
                {block.emoji}
              </span>
            )}
            <div className="font-sans text-[15px] md:text-[16px] leading-[1.65] text-foreground/90">
              <Rich rich={block.rich} />
            </div>
          </aside>
        </div>
      );
    case "bullet":
      return (
        <li className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-foreground/80 mb-3 list-disc ml-6 pl-2">
          <Rich rich={block.rich} />
        </li>
      );
    case "numbered":
      return (
        <li className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-foreground/80 mb-3 list-decimal ml-6 pl-2">
          <Rich rich={block.rich} />
        </li>
      );
    case "image":
      if (block.layout === "split") {
        return (
          <div className="my-16 md:my-20 w-full grid lg:grid-cols-12 gap-8 items-center">
            <figure className="order-1 lg:col-span-8">
              <button 
                onClick={() => onImageClick(block.url)}
                className="w-full overflow-hidden rounded-xl ring-1 ring-border/40 bg-muted shadow-sm cursor-zoom-in transition-transform duration-500 hover:scale-[1.01] active:scale-[0.99] block"
              >
                <img
                  src={optimizeImg(block.url, 1000)}
                  alt={block.caption || ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block object-cover"
                />
              </button>
            </figure>
            <div className="order-2 lg:col-span-4 lg:pl-4 text-left">
              {block.caption && (
                <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-foreground mb-4 border-l-2 pl-4" style={{ borderColor: accent }}>
                  {block.caption}
                </p>
              )}
              {block.context && (
                <div className="font-sans text-[15px] leading-[1.65] text-muted-foreground prose-p:mb-4 text-pretty">
                  <p>{block.context}</p>
                </div>
              )}
            </div>
          </div>
        );
      }
      
      if (block.layout === "full") {
        return (
          <figure className="my-16 md:my-20 -mx-6 md:-mx-16 w-[calc(100%+3rem)] md:w-[calc(100%+8rem)] border-y border-border/40">
            <button 
              onClick={() => onImageClick(block.url)}
              className="w-full bg-muted relative cursor-zoom-in block"
            >
              <img
                src={optimizeImg(block.url, 1920)}
                alt={block.caption || ""}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block object-cover hover:opacity-90 transition-opacity"
              />
            </button>
            {block.caption && (
              <figcaption className="mt-4 px-6 md:px-16 text-left text-[11px] font-mono text-muted-foreground/80 tracking-[0.15em] uppercase">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      // Default inline image
      return (
        <figure className="my-16 md:my-20 w-full">
          <button 
            onClick={() => onImageClick(block.url)}
            className="w-full overflow-hidden rounded-xl ring-1 ring-border/40 bg-muted shadow-sm cursor-zoom-in transition-transform duration-500 hover:scale-[1.01] active:scale-[0.99] block"
          >
            <img
              src={optimizeImg(block.url, 1600)}
              alt={block.caption || ""}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block object-cover"
            />
          </button>
          {block.caption && (
            <figcaption className="mt-5 text-center text-[11px] font-mono text-muted-foreground/80 tracking-[0.15em] uppercase">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return (
        <div className="my-16 flex justify-center w-full" aria-hidden>
          <div className="h-px w-16 bg-border/40" />
        </div>
      );
    case "code":
      return (
        <div className="max-w-[75ch] mx-auto w-full my-10">
          <pre className="bg-[#111] dark:bg-[#0A0A0A] ring-1 ring-border/20 text-[#E5E5E5] rounded-xl p-6 overflow-x-auto text-[14px] font-mono leading-[1.7] shadow-lg">
            <code>
              <Rich rich={block.rich} />
            </code>
          </pre>
        </div>
      );
    case "toggle":
      return (
        <div className="max-w-[65ch] mx-auto w-full my-6">
          <details className="rounded-xl border border-border/40 bg-foreground/[0.01] p-5 transition-colors hover:bg-foreground/[0.02]">
            <summary className="cursor-pointer text-[16px] font-medium font-sans text-foreground select-none">
              <Rich rich={block.rich} />
            </summary>
          </details>
        </div>
      );
    default:
      return null;
  }
});

const BentoImageGrid = React.memo(function BentoImageGrid({ images, onImageClick }: { images: Extract<SlideBlock, { type: "image" }>[]; onImageClick: (url: string) => void }) {
  return (
    <div className="my-16 w-full columns-1 sm:columns-2 gap-8 [column-fill:_balance]">
      {images.map((img, idx) => (
        <figure
          key={idx}
          className="mb-8 break-inside-avoid relative overflow-hidden rounded-xl ring-1 ring-border/40 bg-muted shadow-sm group"
        >
          <button 
            onClick={() => onImageClick(img.url)}
            className="w-full h-full block cursor-zoom-in"
          >
            <img
              src={optimizeImg(img.url, 800)}
              alt={img.caption || ""}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {img.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 px-5 py-4 text-[10px] font-mono uppercase tracking-[0.1em] text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {img.caption}
              </figcaption>
            )}
          </button>
        </figure>
      ))}
    </div>
  );
});

function renderBlocks(blocks: SlideBlock[], accent: string, onImageClick: (url: string) => void) {
  const out: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === "bullet" || b.type === "numbered") {
      const tag = b.type;
      const group: SlideBlock[] = [];
      while (i < blocks.length && blocks[i].type === tag) {
        group.push(blocks[i]);
        i++;
      }
      if (tag === "bullet") {
        out.push(
          <div key={`ul-${i}`} className="max-w-[65ch] mx-auto w-full">
            <ul className="my-6 space-y-2 list-none">
              {group.map((g, gi) => (
                <RenderBlock key={gi} block={g} accent={accent} onImageClick={onImageClick} />
              ))}
            </ul>
          </div>
        );
      } else {
        out.push(
          <div key={`ol-${i}`} className="max-w-[65ch] mx-auto w-full">
            <ol className="my-6 space-y-2">
              {group.map((g, gi) => (
                <RenderBlock key={gi} block={g} accent={accent} onImageClick={onImageClick} />
              ))}
            </ol>
          </div>
        );
      }
    } else if (b.type === "image") {
      const group: Extract<SlideBlock, { type: "image" }>[] = [];
      while (i < blocks.length && blocks[i].type === "image") {
        group.push(blocks[i] as Extract<SlideBlock, { type: "image" }>);
        i++;
      }
      if (group.length >= 3) {
        out.push(<BentoImageGrid key={`bento-${i}`} images={group} onImageClick={onImageClick} />);
      } else {
        group.forEach((g, gi) =>
          out.push(<RenderBlock key={`img-${i}-${gi}`} block={g} accent={accent} onImageClick={onImageClick} />),
        );
      }
    } else {
      out.push(<RenderBlock key={i} block={b} accent={accent} onImageClick={onImageClick} />);
      i++;
    }
  }
  return out;
}

const ReadingTime = React.memo(function ReadingTime({ slides }: { slides: Slide[] }) {
  const minutes = useMemo(() => {
    const words = slides.reduce((acc, s) => {
      const t = (s.title || "").split(/\s+/).length;
      const b = s.blocks.reduce((a, blk) => {
        if ("rich" in blk && Array.isArray(blk.rich)) {
          return a + blk.rich.reduce((x, r) => x + (r.text || "").split(/\s+/).length, 0);
        }
        return a;
      }, 0);
      return acc + t + b;
    }, 0);
    return Math.max(2, Math.round(words / 220));
  }, [slides]);
  return <>{minutes} min read</>;
});

/**
 * Isolated TopNav component.
 * By moving the scroll progress state here, we prevent the entire SlideDeck
 * (which contains heavy DOM elements and images) from re-rendering on scroll.
 */
const TopNav = React.memo(function TopNav({ study, slides }: { study: CaseStudyConfig, slides: Slide[] }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 bg-background/90 dark:bg-[#111]/90 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        <Link to="/work" className="text-[11px] font-mono uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors">
          ← Back
        </Link>
        <div className="hidden md:flex items-center gap-5 min-w-0 flex-1 justify-center">
          <span aria-hidden className="block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: study.accent }} />
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/80">
            {study.eyebrow}
          </span>
          <div className="h-[1px] w-8 bg-border/60" />
          <span className="text-[13px] text-muted-foreground truncate font-sans tracking-wide">{study.title}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] tabular text-muted-foreground/60">
          <ReadingTime slides={slides} />
        </span>
      </div>
      <div className="h-[2px] bg-transparent">
        <div className="h-full transition-[width] duration-150 ease-out" style={{ width: `${progress}%`, backgroundColor: study.accent }} />
      </div>
    </nav>
  );
});

export function SlideDeck({ study, payload }: Props) {
  const slides = payload.slides;
  const cover = slides[0];
  const body = slides.slice(1);
  const coverImage =
    cover && cover.id === "cover"
      ? (cover.blocks.find((b) => b.type === "image") as Extract<SlideBlock, { type: "image" }> | undefined)
      : undefined;

  const articleRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // State
  const [activeId, setActiveId] = useState<string>(body[0]?.id ?? "");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Memoize next case study calculation
  const nextStudy = useMemo(() => {
    const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
    if (currentIndex === -1) return null;
    return CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
  }, [study.slug]);

  // Memoize image click handler to prevent RenderBlock re-renders
  const handleImageClick = useCallback((url: string) => {
    setZoomedImage(url);
  }, []);

  // Intersection Observer for ToC & Entrance Animations
  // This state update (setActiveId) only fires occasionally when crossing section boundaries.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).dataset.sectionId;
          if (id) setActiveId(id);
        }
        
        // Trigger entrance animations via data attributes (bypasses React state for performance)
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "true");
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.1 },
    );
    
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [body.length]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomedImage]);

  const goTo = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative bg-[#EAE8E3] dark:bg-[#09090B] text-foreground font-sans selection:bg-foreground/20 selection:text-foreground pb-32 min-h-screen" ref={articleRef}>
      
      {/* Lightbox Overlay */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-background/90 dark:bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out transition-opacity duration-300 animate-in fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <img 
            src={optimizeImg(zoomedImage, 2400)} 
            alt="Expanded view" 
            className="w-full h-full object-contain pointer-events-none animate-in zoom-in-95 duration-300 ease-out" 
          />
        </div>
      )}

      {/* Top Navigation Bar (Isolated for scroll performance) */}
      <TopNav study={study} slides={slides} />

      {/* Side ToC */}
      <nav aria-label="Sections" className="hidden xl:block fixed left-12 top-1/2 -translate-y-1/2 z-40 w-[220px]">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-8">Index</p>
        <ul className="space-y-5 relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border/40 -z-10" />
          {body.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="relative">
                <button
                  onClick={() => goTo(s.id)}
                  className={`block text-left text-[13px] leading-relaxed transition-all duration-300 w-full font-sans pl-6 border-l-[2px] ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground/60 hover:text-foreground border-transparent"
                  }`}
                  style={isActive ? { borderColor: study.accent } : undefined}
                >
                  <span className="truncate pr-4 block text-pretty">
                    {s.kicker ? s.kicker.split('·')[1]?.trim() || s.kicker : s.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Main Stack */}
      <main className="pt-32 md:pt-40 px-4 md:px-8 max-w-[1024px] mx-auto flex flex-col gap-10 md:gap-16">
        
        {/* Slide 1: Hero Card */}
        <section className="w-full bg-[#FDFBF7] dark:bg-[#141414] rounded-[24px] md:rounded-[32px] ring-1 ring-border/50 shadow-sm overflow-hidden relative opacity-0 translate-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-forwards">
          <div className="w-full h-2" style={{ backgroundColor: study.accent }} />
          <div className="px-6 py-20 md:px-16 md:py-24 text-center">
            <div className="flex justify-center items-center gap-3 mb-8">
               <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: study.accent }} />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/70">
                {study.eyebrow}
              </span>
            </div>
            <h1 className="font-sans text-4xl md:text-[56px] text-foreground leading-[1.1] tracking-tight font-semibold text-balance mb-8 max-w-[20ch] mx-auto">
              {study.title}
            </h1>
            <p className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-foreground/70 text-pretty max-w-[45ch] mx-auto mb-16">
              {study.summary}
            </p>
            <dl className="flex justify-center gap-12 border-t border-border/40 pt-10 max-w-[65ch] mx-auto">
              <div className="text-center">
                <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Client</dt>
                <dd className="text-[14px] font-medium text-foreground font-sans">{study.client}</dd>
              </div>
              <div className="text-center">
                <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Role</dt>
                <dd className="text-[14px] font-medium text-foreground font-sans">{study.role}</dd>
              </div>
              <div className="text-center">
                <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">When</dt>
                <dd className="text-[14px] font-medium text-foreground font-sans">{study.year}</dd>
              </div>
            </dl>
          </div>
          {coverImage && (
            <div className="w-full bg-muted border-t border-border/40 relative z-10">
              <img
                src={optimizeImg(coverImage.url, 1920)}
                alt={study.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto object-cover block"
              />
            </div>
          )}
        </section>

        {/* Slide Stack: Body Sections */}
        {body.map((s, index) => (
          <section
            key={s.id}
            data-section-id={s.id}
            ref={(el) => {
              sectionRefs.current[s.id] = el;
            }}
            className="w-full bg-[#FDFBF7] dark:bg-[#141414] rounded-[24px] md:rounded-[32px] ring-1 ring-border/50 shadow-sm overflow-hidden scroll-mt-24 md:scroll-mt-32 relative opacity-0 translate-y-12 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-1000 ease-out"
            aria-label={s.title ?? s.kicker ?? undefined}
          >
            <div className="w-full h-1" style={{ backgroundColor: study.accent }} />
            
            {/* Minimal index tag */}
            <div className="absolute top-8 left-8 md:top-10 md:left-10 z-10 hidden sm:block">
               <span className="font-mono text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
                 {String(index + 1).padStart(2, '0')}
               </span>
            </div>

            <div className="px-6 py-16 md:px-16 md:py-24 relative z-10 flex flex-col items-center">
              <div className="mb-14 border-b border-border/40 pb-10 w-full text-center max-w-[65ch]">
                {s.kicker && (
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                      {s.kicker}
                    </span>
                  </div>
                )}
                {s.title && (
                  <h2 className="font-sans text-[28px] md:text-[36px] text-foreground leading-[1.15] tracking-tight font-semibold text-balance">
                    {s.title}
                  </h2>
                )}
              </div>
              
              <div className="w-full flex flex-col items-center text-left">
                {renderBlocks(s.blocks, study.accent, handleImageClick)}
              </div>
            </div>
          </section>
        ))}

        {/* Slide N: Outro Card */}
        <section 
          ref={(el) => { sectionRefs.current['outro'] = el; }}
          className="w-full bg-[#FDFBF7] dark:bg-[#141414] rounded-[24px] md:rounded-[32px] ring-1 ring-border/50 shadow-sm overflow-hidden text-center relative mb-32 opacity-0 translate-y-12 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-1000 ease-out"
        >
          <div className="w-full h-1" style={{ backgroundColor: study.accent }} />
          <div className="px-6 py-20 md:p-24 relative z-10 flex flex-col items-center">
            
            <div className="inline-flex items-center gap-3 mb-6">
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: study.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                End of case study
              </span>
            </div>
            
            <h2 className="font-sans text-3xl md:text-4xl text-foreground leading-[1.1] tracking-tight font-semibold mb-6">
              Want the full story?
            </h2>
            
            <p className="text-[16px] md:text-[18px] text-foreground/70 max-w-[45ch] mx-auto text-pretty leading-[1.7] mb-12">
              Reach out if you'd like to dive deeper into the process, the iterations, and the code behind this project.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
              <a
                href="mailto:hello@pradyumnasrivastava.com"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-foreground text-background px-8 py-3.5 text-[14px] font-medium transition-transform hover:scale-105 rounded-full shadow-md"
              >
                Get in touch
              </a>
              
              {nextStudy && (
                <a
                  href={`/case-study/${nextStudy.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-border text-foreground px-8 py-3.5 text-[14px] font-medium transition-colors hover:bg-muted rounded-full"
                >
                  Next Project →
                </a>
              )}
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
