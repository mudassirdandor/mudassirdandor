import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { 
  MapPin, 
  Map, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  Globe, 
  Activity, 
  Info,
  CheckCircle2,
  PhoneCall,
  Navigation,
  ExternalLink,
  ChevronRight,
  Star,
  Users
} from "lucide-react";

interface CapabilityItem {
  id: string;
  title: string;
  purpose: string;
  icon: React.ComponentType<{ className?: string }>;
  businessQuestions: string[];
  approach: string;
  dataSources: string;
  insightsGenerated: string;
  recommendations: string;
  supportingTech: string[];
  visualMetricTitle: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: "gbp-intelligence",
    title: "Google Business Profile Intelligence",
    purpose: "Monitor business presence and customer discovery.",
    icon: Globe,
    businessQuestions: [
      "How are customers finding our physical locations?",
      "Which search queries generate the highest local visibility?",
      "What primary actions do customers take on our profiles?"
    ],
    approach: "Analyze daily time-series performance feeds from location platforms, isolating discovery versus brand-specific queries and mapping user actions against scheduled operational hours.",
    dataSources: "Location Platform API Performance Feeds, Branch Intake Logs",
    insightsGenerated: "Proximity-based discovery queries (such as sector-specific searches) drive the vast majority of profile interactions rather than direct branded searches, showing high reliance on local positioning.",
    recommendations: "Schedule high-demand staffing resources to match weekly user action peaks to ensure operational coverage aligns with customer demand trends.",
    supportingTech: ["Google Business Profile API", "SQL", "Python", "Power BI"],
    visualMetricTitle: "Customer Discovery Journey"
  },
  {
    id: "visibility-analysis",
    title: "Local Search Visibility Analysis",
    purpose: "Evaluate visibility across regional markets.",
    icon: Map,
    businessQuestions: [
      "Which geographical sectors perform well in visibility?",
      "Where are our primary geographic coverage gaps?",
      "How does search presence evolve across key territories?"
    ],
    approach: "Map search presence metrics across geocoded location coordinates, cross-referencing brand prominence against local population demographics.",
    dataSources: "Maps Search Location Audits, Regional Demographic Databases",
    insightsGenerated: "Geographic search presence is highly localized; locating service voids where competitor presence is minimal relative to population density highlights key expansion opportunities.",
    recommendations: "Prioritize offline market development and future physical locations in high-density areas with current local visibility gaps.",
    supportingTech: ["Geospatial APIs", "Python (GeoPandas)", "SQL", "Looker Studio"],
    visualMetricTitle: "Geographic Visibility Heat Map"
  },
  {
    id: "review-intelligence",
    title: "Customer Review Intelligence",
    purpose: "Analyze customer feedback.",
    icon: MessageSquare,
    businessQuestions: [
      "What primary service themes appear most frequently in reviews?",
      "What specific operational bottlenecks are repeatedly mentioned?",
      "Which location strengths should be protected and replicated?"
    ],
    approach: "Aggregate location reviews using text categorization and sentiment classification, mapping feedback trends directly against site operational calendars.",
    dataSources: "Location Review Feeds, Front-Office Schedule Database",
    insightsGenerated: "Feedback patterns indicate specific times of day or days of the week where customer service friction increases, indicating potential bottlenecks in front-office support.",
    recommendations: "Deploy supplementary administrative support during identified peak friction windows to maintain customer satisfaction and streamline client onboarding.",
    supportingTech: ["Python", "Natural Language Processing (NLP)", "PostgreSQL", "Power BI"],
    visualMetricTitle: "Customer Feedback Analysis"
  },
  {
    id: "location-performance",
    title: "Location Performance Dashboard",
    purpose: "Compare performance metrics across locations.",
    icon: BarChart3,
    businessQuestions: [
      "Which branches demonstrate the highest visitor interaction rates?",
      "Which locations require operational adjustment or extra support?",
      "What consistent trends emerge across locations over time?"
    ],
    approach: "Design and implement unified relational databases consolidating location-specific transaction logs and profile engagement, establishing standardized performance indices.",
    dataSources: "Point-of-Sale Transactions, Customer Database, Profile Analytics",
    insightsGenerated: "Branch-by-branch evaluation reveals significant variance in customer intake efficiency, isolating specific front-office procedures that drive higher client engagement.",
    recommendations: "Standardize the intake and scheduling communications blueprint from top-performing locations, implementing shared training modules across all branches.",
    supportingTech: ["Power BI", "SQL Server", "Power Query", "Excel"],
    visualMetricTitle: "Location Performance Dashboard"
  },
  {
    id: "competitive-visibility",
    title: "Competitive Visibility Intelligence",
    purpose: "Understand the local competitive environment.",
    icon: ShieldCheck,
    businessQuestions: [
      "Where do key market players maintain strong visibility?",
      "What customer experience standards are competitors setting?",
      "Which local market segments present high strategic opportunity?"
    ],
    approach: "Analyze competitor maps profiles, catalog completeness, and regional visibility grids across priority market boundaries.",
    dataSources: "Competitive Market Audits, Regional Directory Databases",
    insightsGenerated: "Competitors with consistent directory citations and fully validated profiles show stronger presence stability, safeguarding their search-based customer channels.",
    recommendations: "Establish a systematic bimonthly listing audit pipeline to verify and lock core business directories, ensuring consistent operational records.",
    supportingTech: ["Python Scrapers", "SQL", "Looker Studio", "Excel"],
    visualMetricTitle: "Competitive Local Market Analysis"
  },
  {
    id: "executive-reporting",
    title: "Executive Local Performance Reporting",
    purpose: "Provide leadership with high-level performance summaries.",
    icon: FileText,
    businessQuestions: [
      "How does local location performance support corporate goals?",
      "What is the operational impact of our local search presence?",
      "What key strategic changes are recommended for leadership?"
    ],
    approach: "Synthesize geographic presence indices, review feedback patterns, and site transaction data into clear, non-technical executive performance summaries.",
    dataSources: "Executive Dashboards, Performance Reports, Regional Synopses",
    insightsGenerated: "Geographic search data and local feedback serve as leading indicators of location volume, offering operational insight ahead of delayed financial reports.",
    recommendations: "Incorporate localized geographic insights reviews into quarterly operations briefings to align corporate development with real-time customer behavior trends.",
    supportingTech: ["Power BI", "Executive Briefings", "APIs", "Python"],
    visualMetricTitle: "Executive Operations Dashboard"
  }
];

