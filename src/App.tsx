import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RouteErrorBoundary from "./components/RouteErrorBoundary";

const loaders = {
  home: () => import("./pages/Home"),
  caseStudy: () => import("./pages/CaseStudy"),
  blog: () => import("./pages/Blog"),
  blogPost: () => import("./pages/BlogPost"),
  resume: () => import("./pages/Resume"),
};
const Home = lazy(loaders.home);
const CaseStudy = lazy(loaders.caseStudy);
const Blog = lazy(loaders.blog);
const BlogPost = lazy(loaders.blogPost);
const Resume = lazy(loaders.resume);

// Start downloading a route's chunk as soon as the pointer is over (or finger is on) a link to it
const warmRouteFor = (pathname: string) => {
  if (pathname === "/") loaders.home();
  else if (pathname.startsWith("/project/")) loaders.caseStudy();
  else if (pathname === "/blog") loaders.blog();
  else if (pathname.startsWith("/blog/")) loaders.blogPost();
  else if (pathname === "/resume") loaders.resume();
};

// Route chunks are only downloaded when first visited, which (combined with the
// exit animation) caused a blank/black gap on navigation. Warm them up when idle.
const prefetchRoutes = () => {
  loaders.blog();
  loaders.blogPost();
  loaders.caseStudy();
  loaders.resume(); // biggest chunk (react-pdf), fetched last
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
    const id = ric ? ric(prefetchRoutes, { timeout: 1500 }) : window.setTimeout(prefetchRoutes, 1000);
    return () => {
      const cic = (window as any).cancelIdleCallback as ((n: number) => void) | undefined;
      if (ric && cic) cic(id);
      else window.clearTimeout(id);
    };
  }, [loading]);

  // Warm a route's chunk the moment the user shows intent to go there
  useEffect(() => {
    const warm = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.origin !== window.location.origin) return;
      warmRouteFor(a.pathname);
    };
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    return () => {
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("touchstart", warm);
    };
  }, []);

  // After the new page mounts, let ScrollTrigger re-measure (lazy chunks / WebGL change the layout)
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

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
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            // Drop any pins/triggers the old page left behind before the next page builds its own
            ScrollTrigger.getAll().forEach((t) => t.kill());
            document.documentElement.classList.remove("mobile-no-scroll");
            document.body.classList.remove("mobile-no-scroll");
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut", delay: loading ? 1.2 : 0 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
            className="w-full min-h-screen"
          >
            {fontsLoaded && (
              <RouteErrorBoundary>
              <Suspense fallback={null}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<CaseStudy />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
              </Suspense>
              </RouteErrorBoundary>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
