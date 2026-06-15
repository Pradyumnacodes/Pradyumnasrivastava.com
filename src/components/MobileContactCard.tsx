import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowUpRight, Copy, Check } from "lucide-react";

export function MobileContactCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("pradyumna.s.edu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMobile) return null;

  return (
    <div className="w-full relative mt-8 z-10">
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full relative overflow-hidden bg-background/60 dark:bg-surface/40 backdrop-blur-3xl border border-foreground/10 dark:border-white/10 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/20 dark:ring-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="text-center flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse" />
          </motion.div>
          <h2 className="text-4xl font-serif text-foreground mb-3">Say Hello.</h2>
          <p className="text-foreground/60 text-lg">I'm currently open to new opportunities.</p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <a 
            href="/pradyumna_srivastava_resume.pdf" 
            download="Pradyumna_Srivastava_Resume.pdf"
            className="group relative overflow-hidden flex items-center justify-between w-full bg-foreground text-background px-6 py-5 rounded-2xl active:scale-[0.98] transition-all duration-300 shadow-xl shadow-foreground/10 ring-1 ring-inset ring-foreground/10"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="font-medium text-lg relative z-10">Download Resume</span>
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform relative z-10" />
          </a>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <a 
              href="mailto:pradyumna.s.edu@gmail.com"
              className="flex flex-col items-center justify-center gap-3 bg-surface hover:bg-foreground/5 py-5 rounded-2xl active:scale-[0.97] transition-all duration-300 border border-foreground/5 ring-1 ring-inset ring-white/10 shadow-sm"
            >
              <ArrowUpRight className="w-6 h-6 text-foreground/70 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium tracking-wide">Email Me</span>
            </a>
            
            <button 
              onClick={handleCopy}
              className="group flex flex-col items-center justify-center gap-3 bg-surface hover:bg-foreground/5 py-5 rounded-2xl active:scale-[0.97] transition-all duration-300 border border-foreground/5 ring-1 ring-inset ring-white/10 shadow-sm"
            >
              {copied ? (
                <Check className="w-6 h-6 text-foreground scale-110" />
              ) : (
                <Copy className="w-6 h-6 text-foreground/70 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm font-medium tracking-wide">{copied ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
