import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface ReadingProgressProps {
  headings: { id: string; title: string }[];
}

export default function ReadingProgress({ headings }: ReadingProgressProps) {
  const [currentSection, setCurrentSection] = useState('Introduction');
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsVisible(latest > 200);

      // Determine current section
      let current = headings.length > 0 ? headings[0].title : 'Introduction';
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = heading.title;
          }
        }
      }
      setCurrentSection(current);
    });
  }, [headings, scrollY]);

  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#111111] text-white px-4 py-2 rounded-full shadow-2xl border border-white/10 backdrop-blur-md cursor-none"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap max-w-[150px] sm:max-w-[250px] truncate">
        {currentSection}
      </span>
      <div className="w-5 h-5 flex items-center justify-center relative flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 20 20" className="transform -rotate-90">
          <circle
            cx="10"
            cy="10"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="10"
            cy="10"
            r={radius}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
