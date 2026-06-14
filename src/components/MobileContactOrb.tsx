import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Copy, Check, Sparkles, X } from "lucide-react";

export function MobileContactOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleScroll = () => {
      if (window.scrollY > 150 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const handleCopy = () => {
    navigator.clipboard.writeText("pradyumna.s.edu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMobile) return null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && hasScrolled && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
            <motion.div
              layoutId="orb-container"
              className="cursor-pointer group relative"
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              onClick={() => setIsOpen(true)}
              style={{ touchAction: "none", borderRadius: 9999 }}
            >
              {/* Hyper-realistic 3D Design */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#111111] dark:from-[#333] dark:to-[#000] text-[#EAE8E3] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center ring-1 ring-white/10 active:scale-95 transition-transform duration-300 relative overflow-hidden">
                <Sparkles className="w-5 h-5 mb-0.5 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span className="text-[8px] font-bold tracking-widest uppercase text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Hello</span>
                
                {/* Glass glare overlay */}
                <div className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-white/20 to-transparent h-[45%]" />
              </div>
            </motion.div>
          </div>
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
            
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                layoutId="orb-container"
                style={{ borderRadius: 32 }}
                className="w-full max-w-sm bg-[#FDFBF7] dark:bg-[#141414] border border-border/50 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)] pointer-events-auto relative overflow-hidden"
              >
                {/* 3D Inner highlight */}
                <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/20 dark:ring-white/5 pointer-events-none" />
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-foreground/5 active:bg-foreground/10 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>

                <h2 className="text-3xl font-serif text-foreground mb-8">Let's Connect</h2>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href="/pradyumna_srivastava_resume.pdf" 
                    download="Pradyumna_Srivastava_Resume.pdf"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-b from-foreground to-foreground/90 text-background py-4 rounded-2xl font-medium text-lg active:scale-[0.98] transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/20"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <a 
                      href="mailto:pradyumna.s.edu@gmail.com"
                      className="flex flex-col items-center justify-center gap-3 bg-foreground/5 py-4 rounded-2xl active:bg-foreground/10 transition-colors ring-1 ring-inset ring-foreground/5"
                    >
                      <Mail className="w-6 h-6 text-foreground/70" />
                      <span className="text-sm font-medium tracking-wide">Email Me</span>
                    </a>
                    
                    <button 
                      onClick={handleCopy}
                      className="flex flex-col items-center justify-center gap-3 bg-foreground/5 py-4 rounded-2xl active:bg-foreground/10 transition-colors ring-1 ring-inset ring-foreground/5"
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
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
