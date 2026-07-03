"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import clsx from "clsx";

export interface DockProps {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  disableMagnification?: boolean;
  children: React.ReactNode;
}

export function Dock({
  className = "",
  iconSize = 36,
  iconMagnification = 52,
  iconDistance = 100,
  direction = "middle",
  disableMagnification = false,
  children,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={clsx(
        "flex h-[56px] items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a]/95 px-4 backdrop-blur-md shadow-xl",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
            disableMagnification,
          });
        }
        return child;
      })}
    </motion.div>
  );
}

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  disableMagnification?: boolean;
}

export function DockIcon({
  size = 40,
  magnification = 60,
  distance = 140,
  mouseX,
  className = "",
  children,
  disableMagnification = false,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX ?? useMotionValue(Infinity), (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width: disableMagnification ? size : width,
        height: disableMagnification ? size : width,
      }}
      className={clsx(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-white/5 text-neutral-300 transition-colors hover:bg-white/15 hover:text-white",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
