import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { RESUME_URL, EMAIL } from "@/data/portfolio-data";
import { FileText, Mail } from "lucide-react";

export function NavHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) return null;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <header className="pointer-events-auto flex items-center gap-10 md:gap-12 px-8 md:px-12 py-3 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all">
        {/* Name Badge */}
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-sans text-[13px] tracking-tight font-medium text-foreground transition-colors">
            Pradyumna Srivastava
          </span>
        </Link>
        <div className="w-px h-4 bg-border" />

        {/* Action Shortcuts */}
        <nav className="flex items-center gap-8 md:gap-10 font-mono text-[11px] uppercase tracking-[0.2em]">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Résumé
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>
    </div>
  );
}
