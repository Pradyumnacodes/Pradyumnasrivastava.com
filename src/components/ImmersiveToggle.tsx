import { useState, useEffect } from "react";


export function ImmersiveToggle() {
  const [gyroStatus, setGyroStatus] = useState<"idle" | "granted" | "denied">("idle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const requestGyro = async () => {
    const doc = document.documentElement as any;
    const enterFullscreen = () => {
      if (doc.requestFullscreen) doc.requestFullscreen().catch(() => {});
      else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
    };
    enterFullscreen();

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setGyroStatus("granted");
          window.dispatchEvent(new Event('gyroGranted'));
        } else {
          setGyroStatus("denied");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setGyroStatus("granted");
      window.dispatchEvent(new Event('gyroGranted'));
    }
  };

  if (!isMobile) return null;

  return (
      <button
        onClick={gyroStatus !== "granted" ? requestGyro : undefined}
        className={`group flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-500 backdrop-blur-md ${
          gyroStatus === "granted"
            ? "bg-foreground/5 text-foreground ring-1 ring-foreground/20 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            : "bg-transparent text-foreground/60 ring-1 ring-foreground/10 hover:ring-foreground/20 hover:text-foreground hover:bg-foreground/5"
        }`}
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
          gyroStatus === "granted" 
            ? "bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" 
            : "bg-foreground/20 group-hover:bg-foreground/40"
        }`} />
        <span>Immersive</span>
      </button>
  );
}
