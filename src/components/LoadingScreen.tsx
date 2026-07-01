import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const intervalTime = 35;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(
        100,
        Math.floor((currentStep / steps) * 100)
      );
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#0a0a0a] overflow-hidden p-8 md:p-16 z-[100]">
      {/* Top Header */}
      <div className="w-full flex justify-between items-start">
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
          VJ_CORE_V4.0
        </p>

        <p className="text-white/40 font-mono text-xs uppercase tracking-widest text-right">
          SYSTEM
          <br />
          INITIALIZATION
        </p>
      </div>

      {/* Center Loading Bar */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-72 sm:w-96 md:w-[32rem] h-[2px] bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.08, ease: "linear" }}
            style={{ width: 0 }}
          />
        </div>

        <p className="text-white/35 font-mono text-[11px] uppercase tracking-[0.35em]">
          Loading Portfolio...
        </p>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex justify-between items-end">
        <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
          LOADING RESOURCES, TEXTURES & SCRIPTS...
        </p>

        <p className="text-white font-header text-sm sm:text-base font-bold uppercase tracking-[0.2em]">
          VISHESH JHA
        </p>
      </div>
    </div>
  );
}