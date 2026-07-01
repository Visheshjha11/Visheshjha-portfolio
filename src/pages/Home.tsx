import CapsulePortal from "../components/CapsulePortal";
import CaseStudies from "../components/CaseStudies";
import FounderNarrative from "../components/FounderNarrative";
import Contact from "../components/Contact";

import SmoothScroll from "../components/SmoothScroll";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CapsulePortal />
      <CaseStudies />
      <FounderNarrative />
      <Contact />
    </SmoothScroll>
  );
}
