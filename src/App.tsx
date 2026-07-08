import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";

import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      // Prevent layout shift when scrollbar is hidden by reserving its space
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
      // Force ScrollTrigger to recalculate measurements after the scrollbar
      // appears and the layout settles, fixing any capsule positioning issues.
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [loading]);

  return (
    <main className="selection:bg-grit-900 selection:text-white relative cursor-none">
      <CustomCursor />
      <div className="noise-overlay" />
          
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 origin-top"
          >
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render content in background so heavy Canvas/GSAP mounts without causing lag during transition */}
      <motion.div
        key="content"
        className="w-full h-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: loading ? 1.2 : 0 }}
            className="w-full min-h-screen"
          >
            {fontsLoaded && (
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<CaseStudy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Routes>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
