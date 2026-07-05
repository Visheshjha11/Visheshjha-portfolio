import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";

import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<CaseStudy />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
