import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Parallax({ 
  children, 
  offset = 50, 
  className = "" 
}: { 
  children: React.ReactNode, 
  offset?: number, 
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // As the element scrolls from the bottom of the screen to the top,
  // we translate it on the Y axis from -offset to +offset (or vice-versa).
  // A negative offset means it moves slower than the scroll (parallax down).
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
