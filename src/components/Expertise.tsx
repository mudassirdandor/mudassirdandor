import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certifications } from "../data/experience";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Bookmark, 
  ChevronRight, 
  Check,
  Workflow
} from "lucide-react";

interface Stage {
  num: number;
  title: string;
  purpose: string;
  activities: string[];
  expectedOutcome: string;
  tools: string[];
  applicationContext?: string;
  applicationNotes?: string;
}

/**
 * Professional expertise and methodologies component.
 * Exhibits a structured 5-stage analytical lifecycle methodology, 
 * alongside Google certifications, credentials, and verify-links.
 */
export default function Expertise({
  showFramework = true,
  showCertifications = true
}: {
  showFramework?: boolean;
  showCertifications?: boolean;
}) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      num: 1,
      title: "Understand the Business Problem",
      purpose: "Define strategic objectives, align with key organizational stakeholders, and clarify exact success metrics.",
      activities: [
        "Gathering stakeholder requirements & business context",
        "Translating complex executive questions into quantitative KPIs",
        "Drafting decision-driven roadmap & clear success objectives"
      ],
      expectedOutcome: "A precisely defined business question and a metric success protocol agreed upon by all stakeholders.",
      tools: ["Stakeholder Interviews", "KPI Architecture Trees", "Requirements Specifications"]
    },
    {
      num: 2,
      title: "Acquire & Prepare Data",
      purpose: "Collect, sanitize, and validate reliable source information from enterprise databases and files.",
      activities: [
        "Writing optimized SQL queries & joining relational views",
        "Data extraction & robust ETL scripting in Python",
        "Rigorous cleaning, deduplication, and anomaly check loops",
        "Validating record completeness & schema alignment"
      ],
      expectedOutcome: "Structured, validated, and fully prepared datasets compiled securely within reliable database nodes.",
      tools: ["PostgreSQL", "SQL Server", "Python (Pandas / NumPy)", "Excel (Power Query / Solver)"]
    },
    {
      num: 3,
      title: "Explore & Analyze",
      purpose: "Identify hidden trends, statistical correlations, and critical anomalies using quantitative methods.",
      activities: [
        "Conducting multi-dimensional Exploratory Data Analysis (EDA)",
        "Formulating statistical hypotheses and probability distributions",
        "Segmenting populations & identifying variance drivers",
        "Analyzing correlation matrices & regression models"
      ],
      expectedOutcome: "An evidence-based understanding of operational dynamics, backed by mathematical validation.",
      tools: ["Statistical Models", "Hypothesis Testing", "Correlation Matrices", "Python Data Science Tools"]
    },
    {
      num: 4,
      title: "Build Business Intelligence",
      purpose: "Synthesize complex findings into high-fidelity, interactive, and easily readable reporting systems.",
      activities: [
        "Designing responsive, executive-facing Power BI dashboards",
        "Configuring optimized DAX calculations & custom metrics",
        "Structuring visual information hierarchy for rapid scanning",
        "Building scheduled automated executive reporting loops"
      ],
      expectedOutcome: "A centralized, single-source-of-truth visual intelligence platform enabling real-time scanning.",
      tools: ["Power BI", "DAX Data Modeling", "Executive KPI Scorecards", "Visual Storytelling Systems"]
    },
    {
      num: 5,
      title: "Recommend Actions",
      purpose: "Convert analytical intelligence into high-impact, low-risk strategic business recommendations.",
      activities: [
        "Formulating risk-assessed, data-backed business suggestions",
        "Highlighting cost-saving & revenue-generating opportunities",
        "Conducting Local Business Intelligence audits to capture geographical advantages"
      ],
      expectedOutcome: "A clear, actionable roadmap targeting key growth areas and mitigating known risk structures.",
      tools: ["Strategic Advisory Docs", "Cost-Benefit Calculations", "Local Business Auditing Suite"],
      applicationContext: "Application Area: Local Business Intelligence",
      applicationNotes: "This stage is actively applied to map local search intent, analyze geographical visibility across Google Maps (Google Business Profile Analytics, Review Sentiment), and capture regional foot-traffic advantages."
    },
    {
      num: 6,
      title: "Automate & Optimize",
      purpose: "Maximize operational speed and reduce manual workload by implementing secure automated workflows.",
      activities: [
        "Configuring AI automation scripts & reporting pipelines",
        "Deploying secure, custom AI Assistants & Agents for content draft tasks",
        "Establishing system-to-system automated data integration triggers"
      ],
      expectedOutcome: "Drastically reduced reporting turnaround times, freeing human resources for higher-level strategic analysis.",
      tools: ["Generative AI Pipelines", "Python API Automation", "Intelligent Agents & Prompts"],
      applicationContext: "Smarter Business Operations (AI Capability)",
      applicationNotes: "AI operates as a companion capability to enhance Business Intelligence—automating high-frequency pipelines and accelerating initial qualitative drafts, never as a replacement for human professional judgment."
    },
    {
      num: 7,
      title: "Measure Business Impact",
      purpose: "Close the decision loop by continuously tracking the performance of implemented choices.",
      activities: [
        "Monitoring post-implementation KPIs & trend lines",
        "Iterating models based on active real-world feedback",
        "Establishing continuous improvement review cycles"
      ],
      expectedOutcome: "A sustainable cycle of continuous growth, validated directly by positive margin shifts.",
      tools: ["KPI Drift Trackers", "Continuous Feedback Loops", "Review & Calibration Intervals"]
    }
  ];

  const activeStage = stages[activeStageIdx];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveStageIdx(index);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveStageIdx((prev) => (prev + 1) % stages.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveStageIdx((prev) => (prev - 1 + stages.length) % stages.length);
    }
  };

  return (
    <section 
      id="expertise" 
      className={`relative py-24 bg-brand-bg-primary text-brand-body px-6 md:px-8 overflow-hidden ${showFramework ? 'border-t border-slate-200' : ''}`}
      aria-label="Decision Intelligence Framework"
    >
      {/* Background desaturated decorative gradients */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {showFramework && (
          <>
        
        {/* Section Header - Editorial, Consultant Vibe */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-executive-blue" />
              <span className="font-mono text-[10px] tracking-widest text-executive-blue uppercase font-semibold">Methodology & Process</span>
            </div>
          }
          title="Decision Intelligence Framework"
          description="A structured approach to transforming business questions into confident, data-driven decisions. I combine statistical discipline with visual dashboards and secure automations to quietly guide complex operational questions to clear, risk-mitigated growth actions."
        />

        {/* Desktop Interactive Layout (7 Connected Stages Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left: Progression Timeline Buttons */}
          <nav 
            className="lg:col-span-5 flex flex-col gap-2 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm"
            aria-label="Framework Stage Selector"
          >
            <div className="px-3 py-1.5 border-b border-slate-100 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Methodology Steps</span>
              <span className="text-[10px] font-mono text-executive-blue font-semibold">Stage {activeStage.num} of 7</span>
            </div>

            {stages.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <button
                  key={stage.num}
                  onClick={() => setActiveStageIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center gap-4 transition-all duration-200 cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none relative group ${
                    isActive 
                      ? "bg-slate-50 text-slate-900 border-l-2 border-executive-blue shadow-xs font-semibold" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                  tabIndex={0}
                >
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded transition-all ${
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "bg-slate-100 text-slate-500 group-hover:text-slate-700"
                  }`}>
                    0{stage.num}
                  </span>
                  
                  <span className="text-xs md:text-sm font-semibold tracking-tight flex-1 min-w-0 truncate">
                    {stage.title}
                  </span>

                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                    isActive ? "translate-x-1 text-executive-blue" : "group-hover:translate-x-0.5"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Right: Active Stage Display Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[460px] flex flex-col justify-between relative shadow-xl overflow-hidden">
            
            {/* Ambient indicator accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.01] rounded-full blur-3xl pointer-events-none" />

            {/* Stage Detailed Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Number & Title */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded">
                    STAGE 0{activeStage.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">McKinsey-Style Alignment</span>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {activeStage.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {activeStage.purpose}
                  </p>
                </div>

                {/* Stage Activities */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Deliverable Activities</span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeStage.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-executive-blue shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Embedded Supporting Tools */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Integrated Core Tools</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStage.tools.map((tool) => (
                      <span key={tool} className="text-[13px] font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlight Context box for Local BI / AI Capability */}
                {activeStage.applicationContext && (
                  <div className="p-4 bg-blue-50/30 border border-blue-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-executive-blue uppercase tracking-wider font-semibold block">
                      {activeStage.applicationContext}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeStage.applicationNotes}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Expected Outcome Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Expected Stage Outcome</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                  {activeStage.expectedOutcome}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Final Methodology Statement Quote */}
        <div className="w-full text-center py-6 border-y border-slate-200 mb-24 max-w-4xl mx-auto">
          <p className="text-sm font-medium text-slate-700 italic tracking-wide">
            "The best business decisions are built on structured thinking, reliable data and continuous improvement."
          </p>
        </div>
          </>
        )}

        {/* Certifications Subsection - Verified Credentials */}
        {showCertifications && (
          <div className={showFramework ? "pt-16 border-t border-slate-200" : ""}>
            <div className="max-w-2xl mb-12">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[10px] tracking-wider text-amber-600 uppercase">Verified Credentials</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Professional Certifications
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Google-certified practitioner representing technical and organizational execution competencies across advanced analytics, intelligence models, and dynamic business systems.
              </p>
            </div>

            {/* Certifications list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => {
                const isHovered = hoveredCert === cert.id;
                return (
                  <div
                    key={cert.id}
                    className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-2xl p-5 relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs"
                    onMouseEnter={() => setHoveredCert(cert.id)}
                    onMouseLeave={() => setHoveredCert(null)}
                  >
                    <div>
                      {/* Header: Year + Issuer */}
                      <div className="flex items-center justify-between text-[10px] font-mono mb-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Bookmark className="w-3.5 h-3.5 text-executive-blue" />
                          {cert.issuer.toUpperCase()} APPROVED
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {cert.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-semibold text-slate-900 tracking-tight mb-3 leading-snug group-hover:text-executive-blue transition-colors">
                        {cert.title}
                      </h4>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cert.skills.map((s) => (
                          <span key={s} className="text-[9px] font-mono px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ID & Link info */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>ID: {cert.credentialId || "N/A"}</span>
                      <span className="flex items-center gap-1 hover:text-slate-800 cursor-pointer transition-colors">
                        Verify Credential
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
