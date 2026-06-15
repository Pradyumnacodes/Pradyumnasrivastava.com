import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [gyroGranted, setGyroGranted] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleGyroGranted = () => {
      setGyroGranted(true);
      setIsVisible(true);
      // Center it immediately when granted so it doesn't wait for movement
      pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };
    window.addEventListener('gyroGranted', handleGyroGranted);
    return () => window.removeEventListener('gyroGranted', handleGyroGranted);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (!isVisible) setIsVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile || !gyroGranted) return;
      if (e.gamma === null || e.beta === null) return;

      // Clamp gamma to prevent flying off left/right
      // Typical hand tilt is -30 to 30. We use 45 as max bounds.
      const gamma = Math.max(-45, Math.min(45, e.gamma));
      // Clamp beta to prevent flying off top/bottom. Normal reading angle is ~45.
      // So beta around 45 should center it. We map 0-90 to full screen height.
      const beta = Math.max(0, Math.min(90, e.beta));

      const x = window.innerWidth / 2 + (gamma / 45) * (window.innerWidth / 2);
      const y = window.innerHeight / 2 + ((beta - 45) / 45) * (window.innerHeight / 2);

      pos.current = { x, y };
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
    
    if (gyroGranted) {
      window.addEventListener("deviceorientation", onDeviceOrientation);
      setIsVisible(true);
    }

    let animationFrameId: number;
    let currentX = pos.current.x;
    let currentY = pos.current.y;

    const loop = () => {
      if (spotlightRef.current) {
        if (isMobile) {
          if (gyroGranted) {
            // Gyroscope Physics
            currentX += (pos.current.x - currentX) * 0.15;
            currentY += (pos.current.y - currentY) * 0.15;
          } else {
            // Autonomous Ambient Lantern Effect (Fallback / Default)
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
          }
        } else {
          currentX = pos.current.x;
          currentY = pos.current.y;
        }

        // Reduced radius by 15%
        const size = isMobile ? 255 : 425;
        spotlightRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 70%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 70%)`;
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
      if (gyroGranted) {
        window.removeEventListener("deviceorientation", onDeviceOrientation);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isMobile, gyroGranted]);

  const getOpacityClass = () => {
    // Da Vinci manuscript needs enough opacity to be seen, but not overpower the text.
    if (isMobile) return 'opacity-60 dark:opacity-40';
    if (!isMobile && isVisible) return 'opacity-60 dark:opacity-40';
    return 'opacity-0';
  };

  return (
    <>
      <div
        ref={spotlightRef}
        className={`fixed inset-0 pointer-events-none z-[-2] transition-opacity duration-1000 ease-in-out mix-blend-multiply dark:mix-blend-screen blur-[3px] sepia-[0.5] contrast-[1.1] dark:brightness-[0.8] ${getOpacityClass()}`}
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
