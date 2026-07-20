import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { 
  Cpu, 
  FileText, 
  Database, 
  TrendingUp, 
  Terminal, 
  BookOpen, 
  Layers, 
  Lock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Play,
  RotateCw,
  AlertTriangle,
  FileCode,
  Sparkles
} from "lucide-react";

interface WorkflowItem {
  id: string;
  title: string;
  purpose: string;
  icon: React.ComponentType<{ className?: string }>;
  capabilities: string[];
  challenge: string;
  aiContribution: string;
  humanResponsibility: string;
  businessValue: string;
  supportingTech: string[];
  demoTitle: string;
  demoType: "text" | "code" | "table";
  demoContent: string;
  runActionLabel: string;
  simulatedTerminalOutput: string;
}

const workflows: WorkflowItem[] = [
  {
    id: "reporting",
    title: "Executive Reporting Assistant",
    purpose: "Automate repetitive reporting while preserving analyst review.",
    icon: FileText,
    capabilities: [
      "Generate executive summaries",
      "Draft business observations",
      "Highlight KPI changes",
      "Suggest discussion points"
    ],
    challenge: "Analysts spend up to 15 hours monthly copying KPI changes into text-heavy briefings, slowing down executive decision cycles and introducing formatting inconsistencies.",
    aiContribution: "Instantly digests raw transactional tables and dashboard metrics to generate draft observations and structured bullet-point executive briefs.",
    humanResponsibility: "Verify data accuracy, adjust tone to fit regional operational contexts, sign off on strategic recommendations, and present the final brief.",
    businessValue: "Reduces drafting cycles by 70%, allowing leadership to receive intelligence hours after data is refreshed instead of days.",
    supportingTech: ["Gemini API", "Python", "Google Workspace", "Power BI"],
    demoTitle: "Draft Executive Brief Preview (Awaiting Analyst Review)",
    demoType: "text",
    demoContent: `**OPERATIONAL UPDATE: Q3 NORTH REGION SALES PERFORMANCE**\n\n• **Revenue Performance:** Total gross revenue reached $1.24M (+8.2% MoM), driven primarily by SKU-904 pricing adjustments implemented on June 15th.\n• **Margin Compression:** Gross margin fell by 120bps due to a 4.1% increase in freight costs.\n• **KPI Deviation Warning:** Direct sales channel conversion dropped from 4.2% to 3.8%.\n• **Suggested Discussion Point:** Investigate whether recent competitor promotional campaigns in the Midwest district are cannibalizing standard catalog pricing.`,
    runActionLabel: "Draft Executive Brief PDF",
    simulatedTerminalOutput: `[SYSTEM_INIT] Initializing Google GenAI Client with process.env.GEMINI_API_KEY...
[DB_QUERY] Extracting raw Sales records for fiscal Q3... Done. (12,482 records)
[PROMPT_TEMPLATE] Loading executive text-heavy brief styling rules...
[LLM_CALL] Querying Gemini-2.5-Flash model with structured parameters...
[GENERATION_SUCCESS] Output drafted with 100% mathematical integrity.
--------------------------------------------------------------------------------
DRAFT COMPILED: "Q3_North_Region_Executive_Brief.pdf"
Ready for Analyst Review & Manual Sign-off.`
  },
  {
    id: "quality",
    title: "Data Quality Assistant",
    purpose: "Improve data reliability and database integrity.",
    icon: Database,
    capabilities: [
      "Identify missing values",
      "Detect inconsistencies",
      "Recommend cleaning steps",
      "Validate schema structure"
    ],
    challenge: "Inconsistent data formats, null values, and duplicate customer identifiers in legacy ERP tables cause false trends and reporting errors.",
    aiContribution: "Scans raw columns, identifies structural outliers, highlights data-type discrepancies, and automatically drafts sanitization scripts.",
    humanResponsibility: "Configure boundary validation constraints, approve outlier overrides, and authorize database merge procedures.",
    businessValue: "Accelerates pipeline preparation, guarantees a single source of truth, and eliminates dashboard-level calculation errors.",
    supportingTech: ["Python", "Pandas", "SQL", "GitHub"],
    demoTitle: "Database Integrity & Anomaly Analysis Log",
    demoType: "table",
    demoContent: `[\n  { "column": "customer_id", "issue": "Format Mismatch (32 records)", "severity": "Medium", "remediation": "Cast to standard VARCHAR(10)" },\n  { "column": "unit_price", "issue": "Negative Value Outliers (4 records)", "severity": "High", "remediation": "Audit transactional log for manual rebates" },\n  { "column": "shipping_date", "issue": "Null Values (128 records)", "severity": "High", "remediation": "Impute using carrier delivery timestamp" },\n  { "column": "email", "issue": "Duplicate Identifiers (15 cases)", "severity": "Low", "remediation": "Apply logical GROUP BY matching criteria" }\n]`,
    runActionLabel: "Run Python Outlier Scan",
    simulatedTerminalOutput: `[PYTHON] Executing outlier detection algorithm: pandas_anomaly_scanner.py...
[SCAN] Reading relational PostgreSQL rows: 242,500 rows...
[ISOLATION_FOREST] Running multivariate outlier search...
[ANOMALY_FOUND] 4 records returned unit_price values < $0.00.
[ANOMALY_FOUND] 128 records returned null shipping_date entries.
[SCRIPT] Draft SQL remediation script saved to: /migrations/rollback_safe.sql
--------------------------------------------------------------------------------
Scan complete. Anomaly logs saved to JSON output. Quality verification complete.`
  },
  {
    id: "insights",
    title: "Business Insights Assistant",
    purpose: "Accelerate exploratory analysis and hypothesis generation.",
    icon: TrendingUp,
    capabilities: [
      "Suggest multivariate trends",
      "Identify multidimensional anomalies",
      "Recommend additional investigations",
      "Generate business hypotheses"
    ],
    challenge: "Navigating hundreds of business variables manually limits the depth of exploratory analysis, often leaving critical margin-leaking patterns hidden.",
    aiContribution: "Applies rapid statistical passes over clean tables, pinpointing unexpected correlations and clustering anomalies to suggest exploratory avenues.",
    humanResponsibility: "Isolate external variables, validate correlation-versus-causation patterns, and design target business experiments to test suggested hypotheses.",
    businessValue: "Transforms raw database searching into guided hypothesis testing, accelerating diagnostic timelines from weeks to hours.",
    supportingTech: ["Python", "Gemini API", "SciPy", "Power BI"],
    demoTitle: "Generated Business Hypotheses & Explanations",
    demoType: "text",
    demoContent: `**AUTOMATED DISCOVERY BRIEF**\n\n• **Anomaly Alpha:** Clinic reviews dropped 18% during weeks where triage-to-treatment wait-times exceeded 42 minutes. Correlation coefficient: -0.74.\n• **Hypothesis 1:** Adjusting nursing staff lunch rotations to overlap with peak 11:30 AM drop-offs could reduce bottleneck occurrences by 22%.\n• **Investigation Path:** Map historical phone queue abandonment rates against emergency waiting room capacity peaks over the past 90 days.`,
    runActionLabel: "Generate Hypotheses",
    simulatedTerminalOutput: `[STAT_ENGINE] Starting SciPy correlation pass across CRM and reviews databases...
[CORRELATION] Found high negative correlation (-0.74) wait_time -> csat_rating.
[CLUSTERING] Unsupervised K-Means clustering highlights Monday morning bottleneck peaks.
[GEMINI] Generating structured strategic hypotheses...
--------------------------------------------------------------------------------
Hypothesis report generated successfully.
Ready for Human Analyst validation and control testing.`
  },
  {
    id: "sql",
    title: "SQL Productivity Assistant",
    purpose: "Increase analyst query velocity and database productivity.",
    icon: Terminal,
    capabilities: [
      "Generate optimized SQL drafts",
      "Explain nested queries",
      "Optimize join indices",
      "Document transactional logic"
    ],
    challenge: "Hand-crafting complex multi-table JOINs, window functions, and CTE query streams for one-off business requests consumes significant analyst time.",
    aiContribution: "Translates high-level logical requests into structured, syntactically accurate, and annotated SQL drafts aligned with target database types.",
    humanResponsibility: "Audit partition strategies, test index behaviors on staging servers, verify query execution costs, and integrate queries into production repositories.",
    businessValue: "Increases query velocity by 60%, maintaining strict query optimization standards across enterprise reporting layers.",
    supportingTech: ["SQL", "PostgreSQL", "GitHub", "Gemini API"],
    demoTitle: "Draft SQL Query Architecture (Optimized CTE Blueprint)",
    demoType: "code",
    demoContent: `-- OBJECTIVE: Calculate rolling 30-day customer churn indicators\nWITH MonthlyActivity AS (\n  SELECT \n    user_id,\n    DATE_TRUNC('month', activity_timestamp) AS active_month,\n    COUNT(activity_id) AS total_events\n  FROM user_activity_log\n  GROUP BY 1, 2\n),\nChurnMarkers AS (\n  SELECT \n    user_id,\n    active_month,\n    total_events,\n    LAG(total_events) OVER (PARTITION BY user_id ORDER BY active_month) AS prev_events\n  FROM MonthlyActivity\n)\nSELECT \n  user_id,\n  active_month,\n  total_events,\n  prev_events,\n  ((total_events - prev_events) / NULLIF(prev_events, 0)::float) * 100 AS mom_change_pct\nFROM ChurnMarkers\nWHERE total_events < (prev_events * 0.5) -- High flight-risk threshold`,
    runActionLabel: "Draft CTE Query SQL",
    simulatedTerminalOutput: `[SQL_GENERATOR] Parsing schema guidelines: user_activity_log and subscriptions...
[CONSTRAINTS] Adhering to PostgreSQL dialect and CTE syntax boundaries.
[WINDOW_FUNCTION] Computing LAG partitioned by user_id to find event differentials.
--------------------------------------------------------------------------------
SQL DRAFT GENERATED.
Estimated query cost: 0.12 (Index Scan optimized).
Ready for local staging database deployment and profiling.`
  },
  {
    id: "dashboards",
    title: "Dashboard Intelligence",
    purpose: "Improve operational dashboard interpretation and visual context.",
    icon: Layers,
    capabilities: [
      "Explain complex visual KPIs",
      "Generate real-time executive narratives",
      "Highlight operational deviations",
      "Recommend proactive follow-up analysis"
    ],
    challenge: "Executives frequently look at dynamic dashboard grids but struggle to synthesize the cross-metric causes behind major changes.",
    aiContribution: "Pairs visual charts with automated, contextual annotations that detail exactly which metrics shifted and what triggered the change.",
    humanResponsibility: "Determine business action targets, authorize budget allocations based on insights, and direct regional operational teams.",
    businessValue: "Ensures charts provide instant context, removing the risk of visual misinterpretation or delayed strategic adjustments.",
    supportingTech: ["Power BI", "DAX", "Python", "Google Workspace"],
    demoTitle: "Interactive Narrative Overlay Preview",
    demoType: "text",
    demoContent: `**CONTEXTUAL DASHBOARD METRIC EXPLANATION**\n\n• **Performance State:** Conversion targets are met (+14%), but overall operational margins are down (-2.4%).\n• **Primary Driver:** The increase in average freight lane transit times (+3.1 days) forced higher regional inventory carrying costs.\n• **Recommeded Action:** Cross-reference regional warehousing schedules with carrier SLA compliance views to identify backup logistics partners.`,
    runActionLabel: "Compile Narrative Overlay",
    simulatedTerminalOutput: `[DASHBOARD_OBSERVER] Intercepting current metric values: conversion=114%, margin=97.6%
[ANALYST_MODEL] Analyzing joint variance vectors...
[INTERPRETATION] Revenue conversion increase isolated to SKU-904. Freight delays noted.
[COMPILE] Drafting executive text overlay...
--------------------------------------------------------------------------------
Text-heavy dashboard narrative generated.
Ready to be overlaid as dynamic context on live report visuals.`
  },
  {
    id: "knowledge",
    title: "Knowledge Assistant",
    purpose: "Organize analytical knowledge, processes, and reusable frameworks.",
    icon: BookOpen,
    capabilities: [
      "Document methodologies",
      "Maintain strict analytical standards",
      "Store reusable workflow code",
      "Support continuous analyst learning"
    ],
    challenge: "Valuable query snippets, modeling scripts, and business definitions are scattered across drives, leading to siloed logic and redundant work.",
    aiContribution: "Assists in compiling project methodologies, structuring clean documentation files, and organizing technical snippets into centralized, easily indexed search files.",
    humanResponsibility: "Validate methodology accuracy, review data governance policies, and update core organizational guidelines.",
    businessValue: "Protects analytical capital, accelerates onboarding timelines, and enforces unified business logic across the team.",
    supportingTech: ["GitHub", "Google Workspace", "Markdown", "Python"],
    demoTitle: "Standard Operating Procedure (SOP) Template Draft",
    demoType: "text",
    demoContent: `# SOP-BI-04: TRANSACTIONAL SCHEMA CHANGE COMPLIANCE\n\n1. **Schema Check:** Run a full structural test comparing local development tables with target staging tables.\n2. **Backward Compatibility:** Ensure all downstream Power BI reports referencing altered columns are identified via schema logs.\n3. **Rollback Definition:** Always write a corresponding downgrade SQL script prior to production deployment.\n4. **Approval Loop:** Analyst sign-off is mandatory before merging database migration PRs.`,
    runActionLabel: "Draft SOP Markdown",
    simulatedTerminalOutput: `[SOP_BUILDER] Loading BI-04 governance policy variables...
[MARKDOWN_ENGINE] Formatting compliance steps according to strict ISO-27001...
--------------------------------------------------------------------------------
SOP draft formatted successfully. Saved to repository as: SOP-BI-04.md`
  }
];

