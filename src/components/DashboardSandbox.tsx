import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data/projects";
import CustomChart from "./CustomChart";
import AnimatedCounter from "./AnimatedCounter";
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Send, 
  RefreshCw, 
  Sliders, 
  Database,
  Calendar,
  HeartPulse,
  ShoppingBag,
  Users,
  BarChart3,
  Globe,
  GraduationCap,
  MapPin,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileText,
  Clock,
  ShieldAlert,
  Percent
} from "lucide-react";

/**
 * Interactive Business Intelligence sandbox platform.
 * Fully upgraded for Sprint 4 - Executive Intelligence Experience.
 * Consolidates 8 premium business scenarios with interactive KPI selections,
 * active comparison modes, dynamic insights, a structured Executive Decision Panel,
 * and an advanced domain-specific AI Conversational Analyst.
 */
export default function DashboardSandbox() {
  const [selectedProjectId, setSelectedProjectId] = useState("sales-dashboard");
  const [activeSegment, setActiveSegment] = useState("All");
  const [timeRange, setTimeRange] = useState("180 Days");
  const [selectedKpiIndex, setSelectedKpiIndex] = useState(0);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Custom interactive trigger for re-drawing charts
  const [chartKey, setChartKey] = useState(0);

  // Map 8 custom executive business scenarios 1:1
  const scenarioTabs = [
    { id: "healthcare-dashboard", label: "Healthcare", icon: HeartPulse, desc: "Patient Flow" },
    { id: "retail-analytics", label: "Retail", icon: ShoppingBag, desc: "Basket Affinity" },
    { id: "hr-analytics", label: "Human Resources", icon: Users, desc: "Workforce Attrition" },
    { id: "sales-dashboard", label: "Sales Operations", icon: BarChart3, desc: "Regional Revenue" },
    { id: "ngo-monitoring", label: "NGO Programs", icon: Globe, desc: "Grant Logistics" },
    { id: "education-analytics", label: "Education", icon: GraduationCap, desc: "Student Retention" },
    { id: "gbp-analytics", label: "Local Business", icon: MapPin, desc: "Google Presence" },
    { id: "supply-chain-dashboard", label: "Supply Chain", icon: Truck, desc: "SLA Logistics" },
  ];

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Pre-seed chat history with a personalized welcome based on the selected scenario
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "ai"; text: string }[]>([
    {
      sender: "ai",
      text: "System Online. Welcome, Executive. Select any of the 8 business scenarios below, toggle comparison modes, or ask me detailed strategic questions regarding this dashboard."
    }
  ]);

  useEffect(() => {
    setChatHistory([
      {
        sender: "ai",
        text: `Loaded administrative workspace for: ${activeProject.title}. The underlying repository covers ${activeProject.dataset}. Ask me about key performance indicators, regional trends, or optimization opportunities.`
      }
    ]);
    setSelectedKpiIndex(0);
  }, [selectedProjectId]);

  // Comprehensive simulated expert response repository calibrated for all 8 business scenarios
  const aiResponses: Record<string, string[]> = {
    "healthcare-dashboard": [
      "Clinical workflow analysis shows emergency room wait times are highly concentrated on Monday mornings between 08:00 and 11:00. This is driven by non-emergent case overflows from closed local clinics.",
      "The resource optimization model indicates that advancing nurse shift transitions by 30 minutes (starting at 07:30) can reduce the peak triage backlog by 22% during high-volume intake intervals.",
      "A 30-day patient readmission regression run suggests that discharging patients prior to completing the full 12-hour observation window leads to a 4.1x higher risk of critical cardiovascular relapses."
    ],
    "retail-analytics": [
      "Market basket association analysis reveals a strong statistical correlation (0.76 lift) between high-margin electronics accessories and premium base items. However, current physical shelf spacing places these categories 45 feet apart.",
      "Weekend promotional pricing on category-A products drives a 28% spike in transaction count, but triggers immediate safety stockout losses at adjacent regional distribution hubs.",
      "I recommend configuring a dynamic auto-replenishment threshold tied directly to promotional calendars to prevent inventory holding bottlenecks while maintaining zero stockouts."
    ],
    "hr-analytics": [
      "Voluntary employee departure trends show a severe risk spike occurring exactly at the 18-month tenure mark. Survival analysis correlates this directly with tenure-based pay compression against market rates.",
      "A regression on employee satisfaction logs shows team satisfaction in the engineering department is inversely proportional to weekly on-call ticket counts, suggesting immediate staffing or automation needs.",
      "I recommend establishing structured compensation adjustment audits at the 15-month milestone to preempt voluntary attrition, saving up to $180,000 in recruitment overhead annually."
    ],
    "sales-dashboard": [
      "Global sales analytics indicate that while revenue is up +14.3% YoY, gross margins fell by 3.2% due to un-capped, discretionary promotional discounting by regional B2B sales representatives.",
      "Our B2B pricing model demonstrates high price inelasticity. A selective 5% list price increase across high-demand SKUs would impact order volume by less than 1.2%, generating an estimated $640K in additional margin.",
      "Logistic line audits indicate that European distribution routes suffer from a 3.1-day transit lag compared to other hubs, heavily impacting customer re-purchase rates."
    ],
    "ngo-monitoring": [
      "The program implementation audit reveals significant cargo shipment delays concentrated at two specific customs border points, adding an average of 8.2 days to vital aid dispatches.",
      "Reviewing the financial ledger highlights a disproportionate spending surge (38% of total grant budgets) in the final 3 weeks of the fiscal cycle. This introduces compliance audit risks.",
      "Establishing centralized regional transit hubs and pre-clearing document templates can reduce customs delays by 60%, aligning distribution times with field program goals."
    ],
    "education-analytics": [
      "Institutional success analysis indicates that sophomore attrition is highly predictable. Canvas LMS login frequencies of less than twice a week during the first 6 weeks of the semester indicate an 82% risk of withdrawal.",
      "Financial aid regression runs show that a student balance hold as small as $450 often serves as the final catalyst for student withdrawal, particularly among partial financial aid recipients.",
      "I recommend launching early counseling intervention campaigns to target Canvas activity drops, paired with a micro-grant pool to clear small, sudden balance holds before registration dates."
    ],
    "gbp-analytics": [
      "Google Business Profile API feeds reveal that local direction requests increased by 34%, yet Suburban clinic booking conversions remained flat. This suggests an physical accessibility or booking flow issue.",
      "Review sentiment mining reveals that clinics with a review score of 4.8+ on Maps experience 2.3x higher call-to-action click-through rates compared to clinical benchmarks.",
      "Telephony logs show peak incoming call activity from 08:00 to 10:00. This triggers a 14% call drop rate. I recommend deploying an automated SMS scheduling callback to prevent lead leakage."
    ],
    "supply-chain-dashboard": [
      "SLA compliance analytics show a single carrier network is responsible for 68% of delayed arrivals on critical production line components, violating their 95% on-time guarantee.",
      "Route redundancy maps suggest that holding a 5% safety stock buffer at our Chicago depot can prevent assembly line stoppages caused by winter weather transit bottlenecks.",
      "I recommend distributing freight volume across alternative carrier networks and renegotiating contract structures with tiered penalties for delivery windows missed by more than 4 hours."
    ]
  };

  // Adjust chart values based on active filters and segment
  const getFilteredChartData = () => {
    let multiplier = 1.0;
    if (activeSegment === "Enterprise") multiplier = 1.25;
    if (activeSegment === "SMB") multiplier = 0.85;
    if (timeRange === "30 Days") multiplier *= 0.5;
    if (timeRange === "90 Days") multiplier *= 0.75;

    // Focus on the selected KPI factor
    const kpiFocusFactor = 1.0 + (selectedKpiIndex * 0.1);
    multiplier *= kpiFocusFactor;

    return activeProject.metrics.chartData.map((d) => ({
      label: d.label,
      value: Number((d.value * multiplier).toFixed(1)),
      secondaryValue: d.secondaryValue ? Number((d.secondaryValue * multiplier * 0.95).toFixed(1)) : undefined
    }));
  };

  const getFilteredKPIs = () => {
    let multiplier = 1.0;
    if (activeSegment === "Enterprise") multiplier = 1.15;
    if (activeSegment === "SMB") multiplier = 0.9;

    return activeProject.metrics.kpis.map((kpi, idx) => {
      // Parse numbers out of values to apply mock adjustments
      const rawNum = parseFloat(kpi.value.replace(/[^0-9.]/g, ""));
      if (isNaN(rawNum)) return kpi;

      const prefix = kpi.value.match(/^[^0-9.]+/)?.[0] || "";
      const suffix = kpi.value.match(/[^0-9.]+$/)?.[0] || "";
      
      // Make active KPI slightly more prominent
      const kpiFocus = selectedKpiIndex === idx ? 1.05 : 1.0;
      const adjustedVal = (rawNum * multiplier * kpiFocus).toFixed(rawNum % 1 === 0 ? 0 : 1);

      return {
        ...kpi,
        value: `${prefix}${adjustedVal}${suffix}`
      };
    });
  };

  const handleQuerySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    const userMessage = queryInput;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
    setQueryInput("");
    setIsTyping(true);

    // Simulate analytical model query processing
    setTimeout(() => {
      const responses = aiResponses[selectedProjectId] || aiResponses["sales-dashboard"];
      // Choose response depending on keywords or cycle
      let responseText = responses[0];
      if (userMessage.toLowerCase().includes("recommend") || userMessage.toLowerCase().includes("action")) {
        responseText = responses[2] || responses[0];
      } else if (userMessage.toLowerCase().includes("driver") || userMessage.toLowerCase().includes("why")) {
        responseText = responses[1] || responses[0];
      } else {
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }

      setChatHistory((prev) => [...prev, { sender: "ai", text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  const triggerChartRefresh = () => {
    setChartKey(prev => prev + 1);
  };

  const quickPrompts = [
    "Identify key drivers",
    "Show recommendations",
    "Analyze spatial trends",
    "Suggest action plan"
  ];

  return (
    <div id="dashboard-sandbox" className="w-full bg-white border border-slate-250 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xl">
      {/* Background elegant branding stripes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50/10 rounded-full blur-3xl pointer-events-none" />

      {/* Corporate Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-200/60 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded uppercase font-semibold">
              Live BI Command Center
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
            Executive Decision Sandbox
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
            Compare performance across eight functional business domains, toggle active segment metrics, and explore recommendations with the conversational intelligence console.
          </p>
        </div>

        {/* Global Reset / Redraw */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              triggerChartRefresh();
              setIsComparisonMode(prev => !prev);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg border cursor-pointer transition-all ${
              isComparisonMode 
                ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold shadow-xs" 
                : "bg-white hover:bg-slate-50 border-slate-250 text-slate-600"
            }`}
            title="Overlay secondary baseline variance trends on the chart."
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>COMPARISON MODE: {isComparisonMode ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => {
              triggerChartRefresh();
              setActiveSegment("All");
              setTimeRange("180 Days");
              setSelectedKpiIndex(0);
            }}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-250 cursor-pointer transition-colors"
            title="Reset active sandbox parameters."
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario Grid Selector (The 8 requested business cases) */}
      <div className="mb-6 relative z-10">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold pl-1">
          Select Executive Domain Scenario
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {scenarioTabs.map((tab) => {
            const isActive = selectedProjectId === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedProjectId(tab.id)}
                className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-[85px] group relative focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
                  isActive
                    ? "bg-white border-blue-600 text-slate-950 shadow-sm ring-1 ring-blue-500/10"
                    : "bg-slate-50/50 border-slate-250/70 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <div className={`p-1.5 rounded-lg w-fit transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="mt-2">
                  <span className="text-[11px] font-bold tracking-tight block leading-tight truncate">
                    {tab.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block tracking-tight truncate">
                    {tab.desc}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 h-1.5 w-1.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
        {/* Segment selector */}
        <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-xl border border-slate-250/60 shadow-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Active Segment:</span>
          </div>
          <div className="flex gap-1">
            {["All", "Enterprise", "SMB"].map((seg) => (
              <button
                key={seg}
                onClick={() => {
                  setActiveSegment(seg);
                  triggerChartRefresh();
                }}
                className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                  activeSegment === seg
                    ? "bg-white text-slate-900 border border-slate-200 shadow-xs font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        {/* Time range selection */}
        <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-xl border border-slate-250/60 shadow-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Reporting Window:</span>
          </div>
          <div className="flex gap-1">
            {["30 Days", "90 Days", "180 Days"].map((tr) => (
              <button
                key={tr}
                onClick={() => {
                  setTimeRange(tr);
                  triggerChartRefresh();
                }}
                className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                  timeRange === tr
                    ? "bg-white text-slate-900 border border-slate-200 shadow-xs font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left is Charts/KPIs, Right is AI Chat Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10 mb-6">
        {/* KPI Panel + Chart Container */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Real-time Interactive KPI Cards */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Interactive Metrics (Click to focus chart trends)
              </span>
              {selectedKpiIndex !== null && (
                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Focused: {getFilteredKPIs()[selectedKpiIndex]?.label}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {getFilteredKPIs().map((kpi, idx) => {
                const isSelected = selectedKpiIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedKpiIndex(idx);
                      triggerChartRefresh();
                    }}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-[95px] relative focus:outline-none ${
                      isSelected
                        ? "bg-white border-blue-600 text-slate-950 shadow-sm ring-1 ring-blue-500/10"
                        : "bg-slate-50/60 border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-[10px] font-mono tracking-tight text-slate-500 truncate w-full">
                      {kpi.label}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between w-full">
                      <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                        <AnimatedCounter value={kpi.value} />
                      </span>
                      <span
                        className={`text-[9px] font-mono flex items-center gap-0.5 font-bold ${
                          kpi.isPositive ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {kpi.trend}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute bottom-1 right-3 text-[8px] font-mono text-blue-600 font-semibold tracking-tighter">
                        ACTIVE FILTER
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Chart Visualizer */}
          <div key={`${chartKey}-${selectedProjectId}-${selectedKpiIndex}-${isComparisonMode}`} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 relative shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-800 tracking-tight font-sans">
                  {getFilteredKPIs()[selectedKpiIndex]?.label || "Dataset Trend"} Projection
                </span>
                <span className="text-[9px] font-mono text-slate-400 ml-2">
                  (Adjusted by focused KPI & segment multiplier)
                </span>
              </div>
              <div className="flex gap-4 text-[9px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
                  <span className="text-slate-500 font-semibold">Focused Metric</span>
                </div>
                {isComparisonMode && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 block animate-pulse" />
                    <span className="text-emerald-700 font-bold">Variance Target</span>
                  </div>
                )}
              </div>
            </div>

            {/* Custom chart renderer */}
            <CustomChart
              data={getFilteredChartData()}
              type={isComparisonMode ? "comparison" : (selectedProjectId === "gbp-analytics" ? "bar" : "area")}
              color="rgb(37, 99, 235)"
              secondaryColor="rgb(22, 163, 74)"
              height={210}
              prefix={selectedProjectId === "sales-dashboard" || selectedProjectId === "financial-dashboard" ? "$" : ""}
              suffix={selectedProjectId === "sales-dashboard" ? "M" : selectedProjectId === "financial-dashboard" ? "k" : ""}
            />
          </div>

          {/* Metadata Bar */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 px-4 flex items-center justify-between text-xs text-slate-500 shadow-xs">
            <div className="flex items-center gap-2 truncate">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">
                <strong>Repository:</strong> {activeProject.dataset}
              </span>
            </div>
            <div className="hidden sm:flex gap-1.5">
              {activeProject.tools.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/30 rounded text-[13px] font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Chat Console */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl flex flex-col h-[485px] relative overflow-hidden shadow-md">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-900 block font-sans">Analytical Assistant</span>
                <p className="text-[9px] text-green-600 font-mono font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                  Scenario Model Mapped
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setChatHistory([
                  {
                    sender: "ai",
                    text: `Console reset. Active dataset is: ${activeProject.title}. Pose your business questions.`
                  }
                ]);
              }}
              title="Reset Chat"
              className="p-1 hover:bg-slate-150 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-2.5 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white font-medium shadow-xs"
                      : "bg-slate-50 border border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] text-slate-500 flex items-center gap-1.5 shadow-xs">
                  <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span>Iterating regression models...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Prompts */}
          <div className="p-2 border-t border-slate-100 bg-slate-50/40 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setQueryInput(p);
                }}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-md text-[10px] text-slate-500 font-mono transition-all whitespace-nowrap cursor-pointer shadow-xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleQuerySubmit} className="p-3 border-t border-slate-200 bg-slate-50/50 flex gap-2 shrink-0">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={`Ask about ${activeProject.title.split(" ")[0]} metrics...`}
              className="flex-1 bg-white border border-slate-250 text-xs rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isTyping}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Structured Executive Decision & Recommendation Panel */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs relative z-10 bg-slate-50/30">
        {/* Panel Header */}
        <div className="bg-slate-100/60 p-4 border-b border-slate-200 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <div>
            <span className="text-xs font-bold text-slate-900 block font-sans uppercase tracking-tight">
              Executive Decision & Analysis Framework
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">
              Translating dashboard parameters into strategic guidance
            </span>
          </div>
        </div>

        {/* 4-Bento Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Section 1: What Happened? (The Context) */}
          <div className="md:col-span-4 p-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-amber-600 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded font-bold">01</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">What is the problem?</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {activeProject.businessProblem}
            </p>
            <div className="pt-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Underlying Insights</span>
              <ul className="space-y-1.5">
                {activeProject.businessInsights.slice(0, 2).map((insight, idx) => (
                  <li key={idx} className="text-[11px] text-slate-600 leading-relaxed flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Why it happened? (Root-Cause Diagnostic) */}
          <div className="md:col-span-3 p-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-blue-600 bg-blue-50 border border-blue-200/50 px-1.5 py-0.5 rounded font-bold">02</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Why it happened</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diagnostic analysis isolate root anomalies by cross-referencing multi-dimensional indicators:
            </p>
            <div className="space-y-2">
              {activeProject.analysisSteps.slice(0, 2).map((step, idx) => (
                <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200/60 text-[10px] font-mono text-slate-600 leading-normal flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">»</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Recommended Action (Strategic Interventions) */}
          <div className="md:col-span-3 p-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded font-bold">03</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Recommended Actions</span>
            </div>
            <ul className="space-y-2">
              {activeProject.recommendations.map((rec, idx) => (
                <li key={idx} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Expected Outcome & Impact */}
          <div className="md:col-span-2 p-5 bg-white/40 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-1.5 py-0.5 rounded font-bold">04</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Expected Impact</span>
            </div>
            
            <div className="space-y-3">
              {activeProject.results.map((res, idx) => (
                <div key={idx} className="border-l-2 border-emerald-500 pl-2.5">
                  <span className="text-xs font-bold text-slate-900 block tracking-tight">
                    {res.value}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase leading-none mt-0.5">
                    {res.metric}
                  </span>
                  <span className="text-[10px] text-emerald-700 block leading-tight mt-1">
                    {res.improvement}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
