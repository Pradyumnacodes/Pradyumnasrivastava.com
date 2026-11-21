/**
 * EditorialCaseStudy.tsx
 *
 * Shared editorial layout component implementing the strict design system spec:
 * - High-contrast light editorial body with inverted dark footer
 * - 7-tier typography ramp (Plus Jakarta Sans / Inter)
 * - Scroll-entrance choreography
 * - Stateful nav with reading progress
 * - All interaction & motion rules
 */
import React, { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Moon, Sun, ArrowRight, Maximize2, X } from "lucide-react";

// ─────────────────────────────────────────────
// DESIGN TOKENS (strict spec)
// ─────────────────────────────────────────────
export const tokens = {
  canvas: "#FFFFFF",
  cardSurface: "#F8F8FA",
  cardBorder: "#E4E4E7",
  ink: "#0D0D0F",
  bodyInk: "#3F3F46",
  mutedInk: "#71717A",
  accentGradient:
    "linear-gradient(90deg, #6366F1 0%, #EC4899 50%, #F59E0B 100%)",
  footerBg: "#09090B",
  footerText: "#FAFAFA",
  footerMuted: "#A1A1AA",
  footerDivider: "#27272A",
};

// ─────────────────────────────────────────────
// SCROLL ENTRANCE HOOK
// ─────────────────────────────────────────────
function useScrollEntrance(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─────────────────────────────────────────────
// SCROLL-ANIMATE WRAPPER
// ─────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollEntrance();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────
interface LightboxState {
  src: string;
  alt: string;
  caption?: string;
}

function Lightbox({ img, onClose }: { img: LightboxState; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <div
        className="relative max-w-5xl max-h-[88vh] overflow-hidden rounded-xl border border-white/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={img.src} alt={img.alt} className="w-full h-full object-contain max-h-[83vh]" />
        {img.caption && (
          <div className="p-3 bg-black/85 text-white/70 text-xs text-center font-sans border-t border-white/10">
            {img.caption}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ZOOMABLE FIGURE
// ─────────────────────────────────────────────
export function ZoomFigure({
  src,
  alt,
  caption,
  onZoom,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  onZoom: (img: LightboxState) => void;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div
        className="relative cursor-zoom-in overflow-hidden rounded-lg border bg-[#F8F8FA]"
        style={{ borderColor: tokens.cardBorder }}
        onClick={() => onZoom({ src, alt, caption })}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]"
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5" />
          Zoom
        </div>
      </div>
      {caption && (
        <figcaption
          className="text-center text-xs mt-2.5 leading-relaxed"
          style={{ color: tokens.mutedInk }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─────────────────────────────────────────────
// CHALLENGE CARD (3-col grid cards)
// ─────────────────────────────────────────────
export function ChallengeCard({
  number,
  title,
  body,
  accentColor,
}: {
  number: string;
  title: string;
  body: string;
  accentColor?: string;
}) {
  return (
    <div
      className="p-7 rounded-2xl flex flex-col gap-4"
      style={{
        background: tokens.cardSurface,
        border: `1px solid ${tokens.cardBorder}`,
      }}
    >
      <span
        className="inline-block text-xs font-bold tracking-[0.14em] uppercase"
        style={{ color: accentColor ?? tokens.mutedInk }}
      >
        {number}
      </span>
      <h3
        className="text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]"
        style={{ color: tokens.ink }}
      >
        {title}
      </h3>
      <p
        className="text-[16px] leading-[1.65] font-normal"
        style={{ color: tokens.bodyInk }}
      >
        {body}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// METRIC STRIP (outcome numbers)
// ─────────────────────────────────────────────
export function MetricStrip({
  metrics,
  accentColor,
}: {
  metrics: { value: string; label: string }[];
  accentColor?: string;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E4E4E7] rounded-xl overflow-hidden border border-[#E4E4E7]">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-white px-6 py-7 flex flex-col gap-1.5"
        >
          <span
            className="text-[32px] font-semibold leading-none tracking-[-0.025em]"
            style={{ color: accentColor ?? tokens.ink }}
          >
            {m.value}
          </span>
          <span
            className="text-[13px] font-normal leading-snug"
            style={{ color: tokens.mutedInk }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// METADATA SPEC GRID
// ─────────────────────────────────────────────
export function MetaGrid({
  items,
}: {
  items: { key: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: tokens.mutedInk }}
          >
            {item.key}
          </span>
          <span
            className="text-[14px] font-medium leading-snug"
            style={{ color: tokens.ink }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
export function SectionHeader({
  eyebrow,
  heading,
  lead,
  accentColor,
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  accentColor?: string;
}) {
  return (
    <div className="flex flex-col gap-3 max-w-2xl">
      {eyebrow && (
        <span
          className="text-[12px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: accentColor ?? tokens.mutedInk }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="font-semibold leading-[1.2] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
          color: tokens.ink,
        }}
      >
        {heading}
      </h2>
      {lead && (
        <p
          className="text-[16px] leading-[1.65] font-normal mt-1"
          style={{ color: tokens.bodyInk, maxWidth: "65ch" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// EDITORIAL OUTER SHELL (NAV + PROGRESS + FOOTER)
// ─────────────────────────────────────────────
interface EditorialShellProps {
  children: ReactNode;
  accentColor?: string;
  footerHeadline?: string;
  footerCTA?: { label: string; href: string };
  footerLinks?: { label: string; href: string }[];
  contactEmail?: string;
}

export function EditorialShell({
  children,
  accentColor,
  footerHeadline = "Let's build something extraordinary together.",
  footerCTA = { label: "pradyumna.s.edu@gmail.com", href: "mailto:pradyumna.s.edu@gmail.com" },
  footerLinks = [],
  contactEmail = "pradyumna.s.edu@gmail.com",
}: EditorialShellProps) {
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // ── Theme toggle (scoped to case study so it doesn't affect main website) ──
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // When unmounting (navigating back to home/work), restore dark mode for the rest of the website
    return () => {
      document.documentElement.classList.add("dark");
      try {
        const stored = localStorage.getItem("a11y-settings-v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.theme = "dark";
          localStorage.setItem("a11y-settings-v1", JSON.stringify(parsed));
        }
      } catch {}
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setProgress(Math.min(100, (window.scrollY / total) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expose zoom handler via context (simple prop-drilling for now — children receive via cloneElement isn't needed since PaperView gets onZoomImage directly)
  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors ${
        isDark ? "dark bg-[#09090B] text-[#FAFAFA]" : "bg-white text-[#0D0D0F]"
      }`}
      style={{
        background: isDark ? "#09090B" : tokens.canvas,
        color: isDark ? "#FAFAFA" : tokens.ink,
      }}
    >
      {/* ── STICKY NAV ── */}
      <header
        className="sticky top-0 z-50 border-b transition-colors"
        style={{
          background: isDark ? "rgba(9,9,11,0.92)" : "rgba(255,255,255,0.90)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: isDark ? "#27272A" : tokens.cardBorder,
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between"
        >
          {/* Back link */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
            style={{ color: tokens.mutedInk }}
            onMouseEnter={(e) => (e.currentTarget.style.color = tokens.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = tokens.mutedInk)}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Home
          </Link>

          {/* Right nav */}
          <nav className="flex items-center gap-6">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              style={{ color: tokens.mutedInk }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>

        {/* Reading progress bar */}
        <div className="h-[1.5px] w-full" style={{ background: tokens.cardBorder }}>
          <div
            className="h-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: accentColor
                ? `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`
                : tokens.accentGradient,
            }}
          />
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main>{children}</main>

      {/* ── DARK FOOTER ── */}
      <footer
        className="mt-24"
        style={{
          background: tokens.footerBg,
          borderTop: `1px solid ${tokens.footerDivider}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col gap-16">
          {/* Top — Closing headline + CTA */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              className="text-[32px] md:text-[44px] font-semibold leading-[1.15] tracking-[-0.025em] max-w-[18ch]"
              style={{ color: tokens.footerText }}
            >
              {footerHeadline}
            </h2>
            <a
              href={footerCTA.href}
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: tokens.footerMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = tokens.footerText)}
              onMouseLeave={(e) => (e.currentTarget.style.color = tokens.footerMuted)}
            >
              {footerCTA.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${tokens.footerDivider}` }} />

          {/* Bottom — Links + Contact */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[12px] font-medium uppercase tracking-[0.08em]">
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Home", href: "/" },
                ...footerLinks,
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href as "/"}
                  className="transition-colors"
                  style={{ color: tokens.footerMuted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = tokens.footerText)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = tokens.footerMuted)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <span style={{ color: tokens.footerMuted }}>
              {contactEmail}
            </span>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && <Lightbox img={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

// Re-export LightboxState type for consumers
export type { LightboxState };
