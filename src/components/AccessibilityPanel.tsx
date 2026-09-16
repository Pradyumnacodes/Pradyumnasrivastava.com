import { useEffect, useState } from "react";
import {
  Accessibility,
  Moon,
  Sun,
  Monitor,
  RotateCcw,
} from "lucide-react";
import { useAccessibility } from "@/hooks/use-accessibility";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { TOGGLES } from "@/data/a11y-toggles";

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { settings, update, reset } = useAccessibility();

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-accessibility', handleOpen);
    return () => window.removeEventListener('open-accessibility', handleOpen);
  }, []);

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
        className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-50 flex items-center gap-2 rounded-full bg-background text-foreground border border-foreground/10 px-4 py-2.5 text-sm font-medium tracking-tight shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      >
        <Accessibility className="h-4 w-4" aria-hidden="true" />
        <span>Accessibility</span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md bg-background text-foreground border-l border-foreground/10">
          <SheetHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <Accessibility className="h-5 w-5" aria-hidden="true" />
                  Accessibility
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">Tailor the experience to your needs.</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-6 px-4 pb-8">
            {/* Theme */}
            <section aria-labelledby="a11y-theme">
              <h3 id="a11y-theme" className="mb-3 text-sm font-semibold">
                Theme
              </h3>
              <div role="radiogroup" aria-label="Color theme" className="flex p-1 bg-foreground/5 rounded-lg">
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
                      className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-medium capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                        selected ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

            <Separator className="bg-foreground/10" />

            {/* Font size */}
            <section aria-labelledby="a11y-fontsize">
              <div className="mb-3 flex items-center justify-between">
                <h3 id="a11y-fontsize" className="text-sm font-semibold text-foreground">
                  Text size
                </h3>
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

            <Separator className="bg-foreground/10" />

            {/* Toggles */}
            <section aria-labelledby="a11y-options">
              <h3 id="a11y-options" className="text-sm font-semibold text-foreground mb-1">
                Options
              </h3>
              <div className="divide-y divide-foreground/5">
                {TOGGLES.map(({ key, label, description, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <Label htmlFor={`a11y-${key}`} className="cursor-pointer text-sm font-medium text-foreground">
                          {label}
                        </Label>
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
                      </div>
                    </div>
                    <Switch
                      id={`a11y-${key}`}
                      checked={settings[key] as boolean}
                      onCheckedChange={(v) => update(key, v)}
                      aria-label={label}
                      className="ml-4 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-foreground/20"
                    />
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-foreground/10" />

            <Button variant="outline" className="w-full border-foreground/10 text-foreground hover:bg-foreground/5" onClick={reset}>
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
