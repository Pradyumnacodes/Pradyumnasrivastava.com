import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function StaggerText({ text, className = "", delay = 0 }: StaggerTextProps) {
  // We can manually parse out the italic parts based on the known string
  const words = text.split(" ");

  // All-at-once holistic lens focus effect
  const container = {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1], // Cinematic lens focus ease
        delay,
      },
    },
  };

  return (
    <motion.h1
      className={`${className} group cursor-default`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIdx) => {
        // Simple markdown-style parser for italics (e.g. *finance*)
        const isItalic = word.startsWith('*') && word.endsWith('*');
        const cleanWord = isItalic ? word.replace(/\*/g, '') : word;

        return (
          <span key={wordIdx} className="inline-block whitespace-pre">
            <span
              className={`inline-block transition-all duration-300 group-hover:opacity-30 hover:!opacity-100 hover:-translate-y-0.5 ${isItalic ? "font-serif italic font-light tracking-normal text-muted-foreground" : ""}`}
            >
              {cleanWord}
            </span>
            {wordIdx !== words.length - 1 && " "}
          </span>
        );
      })}
    </motion.h1>
  );
}
