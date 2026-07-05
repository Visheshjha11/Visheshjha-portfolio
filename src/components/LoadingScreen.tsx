import { motion } from "motion/react";
import { useEffect } from "react";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {


  useEffect(() => {
    // 4.2 seconds duration gives a smooth, deliberate feel
    const timer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#F5F5F5] p-6 md:p-12 z-[100] text-[#0a0a0a]">
      {/* Top Header */}
      <div className="w-full flex justify-between items-start font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          VJ
        </motion.p>
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-right"
        >
          System
          <br />
          Initialization
        </motion.p>
      </div>

      {/* Center Layout */}
      <div className="flex flex-col items-center justify-center gap-10 w-full">
        <div className="overflow-hidden py-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-poster text-5xl sm:text-7xl md:text-9xl font-bold uppercase tracking-tight text-[#0a0a0a] leading-none"
          >
            Vishesh Jha
          </motion.h1>
        </div>
        
        {/* Progress Line */}
        <div className="w-64 sm:w-80 md:w-96 h-[1px] bg-[#0a0a0a]/10 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#0a0a0a]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
        
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex justify-between items-end font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Loading Assets...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Est. 2026
        </motion.p>
      </div>
    </div>
  );
}