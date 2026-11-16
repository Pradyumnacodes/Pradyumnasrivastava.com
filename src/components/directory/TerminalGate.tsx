import { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";

interface TerminalGateProps {
  onUnlock: () => void;
}

export function TerminalGate({ onUnlock }: TerminalGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "designerlife") {
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground font-mono px-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="text-xs uppercase tracking-[0.2em]">Restricted Access</span>
        </div>
        
        <div className="text-sm md:text-base leading-relaxed opacity-80 mb-12">
          <p>pradyumna@server:~$ ssh connect vault.pradyumnasrivastava.com</p>
          <p>Connection established.</p>
          <p>Vault is encrypted. Authentication required.</p>
          {error && <p className="text-red-500 mt-4">Permission denied (publickey,password).</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
          <label htmlFor="passphrase" className="shrink-0 text-sm md:text-base text-foreground opacity-80">
            pradyumna@server:~$ enter passphrase:
          </label>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="password"
              id="passphrase"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-foreground font-mono text-sm md:text-base caret-transparent"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Blinking Cursor aligned with input text */}
            <span 
              className="absolute pointer-events-none w-2 h-4 md:h-5 bg-foreground animate-pulse"
              style={{ left: `${input.length}ch` }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
