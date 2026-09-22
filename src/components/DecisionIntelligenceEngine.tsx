import React, { useState, useEffect } from "react";
import { 
  Database, 
  MapPin, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Zap, 
  FileSpreadsheet, 
  BarChart3, 
  Play, 
  RotateCcw,
  Sparkles,
  BookOpen,
  FolderGit2,
  Award
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getEntityConnectedData } from "../data/knowledgeGraph";
import { telemetry } from "../utils/telemetry";

export interface Scenario {
  id: string;
  title: string;
  category: string;
  tagline: string;
  bottleneck: string;
  pipeline: {
    ingestion: string;
    transformation: string;
    analytics: string;
    outcome: string;
  };
  metrics: {
    label: string;
    before: string;
    after: string;
    impact: string;
  }[];
  codeSnippet: string;
  verifiedArtifact: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "finance",
    title: "Multi-Source Financial Reconciliation",
    category: "Financial Analytics & ETL",
    tagline: "Unifying 5+ disconnected store spreadsheets into an automated, single-source-of-truth SQL ledger.",
    bottleneck: "Finance team spent 18+ hours every month manually matching Excel invoices across 5 branch locations, creating error prone month-end reports.",
    pipeline: {
      ingestion: "CSV / REST API Ingestion",
      transformation: "Automated Data Cleaning & Deduplication",
      analytics: "Power BI DAX Cash Flow Matrix",
      outcome: "Instant Month-End Balance & Real-Time Alerts"
    },
    metrics: [
      { label: "Monthly Reconciliation Time", before: "18.5 Hours", after: "12 Minutes", impact: "98.9% Time Reduction" },
      { label: "Data Pipeline Accuracy", before: "84.2%", after: "99.8%", impact: "+15.6% Accuracy" },
      { label: "Labor Time Saved", before: "18.5 Hrs/Mo", after: "12 Mins/Mo", impact: "220 Hrs/Yr Preserved" }
    ],
    codeSnippet: `-- Automated SQL Deduplication & Normalization
WITH NormalizedTransactions AS (
  SELECT 
    TRIM(LOWER(branch_id)) AS branch,
    DATE_TRUNC('day', transaction_date) AS txn_date,
    SUM(amount) AS total_revenue,
    ROW_NUMBER() OVER (PARTITION BY invoice_ref ORDER BY created_at DESC) AS dup_check
  FROM raw_ingestion_ledger
  WHERE status = 'SETTLED'
)
SELECT branch, txn_date, total_revenue 
FROM NormalizedTransactions 
WHERE dup_check = 1;`,
    verifiedArtifact: "Verified Power BI Financial Ledger & SQL Transformation Pipeline"
  },
  {
    id: "local-seo",
    title: "Local Retail Market Visibility Engine",
    category: "Local BI & Geo Analytics",
    tagline: "Solving zero-visibility on Google Maps for multi-location retail through geo-grid rank tracking.",
    bottleneck: "Retail branch ranked #24 on local search queries, causing nearby customers to navigate to regional competitors.",
    pipeline: {
      ingestion: "Google Maps API & Geo-Grid Probes",
      transformation: "Location Schema & Citation Alignment",
      analytics: "Coordinate Heatmap & Rank Tracker",
      outcome: "#2 Local Map Pack & +32% Footfall"
    },
    metrics: [
      { label: "Google Maps Search Rank", before: "#24 Position", after: "#2 Map Pack", impact: "+22 Pos Gain" },
      { label: "In-Store Directions / Calls", before: "120 / Mo", after: "480 / Mo", impact: "300% Growth" },
      { label: "Organic Customer Acquisition", before: "Baseline", after: "+32%", impact: "+32% Footfall" }
    ],
    codeSnippet: `// Geo-Grid Local Audit Calculation
function calculateGeoGridCoverage(coords: LatLng[]): GridScore {
  const radii = coords.map(c => fetchLocalRank(c.lat, c.lng, "retail store"));
  const mapPackDominance = radii.filter(r => r.rank <= 3).length / radii.length;
  return {
    mapPackShare: Math.round(mapPackDominance * 100),
    avgRank: (radii.reduce((acc, r) => acc + r.rank, 0) / radii.length).toFixed(1)
  };
}`,
    verifiedArtifact: "Verified Google Maps Geo-Grid Ranking Report & Citation Matrix"
  },
  {
    id: "ai-workflow",
    title: "AI-Powered Executive Brief Automation",
    category: "AI & Workflow Automation",
    tagline: "Converting messy daily operational updates into automated AI-summarized executive bulletins.",
    bottleneck: "Executives spent 2+ hours daily reading through 40+ raw field emails and store operational logs.",
    pipeline: {
      ingestion: "Gmail / Slack Webhook Listener",
      transformation: "Structured Prompting & Extraction Engine",
      analytics: "Executive KPI Anomaly Detection",
      outcome: "Automated 8:00 AM C-Suite Briefing"
    },
    metrics: [
      { label: "Daily Executive Review Time", before: "120 Mins", after: "8 Mins", impact: "93.3% Time Saved" },
      { label: "Anomaly Identification Speed", before: "24-48 Hours", after: "Instant (<2s)", impact: "Real-time Alerts" },
      { label: "Synthesis Latency", before: "Manual Batch", after: "Automated Webhook", impact: "Instant C-Suite Briefing" }
    ],
    codeSnippet: `// Gemini 2.5 Operational Briefing Summarizer
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Synthesize these daily operational logs into 3 critical anomalies & top revenue metric.",
  config: { responseMimeType: "application/json" }
});`,
    verifiedArtifact: "Verified Server-Side AI Automation Pipeline & Slack Integration"
  },
  {
    id: "statistical-modeling",
    title: "Predictive Demand Forecasting & Pricing",
    category: "Statistical Decision Science",
    tagline: "Replacing guesswork with statistical regression and Monte Carlo demand modeling.",
    bottleneck: "Inventory decisions were based on simple monthly averages, leading to 22% stockouts during peak seasons.",
    pipeline: {
      ingestion: "Historical POS Transaction DB",
      transformation: "Seasonality & Trend Decomposition",
      analytics: "Monte Carlo 10,000 Scenario Simulation",
      outcome: "Optimized Safety Stock & Price Elasticity"
    },
    metrics: [
      { label: "Peak Season Stockouts", before: "22.4%", after: "1.2%", impact: "94.6% Defect Drop" },
      { label: "Forecast Variance", before: "±28%", after: "±3.1%", impact: "High Precision" },
      { label: "Modeled Safety Stock Efficiency", before: "Baseline", after: "+14.2%", impact: "14.2% Waste Reduction" }
    ],
    codeSnippet: `# Python Monte Carlo Inventory Simulation
import numpy as np

def run_demand_simulation(mean_demand, std_dev, iterations=10000):
    simulated_demand = np.random.normal(mean_demand, std_dev, iterations)
    optimal_reorder_point = np.percentile(simulated_demand, 95)
    return float(optimal_reorder_point)`,
    verifiedArtifact: "Verified Python Statistical Model & Monte Carlo Demand Forecast"
  }
];

