import React, { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1", "3/4"
  fallbackSrc?: string;
  placeholderColor?: string;
  borderless?: boolean;
}

/**
 * OptimizedImage component to future-proof the application's image strategy.
 * Implements best-practices for Core Web Vitals:
 * - Prevents layout shift (CLS) via explicit aspect-ratio wrappers.
 * - Native lazy loading (`loading="lazy"`).
 * - Asynchronous decoding (`decoding="async"`).
 * - Graceful loading states (soft desaturated skeleton placeholders).
 * - Referrer policy security.
 */
export default function OptimizedImage({
  src,
  alt,
  aspectRatio = "16/9",
  fallbackSrc,
  placeholderColor = "bg-slate-100",
  className = "",
  sizes = "(max-w-7xl) 100vw, 1200px",
  borderless = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Parse aspect ratio into custom CSS style or use standard tailwind class safely
  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-[1/1]",
    "3/4": "aspect-[3/4]",
    "2/3": "aspect-[2/3]",
    "21/9": "aspect-[21/9]",
  }[aspectRatio] || "aspect-video";

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (props.onError) {
      props.onError(e);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden w-full ${aspectClass} ${placeholderColor} ${
        borderless ? "" : "border border-slate-200/50 rounded-xl"
      }`}
      style={{ isolation: "isolate" }}
    >
      {/* Loading Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse-slow"
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Fallback SVG State if Image Fails */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-400">
          <svg
            className="w-8 h-8 mb-2 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Image Offline
          </span>
        </div>
      ) : (
        <img
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 scale-100 blur-0" 
              : "opacity-0 scale-105 blur-md"
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
