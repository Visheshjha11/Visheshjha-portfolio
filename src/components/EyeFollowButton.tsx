import { useEffect, useRef, type ReactNode } from "react";

/* Port of the Framer "Eye Follow Button": a pill button with eyes whose
   pupils follow the cursor. The Framer original pulls its eyes from a
   separate FollowEyes module, so the eyes here are a reimplementation that
   takes the same options (count, size, gap, colours, range, speed, blink). */

type EyesProps = {
  count: 1 | 2;
  eyeSize: number;
  pupilSize: number;
  gap: number;
  eyeColor: string;
  pupilColor: string;
  /** How far the pupil may travel, as a % of the eye's free space (0-100). */
  range: number;
  /** Easing speed; higher snaps to the cursor faster (Framer default 100). */
  speed: number;
  blinking: boolean;
  /** Milliseconds between blinks. */
  blinkInterval: number;
};

function FollowEyes({
  count,
  eyeSize,
  pupilSize,
  gap,
  eyeColor,
  pupilColor,
  range,
  speed,
  blinking,
  blinkInterval,
}: EyesProps) {
  const eyeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pupilRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Pupil tracking: one shared pointer listener, one rAF loop that sleeps
  // once every pupil has settled.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const maxTravel = Math.max(0, ((eyeSize - pupilSize) / 2) * (range / 100));
    const pos = Array.from({ length: count }, () => ({ x: 0, y: 0 }));
    let pointer = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const alpha = 1 - Math.exp(-dt * (speed / 10));
      let moving = false;

      for (let i = 0; i < count; i++) {
        const eye = eyeRefs.current[i];
        const pupil = pupilRefs.current[i];
        if (!eye || !pupil) continue;

        const r = eye.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(dist, maxTravel);
        const tx = (dx / dist) * reach;
        const ty = (dy / dist) * reach;

        pos[i].x += (tx - pos[i].x) * alpha;
        pos[i].y += (ty - pos[i].y) * alpha;
        pupil.style.transform = `translate(${pos[i].x}px, ${pos[i].y}px)`;

        if (Math.abs(tx - pos[i].x) > 0.05 || Math.abs(ty - pos[i].y) > 0.05) moving = true;
      }

      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [count, eyeSize, pupilSize, range, speed]);

  // Optional blinking: squash the eyes briefly every `blinkInterval` ms.
  useEffect(() => {
    if (!blinking) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let reopen: number | undefined;
    const id = window.setInterval(() => {
      eyeRefs.current.forEach((el) => el && (el.style.transform = "scaleY(0.1)"));
      reopen = window.setTimeout(() => {
        eyeRefs.current.forEach((el) => el && (el.style.transform = "scaleY(1)"));
      }, 140);
    }, blinkInterval);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(reopen);
    };
  }, [blinking, blinkInterval]);

  return (
    <span aria-hidden className="flex items-center" style={{ gap }}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            eyeRefs.current[i] = el;
          }}
          className="relative flex items-center justify-center rounded-full transition-transform duration-100"
          style={{ width: eyeSize, height: eyeSize, backgroundColor: eyeColor }}
        >
          <span
            ref={(el) => {
              pupilRefs.current[i] = el;
            }}
            className="rounded-full will-change-transform"
            style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor }}
          />
        </span>
      ))}
    </span>
  );
}

type EyeFollowButtonProps = {
  /** Visible label. Pass `labelAlt` to swap text without resizing the button. */
  label: ReactNode;
  labelAlt?: ReactNode;
  showAlt?: boolean;
  onClick?: () => void;
  buttonColor?: string;
  textColor?: string;
  eyeColor?: string;
  pupilColor?: string;
  eyeCount?: 1 | 2;
  eyeSize?: number;
  pupilSize?: number;
  eyeGap?: number;
  range?: number;
  speed?: number;
  blinking?: boolean;
  blinkInterval?: number;
  padding?: string;
  radius?: string;
  className?: string;
};

export default function EyeFollowButton({
  label,
  labelAlt,
  showAlt = false,
  onClick,
  buttonColor = "#0a0a0a",
  textColor = "#fcfcfb",
  eyeColor = "#fcfcfb",
  pupilColor = "#0a0a0a",
  eyeCount = 2,
  eyeSize = 40,
  pupilSize = 12,
  eyeGap = 4,
  range = 90,
  speed = 100,
  blinking = false,
  blinkInterval = 2000,
  padding = "6px 6px 6px 20px",
  radius = "30px",
  className = "",
}: EyeFollowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-5 outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfb] ${className}`}
      style={{
        padding,
        borderRadius: radius,
        backgroundColor: buttonColor,
        color: textColor,
        boxShadow:
          "0.4px 0.4px 0.56px -0.31px rgba(0,0,0,0.07), 1.2px 1.2px 1.7px -0.63px rgba(0,0,0,0.08), 3.2px 3.2px 4.5px -0.94px rgba(0,0,0,0.1), 10px 10px 14.1px -1.25px rgba(0,0,0,0.19)",
      }}
    >
      {/* Both labels share one grid cell so the button never changes width. */}
      <span
        role="status"
        aria-live="polite"
        className="grid whitespace-pre font-header text-base font-bold leading-[1.4] tracking-[-0.02em]"
      >
        <span style={{ gridArea: "1 / 1" }} className={showAlt ? "invisible" : ""}>
          {label}
        </span>
        {labelAlt !== undefined && (
          <span style={{ gridArea: "1 / 1" }} className={showAlt ? "" : "invisible"}>
            {labelAlt}
          </span>
        )}
      </span>
      <FollowEyes
        count={eyeCount}
        eyeSize={eyeSize}
        pupilSize={pupilSize}
        gap={eyeGap}
        eyeColor={eyeColor}
        pupilColor={pupilColor}
        range={range}
        speed={speed}
        blinking={blinking}
        blinkInterval={blinkInterval}
      />
    </button>
  );
}
