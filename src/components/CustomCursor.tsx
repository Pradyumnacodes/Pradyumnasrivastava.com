import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [gyroGranted, setGyroGranted] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
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
      if (!isMobile) return;
      if (e.gamma === null || e.beta === null) return;

      // Clamp gamma to prevent flying off left/right
      // Typical hand tilt is -30 to 30. We use 45 as max bounds.
      const gamma = Math.max(-45, Math.min(45, e.gamma));
      // Clamp beta to prevent flying off top/bottom. Normal reading angle is ~45.
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
      // Ensure it stays visible if gyro is granted
      setIsVisible(true);
    }

    let animationFrameId: number;
    let currentX = pos.current.x;
    let currentY = pos.current.y;

    const loop = () => {
      if (spotlightRef.current) {
        if (isMobile) {
          // Smooth the mobile gyro jitter
          currentX += (pos.current.x - currentX) * 0.15;
          currentY += (pos.current.y - currentY) * 0.15;

          // Tilt-to-scroll logic
          const scrollThreshold = window.innerHeight * 0.15; // 15% margin
          const maxScrollSpeed = 12;

          if (currentY < scrollThreshold) {
            const intensity = 1 - Math.max(0, currentY / scrollThreshold);
            window.scrollBy({ top: -maxScrollSpeed * intensity, behavior: "instant" });
          } else if (currentY > window.innerHeight - scrollThreshold) {
            const intensity = Math.min(1, (currentY - (window.innerHeight - scrollThreshold)) / scrollThreshold);
            window.scrollBy({ top: maxScrollSpeed * intensity, behavior: "instant" });
          }
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isMobile, gyroGranted]);

  const getOpacityClass = () => {
    // If mobile and gyro granted, it is permanently visible.
    // If desktop, it is visible while mouse is on screen.
    if (isMobile && gyroGranted) return 'opacity-[0.15] dark:opacity-[0.08]';
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
