import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { CaseCard } from "@/data/portfolio";

export function CaseStack({ cases }: { cases: CaseCard[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      {cases.map((c, i) => {
        const isHovered = hoveredIndex === i;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <motion.div
            key={c.slug}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              opacity: isDimmed ? 0.45 : 1,
              scale: isHovered ? 1.01 : 1,
              filter: isDimmed ? "blur(0.5px)" : "blur(0px)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="group relative"
          >
            <Link to="/case-study/$slug" params={{ slug: c.slug }} className="block">
              {/* Card Meta & Badges */}
              <div className="flex items-center gap-3 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>0{i + 1}</span>
                <span>·</span>
                <span>{c.year}</span>
                {i === 0 && (
                  <span className="text-foreground font-semibold px-2 py-0.5 rounded-full bg-foreground/10 border border-foreground/20 tracking-widest text-[10px]">
                    Featured
                  </span>
                )}
                {c.locked && (
                  <span className="inline-flex items-center gap-1 ml-auto text-amber-500/90 font-medium">
                    <Lock className="w-3 h-3" /> Protected
                  </span>
                )}
              </div>

              {/* Title & Blurb */}
              <h2 className="text-2xl md:text-4xl leading-[1.15] tracking-tight font-serif font-medium text-balance text-foreground group-hover:text-muted-foreground transition-colors duration-300 mb-3">
                {c.title}
              </h2>
              <p className="text-base md:text-lg font-sans leading-relaxed text-muted-foreground max-w-[65ch] mb-6">
                {c.blurb}
              </p>

              {/* Visual Container */}
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border/60 bg-muted/30 shadow-sm group-hover:ring-foreground/20 transition-all duration-500">
                <img
                  src={c.image}
                  alt={c.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Action Link */}
              <div className="mt-4 flex items-center gap-1 text-sm font-sans font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                <span>Read case study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
