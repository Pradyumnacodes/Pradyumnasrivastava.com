import { useState, type FormEvent } from "react";

interface Props {
  studyTitle: string;
  onSubmit: (password: string) => Promise<void> | void;
  contactHref?: string;
}

const STORAGE_KEY = (slug: string) => `case-unlock:${slug}`;

export function rememberUnlock(slug: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY(slug), "1");
  } catch {}
}

export function isUnlocked(slug: string) {
  try {
    return sessionStorage.getItem(STORAGE_KEY(slug)) === "1";
  } catch {
    return false;
  }
}

export function PasswordGate({
  studyTitle,
  onSubmit,
  contactHref = "mailto:hello@pradyumna.design",
}: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      await onSubmit(value);
    } catch (err) {
      setError(
        (err as Error)?.message ||
          "That's not it. Try again, or reach out and I'll share access.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans py-16 px-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header Badge */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-mono text-xs tabular text-muted-foreground">/case-study</span>
          <div className="h-px w-8 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80">
            Executive Summary & Public Overview
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl text-foreground leading-[1.1] tracking-tight font-medium mb-6">
          {studyTitle}
        </h1>

        {/* Public Executive Summary Cards */}
        <div className="space-y-6 mb-12">
          <div className="p-6 rounded-2xl bg-surface/80 border border-border/50 backdrop-blur-sm space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Overview & Impact
            </h2>
            <p className="font-serif text-lg leading-relaxed text-foreground/90">
              An enterprise AI launchpad designed for a global card network, converging four siloed analytics surfaces into a single unified decision interface.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="border-t border-border/40 pt-3">
                <span className="block font-mono text-[10px] uppercase text-muted-foreground">Opportunity Lift</span>
                <span className="font-serif text-xl font-medium text-foreground">+28%</span>
              </div>
              <div className="border-t border-border/40 pt-3">
                <span className="block font-mono text-[10px] uppercase text-muted-foreground">Revenue Model</span>
                <span className="font-serif text-xl font-medium text-foreground">+14.2%</span>
              </div>
              <div className="border-t border-border/40 pt-3">
                <span className="block font-mono text-[10px] uppercase text-muted-foreground">Scale</span>
                <span className="font-serif text-xl font-medium text-foreground">20M+ Users</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface/40 border border-border/40 space-y-2">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">My Role</h3>
              <p className="text-sm font-sans text-foreground/80">
                Lead Product Designer · UX Strategy, Interaction Architecture & Enterprise Design Systems.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/40 border border-border/40 space-y-2">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Timeline</h3>
              <p className="text-sm font-sans text-foreground/80">
                8 Months (3 mo discovery, 3 mo design execution, 2 mo beta & QA).
              </p>
            </div>
          </div>
        </div>

        {/* NDA Unlock Form */}
        <div className="p-8 rounded-2xl bg-surface border border-border space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                Protected Internal Deck (NDA)
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-sans">
              Detailed wireframes, internal design specs, and user testing recordings are protected. Enter the password or request instant access below.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <input
                type="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                maxLength={120}
                disabled={pending}
                className="w-full bg-background text-foreground ring-1 ring-border focus:ring-foreground/50 rounded-xl px-4 py-3 font-mono text-sm outline-none transition disabled:opacity-70 placeholder:text-muted-foreground/60"
                placeholder="Enter password (e.g. ••••••••)"
              />
            </label>
            {error && (
              <p className="text-xs text-destructive font-medium" role="alert">
                {error}
              </p>
            )}
            <div className="flex flex-wrap gap-3 items-center justify-between pt-1">
              <button
                type="submit"
                disabled={pending || !value}
                className="bg-foreground text-background rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition disabled:opacity-50"
              >
                {pending ? "Unlocking…" : "Unlock Full Deck"}
              </button>
              <a
                href={contactHref}
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Request Access →
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
