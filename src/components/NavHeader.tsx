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
      <header className="pointer-events-auto flex items-center gap-12 px-12 py-3 rounded-full bg-foreground/[0.04] backdrop-blur-[32px] border border-foreground/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all">
        {/* Name Badge */}
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-sans text-[13px] tracking-wide font-medium text-foreground/90 group-hover:text-foreground transition-colors">
            Pradyumna Srivastava
          </span>
        </Link>
        <div className="w-px h-4 bg-foreground/10" />

        {/* Action Shortcuts */}
        <nav className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em]">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            Résumé
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>
    </div>
  );
}
