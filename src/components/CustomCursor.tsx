import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const location = useLocation();

  // Reset cursor states on route change
  useEffect(() => {
    setIsHoveringImage(false);
    setIsHoveringClickable(false);
  }, [location.pathname]);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const tx = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (dot) dot.style.transform = tx;
      if (label) label.style.transform = tx;
    };

    // Detect hover on project images and clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(true);
      } else if (target.closest("a, button, [role='button'], input[type='submit'], input[type='button'], .clickable")) {
        setIsHoveringClickable(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(false);
      } else if (target.closest("a, button, [role='button'], input[type='submit'], input[type='button'], .clickable")) {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full hidden md:block box-border"
        style={{
          width: isHoveringImage ? "80px" : isHoveringClickable ? "60px" : "14px",
          height: isHoveringImage ? "80px" : isHoveringClickable ? "60px" : "14px",
          backgroundColor: isHoveringClickable && !isHoveringImage ? "transparent" : "white",
          border: isHoveringClickable && !isHoveringImage ? "1px solid white" : "1px solid transparent",
          mixBlendMode: "difference",
          transition: "transform 0.1s ease-out, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s",
        }}
      />
      {/* "View Project" label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: "80px",
          height: "80px",
          opacity: isHoveringImage ? 1 : 0,
          transition: "transform 0.15s ease-out, opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="text-[0.45rem] font-header font-bold tracking-[0.15em] uppercase text-grit-900 text-center leading-tight">
          VIEW<br />PROJECT
        </span>
      </div>
    </>
  );
}

