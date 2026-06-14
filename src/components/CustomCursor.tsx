import { useEffect, useRef, useState, useCallback } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const velocityLayerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [gyroGranted, setGyroGranted] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const handleGyroGranted = () => {
      setGyroGranted(true);
      setIsVisible(true);
    };
    window.addEventListener('gyroGranted', handleGyroGranted);
    return () => window.removeEventListener('gyroGranted', handleGyroGranted);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (!isVisible) setIsVisible(true);
      if (isIdle) setIsIdle(false);
      
      pos.current = { x: e.clientX, y: e.clientY };

      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), 1500);
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile) return;
      if (e.gamma === null || e.beta === null) return;

      if (!isVisible) setIsVisible(true);
      if (isIdle) setIsIdle(false);

      const x = window.innerWidth / 2 + (e.gamma / 45) * (window.innerWidth / 2);
      const y = window.innerHeight / 2 + ((e.beta - 45) / 45) * (window.innerHeight / 2);

      pos.current = { x, y };

      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), 3000);
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    
    if (gyroGranted) {
      window.addEventListener("deviceorientation", onDeviceOrientation);
    }

    let animationFrameId: number;
    let currentX = pos.current.x;
    let currentY = pos.current.y;

    // Scroll physics variables
    let lastScrollY = window.scrollY;
    let smoothedVelocity = 0;
    let currentOpacity = 0;

    const loop = () => {
      // 1. Torchlight Physics (Mouse / Gyro)
      if (spotlightRef.current) {
        if (isMobile) {
          currentX += (pos.current.x - currentX) * 0.1;
          currentY += (pos.current.y - currentY) * 0.1;
        } else {
          currentX = pos.current.x;
          currentY = pos.current.y;
        }

        const size = isMobile ? 80 : 200; 
        spotlightRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.5) 30%, transparent 80%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.5) 30%, transparent 80%)`;
      }
      
      // 2. Scroll-Velocity & Overscroll Physics (Mobile Only)
      if (isMobile && velocityLayerRef.current) {
        const currentScrollY = window.scrollY;
        const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
        
        // Calculate velocity
        const velocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        smoothedVelocity += (velocity - smoothedVelocity) * 0.1; // Smooth out the velocity reading

        // Calculate overscroll (pulling past top or bottom bounds)
        let overscrollAmount = 0;
        if (currentScrollY < 0) {
          overscrollAmount = Math.abs(currentScrollY);
        } else if (currentScrollY > maxScroll && maxScroll > 0) {
          overscrollAmount = currentScrollY - maxScroll;
        }

        let targetOpacity = 0;
        
        if (overscrollAmount > 0) {
          // Overscroll Easter Egg: Vivid reveal based on pull distance
          targetOpacity = Math.min(0.5, (overscrollAmount / 150) * 0.5);
        } else {
          // Normal scroll: completely hidden by default
          targetOpacity = 0;
        }

        // Apply heavily damped physics to the opacity for a buttery smooth fade
        currentOpacity += (targetOpacity - currentOpacity) * 0.05;
        velocityLayerRef.current.style.opacity = currentOpacity.toFixed(3);
      }

      // 3. Desktop precise dot
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
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isIdle, isMobile, gyroGranted]);

  const getOpacityClass = () => {
    if (isVisible && !isIdle) return isMobile ? 'opacity-[0.05]' : 'opacity-[0.25]';
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
      
      {/* Physics-driven Velocity & Overscroll Layer */}
      {isMobile && (
        <div
          ref={velocityLayerRef}
          className="fixed top-0 left-0 w-screen h-[100lvh] pointer-events-none z-[-1]"
          style={{
            backgroundImage: "url('/da-vinci.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0, // Controlled purely by JS requestAnimationFrame for 60fps smoothness
            maskImage: "radial-gradient(circle 800px at 50% 50%, black 100%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 800px at 50% 50%, black 100%, transparent 100%)",
          }}
        />
      )}
    </>
  );
}
