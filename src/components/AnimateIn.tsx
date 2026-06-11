import type { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

interface Props {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

const ANIMATIONS: Record<Animation, { from: CSSProperties; to: CSSProperties }> = {
  "fade-up": {
    from: { opacity: 0, transform: "translateY(32px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "fade-left": {
    from: { opacity: 0, transform: "translateX(-24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    from: { opacity: 0, transform: "translateX(24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
};

export function AnimateIn({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  as: Tag = "div",
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  const anim = ANIMATIONS[animation];

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        ...(!inView ? anim.from : anim.to),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
