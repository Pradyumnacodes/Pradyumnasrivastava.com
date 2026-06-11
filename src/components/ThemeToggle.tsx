import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useAccessibility } from "@/hooks/use-accessibility";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { settings, update } = useAccessibility();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark =
    settings.theme === "dark" || (settings.theme === "system" && prefersDark);

  const toggle = () => update("theme", isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "inline-flex items-center justify-center w-9 h-9 rounded-full ring-1 ring-deep-ink/15 text-deep-ink/70 hover:text-deep-ink hover:bg-deep-ink/5 transition-colors " +
        className
      }
    >
      {mounted && isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
