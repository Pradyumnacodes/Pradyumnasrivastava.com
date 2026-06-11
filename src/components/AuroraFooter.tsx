import { ReactNode } from "react";

export function AuroraFooter({ children }: { children: ReactNode }) {
  return (
    <footer className="relative overflow-hidden text-paper px-6 py-16 mt-12">
      <div className="absolute inset-0 bg-deep-ink" />
      <div
        className="absolute -inset-[20%] opacity-30 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 20%, oklch(0.65 0.12 260), transparent 70%)",
          animation: "aurora-drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[20%] opacity-25 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 60%, oklch(0.6 0.14 160), transparent 70%)",
          animation: "aurora-drift-slow 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[20%] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.55 0.1 40), transparent 70%)",
          animation: "aurora-drift 26s ease-in-out infinite reverse",
        }}
      />
      <div className="relative max-w-7xl mx-auto flex flex-wrap justify-between gap-6">
        {children}
      </div>
    </footer>
  );
}