const principles = [
  {
    title: "Human Judgment First",
    description: "Artificial intelligence processes numbers, but human context guides decisions. Mudassir treats all automated output as initial drafts requiring technical and business validation."
  },
  {
    title: "Enabling—Not Replacing",
    description: "AI is used to offload repetitive tasks like schema structure validation and initial drafting, allowing the analyst to dedicate deep focus to high-impact strategy."
  },
  {
    title: "Context-Driven Guardrails",
    description: "Every automated system requires narrow guidelines. Models operate only on safe, verified, and structured inputs with clear logical boundaries."
  },
  {
    title: "Continuous Verification",
    description: "All SQL queries, data models, and business brief templates are reviewed by human eyes. There is zero room for hallucinated or unverified data in business decisions."
  },
  {
    title: "Data Ethics & Privacy",
    description: "Client transactions, health records, and corporate ledgers are handled strictly inside secure local environments. No sensitive data is leaked or used to train public algorithms."
  },
  {
    title: "Methods Transparency",
    description: "A business decision must be auditable. The pipeline from raw SQL columns to automated Python scripts and charts is documented to build solid organizational trust."
  }
];

export default function AIAutomation() {
  const [activeWorkflowId, setActiveWorkflowId] = useState("reporting");
  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId) || workflows[0];

  // Simulator State: Terminal interactive logging
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string>("Workspace Ready. Press 'RUN ACTION SIMULATOR' to witness real-world automated pipelines.");
  const [schemaErrorToggle, setSchemaErrorToggle] = useState(false);

  const triggerWorkflowSimulation = () => {
    setIsRunningSim(true);
    setTerminalLog(`[INIT] Accessing localized sandbox instance...\n[WORKFLOW] Launching assistant workflow: ${activeWorkflow.title}\n[COMPUTING] Shuttling clean tables across analytical boundaries...\n\n`);
    
    setTimeout(() => {
      let finalOutput = activeWorkflow.simulatedTerminalOutput;
      if (schemaErrorToggle) {
        finalOutput = `[CRITICAL_WARN] Schema discrepancy detected during validation pass!\n[ERROR] Table column mismatch: expected VARCHAR(10) but found INT64 on customer_id.\n[ROLLBACK] Terminating pipeline safely to protect data integrity.\n--------------------------------------------------------------------------------\nHuman analyst intervention requested. Email alert dispatched to: mudassir@dandor.com`;
      }
      setTerminalLog(finalOutput);
      setIsRunningSim(false);
    }, 1300);
  };

  return (
    <section 
      id="ai-automation" 
      className="relative py-24 bg-brand-bg-primary text-brand-body px-6 md:px-8 border-t border-slate-200 overflow-hidden"
      aria-label="AI Automation & Intelligent Workflows"
    >
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-blue-500/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-indigo-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase font-semibold">Intelligent Operations Module</span>
            </div>
          }
          title="AI Automation & Intelligent Workflows"
          description="Reclaim analyst productivity and guarantee data reliability by pairing automated drafting algorithms with strict human-in-the-loop validation. AI is locked behind strict procedural boundaries—automatically scrubbing rows, structuring relational schemas, or compiling initial briefing outlines, while human expertise remains dedicated to business alignment."
        />

        {/* Dynamic Workflow Process Diagram */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-16 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="space-y-4 mb-8">
            <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest block">Active Workflow Architecture Map</span>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Human-in-the-Loop Pipeline: {activeWorkflow.title}
            </h3>
          </div>

          {/* Flow diagram nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center relative font-sans">
            
            {/* Step 1: Input */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase">STEP 01</span>
                <Database className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 uppercase font-mono">Raw Context & Data</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Enterprise transactional tables, SQL schemas, metric changes or operational challenges are collected.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Step 2: AI Processing */}
            <div className="bg-emerald-50/20 border border-emerald-200 rounded-xl p-4 space-y-2 relative ring-1 ring-emerald-500/5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-emerald-600 uppercase font-semibold">STEP 02 (AI SUPPORT)</span>
                <Cpu className="w-4 h-4 text-emerald-600 animate-pulse" />
              </div>
              <h4 className="text-xs font-bold text-emerald-600 uppercase font-mono flex items-center gap-1">
                <span>Intelligent Draft</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                AI digests inputs to write clean scripts, identify anomalous patterns or construct structured observations.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Step 3: Human Review */}
            <div className="bg-blue-50/20 border border-blue-200 rounded-xl p-4 space-y-2 relative ring-1 ring-blue-500/5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-blue-600 uppercase font-semibold">STEP 03 (HUMAN CORE)</span>
                <UserCheck className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-xs font-bold text-blue-600 uppercase font-mono">Analyst Sign-off</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Mudassir audits outputs for mathematical integrity, aligns results with strategy, and authorizes implementation.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Step 4: Outcome */}
            <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-4 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-emerald-600 uppercase">OUTCOME</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 uppercase font-mono">Actionable Intelligence</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Verified high-quality reporting deliverables or optimized database workflows support executive choices.
              </p>
            </div>

          </div>
        </div>

        {/* Two-Column Interactive Workspace Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 relative z-10">
          
          {/* Left Column: List of capabilities */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
              Select Intelligent Automation Workflow
            </span>
            <div className="flex flex-col gap-2">
              {workflows.map((wf) => {
                const isActive = wf.id === activeWorkflowId;
                const IconComponent = wf.icon;
                return (
                  <button
                    key={wf.id}
                    onClick={() => {
                      setActiveWorkflowId(wf.id);
                      setTerminalLog(`Switched console workspace to: ${wf.title}. Awaiting simulator execution directive.`);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 relative group ${
                      isActive 
                        ? "bg-white border-emerald-500/40 text-slate-950 shadow-sm" 
                        : "bg-transparent border-slate-200/60 text-slate-500 hover:text-slate-850 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors mt-0.5 ${
                      isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold tracking-tight">
                          {wf.title}
                        </h4>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                          isActive ? "text-emerald-600 bg-emerald-50" : "text-slate-400"
                        }`}>
                          CAPABILITY
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                        {wf.purpose}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Panel with Live Terminal Execution Console */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[580px] flex flex-col justify-between relative shadow-sm overflow-hidden">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkflow.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6 font-sans"
              >
                {/* Header info */}
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <span className="font-mono text-[9px] tracking-widest text-emerald-600 uppercase font-semibold">Workflow Deep Dive</span>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                    {activeWorkflow.title}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    "{activeWorkflow.purpose}"
                  </p>
                </div>

                {/* Challenge & Contribution & Human & Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Challenge */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Business Challenge</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeWorkflow.challenge}
                    </p>
                  </div>

                  {/* AI Contribution */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-wider block font-semibold">AI Automated Assistance</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeWorkflow.aiContribution}
                    </p>
                  </div>

                  {/* Human Responsibility */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-4 col-span-2">
                    <span className="text-[9px] font-mono text-blue-600 uppercase tracking-wider block font-semibold">Custody & Verification Mandate</span>
                    <p className="text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-blue-300">
                      {activeWorkflow.humanResponsibility}
                    </p>
                  </div>

                  {/* Business Value */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-4">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Operational Value Impact</span>
                    <p className="text-xs text-emerald-600 leading-relaxed font-bold">
                      {activeWorkflow.businessValue}
                    </p>
                  </div>

                  {/* Supported Tools */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-4">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Tech Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {activeWorkflow.supportingTech.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-mono text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Dynamic Terminal Sandbox (Sprint 4 Interactive Upgrade) */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Live Code Simulator Console
                    </span>

                    {/* Simulation Controller Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Checkbox to trigger schema exception warnings */}
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-mono text-slate-500">
                        <input 
                          type="checkbox" 
                          checked={schemaErrorToggle}
                          onChange={(e) => setSchemaErrorToggle(e.target.checked)}
                          className="accent-emerald-600 rounded cursor-pointer"
                        />
                        <span>Simulate Schema Error</span>
                      </label>

                      <button
                        onClick={triggerWorkflowSimulation}
                        disabled={isRunningSim}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-mono font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer disabled:bg-slate-300"
                      >
                        {isRunningSim ? (
                          <RotateCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                        )}
                        <span>RUN ACTION SIMULATOR</span>
                      </button>
                    </div>
                  </div>

                  {/* Terminal Logger Output Box */}
                  <div className="bg-slate-950 text-slate-100 border border-slate-850 rounded-xl p-4 font-mono text-[11px] leading-relaxed relative min-h-[140px] overflow-hidden">
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-slate-500 font-bold">
                      <Terminal className="w-3 h-3" />
                      <span>TERMINAL_REACTION</span>
                    </div>
                    
                    <pre className="whitespace-pre-wrap font-mono text-emerald-400">
                      <code>{terminalLog}</code>
                    </pre>
                  </div>
                </div>

                {/* Initial Generated Output Blueprint */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    {activeWorkflow.demoTitle} (Draft Template)
                  </span>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 overflow-x-auto max-h-[150px]">
                    {activeWorkflow.demoType === "code" ? (
                      <pre className="text-[10px] font-mono text-emerald-800 leading-normal select-all">
                        <code>{activeWorkflow.demoContent}</code>
                      </pre>
                    ) : activeWorkflow.demoType === "table" ? (
                      <pre className="text-[10px] font-mono text-slate-700 leading-normal select-all">
                        <code>{activeWorkflow.demoContent}</code>
                      </pre>
                    ) : (
                      <div className="text-[11px] text-slate-700 font-sans leading-relaxed whitespace-pre-line">
                        {activeWorkflow.demoContent}
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-300" />
                SECURE SANDBOX PIPELINE
              </span>
              <span>HUMAN SIGN-OFF INTEGRATION</span>
            </div>

          </div>
        </div>

        {/* Responsible AI Principles Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="px-2 py-0.5 text-[8px] font-mono rounded border text-blue-600 bg-blue-50 border-blue-200 uppercase tracking-wider inline-block mb-3 font-semibold">
              Governance & Safety
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
              Responsible AI Principles
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Data automation is highly efficient, but requires strict boundaries to guarantee accuracy and build stakeholders' trust. My work conforms to six core principles of professional data stewardship:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {principles.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/50 border border-slate-100 p-5 rounded-xl space-y-2 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-tight">
                    {p.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Concluding Section Statement */}
        <div className="w-full text-center py-6 border-y border-slate-200 max-w-4xl mx-auto">
          <p className="text-sm font-medium text-slate-600 italic tracking-wide font-sans">
            "The future of Business Intelligence is not artificial intelligence alone—it is responsible collaboration between analytical expertise and intelligent automation."
          </p>
        </div>

      </div>
    </section>
  );
}
