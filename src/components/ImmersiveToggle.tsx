import { useState, useEffect } from "react";
import { View, Check } from "lucide-react";

export function ImmersiveToggle() {
  const [gyroStatus, setGyroStatus] = useState<"idle" | "granted" | "denied">("idle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
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
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={gyroStatus !== "granted" ? requestGyro : undefined}
        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md shadow-lg ring-1 transition-all active:scale-95 ${
          gyroStatus === "granted"
            ? "bg-green-500/10 text-green-500 ring-green-500/20"
            : "bg-foreground/5 text-foreground hover:bg-foreground/10 ring-border"
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
    </div>
  );
}
