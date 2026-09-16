import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>(0);
  
  // Track actual mouse vs lerped position
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Check if hovering over our massive links
      const target = e.target as HTMLElement;
      // We look for the custom cursor-none class we put on the links
      const isHoveringLink = !!target.closest("a") || !!target.closest(".group\\/item") || !!target.closest("button");
      
      if (cursorRef.current) {
        if (isHoveringLink) {
          cursorRef.current.classList.add("scale-[5]");
          if (textRef.current) textRef.current.style.opacity = "1";
        } else {
          cursorRef.current.classList.remove("scale-[5]");
          if (textRef.current) textRef.current.style.opacity = "0";
        }
      }
    };

    const update = () => {
      // Lerp for smooth trailing effect
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        // We translate by -50% to center the 16px dot
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:flex items-center justify-center w-3 h-3 rounded-full bg-white mix-blend-difference transition-[width,height,transform] duration-300 ease-out will-change-transform"
    >
      <span 
        ref={textRef}
        className="text-[3px] font-sans font-medium tracking-widest text-black opacity-0 transition-opacity duration-300 uppercase leading-none mt-[0.5px]"
      >
        View
      </span>
    </div>
  );
}
