import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";

const Home = lazy(() => import("./pages/Home"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Resume = lazy(() => import("./pages/Resume"));

// Route chunks are only downloaded when first visited, which (combined with the
// exit animation) caused a blank/black gap on navigation. Warm them up when idle.
const prefetchRoutes = () => {
  import("./pages/Blog");
  import("./pages/BlogPost");
  import("./pages/CaseStudy");
  import("./pages/Resume"); // biggest chunk (react-pdf), fetched last
};

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

  // Prefetch other pages in the background after the intro finishes
  useEffect(() => {
    if (loading) return;
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const id = ric ? ric(prefetchRoutes, { timeout: 4000 }) : window.setTimeout(prefetchRoutes, 2000);
    return () => {
      const cic = (window as any).cancelIdleCallback as ((n: number) => void) | undefined;
      if (ric && cic) cic(id);
      else window.clearTimeout(id);
    };
  }, [loading]);

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
            animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut", delay: loading ? 1.2 : 0 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
            className="w-full min-h-screen"
          >
            {fontsLoaded && (
              <Suspense fallback={null}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<CaseStudy />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
