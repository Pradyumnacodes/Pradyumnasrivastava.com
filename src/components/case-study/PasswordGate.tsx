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
    <div className="min-h-dvh bg-background text-foreground font-sans flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="font-mono text-xs tabular text-foreground">/protected</span>
          <div className="h-px w-10 bg-foreground/40" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
            NDA · Access required
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.05] tracking-tight font-medium text-balance mb-4">
          {studyTitle}
        </h1>
        <p className="font-serif italic text-lg text-foreground mb-10 max-w-[42ch]">
          This case study is shared privately. Enter the password I sent you — or reach out and I'll
          unlock it for you.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              Password
            </span>
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              maxLength={120}
              autoFocus
              disabled={pending}
              className="mt-2 w-full bg-surface text-foreground ring-1 ring-foreground/25 focus:ring-foreground/70 rounded-xl px-4 py-3 font-mono text-base outline-none transition disabled:opacity-70 placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="text-sm text-destructive font-semibold" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3 items-center pt-2">
            <button
              type="submit"
              disabled={pending || !value}
              className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {pending ? "Checking…" : "Unlock case study"}
            </button>
            <a
              href={contactHref}
              className="text-sm font-serif italic underline underline-offset-4 text-foreground hover:opacity-80"
            >
              Request access instead →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
