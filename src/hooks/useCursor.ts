import { useEffect } from "react";

const HOVER_SELECTOR = ".cursor-hover, a, button, input, textarea";

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frameId = 0;
    let hovering = false;

    const setHoverState = (nextHovering: boolean) => {
      if (hovering === nextHovering) return;
      hovering = nextHovering;
      cursor.classList.toggle("is-hovering", nextHovering);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest(HOVER_SELECTOR)) {
        setHoverState(true);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;
      const relatedTarget = event.relatedTarget;

      if (!(target instanceof Element)) return;

      if (!(relatedTarget instanceof Element) || !relatedTarget.closest(HOVER_SELECTOR)) {
        if (target.closest(HOVER_SELECTOR)) {
          setHoverState(false);
        }
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.45;
      currentY += (targetY - currentY) * 0.45;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      frameId = window.requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    frameId = window.requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(frameId);
    };
  }, []);
}