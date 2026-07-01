import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./CaseStudies";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudySection() {
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

    if (inner) {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!content) return;

      const totalScrollWidth = (projects.length - 1) * window.innerWidth;
      const cards = track.querySelectorAll<HTMLElement>(".desktop-card");
      const cardData = Array.from(cards).map((card) => ({
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
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;
          track.style.transform = `translate3d(${-totalScrollWidth * progress}px, 0, 0)`;

          if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
          }

          const newIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1);
          const safeIndex = Math.max(0, newIndex);
          if (safeIndex !== lastIndex && counterEl) {
            lastIndex = safeIndex;
            counterEl.textContent = `[ ${String(safeIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`;
          }

          for (let i = 0; i < cardData.length; i += 1) {
            const { title, photo, meta } = cardData[i];
            const cardCenter = projects.length > 1 ? i / (projects.length - 1) : 0;
            const delta = progress - cardCenter;

            if (title) {
              title.style.transform = `translateY(-45%) translate3d(${delta * -80}px, 0, 0)`;
            }

            if (photo) {
              const s = 1 - Math.abs(delta) * 0.015;
              photo.style.transform = `translateY(-50%) translate3d(${delta * 160}px, 0, 0) scale(${s})`;
            }

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
        gsap.set(
          [track, progressBar, ...cardData.map((c) => [c.title, c.photo, c.meta]).flat()],
          { clearProps: "transform,opacity" }
        );
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#F5F5F5] lg:overflow-hidden border-t border-[#0a0a0a]/10">
      <div ref={contentWrapperRef} className="flex flex-col lg:h-screen will-change-transform">
        <div ref={innerRef} className="flex flex-col w-full h-full">
          <div className="w-full relative lg:flex-1 lg:overflow-hidden flex flex-col">
            <div ref={trackRef} className="flex flex-col lg:flex-row h-auto lg:flex-1 w-full">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="case-card bg-[#F5F5F5] w-full lg:w-[100vw] h-auto lg:h-full lg:flex-shrink-0 relative lg:overflow-hidden flex flex-col lg:block pt-20 pb-20 lg:py-0 px-6 sm:px-12 lg:px-0 border-b border-[#0a0a0a]/10 lg:border-none"
                >
                  <div className="lg:hidden flex flex-col md:flex-row md:items-start gap-8 md:gap-16 w-full max-w-4xl mx-auto">
                    <div className="flex-1 flex flex-col w-full">
                      <span className="text-[0.6rem] font-header font-bold tracking-[0.4em] uppercase text-[#0a0a0a]/40 mb-6 block">
                        PROJECT {project.num}
                      </span>

                      <h3 className="text-[3.4rem] sm:text-7xl font-poster font-bold tracking-[-0.03em] leading-[0.85] text-[#0a0a0a] whitespace-pre-line mb-8 uppercase">
                        {project.title}
                      </h3>

                      <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden mb-6 md:mb-0 bg-[#0a0a0a]/5">
                        <div className="w-full h-full bg-black contrast-[1.1] brightness-90" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center w-full md:pt-32">
                      <div className="flex flex-wrap items-center gap-y-2 mb-6">
                        {project.tags.map((tag, index) => (
                          <span key={tag} className="flex items-center text-[0.65rem] sm:text-xs font-header font-bold text-[#0a0a0a] uppercase tracking-[0.15em]">
                            {tag}
                            {index < project.tags.length - 1 && <span className="mx-2 text-[#0a0a0a]/30">•</span>}
                          </span>
                        ))}
                      </div>

                      <p className="text-base sm:text-lg font-body font-medium text-[#0a0a0a]/90 leading-[1.6] mb-8 max-w-sm">{project.description}</p>

                      <a
                        href={`/project/${project.id}`}
                        className="inline-flex justify-center items-center gap-2 text-[0.6rem] sm:text-xs font-header font-bold tracking-[0.25em] uppercase bg-[#0a0a0a] text-[#F5F5F5] w-full sm:w-auto px-8 py-4 sm:py-5 hover:bg-[#0a0a0a]/80 transition-colors group/btn"
                      >
                        VIEW CASE STUDY
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <div className="desktop-card hidden lg:block w-full h-full relative">
                    <div className="absolute z-20" style={{ left: "14%", top: "18%" }}>
                      <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-[#0a0a0a]/40">
                        PROJECT {project.num}
                      </span>
                    </div>

                    <div className="card-title absolute z-20 pointer-events-none" style={{ left: "14%", top: "50%", transform: "translateY(-45%)", mixBlendMode: "difference" }}>
                      <h3 className="text-8xl xl:text-[6.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.88] text-white whitespace-pre-line uppercase">
                        {project.title}
                      </h3>
                    </div>

                    <div className="card-photo absolute z-10" style={{ left: "32%", top: "50%", transform: "translateY(-50%)", width: "36vw", maxWidth: "520px" }}>
                      <div className="aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a]/5">
                        <img
                          src={project.image}
                          alt={project.title.replace("\n", " ")}
                          className="w-full h-full object-cover contrast-[1.1] brightness-90"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="card-meta absolute z-20" style={{ left: "calc(32% + 36vw + 28px)", top: "50%", transform: "translateY(-50%)", maxWidth: "260px" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/30 mb-5" />
                      <div className="flex flex-col gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <p key={tag} className="text-xs font-header font-bold text-[#0a0a0a] uppercase tracking-wide border-b border-[#0a0a0a]/50 w-fit pb-0.5">
                            {tag}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm md:text-base font-body font-medium text-[#0a0a0a]/90 leading-[1.6] mb-5">{project.description}</p>
                      <a
                        href={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-[0.55rem] font-header font-bold tracking-[0.25em] uppercase text-[#0a0a0a] border border-[#0a0a0a]/40 px-4 py-2 hover:bg-[#0a0a0a] hover:text-[#F5F5F5] transition-all duration-300 group/btn"
                      >
                        VIEW CASE STUDY
                        <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex relative bg-[#F5F5F5] z-10 flex-shrink-0 flex-col border-t border-[#0a0a0a]/10">
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

              <a href="#work" className="flex items-center gap-2 text-[0.6rem] font-header font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors group/all">
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
