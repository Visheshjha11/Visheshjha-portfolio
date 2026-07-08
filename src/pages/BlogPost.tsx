import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List } from "lucide-react";
import SmoothScroll from "../components/SmoothScroll";
import { motion } from "motion/react";
import { BLOG_POSTS } from "../blogdata";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiSubstack, SiYoutube, SiGmail } from "react-icons/si";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/visheshjha11/", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/Visheshjha11", icon: SiGithub },
  { label: "SubStack", href: "https://substack.com/@visheshjha11", icon: SiSubstack },
  { label: "YouTube", href: "https://yt.cool/IGIVBF", icon: SiYoutube },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=visheshjha456@gmail.com", icon: SiGmail },
];

export default function BlogPost() {
  const { id } = useParams();
  
  const post = BLOG_POSTS.find((p) => {
    if (!id) return false;
    const decodedId = decodeURIComponent(id);
    return (
      p.id === Number(id) || 
      p.link === `/blog/${id}` || 
      p.link === `/blog/${decodedId}` ||
      p.title.toLowerCase() === decodedId.toLowerCase()
    );
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([]);

  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!contentRef.current || !post) return;
    
    // Extract headings for TOC
    const h2Elements = contentRef.current.querySelectorAll("h2");
    const extractedHeadings: { id: string; title: string }[] = [];
    
    h2Elements.forEach((h2, index) => {
      // Don't include the span (the line) in the title text
      const titleSpan = h2.childNodes.length > 1 ? Array.from(h2.childNodes).find(n => n.nodeType === 3)?.textContent : h2.textContent;
      const text = (titleSpan || h2.textContent || `Section ${index + 1}`).trim();
      
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const sectionId = `sec-${slug}`;
      h2.id = sectionId;
      extractedHeadings.push({ id: sectionId, title: text });
    });
    
    setHeadings(extractedHeadings);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black p-6">
        <h1 className="text-5xl font-poster uppercase tracking-tight mb-6 text-center">Post Not Found</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-header font-bold tracking-[0.25em] uppercase hover:text-black/70 transition-colors cursor-none">
          <ArrowLeft className="w-4 h-4" /> Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white text-black relative pt-8 md:pt-12 pb-24 px-4 sm:px-8 md:px-12 lg:px-24 border-t border-black/10 selection:bg-black selection:text-white">
        
        {/* Table of Contents - Fixed */}
        {headings.length > 0 && (
          <div 
            className="fixed right-4 sm:right-8 md:right-12 bottom-6 md:bottom-auto md:top-32 z-50 group"
            onMouseEnter={() => setIsTocOpen(true)}
            onMouseLeave={() => setIsTocOpen(false)}
          >
            <button 
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-12 h-12 bg-white border border-black/10 shadow-lg rounded-full flex items-center justify-center cursor-none hover:bg-black/5 transition-colors focus:outline-none"
              aria-label="Table of Contents"
            >
              <List className="w-5 h-5 text-black/70" />
            </button>
            
            <div className={`absolute right-0 bottom-full mb-4 md:bottom-auto md:top-full md:mt-4 w-56 sm:w-64 bg-white/95 backdrop-blur-md border border-black/10 rounded-xl p-4 sm:p-5 shadow-2xl transition-all duration-300 origin-bottom-right md:origin-top-right ${isTocOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2 md:translate-y-[-8px]"}`}>
              <h3 className="text-[0.65rem] font-header font-bold tracking-widest uppercase text-black/40 mb-4 pb-3 border-b border-black/5">
                Table of Contents
              </h3>
              <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {headings.map(h => (
                  <li key={h.id}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                          setIsTocOpen(false); // Close on mobile after click
                        }
                      }}
                      className="text-xs font-body text-left text-black/70 hover:text-black transition-colors block cursor-none line-clamp-2"
                    >
                      {h.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Top Header */}
        <div className="max-w-4xl mx-auto flex flex-row justify-between items-center mb-12 md:mb-20 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1 text-[0.65rem] md:text-sm font-header font-bold tracking-widest uppercase text-black/60 hover:text-black transition-colors cursor-none group whitespace-nowrap">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="inline sm:hidden">Back</span>
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-5 flex-wrap pl-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-black/30 hover:text-black transition-colors cursor-none"
                aria-label={label}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto w-full relative z-10"
        >
          <div className="mb-12 md:mb-20 flex flex-col gap-6 md:gap-8 border-b border-black/10 pb-10 md:pb-12">
            <div>
              <span className="text-[0.6rem] md:text-[0.65rem] font-header font-bold tracking-[0.4em] uppercase text-black/40 block mb-4 md:mb-6">
                {post.date}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-poster font-bold tracking-[-0.03em] leading-[0.9] text-black whitespace-pre-line uppercase break-words">
                {post.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[0.55rem] md:text-[0.6rem] font-header font-bold text-black uppercase tracking-[0.15em] border border-black/20 px-3 py-1.5 rounded-sm bg-black/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl font-body text-black leading-[1.6] mb-12 md:mb-16 font-medium italic border-l-4 border-black/20 pl-4 md:pl-6 text-black/70">
              {post.excerpt}
            </p>
            
            <div ref={contentRef} className="text-base sm:text-lg font-body text-black/80 leading-[1.8] blog-post-content space-y-6">
              {post.content ? post.content : (
                <p>Full content for this post is not available locally.</p>
              )}
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-black/10 flex justify-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-header font-bold tracking-widest uppercase text-black hover:text-black/60 transition-colors cursor-none group px-6 py-3 border border-black/20 hover:border-black/50 rounded-full">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </SmoothScroll>
  );
}
