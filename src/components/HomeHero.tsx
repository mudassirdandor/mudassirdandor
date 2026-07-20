import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, User, GraduationCap, Award, ShieldCheck, MessageCircle } from "lucide-react";
import ContentPlaceholder from "./ContentPlaceholder";
import { getRevealVariants } from "../utils/motion";

interface HomeHeroProps {
  onNavigate: (pageId: string) => void;
}

export default function HomeHero({ onNavigate }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const heroVariants = getRevealVariants("hero", shouldReduceMotion);

  return (
    <motion.section
      id="home-hero"
      className="relative pt-4 pb-10 md:pt-6 md:pb-12 lg:py-0 bg-brand-bg-primary text-brand-body px-6 md:px-8 overflow-hidden lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center"
      aria-label="Executive Briefing Section"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      {/* Editorial Grid Paper Overlays */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
 
      <div className="max-w-7xl w-full mx-auto relative z-10 py-3 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Core Value Proposition */}
          <div className="flex flex-col items-start text-left space-y-3.5 md:space-y-4 lg:col-span-7">
            <span className="text-[12px] font-mono tracking-widest text-executive-blue uppercase font-bold">
              Practical Technology & Data Solutions
            </span>
            
            <h1 className="text-[clamp(3rem,4.5vw,3.5rem)] font-bold tracking-[-0.02em] text-slate-950 font-hero leading-[1.08] max-w-3xl">
              I help you understand your data, automate your work, and build digital solutions that grow your organization.
            </h1>
            
            <p className="text-[18px] text-slate-700 leading-[1.7] max-w-[650px] font-sans">
              I turn messy spreadsheets, scattered databases, and repetitive processes into clean dashboards and automated workflows that save you time and help you grow.
            </p>

            {/* Elegant compact metadata row */}
            <div className="flex flex-wrap gap-1.5 max-w-lg py-0.5">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-700 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-executive-blue" />
                MSc Statistics
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-700 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-executive-blue" />
                40+ Certifications
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-700 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-executive-blue" />
                Business Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-700 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-executive-blue" />
                AI Automation
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
              <button
                onClick={() => onNavigate("contact")}
                className="w-full sm:w-auto px-5 py-3 bg-executive-blue hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] text-white font-semibold text-[15px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/10"
              >
                Discuss Your Project
                <ArrowUpRight className="w-4 h-4" />
              </button>
 
              <a
                href={`https://wa.me/923112777061?text=${encodeURIComponent("Hello Mudassir,\n\nI visited your portfolio website and would like to discuss a project with you.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp with Mudassir"
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] border border-slate-200 text-emerald-600 hover:text-emerald-700 font-semibold text-[15px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-xs"
              >
                Chat on WhatsApp
                <MessageCircle className="w-4 h-4" />
              </a>
              
              <button
                onClick={() => scrollToSection("featured-projects")}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-[15px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-xs"
              >
                View Case Studies
              </button>
            </div>
          </div>
 
          {/* Right Column: T1. PortraitContainer with elegant, high-contrast placeholder profile */}
          <div className="w-full flex justify-center lg:justify-end lg:col-span-5 lg:mt-9">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col justify-between"
            >
              {/* Corner Coordinate Tick Marks for Executive Aesthetic */}
              <span className="absolute top-4 left-4 text-[10px] font-mono text-slate-300 select-none">+</span>
              <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-300 select-none">+</span>
              <span className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-300 select-none">+</span>
              <span className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-300 select-none">+</span>
 
              {/* Portrait Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                  <span className="text-[12px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                    SYSTEMS ARCHITECT INDEX
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded uppercase font-bold">
                  Verified Active
                </span>
              </div>
 
              {/* Central Stylized Visual Frame */}
              <div className="my-4 flex flex-col items-center justify-center relative space-y-4">
                {/* Visual Circle Backdrop */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-blue-500/10 via-emerald-500/5 to-transparent flex items-center justify-center relative border border-slate-100 shadow-inner overflow-hidden">
                  <ContentPlaceholder
                    variant="portrait"
                    src="/assets/portraits/portrait-main.webp"
                    alt="Mudassir Javed - BI & Data Analytics Consultant Portrait"
                    title="Mudassir Javed Portrait"
                    className="w-full h-full rounded-full"
                    aspectRatio="1/1"
                    borderless={true}
                    imageClassName="object-top"
                  />
                  {/* Surrounding tech ring */}
                  <div className={`absolute inset-0 rounded-full border border-dashed border-blue-500/20 pointer-events-none ${shouldReduceMotion ? "" : "animate-spin-slow"}`} />
                </div>
 
                <div className="text-center space-y-1.5">
                  <h3 className="text-[20px] sm:text-[24px] font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                    Mudassir Javed
                  </h3>
                  <p className="text-[12px] sm:text-[13px] font-mono text-executive-blue uppercase tracking-wider font-bold">
                    BI & DATA ANALYTICS CONSULTANT
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-slate-500 font-mono font-medium uppercase tracking-wide">
                    MSc Statistics • 40+ Certifications
                  </p>
                </div>
              </div>
 
              {/* Portrait Footer with credential logs */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-left">
                <div className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-slate-600">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-mono leading-relaxed">Bedrock: MSc Statistics (University of Balochistan)</span>
                </div>
                <div className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-slate-600">
                  <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-mono leading-relaxed">Credentials: Google, IBM, & Microsoft Verified</span>
                </div>
                <div className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-slate-600">
                  <ShieldCheck className={`w-4 h-4 text-emerald-500 shrink-0 mt-0.5 ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                  <span className="font-mono leading-relaxed">Status: Secure Enterprise Pipelines Deployed</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
