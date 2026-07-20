import React from "react";
import { Link2, Database, BarChart3, Bot, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getContainerVariants, getChildVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveCard from "./ExecutiveCard";

export default function HowIWork() {
  const shouldReduceMotion = useReducedMotion();
  const container = getContainerVariants();
  const child = getChildVariants("upward", shouldReduceMotion);

  const steps = [
    {
      num: "01",
      icon: <Link2 className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 1: Gather",
      title: "Connect & Audit",
      desc: "We audit your spreadsheets, databases, and files to map out a single, secure, and error-free data pipeline.",
      outcome: "Clear Project Scope"
    },
    {
      num: "02",
      icon: <Database className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 2: Organize",
      title: "Clean & Organize",
      desc: "We structure, validate, and standardize scattered records into a clean, query-ready unified data model.",
      outcome: "Clean & Reliable Data"
    },
    {
      num: "03",
      icon: <BarChart3 className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 3: Visualize",
      title: "Build Insights",
      desc: "We design focused, interactive dashboard views displaying only the exact, actionable metrics you need to lead.",
      outcome: "Decision-Ready Dashboards"
    },
    {
      num: "04",
      icon: <Bot className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 4: Automate",
      title: "Automate Workflows",
      desc: "We build lightweight, reliable scripts to automate manual report formatting, database updates, and team alerts.",
      outcome: "Hours Saved Every Week"
    },
    {
      num: "05",
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
      category: "Phase 5: Support",
      title: "Deliver & Support",
      desc: "We transition complete tool ownership with direct personal support and clear visual training documentation.",
      outcome: "Smooth Team Adoption"
    }
  ];

  return (
    <section 
      id="how-i-work" 
      className="py-20 bg-white border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Execution Methodology"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="How We Partner"
          title="My Step-by-Step Working Process"
          description="How I help you go from messy, scattered spreadsheets to clean, automated tools in five simple phases."
        />

        {/* Compact Connected Process Roadmap */}
        <div className="relative max-w-7xl mx-auto mt-12">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[20px] left-[10%] right-[10%] h-[1px] bg-slate-200 pointer-events-none" />
          
          {/* Vertical connecting line on mobile/tablet */}
          <div className="block lg:hidden absolute left-[20px] top-[20px] bottom-[20px] w-[1px] bg-slate-200 pointer-events-none" />

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-5"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
          >
            {steps.map((step) => (
              <motion.div 
                key={step.num} 
                variants={child}
                className="relative flex flex-row lg:flex-col items-start gap-4 lg:gap-0 lg:space-y-4 w-full group"
              >
                {/* Step Circle Indicator */}
                <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[13px] font-mono font-bold text-executive-blue group-hover:border-executive-blue transition-colors duration-200 shadow-3xs">
                  {step.num}
                </div>

                {/* Card Body */}
                <ExecutiveCard
                  level={1}
                  className="w-full flex-1"
                  interactive={true}
                >
                  <div className="p-5 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="p-1 bg-slate-50 border border-slate-150 rounded text-slate-500">
                          {step.icon}
                        </div>
                        <span className="text-[10px] font-mono text-executive-blue uppercase tracking-widest font-bold">
                          {step.category}
                        </span>
                      </div>
                      
                      <h3 className="text-[15px] font-bold text-slate-950 font-sans tracking-tight mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      
                      <p className="text-[13px] text-slate-600 leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>

                    {/* Outcome Badge */}
                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-sans font-bold text-emerald-700">
                      <span className="shrink-0 text-emerald-600">✓</span>
                      <span className="tracking-wide uppercase text-[10px] whitespace-normal leading-none">{step.outcome}</span>
                    </div>
                  </div>
                </ExecutiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

