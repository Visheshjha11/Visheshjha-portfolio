import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiJavascript,
  SiOpenai,
  SiGooglegemini,
  SiGooglecloud,
  SiClerk,
  SiPrisma,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
  SiRedis,
  SiSupabase,
  SiFigma,
  SiPostman,
  SiLinux,
} from "react-icons/si";
import { GiPineTree } from "react-icons/gi";

import FlowingMenu from "./FlowingMenu";
import CountUp from "./CountUp";
gsap.registerPlugin(ScrollTrigger);

/* ── Cinematic Scroll-reveal text: top 1% Framer style blur reveal ── */
function RevealText({ children, className = "", highlightWords = [] }: { children: string; className?: string; highlightWords?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const words = el.querySelectorAll(".rw");
      
      // Top 1% Framer style: deep blur and low opacity initially
      gsap.set(words, { 
        opacity: 0.1,
        filter: "blur(12px)",
        willChange: "opacity, filter"
      });

      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "power2.out", // smooth easing for the scrub interpolation
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "center 45%",
          scrub: 1.5, // 1.5s lag for a buttery smooth cinematic feel
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children.split(" ").map((word, i) => {
        const isHighlighted = highlightWords.some(hw => word.includes(hw));
        return (
          <span 
            key={i} 
            className={`rw inline-block mr-[0.3em] ${isHighlighted ? "font-playfair italic font-normal tracking-normal text-[var(--text-primary)]" : ""}`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default function FounderNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img2WrapperRef = useRef<HTMLDivElement>(null);

  const techItems = [
  {
    link: '#about',
    text: 'SYSTEMS I BUILD',
    logos: [
      { node: <SiNextdotjs />, title: "Next.js" },
      { node: <SiReact />, title: "React" },
      { node: <SiTypescript />, title: "TypeScript" },
      { node: <SiTailwindcss />, title: "Tailwind CSS" },
      { node: <SiNodedotjs />, title: "Node.js" },
      { node: <SiExpress />, title: "Express.js" },
      { node: <SiRedis />, title: "Redis" },
      { node: <SiSupabase />, title: "Supabase" },
      { node: <SiMongodb />, title: "MongoDB" },
      { node: <SiPython />, title: "Python" },
      { node: <SiJavascript />, title: "JavaScript" },
    ]
  },
  {
    link: '#work',
    text: 'AI & BACKEND',
    logos: [
      { node: <SiOpenai />, title: "OpenAI" },
      { node: <GiPineTree />, title: "Pinecone" },
      { node: <SiGooglegemini />, title: "Gemini" },
      { node: <SiGooglecloud />, title: "Google Cloud" },
      { node: <SiClerk />, title: "Clerk" },
      { node: <SiPrisma />, title: "Prisma" },
      { node: <SiPostgresql />, title: "PostgreSQL" },
    ]
  },
  {
    link: '#contact',
    text: 'TOOLS I USE DAILY',
    logos: [
      { node: <SiGit />, title: "Git" },
      { node: <SiGithub />, title: "GitHub" },
      { node: <SiVercel />, title: "Vercel" },
      { node: <SiRender />, title: "Render" },
      { node: <SiFigma />, title: "Figma" },
      { node: <SiPostman />, title: "Postman" },
      { node: <SiLinux />, title: "Linux" },
    ]
  }
];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mm = gsap.matchMedia();

    // MOBILE ANIMATIONS (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      // Cinematic Sticky Narrative Timeline
      const pinWrapper = container.querySelector('.narrative-pin');
      const steps = gsap.utils.toArray('.narrative-step') as HTMLElement[];

      if (pinWrapper && steps.length > 0) {
        gsap.set(steps, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          filter: "blur(10px)"
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: `+=${steps.length * 120}%`,
            pin: true,
            scrub: 1,
          }
        });

        steps.forEach((step, i) => {
          // Animate background color on second step
          if (i === 1) {
            tl.to(container, {
              "--bg-color": "#F3F4F4",
              "--text-primary": "#000000",
              "--text-accent": "rgba(0, 0, 0, 0.4)",
              "--line-color": "rgba(0, 0, 0, 0.15)",
              "--border-color": "rgba(0, 0, 0, 0.1)",
              duration: 1.5,
              ease: "power2.inOut"
            }, "<");
          }

          tl.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out"
          });

          tl.to({}, { duration: 2.0 });

          if (i !== steps.length - 1) {
            tl.to(step, {
              opacity: 0,
              y: -40,
              scale: 1.05,
              filter: "blur(10px)",
              duration: 1.5,
              ease: "power2.in"
            });
          }
        });
      }
    });

    // DESKTOP ANIMATIONS (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      // Headline reveal
      const headline = container.querySelector(".narrative-headline");
      if (headline) {
        gsap.fromTo(headline,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headline,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Background Color Animation
      if (block2Ref.current) {
        gsap.to(container, {
          "--bg-color": "#F3F4F4",
          "--text-primary": "#000000",
          "--text-accent": "rgba(0, 0, 0, 0.4)",
          "--line-color": "rgba(0, 0, 0, 0.15)",
          "--border-color": "rgba(0, 0, 0, 0.1)",
          ease: "none",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          }
        });
      }

      // Images reveal synced with text blocks
      if (img1Ref.current) gsap.set(img1Ref.current, { opacity: 0, filter: "blur(12px)", scale: 0.95 });

      if (block2Ref.current && img1Ref.current) {
        gsap.to(img1Ref.current, {
          opacity: 1, filter: "blur(0px)", scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });
      }

      if (block3Ref.current && img2WrapperRef.current && img2Ref.current) {
        gsap.set(img2WrapperRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(img2Ref.current, { scale: 1.15 });

        gsap.to(img2WrapperRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: block3Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });

        gsap.to(img2Ref.current, {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block3Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });
      }
    });

    // ALL SIZES (Skills section & Content Stack Reveal)
    mm.add("all", () => {
      const skillSection = container.querySelector('.skills-section');
      const skillItems = container.querySelectorAll(".menu__item");

      if (skillSection && skillItems.length) {
        gsap.fromTo(skillItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const sectionStyle = {
    "--bg-color": "#0a0a0a",
    "--text-primary": "#ffffff",
    "--text-accent": "rgba(255, 255, 255, 0.25)",
    "--line-color": "rgba(255, 255, 255, 0.15)",
    "--border-color": "rgba(255, 255, 255, 0.1)"
  } as React.CSSProperties;

  return (
    <section id="about" ref={containerRef} className="bg-[var(--bg-color)] text-[var(--text-primary)] relative overflow-clip" style={sectionStyle}>
      {/* Grain texture */}
      <div className="absolute inset-0 grit-texture opacity-40 pointer-events-none" />

      <div className="relative z-10">

        {/* ── MOBILE: STICKY NARRATIVE PRESENTATION ── */}
        <div className="md:hidden narrative-pin h-[100svh] w-full relative overflow-hidden flex items-center justify-center">

          {/* Step 1: Headline */}
          <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-[var(--text-accent)] mb-6 sm:mb-8">
              003 // NARRATIVE
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-poster font-bold tracking-[-0.04em] leading-[0.85] uppercase text-white drop-shadow-2xl">
              REAL<br />CONTEXT.
            </h2>
          </div>

          {/* Step 2: Who I am */}
          <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-[var(--text-primary)] leading-[1.6] sm:leading-[1.5] tracking-tight">
              I'm Vishesh Jha. I build AI-powered products that solve real problems. The web doesn't need more noise - it needs intelligence, clarity, and execution.
            </p>
          </div>

          {/* Step 3: What I build */}
          <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-[var(--text-primary)] leading-[1.6] sm:leading-[1.5] tracking-tight">
                I build production systems for real users—not demo apps or clones, creating products like Saarthi that bring AI, academics, and productivity into one intelligent workspace.
            </p>
          </div>

          {/* Step 4: Pull Quote */}
          <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-[var(--text-accent)] block mb-6 sm:mb-8">
              CORE_BELIEF
            </span>

            <p className="text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-[var(--text-primary)]">
              "PEOPLE DON'T REMEMBER SOFTWARE. THEY REMEMBER HOW IT MADE THEIR WORK FEEL EFFORTLESS."
            </p>

            <div className="mt-8 md:mt-12 flex items-center justify-center gap-3">
              <div className="h-px w-6 md:w-10 bg-[var(--line-color)]" />
              <span className="text-[0.45rem] md:text-[0.5rem] font-header font-bold tracking-[0.3em] text-[var(--text-accent)] uppercase">
                THAT'S WHAT I BUILD FOR
              </span>
              <div className="h-px w-6 md:w-10 bg-[var(--line-color)]" />
            </div>
          </div>
        </div>

        {/* ── DESKTOP: OLD NARRATIVE SECTION ── */}
        <div className="hidden md:block">
          
          {/* Block 1: Headline */}
          <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 text-center relative z-10">
            <div className="narrative-headline flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-[var(--line-color)]" />
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-[var(--text-accent)]">003 // NARRATIVE</span>
                <div className="h-px w-12 bg-[var(--line-color)]" />
              </div>
              <h2 className="flex flex-col items-center text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85] text-white drop-shadow-2xl">
                <span className="relative z-10 font-playfair italic font-normal tracking-normal text-[0.85em] opacity-90 mb-[-0.15em] ml-[-10%]">Real</span>
                <span className="relative z-0 font-helvetica tracking-tighter">Context.</span>
              </h2>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT FOR BLOCK 2 & 3 */}
          <div className="flex w-full relative z-10">
            
            {/* LEFT COLUMN: Text Blocks */}
            <div className="w-[55%] xl:w-[60%] flex flex-col shrink-0">
              {/* Block 2: Who I am */}
              <div ref={block2Ref} className="min-h-screen flex items-center px-8 md:px-16 py-24">
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealText 
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-[var(--text-primary)] leading-[1.6] tracking-tight"
                    highlightWords={["AI-powered", "products", "solve", "real", "problems.", "intelligence,", "clarity,", "and", "execution."]}
                  >
                    I'm Vishesh Jha. I build AI-powered products that solve real problems. The web doesn't need more noise - it needs intelligence, clarity, and execution.
                  </RevealText>
                </div>
              </div>

              {/* Block 3: What I build */}
              <div ref={block3Ref} className="min-h-screen flex items-center px-8 md:px-16 py-24">
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealText 
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-[var(--text-primary)] leading-[1.6] tracking-tight"
                    highlightWords={["production", "systems", "real", "users", "100K+", "3,000+", "autonomous", "drone", "dashboard"]}
                  >
                    I build production systems for real users—not demo apps or clones, creating products like Saarthi that bring AI, academics, and productivity into one intelligent workspace.
                  </RevealText>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Image Container */}
            <div className="w-[45%] xl:w-[40%] relative shrink-0 pointer-events-none">
              <div className="sticky top-0 h-screen flex items-center justify-center pr-12 lg:pr-16 xl:pr-24">
                <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
                  {/* Base Image (Vishesh) */}
                  <div className="absolute inset-0 w-full h-full">
                    <div ref={img1Ref} className="w-full h-full bg-black" />
                  </div>
                  {/* Reveal Image (PC Setup) */}
                  <div ref={img2WrapperRef} className="absolute inset-0 w-full h-full">
                    <div ref={img2Ref} className="w-full h-full bg-black" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Block 4: Pull Quote */}
          <div ref={block4Ref} className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 relative z-10">
              <div className="max-w-4xl text-center mx-auto">
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-[var(--text-accent)] block mb-10">CORE_BELIEF</span>
                <RevealText className="text-2xl md:text-4xl lg:text-5xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-[var(--text-primary)]">
                  "PEOPLE DON'T REMEMBER SOFTWARE. THEY REMEMBER HOW IT MADE THEIR WORK FEEL EFFORTLESS."
                </RevealText>
                <div className="mt-12 flex items-center justify-center gap-3">
                  <div className="h-px w-10 bg-[var(--line-color)]" />
                  <span className="text-[0.5rem] font-header font-bold tracking-[0.3em] text-[var(--text-accent)] uppercase">THAT'S WHAT I BUILD FOR</span>
                  <div className="h-px w-10 bg-[var(--line-color)]" />
                </div>
              </div>
            </div>
        </div>

        {/* ── SKILLS SECTION (Normal Scroll, Both Devices) ── */}
        <div className="skills-section relative z-20 bg-[#0a0a0a] min-h-[100svh] flex flex-col justify-center py-20 w-full overflow-hidden">
          
          <div className="flex-1" />
          <div className="w-full flex items-center justify-center py-16 md:py-24">
            <FlowingMenu items={techItems} />
          </div>
          <div className="mt-auto pb-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
            <span className="text-[0.65rem] sm:text-xs md:text-sm font-header font-bold tracking-[0.35em] uppercase text-white/70">
              EDUCATION://
            </span>
            <span className="text-sm sm:text-base md:text-lg font-header font-bold text-white/60 tracking-tight text-center">
            CHITKARA UNIVERSITY - Bachelor in Computer Science Engineering
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
