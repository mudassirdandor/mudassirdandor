import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ExecutiveRailProps {
  activeSection: string;
  scrollPercent: number;
  onScrollToSection: (sectionId: string) => void;
}

const navItems = [
  { label: "Hero", id: "home-hero" },
  { label: "Projects", id: "featured-projects" },
  { label: "Solutions", id: "solutions-overview" },
  { label: "Recognition", id: "recognition-showcase" },
  { label: "Process", id: "how-i-work" },
  { label: "Knowledge", id: "latest-insights" },
  { label: "Contact", id: "contact" },
  { label: "Footer", id: "global-footer" }
];

export default function ExecutiveRail({
  activeSection,
  scrollPercent,
  onScrollToSection
}: ExecutiveRailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const showExpanded = isDesktop && isHovered && !shouldReduceMotion;

  return (
    <motion.nav
      id="executive-navigation-rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-white/90 border border-slate-200/80 backdrop-blur-xl rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.06)] hidden md:flex flex-col items-center justify-between select-none py-6"
      style={{ height: "340px" }}
      animate={{
        width: showExpanded ? 160 : 16,
        paddingLeft: showExpanded ? 16 : 0,
        paddingRight: showExpanded ? 16 : 0,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      onMouseEnter={() => isDesktop && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Guided Reading Progress"
    >
      {/* Vertical Reading Progress Track - Centered perfectly */}
      <div 
        className="absolute top-6 bottom-6 left-1/2 w-[2px] bg-slate-100 -translate-x-1/2 rounded-full overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div 
          className="w-full bg-gradient-to-b from-blue-600 to-indigo-600 origin-top h-full"
          style={{ scaleY: scrollPercent / 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Navigation Buttons Stack */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className="group/btn relative flex items-center justify-center w-full h-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 outline-none rounded-lg"
              aria-label={`Scroll to ${item.label} section`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Dynamic Reveal Section Label */}
              <span
                className={`absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-wider uppercase font-bold text-right whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-400 group-hover/btn:text-slate-700"
                } ${
                  showExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                {item.label}
              </span>

              {/* Indicator Dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 z-10 ${
                  isActive
                    ? "bg-blue-600 scale-125 ring-4 ring-blue-500/15"
                    : "bg-slate-300 group-hover/btn:bg-slate-500 group-hover/btn:scale-110"
                }`}
              />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
