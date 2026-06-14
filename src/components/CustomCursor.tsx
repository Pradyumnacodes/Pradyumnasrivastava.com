import { useEffect, useRef, useState, useCallback } from "react";

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

  const requestGyro = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setGyroGranted(true);
          setIsVisible(true);
        } else {
          setGyroGranted(false);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Non iOS 13+ devices
      setGyroGranted(true);
      setIsVisible(true);
    }
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

      // Gamma: left to right (-90 to 90)
      // Beta: front to back (-180 to 180). Assume 45 is normal holding angle.
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

    const loop = () => {
      if (spotlightRef.current) {
        // Smooth interpolation for gyro, instant for mouse
        if (isMobile) {
          currentX += (pos.current.x - currentX) * 0.1;
          currentY += (pos.current.y - currentY) * 0.1;
        } else {
          currentX = pos.current.x;
          currentY = pos.current.y;
        }

        const size = isMobile ? 400 : 350; // Larger spread on mobile
        spotlightRef.current.style.maskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 40%, transparent 100%)`;
        spotlightRef.current.style.WebkitMaskImage = `radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 40%, transparent 100%)`;
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


  return (
    <>
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-screen h-[100lvh] pointer-events-none z-[-1] transition-opacity duration-1000 ${
          isVisible && !isIdle ? (isMobile ? 'opacity-[0.10]' : 'opacity-[0.25]') : 'opacity-0'
        }`}
        style={{
          backgroundImage: "url('/da-vinci.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)",
        }}
      />
      
      {isMobile && gyroGranted === null && (
        <button
          onClick={requestGyro}
          className="fixed bottom-6 right-6 z-50 bg-foreground/10 hover:bg-foreground/20 backdrop-blur-md text-foreground px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] ring-1 ring-border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          ✦ Enable 3D BG
        </button>
      )}
    </>
  );
}
