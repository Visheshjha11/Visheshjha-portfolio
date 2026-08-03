import { motion } from "motion/react";
import { useEffect } from "react";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  useEffect(() => {
    // Increased to 2500ms for a more cinematic feel
    const timerPromise = new Promise((resolve) =>
      setTimeout(resolve, 2500)
    );

    // Ensure fonts are loaded before completing
    const fontsPromise = document.fonts
      ? document.fonts.ready
      : Promise.resolve();

    Promise.all([timerPromise, fontsPromise]).then(() => {
      onComplete();
    });
  }, [onComplete]);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#F5F5F5] p-6 md:p-12 z-[100] text-[#0a0a0a]">
      {/* Center Layout */}
      <div className="flex w-full max-w-6xl flex-col items-center justify-center">
        {/* Name */}
        <div className="overflow-hidden py-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              font-poster
              text-center
              text-5xl
              sm:text-7xl
              md:text-9xl
              font-bold
              uppercase
              tracking-tight
              leading-none
              text-[#0a0a0a]
              select-none
            "
          >
            Vishesh Jha
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 0.55,
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ transformOrigin: "center" }}
          className="mt-8 h-[1px] w-64 bg-[#0a0a0a] sm:w-80 md:w-96"
        />
      </div>
    </div>
  );
}