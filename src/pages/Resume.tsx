import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SmoothScroll from "../components/SmoothScroll";
import BlogHeader from "../components/BlogHeader";
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiExternalLink, FiDownload } from "react-icons/fi";

// PDF.js worker (Vite). For CRA/webpack see note below.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDF_URL = "/Vishesh_Resume.pdf";
const MAX_PAGE_WIDTH = 850; // px at 100% zoom on desktop

export default function Resume() {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track available width so the page fits the screen at 100% zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const baseWidth = Math.min(containerWidth, MAX_PAGE_WIDTH);
  const pageWidth = baseWidth * zoomLevel;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#fcfcfb] text-grit-900 relative z-10 pt-8 md:pt-12 pb-24 px-4 sm:px-6 md:px-12 selection:bg-accent selection:text-white">
        <div className="max-w-5xl mx-auto">
          {/* Top Header */}
          <BlogHeader backLink="/" backLabel="Home" />

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-poster uppercase tracking-tight mb-4 mt-8 md:mt-16 text-black">
            Resume
          </h1>
          <p className="text-black/60 text-sm md:text-base font-body mb-10">
            <span className="bg-accent text-white px-2 py-0.5 rounded font-bold">
              Full stack developer.
            </span>
          </p>

          {/* PDF Viewer Container */}
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-xl">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-black/5 border-b border-black/10 text-sm">
              <div className="font-mono text-black/50 text-xs font-semibold">
                Vishesh_Resume.pdf
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 text-black/60">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors"
                  title="Zoom Out"
                >
                  <FiZoomOut />
                </button>
                <span className="text-xs font-bold w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors"
                  title="Zoom In"
                >
                  <FiZoomIn />
                </button>
                <div className="w-[1px] h-4 bg-black/10 mx-1"></div>
                <button
                  onClick={handleResetZoom}
                  className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors"
                  title="Reset Zoom"
                >
                  <FiRotateCcw />
                </button>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 hover:text-black hover:bg-black/5 rounded transition-colors cursor-none"
                  title="Open in New Tab"
                >
                  <FiExternalLink />
                </a>
                <a
                  href={PDF_URL}
                  download
                  className="ml-1 sm:ml-2 flex items-center px-3 sm:px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-md font-medium transition-colors cursor-none shadow-sm"
                >
                  <FiDownload className="sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-3 md:p-8 bg-black/[0.03] overflow-x-auto">
              <div ref={containerRef} className="w-full">
                {error ? (
                  <div className="text-center py-16 text-black/60 text-sm">
                    Couldn't load the preview.{" "}
                    <a href={PDF_URL} target="_blank" rel="noreferrer" className="underline text-accent">
                      Open the PDF directly
                    </a>
                    .
                  </div>
                ) : (
                  <Document
                    file={PDF_URL}
                    onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
                    onLoadError={() => setError(true)}
                    loading={
                      <div className="text-center py-16 text-black/50 text-sm">Loading resume…</div>
                    }
                    className="flex flex-col gap-4"
                  >
                    {containerWidth > 0 &&
                      Array.from({ length: numPages ?? 0 }, (_, i) => (
                        <div
                          key={i}
                          className="bg-white shadow-md mx-auto"
                          style={{ width: pageWidth }}
                        >
                          <Page
                            pageNumber={i + 1}
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </div>
                      ))}
                  </Document>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
