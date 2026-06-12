import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Wake up from idle state
      if (isIdle) setIsIdle(false);
      
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Reset idle timeout
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        setIsIdle(true);
      }, 1500); // 1.5 seconds of inactivity fades the spotlight
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;

    const loop = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.maskImage = `radial-gradient(circle 350px at ${mousePos.current.x}px ${mousePos.current.y}px, black 40%, transparent 100%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle 350px at ${mousePos.current.x}px ${mousePos.current.y}px, black 40%, transparent 100%)`;
      }
      
      const exactDot = document.getElementById('exact-dot');
      if (exactDot) {
        exactDot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isIdle]);


  return (
    <>
      {/* Spotlight background mask */}
      <div
        ref={spotlightRef}
        className={`hidden md:block fixed top-0 left-0 w-screen h-[100lvh] pointer-events-none z-[-1] transition-opacity duration-1000 ${
          isVisible && !isIdle ? 'opacity-[0.25]' : 'opacity-0'
        }`}
        style={{
          backgroundImage: "url('/da-vinci.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)",
        }}
      />
    </>
  );
}
