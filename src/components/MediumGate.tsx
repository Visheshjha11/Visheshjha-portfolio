import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface MediumGateProps {
  mediumUrl: string;
  children: ReactNode;
}

/**
 * Medium-style "read more" wall: shows a faded preview of the article,
 * then a call-to-action that redirects to the full story on Medium.
 */
export default function MediumGate({ mediumUrl, children }: MediumGateProps) {
  return (
    <div className="relative">
      <div className="max-h-[1000px] sm:max-h-[1200px] md:max-h-[1400px] overflow-hidden" aria-hidden={false}>
        {children}
      </div>

      {/* Fade-out over the end of the preview */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/90 to-transparent" />

      <div className="relative -mt-4 pt-12 pb-4 flex flex-col items-center text-center">
        <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-black leading-tight mb-4">
          Enjoying the read?
        </h3>
        <p className="font-body text-sm sm:text-base text-black/60 max-w-md leading-relaxed mb-8">
          The full story lives on Medium. If you liked what you read so far,
          continue there to read the full article.
        </p>
        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-black text-white text-xs sm:text-sm font-header font-bold tracking-widest uppercase px-7 py-4 rounded-full cursor-none hover:bg-black/80 transition-colors"
        >
          Read full article on Medium
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
