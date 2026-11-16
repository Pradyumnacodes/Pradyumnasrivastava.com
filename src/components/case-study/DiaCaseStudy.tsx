/**
 * DiaCaseStudy.tsx
 *
 * Protected case study shell for the Mastercard Issuer Portfolio study.
 * Wraps PaperView inside the EditorialShell from the shared design system.
 */
import React, { useState, useCallback } from "react";
import type { CaseStudyConfig } from "@/lib/case-studies";
import type { CasePayload } from "@/lib/notion.functions";
import { ImageLightbox } from "./ImageLightbox";
import { PaperView } from "./PaperView";
import { EditorialShell } from "./EditorialCaseStudy";

interface DiaCaseStudyProps {
  study: CaseStudyConfig;
  payload?: CasePayload;
  onSwitchToHorizontal?: () => void;
}

export function DiaCaseStudy({ study }: DiaCaseStudyProps) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const handleZoom = useCallback((img: { src: string; alt: string; caption?: string }) => {
    setActiveImage(img);
  }, []);

  return (
    <EditorialShell
      accentColor={study.accent ?? "#F59E0B"}
      footerHeadline="Let's build something you're proud to ship."
      footerCTA={{ label: "pradyumna.s.edu@gmail.com", href: "mailto:pradyumna.s.edu@gmail.com" }}
      contactEmail="pradyumna.s.edu@gmail.com"
    >
      <PaperView onZoomImage={handleZoom} />

      {/* Lightbox */}
      {activeImage && (
        <ImageLightbox
          src={activeImage.src}
          alt={activeImage.alt}
          caption={activeImage.caption}
          onClose={() => setActiveImage(null)}
        />
      )}
    </EditorialShell>
  );
}
