import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Visual states are expressed as scale() on a fixed 80px element so that hover
// transitions run on the compositor. Animating width/height (as before) forces a
// layout pass on every frame of the 300ms transition.
const BASE_SIZE = 80;
const SCALE_DEFAULT = 14 / BASE_SIZE;
const SCALE_CLICKABLE = 60 / BASE_SIZE;
const SCALE_IMAGE = 1;

const CLICKABLE_SELECTOR =
  "a, button, [role='button'], input[type='submit'], input[type='button'], .clickable";

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

    // No custom cursor on touch-only devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Position is written directly on every pointer event with no CSS transition
    // on transform. The previous `transition: transform 0.1s` restarted on every
    // mousemove, which is what made the cursor feel rubber-banded and late.
    const handleMouseMove = (e: MouseEvent) => {
      const tx = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = tx;
      label.style.transform = tx;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(true);
      } else if (target.closest(CLICKABLE_SELECTOR)) {
        setIsHoveringClickable(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(false);
      } else if (target.closest(CLICKABLE_SELECTOR)) {
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

  const ring = isHoveringClickable && !isHoveringImage;
  const scale = isHoveringImage ? SCALE_IMAGE : isHoveringClickable ? SCALE_CLICKABLE : SCALE_DEFAULT;

  return (
    <>
      {/* Dot cursor: outer node only moves, inner node only scales */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{ width: BASE_SIZE, height: BASE_SIZE, mixBlendMode: "difference", willChange: "transform" }}
      >
        <div
          className="w-full h-full rounded-full box-border"
          style={{
            backgroundColor: ring ? "transparent" : "white",
            // Border is divided by the scale so it still renders as a 1px line
            border: `${1 / scale}px solid ${ring ? "white" : "transparent"}`,
            transform: `scale(${scale})`,
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s",
          }}
        />
      </div>
      {/* "View Project" label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: BASE_SIZE,
          height: BASE_SIZE,
          opacity: isHoveringImage ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
      >
        <span className="text-[0.45rem] font-header font-bold tracking-[0.15em] uppercase text-grit-900 text-center leading-tight">
          VIEW<br />PROJECT
        </span>
      </div>
    </>
  );
}
