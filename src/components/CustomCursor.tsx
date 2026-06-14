import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
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
    const resetIdle = (delay: number) => {
      if (!isVisible) setIsVisible(true);
      if (isIdle) setIsIdle(false);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), delay);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      pos.current = { x: e.clientX, y: e.clientY };
      resetIdle(1500);
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile) return;
      if (e.gamma === null || e.beta === null) return;

      // Base orientation mapping
      // e.gamma is left/right (-90 to 90)
      // e.beta is front/back (-180 to 180)
      
      // Calculate coordinates from center
      const x = window.innerWidth / 2 + (e.gamma / 45) * (window.innerWidth / 2);
      
      // Assume a neutral holding angle is around 45 degrees for beta
      const y = window.innerHeight / 2 + ((e.beta - 45) / 45) * (window.innerHeight / 2);

      pos.current = { x, y };
      resetIdle(3000);
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

    const loop = () => {
      if (spotlightRef.current) {
        if (isMobile) {
          currentX += (pos.current.x - currentX) * 0.1;
          currentY += (pos.current.y - currentY) * 0.1;
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
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isIdle, isMobile, gyroGranted]);

  const getOpacityClass = () => {
    if (isVisible && !isIdle) return isMobile ? 'opacity-[0.25]' : 'opacity-[0.3]';
    return 'opacity-0';
  };

  return (
    <>
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
