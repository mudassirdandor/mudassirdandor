import React, { useState } from "react";
import { Link2, Database, BarChart3, Bot, CheckCircle, ChevronRight, Sparkles, Clock, FileCheck } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getContainerVariants, getChildVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveCard from "./ExecutiveCard";

export default function HowIWork() {
  const [activeStep, setActiveStep] = useState(0);
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
      outcome: "Clear Project Scope",
      details: {
        timeframe: "Days 1–3",
        deliverable: "System Audit Matrix & Pipeline Roadmap",
        artifacts: ["Data Lineage Map", "Security & Access Brief", "API/Database Connection Specs"],
        clientInvestment: "1–2 Hours (Discovery Call & Access Handshake)"
      }
    },
    {
      num: "02",
      icon: <Database className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 2: Organize",
      title: "Clean & Organize",
      desc: "We structure, validate, and standardize scattered records into a clean, query-ready unified data model.",
      outcome: "Clean & Reliable Data",
      details: {
        timeframe: "Days 4–8",
        deliverable: "Unified Relational Schema & Clean Data Model",
        artifacts: ["SQL/ETL Transformation Scripts", "Data Quality & Anomaly Checks", "Staging Database Tables"],
        clientInvestment: "30 Mins (Data Sample Verification)"
      }
    },
    {
      num: "03",
      icon: <BarChart3 className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 3: Visualize",
      title: "Build Insights",
      desc: "We design focused, interactive dashboard views displaying only the exact, actionable metrics you need to lead.",
      outcome: "Decision-Ready Dashboards",
      details: {
        timeframe: "Days 9–14",
        deliverable: "Interactive Power BI / Web Dashboard Suite",
        artifacts: ["DAX Measure Library", "Responsive Mobile/Desktop Views", "Executive KPI Scorecards"],
        clientInvestment: "1 Hour (Prototype Review & Refinement)"
      }
    },
    {
      num: "04",
      icon: <Bot className="w-3.5 h-3.5 text-executive-blue" />,
      category: "Phase 4: Automate",
      title: "Automate Workflows",
      desc: "We build lightweight, reliable scripts to automate manual report formatting, database updates, and team alerts.",
      outcome: "Hours Saved Every Week",
      details: {
        timeframe: "Days 15–18",
        deliverable: "Automated Data Refresh & AI Alert Pipelines",
        artifacts: ["Cron Refresh Scripts", "Slack/Email Alert Triggers", "LLM Prompt Summarizers"],
        clientInvestment: "30 Mins (Automation Acceptance Test)"
      }
    },
    {
      num: "05",
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
      category: "Phase 5: Support",
      title: "Deliver & Support",
      desc: "We transition complete tool ownership with direct personal support and clear visual training documentation.",
      outcome: "Smooth Team Adoption",
      details: {
        timeframe: "Days 19–21",
        deliverable: "Turnkey System Handover & Staff Training",
        artifacts: ["Loom Video SOPs", "Technical Maintenance Guide", "30-Day Post-Launch Support"],
        clientInvestment: "1 Hour (Handover & Team Walkthrough)"
      }
    }
  ];

  const currentStep = steps[activeStep];

  return (
    <section 
      id="how-i-work" 
      className="py-16 md:py-20 bg-white border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Execution Methodology"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="How We Partner"
          title="My Step-by-Step Working Process"
          description="How I help you go from messy, scattered spreadsheets to clean, automated tools in five simple phases. Select any step to view details."
        />

        {/* Compact Connected Process Roadmap */}
        <div className="relative max-w-7xl mx-auto mt-8 md:mt-10">
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
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.div 
                  key={step.num} 
                  variants={child}
                  className="relative flex flex-row lg:flex-col items-start gap-4 lg:gap-0 lg:space-y-4 w-full group cursor-pointer"
                  onClick={() => setActiveStep(idx)}
                >
                  {/* Step Circle Indicator */}
                  <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-[13px] font-mono font-bold transition-all duration-200 shadow-3xs ${
                    isSelected
                      ? "bg-executive-blue border-executive-blue text-white ring-4 ring-blue-500/15"
                      : "bg-white border-slate-200 text-executive-blue group-hover:border-executive-blue"
                  }`}>
                    {step.num}
                  </div>

                  {/* Card Body */}
                  <ExecutiveCard
                    level={isSelected ? 2 : 1}
                    className={`w-full flex-1 transition-all duration-200 ${
                      isSelected ? "ring-2 ring-executive-blue/20 bg-blue-50/20" : ""
                    }`}
                    interactive={true}
                  >
                    <div className="p-5 flex flex-col justify-between h-full w-full">
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="p-1 bg-slate-50 border border-slate-150 rounded text-slate-500">
                              {step.icon}
                            </div>
                            <span className="text-[10px] font-mono text-executive-blue uppercase tracking-widest font-bold">
                              {step.category}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="text-[9px] font-mono font-bold text-executive-blue bg-blue-100/80 px-1.5 py-0.5 rounded">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-[15px] font-bold text-slate-950 font-sans tracking-tight mb-1.5 leading-snug">
                          {step.title}
                        </h3>
                        
                        <p className="text-[13px] text-slate-600 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>

                      {/* Outcome Badge */}
                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans font-bold text-emerald-700">
                        <div className="flex items-center gap-1.5">
                          <span className="shrink-0 text-emerald-600">✓</span>
                          <span className="tracking-wide uppercase text-[10px] whitespace-normal leading-none">{step.outcome}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSelected ? "rotate-90 text-executive-blue" : ""}`} />
                      </div>
                    </div>
                  </ExecutiveCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Interactive Phase Detail Breakdown Panel (Progressive Disclosure) */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-7 shadow-2xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.num}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Left Column: Phase Header & Timeframe */}
                <div className="md:col-span-5 space-y-3 border-b md:border-b-0 md:border-r border-slate-200/80 pb-5 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-white bg-executive-blue px-2 py-0.5 rounded uppercase tracking-wider">
                      PHASE {currentStep.num} DEEP DIVE
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {currentStep.details.timeframe}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 font-sans tracking-tight leading-snug">
                    {currentStep.title}: {currentStep.details.deliverable}
                  </h4>

                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
                      Client Involvement Expected
                    </span>
                    <p className="text-xs font-medium text-slate-700 font-sans">
                      {currentStep.details.clientInvestment}
                    </p>
                  </div>
                </div>

                {/* Right Column: Key Deliverables & Artifacts */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-executive-blue" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                      Tangible Deliverables & System Artifacts
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentStep.details.artifacts.map((artifact, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-start gap-2 shadow-3xs hover:border-blue-200 transition-colors"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-800 font-sans leading-tight">
                          {artifact}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11.5px] text-slate-500 font-sans pt-1">
                    💡 Click any phase card above (01–05) to explore deliverables for that specific stage.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


