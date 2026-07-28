import { useEffect, useState } from "react";
import SmoothScroll from "../components/SmoothScroll";
import BlogHeader from "../components/BlogHeader";
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiExternalLink, FiDownload } from "react-icons/fi";

export default function Resume() {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#fcfcfb] text-grit-900 relative z-10 pt-8 md:pt-12 pb-24 px-4 sm:px-6 md:px-12 selection:bg-accent selection:text-white">
        <div className="max-w-5xl mx-auto">
          {/* Top Header */}
          <BlogHeader backLink="/" backLabel="Home" />

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-poster uppercase tracking-tight mb-4 mt-8 md:mt-16 text-black">Resume</h1>
          <p className="text-black/60 text-sm md:text-base font-body mb-10">
            <span className="bg-accent text-white px-2 py-0.5 rounded font-bold">Full stack developer.</span>
          </p>

          {/* PDF Viewer Container */}
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-xl">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-black/5 border-b border-black/10 text-sm">
              <div className="font-mono text-black/50 text-xs font-semibold">
                VisheshJha_Resume.pdf
              </div>
              <div className="flex items-center space-x-2 md:space-x-4 text-black/60 mt-3 md:mt-0">
                <button onClick={handleZoomOut} className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors" title="Zoom Out">
                  <FiZoomOut />
                </button>
                <span className="text-xs font-bold w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors" title="Zoom In">
                  <FiZoomIn />
                </button>
                <div className="w-[1px] h-4 bg-black/10 mx-1"></div>
                <button onClick={handleResetZoom} className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors" title="Reset Zoom">
                  <FiRotateCcw />
                </button>
                <a 
                  href="/VisheshJha_Resume.pdf" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors cursor-none"
                  title="Open in New Tab"
                >
                  <FiExternalLink />
                </a>
                <a 
                  href="/VisheshJha_Resume.pdf" 
                  download 
                  className="ml-2 flex items-center px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors cursor-none shadow-sm"
                >
                  <FiDownload className="mr-2" />
                  Download
                </a>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-4 md:p-8 bg-black/[0.03] flex justify-center overflow-x-auto min-h-[600px] items-start">
              <div 
                className="bg-white shadow-md w-full max-w-[850px] aspect-[210/297] relative origin-top transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <iframe 
                  src="/VisheshJha_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  title="Vishesh Jha Resume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
