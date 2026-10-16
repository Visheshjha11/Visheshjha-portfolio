import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import SmoothScroll from "../components/SmoothScroll";
import BlogHeader from "../components/BlogHeader";
import Contact from "../components/Contact";
import { BLOG_POSTS, BlogPostType } from "../blogdata";

function PostCard({ post }: { post: BlogPostType }) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (post.isInternal) {
      return (
        <Link to={post.link} className="group block cursor-none h-full">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={post.link}
        target="_blank"
        rel="noreferrer"
        className="group block cursor-none h-full"
      >
        {children}
      </a>
    );
  };

  return (
    <CardWrapper>
      <div className="flex flex-col h-full">
        {/* 16:9 Cover Image — Clean, unobstructed & properly aligned */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0a0a0a] border border-black/10 shadow-sm">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-xs">
              No Cover
            </div>
          )}

          {/* External Indicator */}
          {!post.isInternal && (
            <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Tags row above title */}
        <div className="flex items-center gap-2 mt-4">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[0.6rem] font-header font-bold tracking-wider uppercase bg-neutral-100 text-neutral-600 border border-neutral-200/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Post Title */}
        <h2 className="font-sans font-bold tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors mt-2 text-xl sm:text-2xl">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-neutral-600 font-body leading-relaxed line-clamp-2 mt-2">
          {post.excerpt}
        </p>

        {/* Author Meta Row */}
        <div className="flex items-center gap-2 sm:gap-2.5 mt-4 text-xs font-header text-neutral-500">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[0.55rem] sm:text-[0.6rem] font-bold font-header ring-2 ring-white">
            VJ
          </div>
          <span className="font-semibold text-neutral-800">
            {post.author?.name || "Vishesh Jha"}
          </span>
          <span>·</span>
          <span>{post.date}</span>
          {post.readTime && (
            <>
              <span>·</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FAFAFA] text-[#111111] relative z-10 selection:bg-neutral-900 selection:text-white pt-8 md:pt-12 pb-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
          <BlogHeader backLink="/" backLabel="Home" />

          {/* Hero Section: Editorial Title & Subscribe Action */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 pb-8 border-b border-black/10 mb-12 sm:mb-14">
            <div>
              <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl tracking-tight text-neutral-900 font-normal leading-none mb-3">
                Blog
              </h1>
              <p className="font-body text-neutral-500 text-sm sm:text-base max-w-xl leading-relaxed">
                Essays and technical deep dives on systems, AI engineering, developer tools, and product architecture.
              </p>
            </div>

            <div className="flex items-center">
              <a
                href="https://substack.com/@visheshjha11"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white hover:bg-neutral-950 text-neutral-800 hover:text-white transition-all text-xs font-header font-bold tracking-wider uppercase shadow-xs group"
              >
                <Mail className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span>Subscribe</span>
              </a>
            </div>
          </div>

          {/* All Posts Grid — Clean 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {BLOG_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Contact />
    </SmoothScroll>
  );
}
