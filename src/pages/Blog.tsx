import { motion } from "motion/react";
import SmoothScroll from "../components/SmoothScroll";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiSubstack, SiYoutube, SiGmail } from "react-icons/si";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/visheshjha11/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Visheshjha11",
    icon: SiGithub,
  },
  {
    label: "SubStack",
    href: "https://substack.com/@visheshjha11",
    icon: SiSubstack,
  },
  {
    label: "YouTube",
    href: "https://yt.cool/IGIVBF",
    icon: SiYoutube,
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=visheshjha456@gmail.com",
    icon: SiGmail,
  },
];

import { BLOG_POSTS } from "../blogdata";

// const ALL_TAGS = [
//   "SYSTEMS", "CONCURRENCY", "OS", "INTERVIEW PREP", "ALGORITHMS", "GRAPHS", "JAVA", "MATH", "LINEAR ALGEBRA", "DATA STRUCTURES", "TREES", "BACKTRACKING"
// ];

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white pt-8 md:pt-12 pb-24 px-6 md:px-12 text-black relative z-10 selection:bg-black selection:text-white">
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-12 md:mb-16">
            <Link to="/" className="inline-flex items-center gap-1 text-xs md:text-sm font-header font-bold tracking-widest uppercase text-black/60 hover:text-black transition-colors cursor-none">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-5">
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

          {/* Tags */}
          {/* <div className="flex flex-wrap gap-2 mb-20">
            {ALL_TAGS.map(tag => (
              <button key={tag} className="px-2 py-1 text-[0.55rem] md:text-[0.65rem] font-header font-bold tracking-[0.1em] border border-black/20 rounded-sm hover:bg-black/5 transition-colors uppercase cursor-none">
                {tag}
              </button>
            ))}
          </div> */}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {BLOG_POSTS.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                className="group cursor-none flex flex-col h-full border-l-2 border-transparent hover:border-black/20 pl-4 md:pl-6 transition-colors"
              >
                {post.isInternal ? (
                  <Link to={post.link} className="flex flex-col h-full cursor-none">
                    <p className="text-[0.55rem] md:text-[0.65rem] font-header font-bold tracking-[0.2em] text-black/50 mb-3 uppercase">
                      {post.date}
                    </p>
                    <h2 className="text-lg md:text-xl font-sans font-bold tracking-tight mb-4 group-hover:text-black/70 transition-colors flex items-center gap-2 uppercase">
                      {post.title}
                      <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </h2>
                    <p className="text-black/60 font-body text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 flex-grow max-w-[90%]">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[0.5rem] font-header font-bold tracking-[0.15em] border border-black/10 rounded-sm text-black/50 group-hover:border-black/30 group-hover:text-black/80 transition-colors uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ) : (
                  <a href={post.link} target="_blank" rel="noreferrer" className="flex flex-col h-full cursor-none">
                    <p className="text-[0.55rem] md:text-[0.65rem] font-header font-bold tracking-[0.2em] text-black/50 mb-3 uppercase">
                      {post.date}
                    </p>
                    <h2 className="text-lg md:text-xl font-sans font-bold tracking-tight mb-4 group-hover:text-black/70 transition-colors flex items-center gap-2 uppercase">
                      {post.title}
                      <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </h2>
                    <p className="text-black/60 font-body text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 flex-grow max-w-[90%]">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[0.5rem] font-header font-bold tracking-[0.15em] border border-black/10 rounded-sm text-black/50 group-hover:border-black/30 group-hover:text-black/80 transition-colors uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
