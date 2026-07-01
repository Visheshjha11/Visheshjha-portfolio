import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const intervalTime = 35;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // short delay to show 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-[#0a0a0a] overflow-hidden p-8 md:p-16 z-[100]">
      {/* Top Header */}
      <div className="w-full flex justify-between items-start">
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">VJ_CORE_V4.0</p>
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest text-right">
          SYSTEM<br />INITIALIZATION
        </p>
      </div>

      {/* Center Percentage */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative flex items-end">
          <h1 className="text-white text-7xl sm:text-8xl md:text-[10rem] font-mono font-light tracking-tighter tabular-nums leading-none">
            {progress}
          </h1>
          <span className="text-white/40 text-xl sm:text-3xl md:text-5xl font-mono mb-2 md:mb-6 ml-2 md:ml-4">%</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 md:w-96 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="h-full bg-white absolute left-0 top-0"
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex justify-between items-end">
        <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-widest max-w-[150px] leading-relaxed">
          LOADING RESOURCES, TEXTURES & SCRIPTS...
        </p>
        <p className="text-white font-header text-sm sm:text-base font-bold uppercase tracking-[0.2em]">
          VISHESH JHA
        </p>
      </div>
    </div>
  );
}
