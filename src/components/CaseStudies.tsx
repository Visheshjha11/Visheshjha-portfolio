import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import saarthiImage from "../assets/Saarthicover.png";
import prepxImage from "../assets/PrepX_main.png";
import { 
  saarthiRole, 
  saarthiTimeline, 
  saarthiPlatform, 
  saarthiLiveWebsite, 
  saarthiSections 
} from "../data/saarthiContent";
import {
  prepxRole,
  prepxTimeline,
  prepxPlatform,
  prepxLiveWebsite,
  prepxSections
} from "../data/prepxContent";
import {
  pulseRole,
  pulseTimeline,
  pulsePlatform,
  pulseSections
} from "../data/pulseContent";
import {
  veronicaRole,
  veronicaTimeline,
  veronicaPlatform,
  veronicaSections
} from "../data/veronicaContent";

export type ProjectContentSection = {
  title: string;
  content: React.ReactNode;
};

export type Project = {
  id: string;
  num: string;
  title: string;
  tags: string[];
  description: React.ReactNode;
  image: string;
  role?: string[];
  timeline?: string;
  platform?: string;
  liveWebsite?: string;
  sections?: ProjectContentSection[];
};


gsap.registerPlugin(ScrollTrigger);

export const projects: Project[] = [
  {
    id: "saarthi",
    num: "01",
    title: "Saarthi",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "Pinecone"],
    description: <>Building an AI-powered academic operating system that brings every student workflow into one intelligent ecosystem.</>,
    image: saarthiImage,
    role: saarthiRole,
    timeline: saarthiTimeline,
    platform: saarthiPlatform,
    liveWebsite: saarthiLiveWebsite,
    sections: saarthiSections
  },
  {
    id: "prepx",
    num: "02",
    title: "PrepX",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "OpenAI"],
    description: <>An intelligent examination platform that transforms preparation into a personalized, data-driven learning experience.</>,
    image: prepxImage,
    role: prepxRole,
    timeline: prepxTimeline,
    platform: prepxPlatform,
    liveWebsite: prepxLiveWebsite,
    sections: prepxSections
  },
  {
    id: "pulse",
    num: "03",
    title: "PULSE",
    tags: ["ESP32", "React", "Node.js", "MongoDB", "WebSockets"],
    description: <>A smart wearable ecosystem that continuously monitors health, detects emergencies, and instantly alerts trusted contacts when critical situations occur.</>,
    image: "",
    role: pulseRole,
    timeline: pulseTimeline,
    platform: pulsePlatform,
    sections: pulseSections
  },
  {
    id: "veronica",
    num: "04",
    title: "Veronica",
    tags: ["Python", "NLP", "Selenium", "Flask"],
    description: <>A Python-powered autonomous AI assistant capable of understanding natural language, controlling desktop applications, executing multi-step workflows, and interacting with the real world through voice.</>,
    image: "",
    role: veronicaRole,
    timeline: veronicaTimeline,
    platform: veronicaPlatform,
    sections: veronicaSections
  }
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    const counterEl = counterRef.current;
    const content = contentWrapperRef.current;
    const inner = innerRef.current;

    if (!section || !track) return;

    // Cinematic Entrance Reveal: Smoothly fade in content as the section scrolls up
    if (inner) {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%", // Start fading immediately when entering viewport
            end: "top 20%",    // Fully visible right before it pins
            scrub: true,
          },
        }
      );
    }

    let mm = gsap.matchMedia();

    // Only apply horizontal scroll + parallax on desktop (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      // Calculate explicitly based on project count to avoid hidden mobile DOM elements polluting the width
      const totalScrollWidth = (projects.length - 1) * window.innerWidth;

      // Cache DOM queries for desktop cards
      const cards = track.querySelectorAll<HTMLElement>(".desktop-card");
      const cardData = Array.from(cards).map((card) => ({
        el: card,
        title: card.querySelector<HTMLElement>(".card-title"),
        photo: card.querySelector<HTMLElement>(".card-photo"),
        meta: card.querySelector<HTMLElement>(".card-meta"),
      }));

      let lastIndex = -1;

      const st = ScrollTrigger.create({
        trigger: content,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        pin: true,
        scrub: true, // Matches exactly with Lenis to prevent 'laggy' or detached feel
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Horizontal scroll the track using hardware acceleration
          track.style.transform = `translate3d(${-totalScrollWidth * progress}px, 0, 0)`;

          // Progress bar - scaleX is composite-only (no layout thrashing)
          if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
          }

          // Counter
          const newIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          const safeIndex = Math.max(0, newIndex);
          if (safeIndex !== lastIndex && counterEl) {
            lastIndex = safeIndex;
            counterEl.textContent = `[ ${String(safeIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`;
          }

          // Desktop Parallax Physics
          for (let i = 0; i < cardData.length; i++) {
            const { title, photo, meta } = cardData[i];

            const cardCenter = projects.length > 1 ? i / (projects.length - 1) : 0;
            const delta = progress - cardCenter;

            // Title lags
            if (title) {
              title.style.transform = `translateY(-45%) translate3d(${delta * -80}px, 0, 0)`;
            }

            // Photo pushes ahead
            if (photo) {
              const s = 1 - Math.abs(delta) * 0.015;
              photo.style.transform = `translateY(-50%) translate3d(${delta * 160}px, 0, 0) scale(${s})`;
            }

            // Meta follows photo
            if (meta) {
              const opacity = Math.max(0.15, 1 - Math.abs(delta) * 1.2);
              meta.style.transform = `translateY(-50%) translate3d(${delta * 120}px, 0, 0)`;
              meta.style.opacity = String(opacity);
            }
          }
        },
      });

      return () => {
        st.kill();
        // Use transform,opacity instead of 'all' so we don't wipe React inline styles entirely if we use them,
        // though Tailwind is safer. We will use Tailwind for base layout.
        gsap.set([track, progressBar, ...cardData.map(c => [c.title, c.photo, c.meta]).flat()], { clearProps: "transform,opacity" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#F3F4F4] lg:overflow-hidden">
      <div ref={contentWrapperRef} className="flex flex-col lg:h-screen will-change-transform">
        <div ref={innerRef} className="flex flex-col w-full h-full">
          {/* Scrolling content - Fixed height collapse by adding flex flex-col */}
          <div className="w-full relative lg:flex-1 lg:overflow-hidden flex flex-col">
          {/* trackRef takes flex-1 to fill the height securely */}
          <div ref={trackRef} className="flex flex-col lg:flex-row h-auto lg:flex-1 w-full">

            {/* ── Project Cards ── */}
            {projects.map((project) => (
              <div
                key={project.id}
                className="case-card bg-[#F3F4F4] w-full lg:w-[100vw] h-auto lg:h-full lg:flex-shrink-0 relative lg:overflow-hidden flex flex-col lg:block pt-24 pb-20 lg:py-0 px-6 sm:px-12 lg:px-0 border-b border-[#0a0a0a]/10 lg:border-none"
              >

                {/* ── MOBILE & TABLET LAYOUT (< lg) ── */}
                <div className="lg:hidden flex flex-col md:flex-row md:items-start gap-8 md:gap-16 w-full max-w-4xl mx-auto">

                  {/* LEFT SIDE (Tablet) / TOP (Mobile) */}
                  <div className="flex-1 flex flex-col w-full">
                    {/* Label */}
                    <span className="text-[0.6rem] font-header font-bold tracking-[0.4em] uppercase text-[#0a0a0a]/40 mb-6 block">
                      PROJECT {project.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-[3.5rem] sm:text-7xl font-poster font-bold tracking-[-0.03em] leading-[0.85] text-[#0a0a0a] whitespace-pre-line mb-8 uppercase">
                      {project.title}
                    </h3>

                    {/* Image */}
                    <Link to={`/project/${project.id}`} className="w-full block aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden mb-6 md:mb-0 bg-[#0a0a0a]/5">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title.replace("\n", " ")}
                          className="w-full h-full object-cover contrast-[1.1] brightness-90"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-black contrast-[1.1] brightness-90" />
                      )}
                    </Link>
                  </div>

                  {/* RIGHT SIDE (Tablet) / BOTTOM (Mobile) */}
                  <div className="flex-1 flex flex-col justify-center w-full md:pt-32">
                    {/* Tags (Inline Stack) */}
                    <div className="flex flex-wrap items-center gap-y-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span key={tag} className="flex items-center text-[0.65rem] sm:text-xs font-header font-bold text-[#0a0a0a] uppercase tracking-[0.15em]">
                          {tag}
                          {index < project.tags.length - 1 && <span className="mx-2 text-[#0a0a0a]/30">•</span>}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg font-body font-medium text-[#0a0a0a]/90 leading-[1.6] mb-8 max-w-sm">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <Link to={`/project/${project.id}`} className="inline-flex justify-center items-center gap-2 text-[0.6rem] sm:text-xs font-header font-bold tracking-[0.25em] uppercase bg-[#0a0a0a] text-[#F3F4F4] w-full sm:w-auto px-8 py-4 sm:py-5 hover:bg-[#0a0a0a]/80 transition-colors group/btn">
                      VIEW CASE STUDY
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                </div>

                {/* ── DESKTOP LAYOUT (>= lg) ── */}
                <div className="desktop-card hidden lg:block w-full h-full relative">
                  {/* PROJECT label */}
                  <div className="absolute z-20" style={{ left: '14%', top: '18%' }}>
                    <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-[#0a0a0a]/40">
                      PROJECT {project.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="card-title absolute z-20 pointer-events-none" style={{ left: '14%', top: '50%', transform: 'translateY(-45%)', mixBlendMode: 'difference' }}>
                    <h3 className="text-8xl xl:text-[6.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.88] text-white whitespace-pre-line uppercase">
                      {project.title}
                    </h3>
                  </div>

                  {/* Photo */}
                  <Link 
                    to={`/project/${project.id}`} 
                    className="card-photo absolute z-10 block cursor-none" 
                    style={{ left: '32%', top: '50%', transform: 'translateY(-50%)', width: '36vw', maxWidth: '480px' }}
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a]/5">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title.replace("\n", " ")}
                          className="w-full h-full object-cover contrast-[1.1] brightness-90"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-black" />
                      )}
                    </div>
                  </Link>

                  {/* Tags + Description */}
                  <div className="card-meta absolute z-20" style={{ left: 'calc(32% + 36vw + 28px)', top: '50%', transform: 'translateY(-50%)', maxWidth: '220px' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/30 mb-5" />
                    <div className="flex flex-col gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <p key={tag} className="text-xs font-header font-bold text-[#0a0a0a] uppercase tracking-wide border-b border-[#0a0a0a]/50 w-fit pb-0.5 cursor-default hover:text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 transition-colors">
                          {tag}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm md:text-base font-body font-medium text-[#0a0a0a]/90 leading-[1.6] mb-5">
                      {project.description}
                    </p>
                    <Link to={`/project/${project.id}`} className="inline-flex items-center gap-1.5 text-[0.55rem] font-header font-bold tracking-[0.25em] uppercase text-[#0a0a0a] border border-[#0a0a0a]/40 px-4 py-2 hover:bg-[#0a0a0a] hover:text-[#F3F4F4] transition-all duration-300 group/btn">
                      VIEW CASE STUDY
                      <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* ── Fixed Bottom Bar with Progress (Desktop only) ── */}
        <div className="hidden lg:flex relative bg-[#F3F4F4] z-10 flex-shrink-0 flex-col">
          <div className="relative h-[3px] w-full bg-[#0a0a0a]/10 overflow-hidden">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-[#0a0a0a] transition-none origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="px-16 py-5 flex justify-between items-center w-full">
            <span ref={counterRef} className="text-base font-poster font-bold text-[#0a0a0a]/80 tracking-wide">
              [ 01 / {String(projects.length).padStart(2, "0")} ]
            </span>

            <a href="https://github.com/Visheshjha11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.6rem] font-header font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors group/all">
              VIEW ALL PROJECTS
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
