import {
  Type,
  Eye,
  Contrast,
  MousePointer2,
  Link2,
  Gauge,
  Palette,
} from "lucide-react";
import { A11ySettings } from "@/hooks/use-accessibility";

export type ToggleKey = Exclude<keyof A11ySettings, "theme" | "fontScale">;

export const TOGGLES: { key: ToggleKey; label: string; description: string; icon: typeof Eye }[] = [
  {
    key: "highContrast",
    label: "High contrast",
    description: "Boost color contrast for readability",
    icon: Contrast,
  },
  { key: "invertColors", label: "Invert colors", description: "Flip page colors", icon: Palette },
  {
    key: "grayscale",
    label: "Grayscale",
    description: "Remove color from the page",
    icon: Palette,
  },
  {
    key: "dyslexiaFont",
    label: "Dyslexia-friendly font",
    description: "Use OpenDyslexic-style typeface",
    icon: Type,
  },
  {
    key: "letterSpacing",
    label: "Increased letter spacing",
    description: "More room between letters",
    icon: Type,
  },
  {
    key: "lineHeight",
    label: "Increased line height",
    description: "More room between lines",
    icon: Type,
  },
  {
    key: "underlineLinks",
    label: "Underline links",
    description: "Always underline links",
    icon: Link2,
  },
  {
    key: "reducedMotion",
    label: "Reduced motion",
    description: "Minimize animations and transitions",
    icon: Gauge,
  },
  {
    key: "pauseAnimations",
    label: "Pause all animations",
    description: "Stop all motion on the page",
    icon: Gauge,
  },
  {
    key: "bigCursor",
    label: "Large cursor",
    description: "Use an enlarged cursor",
    icon: MousePointer2,
  },
  {
    key: "readingGuide",
    label: "Reading guide",
    description: "Show a horizontal guide that follows your cursor",
    icon: Eye,
  },
];
