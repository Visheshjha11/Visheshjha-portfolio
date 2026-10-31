import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

const EMAIL = "visheshjha456@gmail.com";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/visheshjha11/" },
  { label: "GitHub", href: "https://github.com/Visheshjha11" },
  { label: "Medium", href: "httmedium.com/@visheshjha11ps://" },
  { label: "Substack", href: "https://substack.com/@visheshjha11" },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* One entrance sequence, played once when the footer scrolls into view:
   the CONTACT letters rise out from behind a baseline mask, then the email
   block and the social rows follow one after another. */
const rootVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const wordmarkVariants: Variants = {
  // Clips only the bottom edge, so letters rising from below stay hidden.
  hidden: { clipPath: "inset(-30% -10% 0% -10%)" },
  show: {
    // Opens the clip once the letters have landed, so nothing gets cut off.
    clipPath: "inset(-30% -10% -30% -10%)",
    transition: { staggerChildren: 0.09, clipPath: { delay: 1.15, duration: 0.01 } },
  },
};

const letterVariants: Variants = {
  hidden: { y: "100%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

// The cursive O also straightens up as it rises (adds to its static -6deg tilt).
const letterOVariants: Variants = {
  hidden: { y: "100%", rotate: -14 },
  show: { y: 0, rotate: 0, transition: { duration: 1, ease: EASE } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.45 } },
};

/* A row that fills with ink from the bottom on hover or keyboard focus. */
function SocialRow({ label, href, last }: { label: string; href: string; last: boolean }) {
  return (
    <motion.div variants={itemVariants}>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex items-center justify-between overflow-hidden border-t border-[#0a0a0a]/15 px-1 py-4 md:py-5 outline-none ${last ? "border-b" : ""}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      />
      <span className="relative font-poster text-4xl md:text-5xl lg:text-6xl leading-none uppercase tracking-tight text-[#0a0a0a] transition-colors duration-500 group-hover:text-[#fcfcfb] group-focus-visible:text-[#fcfcfb] group-hover:translate-x-3 group-focus-visible:translate-x-3 transition-transform">
        {label}
      </span>
      <ArrowUpRight
        className="relative mr-1 h-6 w-6 md:h-7 md:w-7 text-[#0a0a0a] transition-all duration-500 group-hover:text-[#fcfcfb] group-focus-visible:text-[#fcfcfb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </a>
    </motion.div>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API can be blocked (insecure origin, permissions): use the old path.
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  // Reduced motion: render the final state, no entrance sequence.
  const trigger = reduce
    ? ({ initial: "show", animate: "show" } as const)
    : ({ initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.25 } } as const);

  return (
    <footer className="relative w-full font-sans">
      {/* Big CONTACT wordmark, email, socials */}
      <motion.section
        variants={rootVariants}
        {...trigger}
        className="relative w-full overflow-hidden bg-[#fcfcfb] px-6 pt-10 pb-12 text-[#0a0a0a] md:px-12 md:pt-12 md:pb-16"
      >
        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-0">
          {/* Wordmark (unchanged) + email */}
          <div className="flex flex-col md:col-span-8">
            <motion.div
              variants={wordmarkVariants}
              className="relative z-10 -ml-[1vw] flex items-center justify-start md:ml-0"
            >
              <div className="flex items-center">
                <motion.span variants={letterVariants} className="font-poster text-[22vw] md:text-[20vw] lg:text-[18vw] leading-none uppercase tracking-tighter">C</motion.span>
                <motion.span variants={letterOVariants} className="font-playfair italic font-light text-[30vw] md:text-[28vw] lg:text-[24vw] leading-none transform -rotate-6 -ml-[3vw] md:-ml-[2vw] -mr-[2vw] z-10 relative">O</motion.span>
                <motion.span variants={letterVariants} className="font-poster text-[22vw] md:text-[20vw] lg:text-[18vw] leading-none uppercase tracking-tighter">NTACT</motion.span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 md:mt-10">
              <p className="mb-3 font-playfair italic text-xl text-[#0a0a0a]/60 md:text-2xl">
                Have something to build? Write to me.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative inline-block pb-1 font-helvetica font-bold tracking-tight text-[6.2vw] leading-tight md:text-[3.4vw] outline-none"
                >
                  {EMAIL}
                  <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-[#0a0a0a]/20" />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 border border-[#0a0a0a]/40 px-4 py-2 font-header text-[0.6rem] font-bold uppercase tracking-[0.25em] transition-colors hover:bg-[#0a0a0a] hover:text-[#fcfcfb] focus-visible:bg-[#0a0a0a] focus-visible:text-[#fcfcfb] outline-none"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span role="status" aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Social rows */}
          <nav aria-label="Social links" className="flex flex-col justify-end md:col-span-4 md:pl-12 lg:pl-16">
            <motion.p variants={itemVariants} className="mb-4 font-playfair italic text-xl text-[#0a0a0a]/60 md:text-2xl">Socials</motion.p>
            {SOCIALS.map((s, i) => (
              <SocialRow key={s.label} {...s} last={i === SOCIALS.length - 1} />
            ))}
          </nav>
        </div>

      </motion.section>
    </footer>
  );
}
