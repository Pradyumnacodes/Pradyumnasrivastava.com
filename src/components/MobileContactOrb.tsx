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
      {/* The Sleek Frosted Glass Pill (FAB) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-background/70 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 transition-transform"
            >
              <span className="text-sm font-medium tracking-wide">Say Hello</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md"
            />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 1 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-[#FDFBF7] dark:bg-[#141414] border-t border-border/50 rounded-t-[32px] p-6 pb-12 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] touch-none"
            >
              <div className="w-12 h-1.5 bg-foreground/20 rounded-full mx-auto mb-8" />
              
              <h2 className="text-3xl font-serif text-foreground mb-8 text-center">Let's Connect</h2>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="/pradyumna_srivastava_resume.pdf" 
                  download="Pradyumna_Srivastava_Resume.pdf"
                  className="flex items-center justify-center gap-3 w-full bg-foreground text-background py-5 rounded-2xl font-medium text-lg active:scale-[0.98] transition-transform shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <a 
                    href="mailto:pradyumna.s.edu@gmail.com"
                    className="flex flex-col items-center justify-center gap-3 bg-foreground/5 py-5 rounded-2xl active:bg-foreground/10 transition-colors border border-foreground/5"
                  >
                    <ArrowUpRight className="w-6 h-6 text-foreground/70" />
                    <span className="text-sm font-medium tracking-wide">Email Me</span>
                  </a>
                  
                  <button 
                    onClick={handleCopy}
                    className="flex flex-col items-center justify-center gap-3 bg-foreground/5 py-5 rounded-2xl active:bg-foreground/10 transition-colors border border-foreground/5"
                  >
                    {copied ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Copy className="w-6 h-6 text-foreground/70" />
                    )}
                    <span className="text-sm font-medium tracking-wide">{copied ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
