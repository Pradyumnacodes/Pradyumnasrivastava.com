import { useEffect, useState } from "react";
import {
  Accessibility,
  Moon,
  Sun,
  Monitor,
  Type,
  Eye,
  Contrast,
  MousePointer2,
  Link2,
  Gauge,
  RotateCcw,
  X,
  Palette,
} from "lucide-react";
import { useAccessibility, type A11ySettings } from "@/hooks/use-accessibility";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

type ToggleKey = Exclude<keyof A11ySettings, "theme" | "fontScale">;

const TOGGLES: { key: ToggleKey; label: string; description: string; icon: typeof Eye }[] = [
  { key: "highContrast", label: "High contrast", description: "Boost color contrast for readability", icon: Contrast },
  { key: "invertColors", label: "Invert colors", description: "Flip page colors", icon: Palette },
  { key: "grayscale", label: "Grayscale", description: "Remove color from the page", icon: Palette },
  { key: "dyslexiaFont", label: "Dyslexia-friendly font", description: "Use OpenDyslexic-style typeface", icon: Type },
  { key: "letterSpacing", label: "Increased letter spacing", description: "More room between letters", icon: Type },
  { key: "lineHeight", label: "Increased line height", description: "More room between lines", icon: Type },
  { key: "underlineLinks", label: "Underline links", description: "Always underline links", icon: Link2 },
  { key: "reducedMotion", label: "Reduced motion", description: "Minimize animations and transitions", icon: Gauge },
  { key: "pauseAnimations", label: "Pause all animations", description: "Stop all motion on the page", icon: Gauge },
  { key: "bigCursor", label: "Large cursor", description: "Use an enlarged cursor", icon: MousePointer2 },
  { key: "readingGuide", label: "Reading guide", description: "Show a horizontal guide that follows your cursor", icon: Eye },
];

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { settings, update, reset } = useAccessibility();

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <button
        type="button"
        aria-label="Open accessibility settings"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-[4px] ring-background transition-transform hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <SheetTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5" aria-hidden="true" />
                  Accessibility
                </SheetTitle>
                <SheetDescription>Tailor the experience to your needs.</SheetDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close accessibility panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-6 px-4 pb-8">
            {/* Theme */}
            <section aria-labelledby="a11y-theme">
              <h3 id="a11y-theme" className="mb-3 text-sm font-semibold">Theme</h3>
              <div role="radiogroup" aria-label="Color theme" className="grid grid-cols-3 gap-2">
                {(["light", "dark", "system"] as const).map((t) => {
                  const Icon = t === "light" ? Sun : t === "dark" ? Moon : Monitor;
                  const selected = settings.theme === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => update("theme", t)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-xs capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

            <Separator />

            {/* Font size */}
            <section aria-labelledby="a11y-fontsize">
              <div className="mb-3 flex items-center justify-between">
                <h3 id="a11y-fontsize" className="text-sm font-semibold">Text size</h3>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {Math.round(settings.fontScale * 100)}%
                </span>
              </div>
              <Slider
                value={[settings.fontScale * 100]}
                min={80}
                max={200}
                step={10}
                onValueChange={(v) => update("fontScale", v[0] / 100)}
                aria-label="Text size"
              />
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>A</span>
                <span className="text-base">A</span>
              </div>
            </section>

            <Separator />

            {/* Toggles */}
            <section aria-labelledby="a11y-options" className="space-y-3">
              <h3 id="a11y-options" className="text-sm font-semibold">Options</h3>
              {TOGGLES.map(({ key, label, description, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex flex-1 items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div className="flex-1">
                      <Label htmlFor={`a11y-${key}`} className="cursor-pointer text-sm font-medium">
                        {label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Switch
                    id={`a11y-${key}`}
                    checked={settings[key]}
                    onCheckedChange={(v) => update(key, v)}
                    aria-label={label}
                  />
                </div>
              ))}
            </section>

            <Separator />

            <Button variant="outline" className="w-full" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Reset to defaults
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              Your preferences are saved on this device.
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {settings.readingGuide && <ReadingGuide />}
    </>
  );
}

function ReadingGuide() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-[60] h-12 bg-primary/10 ring-1 ring-primary/30"
      style={{ top: y - 24 }}
    />
  );
}
