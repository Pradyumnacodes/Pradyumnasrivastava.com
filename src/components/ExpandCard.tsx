import { motion } from "framer-motion";

export function ExpandCard({ 
  children, 
  className = "",
  isHovered,
  isDimmed
}: { 
  children: React.ReactNode; 
  className?: string;
  isHovered: boolean;
  isDimmed: boolean;
}) {
  return (
    <motion.div
      animate={{ 
        scale: isHovered ? 1.05 : 1,
        filter: isDimmed ? "grayscale(100%)" : "grayscale(0%)",
        opacity: isDimmed ? 0.4 : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      className={`relative w-full will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
