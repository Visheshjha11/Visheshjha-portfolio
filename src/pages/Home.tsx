import CapsulePortal from "../components/CapsulePortal";
import CaseStudies from "../components/CaseStudies";
import FounderNarrative from "../components/FounderNarrative";
import Contact from "../components/Contact";

import SmoothScroll from "../components/SmoothScroll";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const updateScrollLock = () => {
      if (window.innerWidth < 768) {
        document.documentElement.classList.add("mobile-no-scroll");
        document.body.classList.add("mobile-no-scroll");
      } else {
        document.documentElement.classList.remove("mobile-no-scroll");
        document.body.classList.remove("mobile-no-scroll");
      }
    };

    updateScrollLock();
    window.addEventListener("resize", updateScrollLock);
    return () => {
      document.documentElement.classList.remove("mobile-no-scroll");
      document.body.classList.remove("mobile-no-scroll");
      window.removeEventListener("resize", updateScrollLock);
    };
  }, []);

  return (
    <SmoothScroll>
      <CapsulePortal />
      <div className="hidden md:block">
        <CaseStudies />
        <FounderNarrative />
        <Contact />
      </div>
    </SmoothScroll>
  );
}

