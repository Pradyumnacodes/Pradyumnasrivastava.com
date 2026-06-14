import { motion } from "framer-motion";
import { Download, ArrowUpRight, Accessibility, View } from "lucide-react";

export function MobileContactFooter() {
  const triggerAccessibility = () => window.dispatchEvent(new Event("openAccessibility"));
  const triggerGyro = () => window.dispatchEvent(new Event("requestGyro"));

  return (
    <footer className="w-full relative mt-16 mb-8 px-4 sm:px-6 z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-background/60 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 rounded-[2rem] p-8 sm:p-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 shadow-2xl"
      >
        {/* Left Side: Contact */}
        <div className="flex flex-col items-center md:items-start flex-1 w-full text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-3">Say Hello.</h2>
          <p className="text-foreground/60 text-base sm:text-lg mb-8">I'm currently open to new opportunities.</p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <a 
              href="/pradyumna_srivastava_resume.pdf" 
              download="Pradyumna_Srivastava_Resume.pdf"
              className="group flex items-center justify-center sm:justify-between gap-4 flex-1 bg-foreground text-background px-6 py-4 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-foreground/10"
            >
              <span className="font-medium text-base">Download Resume</span>
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </a>

            <a 
              href="mailto:pradyumna.s.edu@gmail.com"
              className="group flex items-center justify-center sm:justify-between gap-4 flex-1 bg-foreground/5 text-foreground px-6 py-4 rounded-2xl active:bg-foreground/10 active:scale-[0.98] transition-all border border-foreground/5 hover:border-foreground/20"
            >
              <span className="font-medium text-base">Email Me</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Side: Settings */}
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-foreground/10 md:pl-12 justify-center md:justify-end">
          <button
            onClick={triggerAccessibility}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all text-foreground/60 hover:text-foreground w-28 h-28"
          >
            <Accessibility className="w-6 h-6" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-center">A11y</span>
          </button>

          <button
            onClick={triggerGyro}
            className="md:hidden flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all text-foreground/60 hover:text-foreground w-28 h-28"
          >
            <View className="w-6 h-6" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-center">3D Effect</span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
