import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (!isVisible) setIsVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
    };
    
    // Only fade out if the mouse actively leaves the window (desktop)
    const onMouseLeave = () => {
      if (!isMobile) setIsVisible(false);
    };
    const onMouseEnter = () => {
      if (!isMobile) setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;
    let currentX = pos.current.x;
    let currentY = pos.current.y;

    const loop = () => {
      if (spotlightRef.current) {
        if (isMobile) {
          // Autonomous Ambient Lantern Effect (Lissajous Curve)
          const time = Date.now() * 0.0005; // speed
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const rx = window.innerWidth * 0.4; // 40% horizontal radius
          const ry = window.innerHeight * 0.3; // 30% vertical radius
          
          // Add a subtle scroll influence so it shifts slightly as they scroll
          const scrollImpact = (window.scrollY * 0.1) % (window.innerHeight * 0.2);

          const targetX = cx + Math.sin(time * 0.7) * rx;
          const targetY = cy + Math.cos(time * 0.5) * ry - scrollImpact;

          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;
        } else {
          currentX = pos.current.x;
          currentY = pos.current.y;
        }

        const size = isMobile ? 150 : 300; 
        spotlightRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.7) 40%, transparent 80%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.7) 40%, transparent 80%)`;
      }
      
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isMobile]);

  const getOpacityClass = () => {
    // If mobile, it is perfectly visible as an ambient effect
    // If desktop, it is visible while mouse is on screen
    if (isMobile) return 'opacity-[0.15] dark:opacity-[0.08]';
    if (!isMobile && isVisible) return 'opacity-[0.15] dark:opacity-[0.08]';
    return 'opacity-0';
  };

  return (
    <>
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-screen h-[100lvh] pointer-events-none z-[-2] transition-opacity duration-1000 ease-in-out mix-blend-overlay dark:mix-blend-screen dark:brightness-[0.3] dark:contrast-[1.1] grayscale-[0.8] blur-[3px] ${getOpacityClass()}`}
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
