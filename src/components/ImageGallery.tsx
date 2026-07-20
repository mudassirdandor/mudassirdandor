import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Layers, 
  ExternalLink, 
  GitFork,
  Image as ImageIcon
} from "lucide-react";
import ContentPlaceholder from "./ContentPlaceholder";

interface ImageGalleryProps {
  images?: string[];
  variant?: "single" | "multiple" | "desktop" | "mobile" | "tablet" | "comparison";
  beforeSrc?: string;
  afterSrc?: string;
  altText: string;
  title?: string;
  className?: string;
  githubUrl?: string;
  liveUrl?: string;
}

/**
 * ImageGallery component to handle single/multiple mockups, device packaging,
 * and high-fidelity before/after comparison frames.
 */
export default function ImageGallery({
  images = [],
  variant = "single",
  beforeSrc,
  afterSrc,
  altText,
  title,
  className = "",
  githubUrl,
  liveUrl
}: ImageGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage for comparison slider
  const comparisonContainerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Handle Before/After comparison dragging
  const handleComparisonMove = (clientX: number) => {
    if (!comparisonContainerRef.current) return;
    const rect = comparisonContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleComparisonMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleComparisonMove(e.touches[0].clientX);
    }
  };

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Check if we have real images to display
  const hasImages = images.length > 0;
  const hasComparison = !!(beforeSrc && afterSrc);

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {/* Title & Metadata Header */}
      {title && (
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-bold font-mono tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            {title}
          </h4>
          {(liveUrl || githubUrl) && (
            <div className="flex gap-2.5">
              {liveUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-100/60 px-2 py-1 rounded"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-50 border border-slate-200 px-2 py-1 rounded"
                >
                  <GitFork className="w-3 h-3" />
                  Repository
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- RENDER 1: COMPARISON SLIDER VIEW --- */}
      {variant === "comparison" && (
        <div 
          ref={comparisonContainerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
          onMouseLeave={() => setIsResizing(false)}
          className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs cursor-ew-resize bg-slate-100 select-none"
        >
          {/* Before view (Bottom layer) */}
          <div className="absolute inset-0">
            {beforeSrc ? (
              <img 
                src={beforeSrc} 
                alt={`${altText} - Before`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <ContentPlaceholder 
                variant="dashboard" 
                alt={`${altText} - Original Baseline Structure`}
                title="BASELINE ARCHITECTURE (BEFORE)"
                className="absolute inset-0 border-0 rounded-none w-full h-full"
              />
            )}
            <span className="absolute bottom-3 left-3 z-20 bg-slate-950/85 backdrop-blur-xs text-white border border-slate-800 text-[8.5px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
              Before / Legacy
            </span>
          </div>

          {/* After view (Top layer, slider-clipped) */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 min-w-full w-full h-full" style={{ width: "100%" }}>
              {afterSrc ? (
                <img 
                  src={afterSrc} 
                  alt={`${altText} - After`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <ContentPlaceholder 
                  variant="dashboard" 
                  alt={`${altText} - Optimized Decision Portal`}
                  title="DECISION PILOT DEPLOYED (AFTER)"
                  className="absolute inset-0 border-0 rounded-none w-full h-full"
                  metadata={{
                    issuer: "DECISION PORTAL",
                    credentialId: "v1.0-RELEASE",
                    issueDate: "2026-07-06"
                  }}
                />
              )}
              {/* Force after-label to stick correctly despite clipping */}
              <div className="absolute bottom-3 left-3 min-w-[120px] whitespace-nowrap">
                <span className="bg-blue-600 text-white border border-blue-500 text-[8.5px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">
                  After / Optimized
                </span>
              </div>
            </div>
          </div>

          {/* Slider line handle */}
          <div 
            className="absolute inset-y-0 z-30 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-500 shadow-md flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3.5 bg-blue-500 rounded-full" />
                <div className="w-0.5 h-3.5 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- RENDER 2: DESKTOP MOCKUP DEVICE FRAME --- */}
      {variant === "desktop" && (
        <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
          {/* macOS Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            {/* Browser URL */}
            <div className="bg-white border border-slate-200 rounded-md px-3 py-0.5 text-[9px] font-mono text-slate-400 w-64 text-center truncate shadow-3xs">
              https://client-portal.mudassirdandor.com
            </div>
            <Monitor className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Content Panel */}
          <div className="aspect-[16/10] bg-white relative">
            {hasImages ? (
              <img 
                src={images[0]} 
                alt={`${altText} - Desktop Showcase`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <ContentPlaceholder 
                variant="desktop screenshot" 
                alt={altText}
                className="absolute inset-0 border-0 rounded-none w-full h-full"
              />
            )}
          </div>
        </div>
      )}

      {/* --- RENDER 3: MOBILE MOCKUP DEVICE FRAME --- */}
      {variant === "mobile" && (
        <div className="max-w-[280px] mx-auto relative border-[6px] border-slate-900 rounded-[32px] overflow-hidden bg-slate-950 shadow-md">
          {/* Status notch */}
          <div className="absolute top-0 inset-x-0 h-4 flex justify-center items-center z-20">
            <div className="w-20 h-3 bg-slate-900 rounded-b-xl" />
          </div>

          {/* Phone Screen aspect ratio */}
          <div className="aspect-[9/19] bg-white relative overflow-hidden">
            {hasImages ? (
              <img 
                src={images[0]} 
                alt={`${altText} - Mobile Showcase`} 
                className="w-full h-full object-cover pt-3"
                loading="lazy"
              />
            ) : (
              <ContentPlaceholder 
                variant="mobile screenshot" 
                alt={altText}
                className="absolute inset-0 border-0 rounded-none w-full h-full"
              />
            )}
          </div>
        </div>
      )}

      {/* --- RENDER 4: TABLET MOCKUP DEVICE FRAME --- */}
      {variant === "tablet" && (
        <div className="max-w-[500px] mx-auto relative border-[10px] border-slate-900 rounded-[24px] overflow-hidden bg-white shadow-md">
          {/* Camera lens hole */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 z-20" />

          {/* Tablet Screen aspect ratio */}
          <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
            {hasImages ? (
              <img 
                src={images[0]} 
                alt={`${altText} - Tablet Showcase`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <ContentPlaceholder 
                variant="dashboard" 
                alt={altText}
                className="absolute inset-0 border-0 rounded-none w-full h-full"
              />
            )}
          </div>
        </div>
      )}

      {/* --- RENDER 5: MULTIPLE IMAGES SLIDER --- */}
      {variant === "multiple" && hasImages && (
        <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="aspect-[16/10] relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${altText} - Slide ${currentIndex + 1}`}
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white border border-slate-200 text-slate-700 hover:text-slate-950 rounded-full shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white border border-slate-200 text-slate-700 hover:text-slate-950 rounded-full shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Bullet indicators / thumbnails bar */}
          {images.length > 1 && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Asset {currentIndex + 1} of {images.length}
              </span>
              <div className="flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? "bg-blue-600 w-4" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- RENDER 6: SINGLE GENERAL IMAGE --- */}
      {variant === "single" && (
        <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs aspect-[16/10]">
          {hasImages ? (
            <img 
              src={images[0]} 
              alt={altText} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <ContentPlaceholder 
              variant="gallery" 
              alt={altText}
              className="absolute inset-0 border-0 rounded-none w-full h-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
