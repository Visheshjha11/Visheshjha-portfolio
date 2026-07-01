import { motion } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
import { SiGithub, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="relative w-full bg-[#f5f5f5] text-[#0a0a0a]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: CONTACT & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col justify-between"
          >
            
            <div className="w-full">
              {/* Header Area */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-8">
                <h2 className="font-poster text-[18vw] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] leading-[0.8] uppercase tracking-tighter text-[#0a0a0a] scale-y-[1.15] origin-top-left md:origin-left m-0 shrink-0">
                  CONTACT
                </h2>
                <p className="font-sans text-base sm:text-lg md:text-xl leading-snug text-[#0a0a0a]/80 tracking-tight max-w-xs sm:max-w-sm mt-2 md:mt-0">
                  Open to freelance projects and full-time roles.
                </p>
              </div>

              {/* Divider */}
              <div className="relative w-full h-[1px] bg-black/10 my-10 md:my-14">
                <div className="absolute left-[20%] md:left-[45%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/20 shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
              </div>
            </div>

            {/* Let's Connect */}
            <div className="w-full mt-auto">
              <h3 className="font-header uppercase text-xs md:text-sm tracking-[0.2em] text-[#0a0a0a]/60 font-bold mb-4 md:mb-6">Let's Connect</h3>
              <div className="flex flex-col">
                
                {/* GitHub */}
                <a href="https://github.com/visheshjha11" target="_blank" rel="noreferrer" className="flex items-center gap-4 md:gap-6 py-4 md:py-5 border-b border-black/10 group hover:border-black/30 transition-colors w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/10 flex items-center justify-center bg-white group-hover:bg-[#f0f0f0] transition-colors shrink-0">
                    <SiGithub className="text-lg md:text-2xl" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-base md:text-lg tracking-tight truncate">GitHub</span>
                    <span className="text-xs md:text-sm text-[#0a0a0a]/60 truncate">github.com/visheshjha11</span>
                  </div>
                  <ArrowUpRight className="ml-auto text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] transition-colors shrink-0" />
                </a>
                
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/visheshjha11" target="_blank" rel="noreferrer" className="flex items-center gap-4 md:gap-6 py-4 md:py-5 border-b border-black/10 group hover:border-black/30 transition-colors w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/10 flex items-center justify-center bg-white group-hover:bg-[#f0f0f0] transition-colors shrink-0">
                    <FaLinkedin className="text-lg md:text-2xl" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-base md:text-lg tracking-tight truncate">LinkedIn</span>
                    <span className="text-xs md:text-sm text-[#0a0a0a]/60 truncate">linkedin.com/in/visheshjha11</span>
                  </div>
                  <ArrowUpRight className="ml-auto text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] transition-colors shrink-0" />
                </a>

                {/* Email */}
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=visheshjha456@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 py-4 md:py-5 border-b border-black/10 group hover:border-black/30 transition-colors w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/10 flex items-center justify-center bg-white group-hover:bg-[#f0f0f0] transition-colors shrink-0">
                    <SiGmail className="text-lg md:text-2xl" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-base md:text-lg tracking-tight truncate">Email</span>
                    <span className="text-xs md:text-sm text-[#0a0a0a]/60 truncate">visheshjha456@gmail.com</span>
                  </div>
                  <ArrowUpRight className="ml-auto text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] transition-colors shrink-0" />
                </a>
                
              </div>
            </div>
            
          </motion.div>

          {/* Right Column: CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-black/5 shadow-sm flex flex-col justify-between h-full min-h-[350px] sm:min-h-[400px] relative overflow-hidden group"
          >
            {/* Optional decorative concentric circles for subtle flair */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 md:w-64 md:h-64 rounded-full border border-black/[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-72 h-72 md:w-96 md:h-96 rounded-full border border-black/[0.03] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 flex items-center justify-center mb-6 sm:mb-8 bg-[#f9f9f9]">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a0a0a]" />
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1] text-[#0a0a0a]">
                Let's build<br className="hidden sm:block" />something great.
              </h3>
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed max-w-xs sm:max-w-sm">
                I'm currently open to full-time opportunities, collaborations, and exciting ideas.<br className="hidden lg:block" /> Let's connect and create impact together.
              </p>
            </div>

            <div className="relative z-10 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-black/10 flex items-center justify-between gap-4">
              <span className="font-header uppercase text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.2em] font-bold text-[#0a0a0a]">
                START A CONVERSATION
              </span>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=visheshjha456@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all cursor-pointer group/btn">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
