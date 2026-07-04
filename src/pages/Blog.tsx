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

const BLOG_POSTS = [
  {
    id: 1,
    date: " MAY 27, 2026",
    title: "NVIDIA: THE RISE OF AN AI COLOSSUS",
    excerpt: "In 2006, NVIDIA was a struggling GPU company worth $2 billion, teetering on the brink of irrelevance. Fast forward two decades, and it's now worth over $2.5 trillion—more than the combined value of Meta, Netflix, and Disney. How did it pull off one of the most stunning corporate comebacks ever?",
    tags: ["COMPANY PROFILE", "BUSINESS"],
    link: "https://medium.com/@visheshjha.in/nvidia-quietly-became-one-of-the-most-important-companies-in-human-history-6add58b6b280"
  },
  {
    id: 2,
    date: "MAY 18, 2026",
    title: "MOST TYPING PLATFORMS IGNORE DEVELOPERS. SO I BUILT MY OWN.",
    excerpt: "I've always wanted to be a faster typist. I've tried every tool out there — Keybr, Ratatype, Monkeytype, you name it. But none of them really clicked. They were either too gamey, too focused on raw speed, or just plain boring. So I decided to build my own typing platform, one that's actually designed for developers.",
    tags: ["BUILD IN PUBLIC", "PRODUCTIVITY"],
    link: "https://medium.com/@visheshjha.in/most-typing-platforms-ignore-developers-so-i-built-my-own-b60424517528"
  },
  {
    id: 3,
    date: "APR 20, 2025",
    title: "THE BIRTH OF PYTHON. HOW ROSSUM CRACKED CONCURRENCY.",
    excerpt: "Most programming languages are designed by computer scientists. Python was designed by a computer scientist who loved puzzles and hated bureaucracy. Here's how Guido van Rossum created the world's most popular programming language.",
    tags: ["PYTHON", "CONCURRENCY", "SYSTEMS", "INTERVIEW PREP"],
    link: "https://medium.com/@visheshjha.in"
  },
  {
    id: 4,
    date: "OCT 27, 2024",
    title: "SHOULD YOU LEARN REACT OR NEXTJS?",
    excerpt: "If you're a beginner just starting out, React is definitely the way to go. It's a simpler and more flexible framework that will allow you to get up and running quickly. However, if you're looking to build more complex and production-ready applications, NextJS is the better choice. It's a more comprehensive framework that includes a lot of features that you'll need to build a modern web application.",
    tags: ["REACT", "NEXTJS", "WEB DEVELOPMENT"],
    link: "https://medium.com/@visheshjha.in"
  },
  // {
  //   id: 5,
  //   date: "JAN 6, 2025",
  //   title: "DIJKSTRA'S ALGORITHM IS ACTUALLY SUPER SIMPLE",
  //   excerpt: "in short: dijkstra is like BFS, but instead of a queue, we use a priority queue to always expand the node with the smallest current distance.",
  //   tags: ["ALGORITHMS", "GRAPHS"],
  //   link: "#"
  // },
  // {
  //   id: 6,
  //   date: "AUG 27, 2024",
  //   title: "BACKTRACKING IN 15 MINUTES. NO, REALLY!! IN 15 MINUTES.",
  //   excerpt: "A complete one-stop shop for everything you'll ever need to know about Backtracking, originally a class presentation.",
  //   tags: ["ALGORITHMS", "BACKTRACKING"],
  //   link: "#"
  // }
];

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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
