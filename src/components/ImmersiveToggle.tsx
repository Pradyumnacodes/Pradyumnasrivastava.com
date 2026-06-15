import { useState, useEffect } from "react";
import { View, Check } from "lucide-react";

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
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 ring-1 ${
          gyroStatus === "granted"
            ? "bg-foreground text-background ring-foreground shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-surface/80 text-muted-foreground ring-border hover:text-foreground hover:bg-surface"
        }`}
      >
        {gyroStatus === "granted" ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-medium">Immersive On</span>
          </>
        ) : (
          <>
            <View className="w-3.5 h-3.5 opacity-70" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-medium opacity-80">Immersive Mode</span>
          </>
        )}
      </button>
  );
}
