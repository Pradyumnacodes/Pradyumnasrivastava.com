import React from "react";

interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
  metric?: string;
  className?: string;
}

export function BrowserFrame({ src, alt, url, metric, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`group/frame relative overflow-hidden rounded-xl border border-border/70 bg-card/80 shadow-md group-hover:shadow-xl group-hover:border-border transition-all duration-500 ${className}`}
    >
      {/* Window Titlebar Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/70 backdrop-blur-sm border-b border-border/50 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 border border-rose-600/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 border border-amber-600/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 border border-emerald-600/30" />
        </div>
        {url && (
          <div className="px-2.5 py-0.5 max-w-[160px] truncate text-[10px] font-mono text-muted-foreground/70 bg-background/50 rounded-md border border-border/40">
            {url}
          </div>
        )}
        <div className="w-8" />
      </div>

      {/* Viewport Canvas */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover object-top opacity-90 group-hover/frame:opacity-100 group-hover/frame:scale-[1.03] transition-all duration-500"
        />

        {/* Floating Metric Badge if present */}
        {metric && (
          <div className="absolute bottom-2.5 left-2.5 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono border border-border/80 text-foreground shadow-xs">
            {metric}
          </div>
        )}
      </div>
    </div>
  );
}
