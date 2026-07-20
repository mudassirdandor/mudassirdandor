import React from "react";
import { GraduationCap, Award, Github } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";

export default function HomeTrustBar() {
  const shouldReduceMotion = useReducedMotion();
  const variants = getRevealVariants("upward", shouldReduceMotion);

  return (
    <motion.section 
      id="home-trust-bar" 
      className="bg-white border-y border-slate-200 py-6 px-6 md:px-8 relative overflow-hidden"
      aria-label="Academic & Professional Trust Indicators"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={variants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Horizontal trust belt split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center justify-stretch">
          
          {/* Pillar 1: Academic Background */}
          <div className="flex items-center gap-3.5 md:px-8 justify-center md:justify-start">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-mono text-slate-600 uppercase tracking-wider font-semibold">
                Education Background
              </span>
              <span className="text-[15px] font-bold text-slate-950">
                MSc in Statistics — University of Balochistan
              </span>
            </div>
          </div>

          {/* Pillar 2: Professional Certifications */}
          <div className="flex items-center gap-3.5 md:px-8 justify-center md:justify-start border-t md:border-t-0 md:border-x border-slate-150 pt-4 md:pt-0">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-mono text-slate-600 uppercase tracking-wider font-semibold">
                Professional Training
              </span>
              <span className="text-[15px] font-bold text-slate-950">
                40+ Verified Credentials & Badges
              </span>
            </div>
          </div>

          {/* Pillar 3: Active Status Indicator */}
          <div className="flex items-center gap-3.5 md:px-8 justify-center md:justify-start border-t md:border-t-0 pt-4 md:pt-0">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-100 relative">
              <Github className="w-5 h-5" />
              {/* Subtle green pulse dot */}
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-mono text-slate-600 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                Open Source Portfolio
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[15px] font-bold text-slate-950">
                GitHub: mudassirdandor (Active Commits)
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
