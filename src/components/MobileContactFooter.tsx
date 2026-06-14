import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";

export function MobileContactFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <footer className="w-full relative mt-16 mb-8 px-4 sm:px-6 z-10">
      <motion.div 
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full bg-background/60 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center gap-10 shadow-2xl"
      >
        <div className="text-center flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            viewport={{ once: false }}
            className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>
          <h2 className="text-4xl font-serif text-foreground mb-3">Say Hello.</h2>
          <p className="text-foreground/60 text-lg">I'm currently open to new opportunities.</p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <a 
            href="/pradyumna_srivastava_resume.pdf" 
            download="Pradyumna_Srivastava_Resume.pdf"
            className="group flex items-center justify-between w-full bg-foreground text-background px-6 py-5 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-foreground/10"
          >
            <span className="font-medium text-lg">Download Resume</span>
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a 
            href="mailto:pradyumna.s.edu@gmail.com"
            className="group flex items-center justify-between w-full bg-foreground/5 text-foreground px-6 py-5 rounded-2xl active:bg-foreground/10 active:scale-[0.98] transition-all border border-foreground/5 hover:border-foreground/20"
          >
            <span className="font-medium text-lg">Email Me</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