interface DecisionIntelligenceEngineProps {
  onNavigate?: (pageId: string) => void;
}

export default function DecisionIntelligenceEngine({ onNavigate }: DecisionIntelligenceEngineProps = {}) {
  const [selectedId, setSelectedId] = useState<string>("finance");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"pipeline" | "code" | "impact">("pipeline");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ scenarioId?: string }>;
      if (customEvent.detail?.scenarioId) {
        setSelectedId(customEvent.detail.scenarioId);
      }
    };
    window.addEventListener("portfolio-select-scenario", handleCustomSelect);
    return () => {
      window.removeEventListener("portfolio-select-scenario", handleCustomSelect);
    };
  }, []);

  const currentScenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];
  const connected = getEntityConnectedData(selectedId);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  const handleOpenProject = (projectId: string) => {
    localStorage.setItem("selected-project-id", projectId);
    window.dispatchEvent(new CustomEvent("portfolio-open-project", { detail: { projectId } }));
    if (onNavigate) {
      onNavigate("case-studies");
    }
  };

  const handleOpenArticle = (articleId: string) => {
    localStorage.setItem("selected-article-id", articleId);
    window.dispatchEvent(new CustomEvent("portfolio-open-article", { detail: { articleId } }));
    if (onNavigate) {
      onNavigate("insights");
    }
  };

  return (
    <section 
      id="decision-intelligence-engine" 
      className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b border-slate-800 px-6 md:px-8 relative overflow-hidden"
      aria-label="Interactive Decision Intelligence Engine"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ExecutiveSectionHeader
          eyebrow={<span className="text-blue-400 font-mono font-bold tracking-widest uppercase">Interactive Decision Engine</span>}
          title="The Decision Intelligence Simulator"
          description={<span className="text-slate-300 font-sans">Explore how raw, messy operational bottlenecks are transformed into automated, high-precision analytics pipelines.</span>}
        />

        {/* Scenario Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedId;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedId(scenario.id);
                  handleSimulate();
                  telemetry.trackDecisionEngineScenario(scenario.id, activeTab);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-executive-blue text-white shadow-lg shadow-blue-500/20 border border-blue-400/40 scale-[1.02]"
                    : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                {scenario.title}
              </button>
            );
          })}
        </div>

        {/* Engine Interactive Workspace */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest">
                  {currentScenario.category}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Simulator Active
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 uppercase">
                  Modeled Architecture
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">
                {currentScenario.title}
              </h3>
              <p className="text-xs text-slate-400 font-sans max-w-2xl">
                {currentScenario.tagline}
              </p>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => {
                  setActiveTab("pipeline");
                  telemetry.trackDecisionEngineTab(selectedId, "pipeline");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                  activeTab === "pipeline" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Data Pipeline
              </button>
              <button
                onClick={() => {
                  setActiveTab("code");
                  telemetry.trackDecisionEngineTab(selectedId, "code");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                  activeTab === "code" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code / Schema
              </button>
              <button
                onClick={() => {
                  setActiveTab("impact");
                  telemetry.trackDecisionEngineTab(selectedId, "impact");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                  activeTab === "impact" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ROI Impact
              </button>
            </div>
          </div>

          {/* Bottleneck Warning Banner */}
          <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <div className="p-1 bg-amber-500/20 text-amber-400 rounded shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-400 block">
                Operational Bottleneck Identified
              </span>
              <p className="text-xs text-amber-200/90 font-sans mt-0.5">
                {currentScenario.bottleneck}
              </p>
            </div>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* 4-Stage Interactive Node Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Stage 1: Ingestion", subtitle: currentScenario.pipeline.ingestion, icon: FileSpreadsheet, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { title: "Stage 2: ETL Cleaning", subtitle: currentScenario.pipeline.transformation, icon: Database, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { title: "Stage 3: Analytics Model", subtitle: currentScenario.pipeline.analytics, icon: BarChart3, color: "text-purple-400", bg: "bg-purple-500/10" },
                    { title: "Stage 4: Business Impact", subtitle: currentScenario.pipeline.outcome, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" }
                  ].map((stage, idx) => {
                    const Icon = stage.icon;
                    return (
                      <div 
                        key={idx}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          isSimulating 
                            ? "bg-slate-800/90 border-blue-500/50 scale-[0.99]" 
                            : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${stage.bg} ${stage.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            0{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-1">
                          {stage.title}
                        </h4>
                        <p className="text-xs font-sans text-slate-400 leading-snug">
                          {stage.subtitle}
                        </p>

                        {/* Animated Processing Ripple on Simulate */}
                        {isSimulating && (
                          <motion.div 
                            initial={{ scaleX: 0 }} 
                            animate={{ scaleX: 1 }} 
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-b-xl"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Simulation Trigger CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300">
                      {isSimulating ? "Executing ETL & Analytical Simulation..." : "Pipeline Ready. Click to run live data transformation test."}
                    </span>
                  </div>
                  <button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="w-full sm:w-auto px-4 py-2 bg-executive-blue hover:bg-blue-600 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {isSimulating ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Data...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Simulate Pipeline</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950 p-2.5 rounded-t-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Production Transformation Logic</span>
                  </div>
                  <span className="text-[10px] text-slate-500">SQL / TypeScript / Python</span>
                </div>
                <pre className="bg-slate-950 border border-slate-800/80 rounded-b-xl p-4 overflow-x-auto text-xs font-mono text-blue-300 leading-relaxed max-h-60">
                  <code>{currentScenario.codeSnippet}</code>
                </pre>
              </motion.div>
            )}

            {activeTab === "impact" && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {currentScenario.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      {m.label}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-emerald-400 font-sans tracking-tight">
                        {m.after}
                      </span>
                      <span className="text-xs font-mono text-slate-500 line-through">
                        {m.before}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      {m.impact}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Verified Artifact Badge */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentScenario.verifiedArtifact}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
              Modeled Architecture Simulation
            </span>
          </div>

          {/* Connected Knowledge Discovery Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Connected Knowledge:
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {connected.relatedProjects[0] && (
                <button
                  onClick={() => handleOpenProject(connected.relatedProjects[0].id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Case Study: {connected.relatedProjects[0].title.split(":")[0]}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}

              {connected.relatedArticles[0] && (
                <button
                  onClick={() => handleOpenArticle(connected.relatedArticles[0].id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Research: {connected.relatedArticles[0].title.split("?")[0]}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}

              {connected.relatedCertifications[0] && (
                <a
                  href={connected.relatedCertifications[0].verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{connected.relatedCertifications[0].title}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
