import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowDown, 
  ArrowUpRight, 
  Database, 
  TrendingUp, 
  X, 
  FileText, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { useResumeDownload } from "../hooks/useResumeDownload";
import AnimatedCounter from "./AnimatedCounter";

/**
 * Hero introduction component.
 * Features high-fidelity layout grid with stylized analytical axes/ticks, 
 * corporate-level statistics counters, a visual cost-savings trend graph, and 
 * call-to-actions to download the professional resume or navigate downstream.
 */
export default function Hero() {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { isLoading: isResumeLoading, download: downloadResume } = useResumeDownload();

  const stats = [
    { value: "12+", label: "BI Dashboards Portfolio" },
    { value: "7x", label: "Google Professional Certifications" },
    { value: "+42%", label: "Avg Maps Visibility Boost" },
    { value: "92%", label: "Time Saved in Manual Reporting" }
  ];

  const scrollTo = (id: string) => {
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

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await downloadResume();
    } catch (err) {
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 4000);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-brand-bg-primary text-brand-body px-6 md:px-8"
      aria-label="Executive Introduction"
    >
      {/* 
        PREMIUM EXECUTIVE VISUALS
        Minimal ambient geometry, desaturated backdrops, absolute contrast, zero flashy cyberpunk matrix noise.
      */}
      
      {/* Very subtle desaturated indigo and slate background washes for soft texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.04),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.02),transparent_50%)] pointer-events-none" />

      {/* Extremely faint technical coordinate paper grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Subtle analytical tick marks & axis ticks for professional credibility */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40" aria-hidden="true">
        {/* Y-Axis scale tracker */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-[1px] bg-slate-200 hidden lg:block">
          <div className="absolute top-0 right-2.5 text-[8px] font-mono text-slate-400 tracking-wider">INDEX_0.0</div>
          <div className="absolute top-1/4 right-2.5 text-[8px] font-mono text-slate-300">VAL_0.25</div>
          <div className="absolute top-2/4 right-2.5 text-[8px] font-mono text-slate-300">VAL_0.50</div>
          <div className="absolute top-3/4 right-2.5 text-[8px] font-mono text-slate-300">VAL_0.75</div>
        </div>
        {/* X-Axis timeline scale */}
        <div className="absolute bottom-20 left-16 right-16 h-[1px] bg-slate-200 hidden lg:block">
          <div className="absolute left-0 bottom-2 text-[8px] font-mono text-slate-300">Q1_START</div>
          <div className="absolute left-1/4 bottom-2 text-[8px] font-mono text-slate-300">Q2_SYNC</div>
          <div className="absolute left-2/4 bottom-2 text-[8px] font-mono text-slate-300">Q3_OPTIMIZED</div>
          <div className="absolute left-3/4 bottom-2 text-[8px] font-mono text-slate-300">Q4_INTEGRITY</div>
          <div className="absolute right-0 bottom-2 text-[8px] font-mono text-slate-400">TARGET_100</div>
        </div>
        {/* Alignment coordinate markers */}
        <span className="absolute top-24 left-12 text-[10px] font-mono text-slate-200 select-none">+</span>
        <span className="absolute top-24 right-12 text-[10px] font-mono text-slate-200 select-none">+</span>
        <span className="absolute bottom-24 left-12 text-[10px] font-mono text-slate-200 select-none">+</span>
        <span className="absolute bottom-24 right-12 text-[10px] font-mono text-slate-200 select-none">+</span>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Highly Structured Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Brand & Professional Profile Segment */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[10px] md:text-xs tracking-wider uppercase"
          >
            <span className="text-slate-900 font-semibold">mudassirdandor</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">Mudassir Javed</span>
            <span className="text-slate-300">/</span>
            <span className="text-executive-blue font-semibold flex items-center gap-1.5">
              <Database className="w-3 h-3 text-executive-blue" />
              Business Intelligence & Data Analyst
            </span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] font-display mb-6 text-slate-900"
          >
            Transforming Data <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Into Business Intelligence.
            </span>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mb-8"
          >
            I help organizations make better decisions through advanced analytics, enterprise Business Intelligence, AI automation, and local Business Intelligence. Drawing on an MSc in Statistics and professional Google certifications, I design high-availability data pipelines and executive dashboards that translate complex operational datasets into clear, measurable growth drivers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 bg-executive-blue hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center gap-2 group cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/10"
              aria-label="Explore Case Studies"
            >
              Explore Case Studies
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            <button
              onClick={handleDownloadResume}
              disabled={isResumeLoading}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center gap-2 cursor-pointer transition-colors duration-200 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download Professional Resume"
            >
              {isResumeLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-executive-blue" />
              ) : (
                <FileText className="w-4 h-4 text-executive-blue" />
              )}
              {isResumeLoading ? "Loading..." : "Download Resume"}
            </button>
          </motion.div>

          {/* Live Portfolio & Certifications Statistics Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-8 border-t border-slate-200"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col group/stat">
                <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 tracking-tight transition-all group-hover/stat:text-slate-950 font-display">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1.5 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Premium Executive Analytics Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          {/* Card Frame with ultra-clean borders */}
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-5 shadow-xl backdrop-blur-md overflow-hidden">
            
            {/* Elegant Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest ml-1">
                  EXECUTIVE BRIEFING CONSOLE
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[8px] font-mono font-medium uppercase tracking-wider">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                Integrity Secure
              </div>
            </div>

            {/* Simulated Live Statistical Model & Cost Savings */}
            <div className="space-y-5">
              
              {/* Strategic KPI Blocks */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">REPORTING EFFICIENCY</span>
                  <div className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">92% Saved</div>
                  <span className="text-[8px] font-mono text-emerald-500">Hours Reclaimed</span>
                </div>
                <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">STATISTICAL INTEGRITY</span>
                  <div className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">p &lt; 0.001</div>
                  <span className="text-[8px] font-mono text-executive-blue">Highly Significant</span>
                </div>
              </div>

              {/* Business Process Optimization Area Chart */}
              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[9px] font-mono text-slate-700 uppercase tracking-wider">OPERATIONAL OVERHEAD SAVINGS</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Impact of automated data pipelines & dashboards</p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>

                {/* Highly structured, clean SVG chart */}
                <svg viewBox="0 0 320 120" className="w-full h-24 overflow-visible mt-2">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  
                  {/* Legacy Process Line (Dashed high overhead) */}
                  <path
                    d="M 0 30 L 80 32 L 160 28 L 240 34 L 320 30"
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  
                  {/* Automated Cost Optimization Line (Solid blue descending) */}
                  <motion.path
                    d="M 0 30 L 80 42 L 160 85 L 240 92 L 320 95"
                    fill="none"
                    stroke="rgba(37, 99, 235, 0.85)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  
                  {/* Highlight point of optimized system */}
                  <motion.circle
                    cx="320"
                    cy="95"
                    r="4"
                    fill="#2563eb"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                  />
                </svg>

                {/* Elegant Legends */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-[8px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>Automated Stream Optimization</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-[1px] border-t border-dashed border-slate-400" />
                    <span>Manual Legacy Costs</span>
                  </div>
                </div>
              </div>

              {/* Pipelines Audit Log */}
              <div className="space-y-2 text-[9px] font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>PIPELINE VERIFICATION</span>
                  <span>STATUS</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">PostgreSQL Data Synchronization</span>
                    <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[8px] font-bold border border-emerald-100/50">ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">MSc Statistics Regression Validation</span>
                    <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[8px] font-bold border border-blue-100/50">σ PASSED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Local Maps Visibility Auditing</span>
                    <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[8px] font-bold border border-amber-100/50">+42% DELTA</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle desaturated corner accent */}
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* CV Download Status Toast */}
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 text-slate-800 rounded-xl p-4 shadow-2xl flex items-center gap-3 max-w-sm backdrop-blur-xl"
            role="alert"
          >
            <div className="p-1.5 bg-red-50 text-red-500 rounded-lg">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-900 block">Download Failed</span>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                Unable to start the download. Please try again.
              </p>
            </div>
            <button
              onClick={() => setShowErrorToast(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer self-start p-0.5 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bounce indicators to prompt scroll down */}
      <div 
        className="absolute bottom-6 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
        onClick={() => scrollTo("expertise")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            scrollTo("expertise");
          }
        }}
        aria-label="Scroll down to core expertise section"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase">Explore Ecosystem</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}

