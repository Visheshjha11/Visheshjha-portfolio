import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiSubstack, SiYoutube, SiGmail } from "react-icons/si";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/visheshjha11/", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/Visheshjha11", icon: SiGithub },
  { label: "SubStack", href: "https://substack.com/@visheshjha11", icon: SiSubstack },
  { label: "YouTube", href: "https://yt.cool/IGIVBF", icon: SiYoutube },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=visheshjha456@gmail.com", icon: SiGmail },
];

interface BlogHeaderProps {
  backLink: string;
  backLabel: string;
}

export default function BlogHeader({ backLink, backLabel }: BlogHeaderProps) {
  return (
    <header className="w-full flex flex-row justify-between items-center mb-12 md:mb-16 relative z-10 gap-4 flex-wrap">
      <Link to="/" className="text-xl md:text-2xl font-poster uppercase tracking-tight hover:opacity-70 transition-opacity cursor-none whitespace-nowrap">
        Vishesh Jha
      </Link>

      <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-end flex-grow">
        <Link to={backLink} className="inline-flex items-center gap-1 text-[0.65rem] md:text-sm font-header font-bold tracking-widest uppercase text-black/60 hover:text-black transition-colors cursor-none group whitespace-nowrap">
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="inline sm:hidden">Back</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
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
    </header>
  );
}