export default function LocalBI() {
  const [activeCapId, setActiveCapId] = useState("gbp-intelligence");
  const activeCap = capabilities.find(c => c.id === activeCapId) || capabilities[0];

  // Simulator State: Multi-branch parameters to showcase real analytical execution
  const [selectedBranchId, setSelectedBranchId] = useState("bay-area");
  const [simulationRating, setSimulationRating] = useState(4.8);
  const [hoverGridIndex, setHoverGridIndex] = useState<number | null>(null);

  const branches = [
    { 
      id: "bay-area", 
      name: "Oakland Clinical Hub", 
      impressions: 18400, 
      websiteClicks: 1240, 
      calls: 840, 
      directions: 620,
      activeKeywords: ["Primary care clinic", "Triage center Oakland", "Immediate care"],
      reviewCount: 342,
      rankGrid: [
        1, 1, 2, 2, 1,
        1, 1, 1, 2, 3,
        3, 2, 1, 1, 1,
        2, 3, 3, 2, 1,
        4, 5, 2, 1, 2
      ]
    },
    { 
      id: "san-mateo", 
      name: "San Mateo Medical Center", 
      impressions: 12100, 
      websiteClicks: 890, 
      calls: 512, 
      directions: 340,
      activeKeywords: ["Family medicine San Mateo", "Triage clinic", "Physician Oakland"],
      reviewCount: 184,
      rankGrid: [
        3, 3, 2, 4, 5,
        2, 1, 2, 2, 3,
        4, 2, 1, 1, 2,
        3, 3, 1, 2, 2,
        5, 6, 4, 3, 3
      ]
    },
    { 
      id: "vallejo", 
      name: "Vallejo Outreach Facility", 
      impressions: 6800, 
      websiteClicks: 420, 
      calls: 210, 
      directions: 180,
      activeKeywords: ["Vallejo health triage", "Community doctor", "Clinic near me"],
      reviewCount: 92,
      rankGrid: [
        5, 6, 5, 4, 7,
        4, 3, 3, 3, 4,
        3, 2, 1, 2, 3,
        4, 3, 2, 2, 5,
        6, 7, 5, 4, 6
      ]
    }
  ];

  const activeBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  // Dynamic calculations based on rating slider
  const simulatedCTR = (simulationRating * 2.1).toFixed(1);
  const estimatedCallMultiplier = simulationRating >= 4.5 ? 1.4 : simulationRating >= 4.0 ? 1.0 : 0.65;
  const simulatedCalls = Math.round(activeBranch.calls * estimatedCallMultiplier);

  return (
    <section 
      id="local-bi" 
      className="relative py-24 bg-brand-bg-primary text-brand-body px-6 md:px-8 border-t border-slate-200 overflow-hidden"
      aria-label="Local Business Intelligence"
    >
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-emerald-500/[0.01] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-blue-500/[0.01] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase font-semibold">Location Intelligence Specialization</span>
            </div>
          }
          title="Local Business Intelligence"
          description="Analyze, visualize, and demonstrate how multi-site physical location presence drives customer discovery and intake volume. By geocoding search grid coordinates, analyzing local user intents, and executing semantic reviews, Mudassir extracts hidden operational signals—revealing physical scheduling issues, staffing bottlenecks, and regional market coverage gaps."
        />

        {/* Case Study Integration Ribbon */}
        <div className="bg-emerald-50/10 border border-emerald-200/60 rounded-2xl p-5 md:p-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.01] rounded-full blur-[50px] pointer-events-none" />
          <div className="space-y-1.5 max-w-3xl">
            <span className="px-2 py-0.5 text-[8px] font-mono rounded border text-emerald-700 bg-emerald-50 border-emerald-200 uppercase tracking-wider inline-block font-semibold">
              Case Study Integration
            </span>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight uppercase font-mono">
              Extended Methodology: Multi-Site Medical Clinics Geo-Mapping & GBP Audit
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This intelligence pipeline replicates the live consult project deployed during Mudassir's clinical operations engagement. Interact with the live maps simulation panel below to visualize how local ranking positions translate into client inquiries.
            </p>
          </div>
          <a
            href="#projects"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-emerald-50 text-[10px] font-mono tracking-wider text-emerald-700 rounded-lg border border-emerald-200 hover:border-emerald-300 cursor-pointer transition-all shrink-0 focus:outline-none shadow-xs font-bold"
          >
            VIEW CORRESPONDING CASE STUDY
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dynamic Interactive Panel Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: List of capabilities */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
              Capabilities Selector
            </span>
            
            <div className="flex flex-col gap-2">
              {capabilities.map((cap) => {
                const isActive = cap.id === activeCapId;
                const IconComponent = cap.icon;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCapId(cap.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 group ${
                      isActive 
                        ? "bg-white border-emerald-500/40 text-slate-950 shadow-sm" 
                        : "bg-transparent border-slate-200/60 text-slate-500 hover:text-slate-850 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors mt-0.5 ${
                      isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between font-sans">
                        <h4 className="text-xs font-bold tracking-tight">
                          {cap.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-1">
                        {cap.purpose}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Split Detail / LIVE DEMOSTRATOR PANEL */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm min-h-[560px]">
            
            {/* Briefings (Col 1) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCap.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Header Title */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] tracking-widest text-emerald-600 uppercase font-semibold">Specialization Briefing</span>
                    <h3 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                      {activeCap.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Purpose: {activeCap.purpose}
                    </p>
                  </div>

                  {/* Business Question */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-wider block font-semibold">Target Business Query</span>
                    <ul className="space-y-1.5 pl-1">
                      {activeCap.businessQuestions.map((q, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-600 font-mono font-bold mt-0.5">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analytical Approach */}
                  <div className="space-y-1.5 border-t border-slate-150 pt-4">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Analytical Blueprint</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeCap.approach}
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-1.5 bg-slate-50 border border-slate-200/50 px-2 py-1 rounded">
                      <span className="text-slate-400 font-bold">Data Sources:</span>
                      <span>{activeCap.dataSources}</span>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="space-y-1.5 border-t border-slate-150 pt-4">
                    <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-wider block font-semibold">Generated Operational Insight</span>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{activeCap.insightsGenerated}"
                    </p>
                  </div>

                  {/* Business Recommendation */}
                  <div className="space-y-1.5 border-t border-slate-150 pt-4 pl-3 border-l-2 border-emerald-400 bg-emerald-50/10 py-1 rounded-r-lg">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Strategic Action Directive</span>
                    <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                      {activeCap.recommendations}
                    </p>
                  </div>

                  {/* Supporting Technologies (Technical labels go here only) */}
                  <div className="pt-4 border-t border-slate-150 space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Technology Grid</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCap.supportingTech.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-mono text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

            {/* LIVE INTERACTIVE DEMONSTRATOR PANEL (Upgraded for Sprint 4) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[9px] font-mono text-slate-400 block tracking-wider font-semibold">
                  INTERACTIVE MAPS SIMULATION CONSOLE
                </span>
                
                {/* Branch Selection Buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1.5">
                  {branches.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBranchId(b.id)}
                      className={`px-2.5 py-1.5 text-[9px] font-mono rounded border text-center transition-all cursor-pointer ${
                        selectedBranchId === b.id
                          ? "bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs"
                          : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                      }`}
                    >
                      {b.id.toUpperCase().replace("-", " ")}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-600 text-center font-bold mt-1">
                  Active clinic: {activeBranch.name}
                </div>
              </div>

              {/* Dynamic Demonstrator Content depending on activeCapId */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1 flex flex-col justify-center items-stretch relative min-h-[290px]">
                
                <AnimatePresence mode="wait">
                  {activeCapId === "gbp-intelligence" && (
                    <motion.div
                      key="gbp-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">GBP Core Customer Actions</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">Live API values</span>
                      </div>

                      <div className="space-y-2">
                        {/* Impressions */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-500">Search Impressions</span>
                            <span className="text-slate-900 font-bold">{activeBranch.impressions.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(activeBranch.impressions / 18400) * 100}%` }}
                              className="bg-emerald-600 h-full rounded-full animate-pulse" 
                            />
                          </div>
                        </div>

                        {/* Directions */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-500">Route Direction Requests</span>
                            <span className="text-blue-600 font-bold">{activeBranch.directions}</span>
                          </div>
                          <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(activeBranch.directions / 620) * 100}%` }}
                              className="bg-blue-500 h-full rounded-full" 
                            />
                          </div>
                        </div>

                        {/* Calls */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-500">Simulated Booking Calls</span>
                            <span className="text-slate-900 font-bold">{simulatedCalls}</span>
                          </div>
                          <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(simulatedCalls / 1100) * 100}%` }}
                              className="bg-slate-700 h-full rounded-full" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* CTR Rating Simulator Widget */}
                      <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-slate-500 uppercase font-bold">Simulate Local Rating Score:</span>
                          <span className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                            {simulationRating.toFixed(1)} / 5.0
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="3.0" 
                          max="5.0" 
                          step="0.1" 
                          value={simulationRating}
                          onChange={(e) => setSimulationRating(parseFloat(e.target.value))}
                          className="w-full accent-emerald-600 h-1 cursor-pointer bg-slate-200 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between text-[9px] font-mono text-slate-400">
                          <span>Low (3.0)</span>
                          <span>Est. Maps CTR: <strong className="text-emerald-600">{simulatedCTR}%</strong></span>
                          <span>Exceptional (5.0)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeCapId === "visibility-analysis" && (
                    <motion.div
                      key="visibility-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 flex flex-col items-center justify-between h-full"
                    >
                      <div className="w-full text-center">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">
                          Maps ranking grid tracker (5x5 miles)
                        </span>
                        <p className="text-[9px] font-mono text-slate-400">
                          Click any grid coordinate to view detailed Local SEO position
                        </p>
                      </div>

                      {/* Interactive Rank Coordinates Grid */}
                      <div className="grid grid-cols-5 gap-1.5 w-full max-w-[175px] py-1.5">
                        {activeBranch.rankGrid.map((pos, idx) => {
                          const isHovered = hoverGridIndex === idx;
                          const rankColor = pos <= 1 
                            ? "bg-emerald-600 text-white" 
                            : pos <= 3 
                              ? "bg-emerald-200 text-emerald-800" 
                              : pos <= 5 
                                ? "bg-amber-100 text-amber-800 border-amber-200" 
                                : "bg-red-50 text-red-600 border-red-150";

                          return (
                            <button
                              key={idx}
                              onClick={() => setHoverGridIndex(idx)}
                              onMouseEnter={() => setHoverGridIndex(idx)}
                              className={`aspect-square rounded border ${rankColor} text-[10px] font-mono font-bold flex items-center justify-center cursor-pointer transition-all ${
                                isHovered ? "scale-110 shadow-md ring-2 ring-emerald-500 z-10" : ""
                              }`}
                            >
                              {pos}
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamically populated localized audit insight */}
                      <div className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-center min-h-[45px]">
                        {hoverGridIndex !== null ? (
                          <div className="text-[10px] font-mono text-slate-700">
                            Coordinate <strong className="text-slate-900">#{hoverGridIndex + 1}</strong>: rank standard: <strong className="text-emerald-600">#{activeBranch.rankGrid[hoverGridIndex]}</strong> in target neighborhood search catchment.
                          </div>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-400 italic block">
                            Hover/Click on coordinates to audit local position
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeCapId === "review-intelligence" && (
                    <motion.div
                      key="reviews-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Semantic sentiment clusters</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">{activeBranch.reviewCount} total reviews</span>
                      </div>

                      <div className="space-y-2.5">
                        {/* Positive theme */}
                        <div className="space-y-1 p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                          <div className="flex justify-between text-[10px] font-mono text-emerald-800">
                            <span className="font-bold">Clinic Wait times / Prompt Triage</span>
                            <span>86% positive</span>
                          </div>
                          <p className="text-[10px] text-slate-600 italic leading-relaxed">
                            "The triage process took less than 15 minutes, very professional staff."
                          </p>
                        </div>

                        {/* Negative bottleneck theme */}
                        <div className="space-y-1 p-2 bg-red-50/50 border border-red-100 rounded-lg">
                          <div className="flex justify-between text-[10px] font-mono text-red-800">
                            <span className="font-bold">Phone Connection / Dropped calls</span>
                            <span>42% critical</span>
                          </div>
                          <p className="text-[10px] text-slate-600 italic leading-relaxed">
                            "Called twice on Monday morning to confirm my appointment but phone was busy."
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeCapId === "location-performance" && (
                    <motion.div
                      key="locations-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase block text-center font-semibold">
                        Clinic Intake Efficiency Benchmark
                      </span>

                      <div className="space-y-2.5 pt-1.5">
                        {branches.map(b => {
                          const performanceRatio = (b.websiteClicks / 1240) * 100;
                          return (
                            <div key={b.id} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className={b.id === selectedBranchId ? "text-emerald-700 font-bold" : "text-slate-500"}>
                                  {b.name.split(" ")[0]} Location
                                </span>
                                <span className="font-bold">{b.websiteClicks} Patient inquiries</span>
                              </div>
                              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${performanceRatio}%` }}
                                  className={`h-full rounded-full ${b.id === selectedBranchId ? "bg-emerald-600" : "bg-slate-400"}`} 
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {activeCapId === "competitive-visibility" && (
                    <motion.div
                      key="competitive-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase block text-center font-semibold">
                        Competitor Share-of-Voice Catchment
                      </span>

                      <div className="flex justify-center items-center h-28 relative">
                        {/* Interactive Concentric rings */}
                        <div className="absolute w-28 h-28 rounded-full border border-slate-350/50 flex items-center justify-center animate-spin-slow">
                          <div className="absolute top-0 left-0 text-[8px] font-mono text-slate-400">Other Local Providers</div>
                        </div>
                        <div className="absolute w-20 h-20 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                          <div className="absolute w-12 h-12 rounded-full border border-blue-400 bg-blue-50/80 flex flex-col items-center justify-center text-[9px] font-mono text-blue-700 font-bold">
                            <span>Our Share</span>
                            <span className="text-emerald-600 font-extrabold">48%</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[10px] font-mono text-slate-500 leading-normal">
                        AUDITED REQUISITE DIRECTORIES: <strong className="text-slate-800">87 listings</strong> validated across directories
                      </div>
                    </motion.div>
                  )}

                  {activeCapId === "executive-reporting" && (
                    <motion.div
                      key="executive-demo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase block text-center font-semibold">
                        Operational Status Scorecard
                      </span>

                      <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 shadow-xs text-[10px] font-mono">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-semibold">Branch Mapping Integration</span>
                          <span className="text-emerald-700 font-bold px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded">100% Synced</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-semibold">Audit Score (Citation Accuracy)</span>
                          <span className="text-emerald-700 font-bold px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded">98.4% Match</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-semibold">Weekly Review Velocity</span>
                          <span className="text-emerald-700 font-bold px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded">+12.4% MoM</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-semibold">Dropped Call Leakage</span>
                          <span className="text-red-600 font-bold px-1.5 py-0.5 bg-red-50 border border-red-100 rounded">Reduced 40%</span>
                        </div>
                      </div>

                      <div className="bg-slate-700 text-white p-2 text-center rounded border border-slate-650 space-y-0.5 text-[10px] font-mono">
                        <span className="text-slate-400 block uppercase text-[8px]">Executive Briefing Pipeline</span>
                        <span className="font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Board reporting packet synthesized
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Secure sandbox indicators */}
              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DATA INTEGRITY SECURED</span>
                </span>
                <span className="font-bold">BRANCH COORDS MAPPED</span>
              </div>

            </div>

          </div>
        </div>

        {/* Responsible Analytics Note */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-16 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.01] rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="space-y-2 max-w-3xl font-sans">
              <span className="px-2.5 py-0.5 text-[8px] font-mono rounded border text-emerald-700 bg-emerald-50 border-emerald-200 uppercase tracking-wider inline-block font-bold">
                Analytical Standards
              </span>
              <h4 className="text-xs font-extrabold text-slate-900 uppercase font-mono tracking-wider">
                Geographic attribution & conversion modeling
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Local Business Intelligence combines customer behavior, maps presence, and clinical operational schedules. Search engine position matrices alone represent intermediate vanity indicators. They only provide genuine corporate value when mapped against patient intake capacities, staff roster optimization, and direct overhead cost savings.
              </p>
            </div>
          </div>
        </div>

        {/* Concluding Section Statement */}
        <div className="w-full text-center py-6 border-y border-slate-200 max-w-4xl mx-auto">
          <p className="text-sm font-medium text-slate-600 italic tracking-wide font-sans">
            "Local Business Intelligence bridges the gap between digital presence maps and real-world clinical performance."
          </p>
        </div>

      </div>
    </section>
  );
}
