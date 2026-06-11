import { useRef, useEffect } from "react";

export type MediumStory = {
  title: string;
  link: string;
  img: string;
  date: string; // pre-formatted, e.g. "Aug 16, 2022"
  readMin: number;
  views?: string; // e.g. "20K"
  reads?: string;
};

interface Props {
  stories: MediumStory[];
}

export function MediumMarquee({ stories }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  // Proximity animation: scale cards based on cursor distance.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const update = () => {
      raf = 0;
      const RADIUS = 280;
      for (const card of cardsRef.current) {
        if (!card) continue;
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const falloff = Math.max(0, 1 - dist / RADIUS);
        const eased = falloff * falloff; // ease-in
        const scale = 1 + eased * 0.18;
        const lift = eased * -10;
        (card as HTMLElement).style.transform = `translateY(${lift}px) scale(${scale})`;
        (card as HTMLElement).style.zIndex = eased > 0.05 ? "10" : "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    track.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      track.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Duplicate the list so the rightward scroll loops seamlessly.
  const doubled = [...stories, ...stories];

  return (
    <div
      className="relative w-full overflow-hidden py-6 group"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-6 w-max animate-[medium-marquee_80s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        {doubled.map((s, i) => (
          <a
            key={`${s.link}-${i}`}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/card relative shrink-0 w-[320px] bg-paper ring-1 ring-black/10 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300"
            style={{ transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms, z-index 0s" }}
          >
            <div className="aspect-[16/9] bg-deep-ink/5 overflow-hidden">
              <img
                src={`https://wsrv.nl/?url=${encodeURIComponent(s.img)}&w=640&h=360&fit=cover&output=jpg`}
                alt={s.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback: try the raw URL if the proxy fails.
                  const img = e.currentTarget;
                  if (img.dataset.fallback !== "1") {
                    img.dataset.fallback = "1";
                    img.src = s.img;
                  }
                }}
              />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <h3 className="font-serif text-base text-deep-ink leading-snug line-clamp-2 min-h-[2.6em]">
                {s.title}
              </h3>
              <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
                <span>{s.readMin} min read · {s.date}</span>
              </div>
              {(s.views || s.reads) && (
                <div className="flex items-center gap-4 pt-2 border-t border-black/10 text-[11px] font-mono">
                  {s.views && (
                    <span className="flex flex-col">
                      <span className="opacity-50 uppercase tracking-[0.12em] text-[9px]">Views</span>
                      <span className="text-deep-ink font-medium tabular">{s.views}</span>
                    </span>
                  )}
                  {s.reads && (
                    <span className="flex flex-col">
                      <span className="opacity-50 uppercase tracking-[0.12em] text-[9px]">Reads</span>
                      <span className="text-deep-ink font-medium tabular">{s.reads}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes medium-marquee {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
