import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects } from "../components/CaseStudies";
import SmoothScroll from "../components/SmoothScroll";
import { motion } from "motion/react";

export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center text-[#0a0a0a] p-6">
        <h1 className="text-5xl font-poster uppercase tracking-tight mb-6">Project Not Found</h1>
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-header font-bold tracking-[0.25em] uppercase hover:text-[#0a0a0a]/70 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F5F5F5] text-[#0a0a0a] relative pt-32 pb-24 px-6 sm:px-12 lg:px-24 border-t border-[#0a0a0a]/10">
        <Link to="/" className="inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors mb-16 lg:mb-24 group z-10 relative">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto w-full relative z-10"
        >
          <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="flex-1">
              <span className="text-[0.65rem] font-header font-bold tracking-[0.4em] uppercase text-[#0a0a0a]/40 block mb-6">
                PROJECT {project.num}
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.85] text-[#0a0a0a] whitespace-pre-line uppercase">
                {project.title}
              </h1>
            </div>
            
            <div className="flex flex-col gap-8 pb-2 lg:max-w-[280px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-[0.65rem] font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 mb-1">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[0.6rem] font-header font-bold text-[#0a0a0a] uppercase tracking-[0.15em] border border-[#0a0a0a]/20 px-3 py-1.5 rounded-full bg-[#0a0a0a]/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveWebsite && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-[0.65rem] font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 mb-1">
                    Live Website
                  </h3>
                  <a href={project.liveWebsite} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-[#0a0a0a]/80 hover:text-black underline underline-offset-4 transition-colors w-fit">
                    {project.liveWebsite.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[4/3] md:aspect-video lg:aspect-[21/9] overflow-hidden bg-[#0a0a0a]/5 mb-16 lg:mb-32 relative"
          >
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title.replace("\n", " ")}
                className="w-full h-full object-cover contrast-[1.1] brightness-90"
              />
            ) : (
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                 <span className="text-[#0a0a0a]/20 font-header font-bold tracking-[0.3em] uppercase text-sm">Media Representation</span>
              </div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32 order-2 lg:order-1">
              <div className="space-y-12">
                <div>
                  <h3 className="text-[0.65rem] font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 mb-5 border-b border-[#0a0a0a]/10 pb-4">
                    Role & Contribution
                  </h3>
                  <ul className="space-y-3">
                    {(project.role || ["Architecture Design", "Full-Stack Development", "UI/UX Implementation", "System Integration"]).map((r, i) => (
                      <li key={i} className="text-sm font-body text-[#0a0a0a]/80">{r}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-[0.65rem] font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 mb-5 border-b border-[#0a0a0a]/10 pb-4">
                    Timeline
                  </h3>
                  <p className="text-sm font-body text-[#0a0a0a]/80">
                    {project.timeline || "2025 - Present"}
                  </p>
                </div>

                {project.platform && (
                  <div>
                    <h3 className="text-[0.65rem] font-header font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/50 mb-5 border-b border-[#0a0a0a]/10 pb-4">
                      Platform
                    </h3>
                    <p className="text-sm font-body text-[#0a0a0a]/80">
                      {project.platform}
                    </p>
                  </div>
                )}


              </div>
            </div>
            
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl sm:text-2xl lg:text-3xl font-body text-[#0a0a0a] leading-[1.6] mb-16 font-medium">
                  {project.description}
                </p>
                
                <div className="space-y-16">
                  {project.sections ? (
                    project.sections.map((section, idx) => (
                      <section key={idx}>
                        <h2 className="text-3xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4">
                          <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block"></span>
                          {section.title}
                        </h2>
                        <div className="text-base lg:text-lg font-body text-[#0a0a0a]/60 leading-[1.8] case-study-content">
                          {section.content}
                        </div>
                      </section>
                    ))
                  ) : (
                    <>
                      <section>
                        <h2 className="text-3xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4">
                          <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block"></span>
                          The Challenge
                        </h2>
                        <p className="text-base lg:text-lg font-body text-[#0a0a0a]/60 leading-[1.8]">
                          Creating an experience that effectively balances complex functionality with an intuitive, seamless interface required careful consideration of both technical constraints and user needs. The primary goal was to ensure high performance, security, and scalability without sacrificing visual quality or interaction fidelity.
                        </p>
                      </section>
                      
                      <section>
                        <h2 className="text-3xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4">
                          <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block"></span>
                          The Solution
                        </h2>
                        <p className="text-base lg:text-lg font-body text-[#0a0a0a]/60 leading-[1.8] mb-6">
                          By leveraging state-of-the-art technologies and a meticulously crafted design system, we delivered a robust platform that scales elegantly. The implementation features optimized data fetching, secure authentication patterns, and an adaptive architecture.
                        </p>
                        <p className="text-base lg:text-lg font-body text-[#0a0a0a]/60 leading-[1.8]">
                          The final product not only met all functional requirements but exceeded expectations in terms of reliability and user engagement, demonstrating a clear focus on end-to-end quality and modern best practices.
                        </p>
                      </section>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SmoothScroll>
  );
}
