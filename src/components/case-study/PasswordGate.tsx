import { useState, type FormEvent } from "react";
import { Lock, ArrowRight } from "lucide-react";

interface Props {
  studyTitle: string;
  description?: string;
  onSubmit: (password: string) => Promise<void> | void;
  contactHref?: string;
}

const STORAGE_KEY = (slug: string) => `case-unlock:${slug}`;

export function rememberUnlock(slug: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY(slug), "1");
  } catch {
    // Ignore storage errors
  }
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
  description = "This case study contains proprietary material and is strictly protected under NDA. Please authenticate to view the payload.",
  onSubmit,
  contactHref = "mailto:hello@pradyumna.design",
}: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pending || !value) return;
    setError(null);
    setPending(true);
    try {
      await onSubmit(value);
    } catch (err) {
      setError(
        (err as Error)?.message || "Incorrect password.",
      );
    } finally {
      setPending(false);
      setValue("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-sans flex flex-col justify-center px-12 md:px-32 selection:bg-white/20">
      <div className="max-w-4xl w-full">


        {/* Title */}
        <h1 className="text-5xl md:text-[6rem] tracking-tighter font-medium text-white/90 leading-[0.9] text-balance mb-12">
          {studyTitle}
        </h1>
        
        <p className="text-xl md:text-3xl font-light tracking-tight text-white/50 leading-relaxed max-w-3xl mb-16">
          {description}
        </p>

        {/* Brutalist Form */}
        <form onSubmit={submit} className="max-w-2xl">
          <div className="relative flex items-center border-b border-white/20 group focus-within:border-white transition-colors duration-500">
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
              className="w-full bg-transparent text-4xl md:text-5xl font-mono text-white py-6 outline-none transition disabled:opacity-50 placeholder:text-white/20"
              placeholder="ENTER_KEY"
            />
            <button
              type="submit"
              disabled={pending || !value}
              className="absolute right-0 flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          
          {error && (
            <p className="mt-6 text-red-500 font-mono text-[11px] uppercase tracking-[0.15em] flex items-center gap-2" role="alert">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              Error: {error}
            </p>
          )}

          <div className="mt-16 pt-8 border-t border-white/10">
            <a
              href={contactHref}
              className="group font-sans text-xl md:text-2xl font-light text-white/40 hover:text-white transition-colors inline-flex items-center gap-3"
            >
              Need access? <span className="underline underline-offset-8 decoration-white/20 group-hover:decoration-white transition-colors">Let's talk.</span>
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
