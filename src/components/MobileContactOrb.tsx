import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Copy, Check, X, ArrowUpRight } from "lucide-react";

export function MobileContactOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
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
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.5 }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-background/70 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 transition-transform"
            >
              <span className="text-sm font-medium tracking-wide">Contact & Resume</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background/70 dark:bg-background/80 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-sm flex flex-col gap-12"
            >
              <div className="text-center">
                <h2 className="text-5xl font-serif text-foreground mb-4">Say Hello.</h2>
                <p className="text-foreground/60 text-lg">I'm currently open to new opportunities.</p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <a 
                  href="/pradyumna_srivastava_resume.pdf" 
                  download="Pradyumna_Srivastava_Resume.pdf"
                  className="group flex items-center justify-between w-full bg-foreground text-background px-6 py-5 rounded-2xl active:scale-[0.98] transition-all"
                >
                  <span className="font-medium text-lg">Download Resume</span>
                  <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </a>

                <a 
                  href="mailto:pradyumna.s.edu@gmail.com"
                  className="group flex items-center justify-between w-full bg-foreground/5 text-foreground px-6 py-5 rounded-2xl active:bg-foreground/10 active:scale-[0.98] transition-all border border-foreground/5"
                >
                  <span className="font-medium text-lg">Email Me</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <button 
                  onClick={handleCopy}
                  className="group flex items-center justify-between w-full bg-foreground/5 text-foreground px-6 py-5 rounded-2xl active:bg-foreground/10 active:scale-[0.98] transition-all border border-foreground/5"
                >
                  <span className="font-medium text-lg">{copied ? "Email Copied!" : "Copy Email"}</span>
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
