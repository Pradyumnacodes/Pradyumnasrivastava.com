import { useState, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type Story = {
  title: string;
  link: string;
  img: string;
  date: string;
  readMin: number;
  views?: string;
  reads?: string;
};

interface Props {
  stories: Story[];
}

export function StoryList({ stories }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for the floating image
  const mouseX = useSpring(0, { stiffness: 300, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Center the 300x200 image on the cursor
    mouseX.set(e.clientX - rect.left - 150);
    mouseY.set(e.clientY - rect.top - 100);
  };

  return (
    <div 
      className="relative w-full"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex flex-col border-t border-border mt-8">
        {stories.map((s, i) => {
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <a
              key={s.link}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(i)}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border transition-all duration-300 ${
                isDimmed ? "opacity-30" : "opacity-100"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 flex-1">
                <span className="font-mono text-[13px] text-muted-foreground/80 w-24 tabular-nums uppercase tracking-widest font-medium">
                  {s.date}
                </span>
                <h3 className="font-sans text-xl md:text-2xl text-foreground flex-1 pr-8 transition-transform duration-300 group-hover:translate-x-2 font-medium tracking-tight leading-snug">
                  {s.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0 flex-wrap">
                {s.views && (
                  <span className="font-mono text-[13px] text-muted-foreground/80 whitespace-nowrap uppercase tracking-widest hidden sm:inline-block">
                    {s.views} Views
                  </span>
                )}
                {s.reads && (
                  <span className="font-mono text-[13px] text-muted-foreground/80 whitespace-nowrap uppercase tracking-widest">
                    {s.reads} Reads
                  </span>
                )}
                <span className="font-mono text-[13px] text-muted-foreground/80 whitespace-nowrap uppercase tracking-widest font-medium">
                  {s.readMin} min
                </span>
                <span className="w-9 h-9 rounded-full ring-1 ring-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300 group-hover:-rotate-12 shrink-0">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Floating Image */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-50 overflow-hidden rounded-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] bg-muted hidden md:block will-change-transform transform-gpu"
        style={{
          width: 300,
          height: 200,
          x: mouseX,
          y: mouseY,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && (
            <motion.img
              key={stories[hoveredIndex].link}
              src={stories[hoveredIndex].img}
              alt={stories[hoveredIndex].title}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
