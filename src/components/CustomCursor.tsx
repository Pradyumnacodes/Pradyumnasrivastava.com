import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    // Shared timeout logic
    const resetIdle = (delay: number) => {
      if (!isVisible) setIsVisible(true);
      if (isIdle) setIsIdle(false);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), delay);
    };

    // Desktop Mouse Tracking
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      pos.current = { x: e.clientX, y: e.clientY };
      resetIdle(1500);
    };

    // Mobile Touch Tracking (Permission-Free)
    const onTouchMove = (e: TouchEvent) => {
      if (!isMobile || e.touches.length === 0) return;
      pos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      resetIdle(2500); // slightly longer idle for touch
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isMobile || e.touches.length === 0) return;
      pos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      resetIdle(2500);
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    
    // Passive true ensures touch tracking doesn't block scrolling performance
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let animationFrameId: number;
    let currentX = pos.current.x;
    let currentY = pos.current.y;

    const loop = () => {
      // Torchlight Physics
      if (spotlightRef.current) {
        if (isMobile) {
          // Add a slight drag/smoothing to the touch tracking
          currentX += (pos.current.x - currentX) * 0.15;
          currentY += (pos.current.y - currentY) * 0.15;
        } else {
          currentX = pos.current.x;
          currentY = pos.current.y;
        }

        // The Sweet Spot: Increased radius and brighter inner core
        const size = isMobile ? 150 : 300; 
        spotlightRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.7) 40%, transparent 80%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.7) 40%, transparent 80%)`;
      }
      
      // Desktop precise dot
      if (!isMobile) {
        const exactDot = document.getElementById('exact-dot');
        if (exactDot) {
          exactDot.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isIdle, isMobile]);

  const getOpacityClass = () => {
    // Increased base opacity slightly so the sweet spot feels richer
    if (isVisible && !isIdle) return isMobile ? 'opacity-[0.25]' : 'opacity-[0.3]';
    return 'opacity-0';
  };

  return (
    <>
      {/* The main torchlight/spotlight */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-screen h-[100lvh] pointer-events-none z-[-2] transition-opacity duration-[1500ms] ease-in-out ${getOpacityClass()}`}
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
