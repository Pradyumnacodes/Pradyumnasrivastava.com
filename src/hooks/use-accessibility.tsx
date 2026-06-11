import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type A11ySettings = {
  theme: "light" | "dark" | "system";
  fontScale: number; // 1 = 100%
  highContrast: boolean;
  invertColors: boolean;
  grayscale: boolean;
  dyslexiaFont: boolean;
  underlineLinks: boolean;
  reducedMotion: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  letterSpacing: boolean;
  lineHeight: boolean;
  pauseAnimations: boolean;
};

const DEFAULTS: A11ySettings = {
  theme: "dark",
  fontScale: 1,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  dyslexiaFont: false,
  underlineLinks: false,
  reducedMotion: false,
  bigCursor: false,
  readingGuide: false,
  letterSpacing: false,
  lineHeight: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "a11y-settings-v1";

type Ctx = {
  settings: A11ySettings;
  update: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
  reset: () => void;
};

const A11yContext = createContext<Ctx | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}

    const root = document.documentElement;

    // Theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = settings.theme === "dark" || (settings.theme === "system" && prefersDark);
    root.classList.toggle("dark", isDark);

    // Font scale
    root.style.fontSize = `${settings.fontScale * 100}%`;

    // Toggle data attributes for CSS hooks
    const flags: Array<[keyof A11ySettings, string]> = [
      ["highContrast", "high-contrast"],
      ["invertColors", "invert"],
      ["grayscale", "grayscale"],
      ["dyslexiaFont", "dyslexia"],
      ["underlineLinks", "underline-links"],
      ["reducedMotion", "reduced-motion"],
      ["bigCursor", "big-cursor"],
      ["readingGuide", "reading-guide"],
      ["letterSpacing", "letter-spacing"],
      ["lineHeight", "line-height"],
      ["pauseAnimations", "pause-animations"],
    ];
    flags.forEach(([k, attr]) => {
      if (settings[k]) root.setAttribute(`data-a11y-${attr}`, "true");
      else root.removeAttribute(`data-a11y-${attr}`);
    });
  }, [settings, hydrated]);

  // Listen to system theme changes
  useEffect(() => {
    if (settings.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      document.documentElement.classList.toggle("dark", mq.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [settings.theme]);

  const update = useCallback(<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  return (
    <A11yContext.Provider value={{ settings, update, reset }}>{children}</A11yContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
