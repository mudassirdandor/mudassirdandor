import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface ExecutiveCardProps {
  children: React.ReactNode;
  level?: 1 | 2;
  className?: string;
  interactive?: boolean;
  hasImageHover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  id?: string;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  variants?: any;
  layout?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

export default function ExecutiveCard({
  children,
  level = 1,
  className = "",
  interactive = true,
  hasImageHover = false,
  ...props
}: ExecutiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobileOrTablet(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || isMobileOrTablet || shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    }
  };

  const handleMouseEnter = () => {
    if (interactive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovered(false);
      // Reset smoothly
      setMousePos({ x: 0.5, y: 0.5 });
    }
  };

  // Base style classes
  const baseClasses = "relative rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-350";
  
  // Level classes (Level 1: solid white, Level 2: slate-50/transparent)
  const levelClasses = level === 1
    ? "bg-white border border-slate-200/90 shadow-3xs"
    : "bg-slate-50 border border-slate-200";

  // Hover states (visual scale/elevation shifts under ~4px limit)
  const hoverMotionProps = interactive && !shouldReduceMotion
    ? {
        whileHover: { 
          y: -3, 
          scale: 1.012, 
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.06)" 
        },
        transition: { type: "spring" as const, stiffness: 350, damping: 25 }
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${levelClasses} ${className} ${interactive ? "group cursor-pointer" : ""}`}
      {...hoverMotionProps}
      {...props}
    >
      {/* 1. Subtle cursor-aware light/reflection (Desktop only) */}
      {interactive && !isMobileOrTablet && !shouldReduceMotion && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(37, 99, 235, 0.05), transparent 75%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* 2. Executive Glow System (Subtle, elegant blue glow on hover) */}
      {interactive && !shouldReduceMotion && (
        <div
          className={`absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 bg-blue-500/[0.015] blur-xl opacity-0 group-hover:opacity-100`}
          style={{ zIndex: 0 }}
        />
      )}

      {/* 3. AI Studio inspired traveling border light */}
      {interactive && !shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{ zIndex: 10 }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ai-studio-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="transparent" stopOpacity={0} />
                <stop offset="50%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>
            <motion.rect
              x="0.5"
              y="0.5"
              width="calc(100% - 1px)"
              height="calc(100% - 1px)"
              rx="16"
              fill="none"
              stroke="url(#ai-studio-border-grad)"
              strokeWidth="1.5"
              pathLength="100"
              strokeDasharray="18 82"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              }}
            />
          </svg>
        </motion.div>
      )}

      {/* Main card content wrapper */}
      <div className="relative w-full h-full flex flex-col justify-between z-2" style={{ zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
