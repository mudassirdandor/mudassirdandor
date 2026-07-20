import React from "react";
import { motion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import ExecutiveCard from "./ExecutiveCard";
import { 
  BarChart3, 
  LineChart, 
  Database, 
  RefreshCw, 
  Cpu, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from "lucide-react";

interface EvidenceCenterProps {
  onNavigate?: (pageId: string) => void;
}

const capabilities = [
  {
    id: "bi-dashboards",
    title: "Business Dashboards & Reporting",
    description: "I build clear, interactive dashboards that simplify complex business data so you can track performance and make confident decisions.",
    bullets: [
      "Build interactive dashboards",
      "Track key performance metrics",
      "Create automated weekly reports",
      "Set up simple data filters",
      "Support evidence-backed decisions"
    ],
    technologies: ["Power BI", "SQL", "Python", "TypeScript"],
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    statusLabel: "Active Practice",
    relatedProject: { title: "Sales Analysis Dashboard", pageId: "case-studies" },
    relatedSolution: { title: "Business Intelligence", pageId: "solutions" },
    relatedArticle: { title: "What Is Business Intelligence?", pageId: "insights" }
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Insights",
    description: "I clean messy business files and run practical statistical tests to find clear trends, helping you make decisions based on numbers rather than guesswork.",
    bullets: [
      "Clean and organize messy data",
      "Identify sales and customer trends",
      "Verify reporting accuracy",
      "Compare operational metrics",
      "Provide visual data summaries",
      "Forecast future seasonal demand"
    ],
    technologies: ["Python", "SQL", "Power BI"],
    icon: <LineChart className="w-5 h-5 text-blue-600" />,
    statusLabel: "Proven Method",
    relatedProject: { title: "SaaS Customer Churn Modeling", pageId: "case-studies" },
    relatedSolution: { title: "Data Analytics", pageId: "solutions" },
    relatedArticle: { title: "Why Dashboards Need Statistical Rigor", pageId: "insights" }
  },
  {
    id: "sql-database",
    title: "Database Management & SQL",
    description: "I structure and organize database tables to ensure your business information is stored securely, stays accurate, and loads instantly when queried.",
    bullets: [
      "Design safe database structures",
      "Speed up slow search queries",
      "Keep records synchronized",
      "Prevent duplicate data entries",
      "Connect databases to web apps",
      "Set up reliable backup routines"
    ],
    technologies: ["SQL", "PostgreSQL"],
    icon: <Database className="w-5 h-5 text-blue-600" />,
    statusLabel: "Technical Standard",
    relatedProject: { title: "Enterprise Decision Intelligence Platform", pageId: "case-studies" },
    relatedSolution: { title: "Custom Web Solutions", pageId: "solutions" },
    relatedArticle: { title: "Optimizing DAX Calculation Speed", pageId: "insights" }
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "I create automatic scripts and link tools to handle repetitive task sequences, letting your team skip the manual typing and focus on what matters.",
    bullets: [
      "Automate repetitive spreadsheets",
      "Send automatic email reminders",
      "Transfer data between different apps",
      "Reduce manual typing mistakes",
      "Create simple form intake flows"
    ],
    technologies: ["Google Apps Script", "TypeScript", "React", "Tailwind CSS"],
    icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
    statusLabel: "In Production",
    relatedProject: { title: "Digital Student Registration Platform", pageId: "case-studies" },
    relatedSolution: { title: "Workflow Automation", pageId: "solutions" },
    relatedArticle: { title: "What Is Business Intelligence?", pageId: "insights" }
  },
  {
    id: "ai-intelligent-systems",
    title: "AI & Automation Assistants",
    description: "I connect simple AI helpers to draft text replies, categorize user comments, and summarize long reports to speed up your everyday operations.",
    bullets: [
      "Set up simple text draft tools",
      "Sort and tag customer comments",
      "Summarize long files quickly",
      "Create helpful chat assistants",
      "Connect smart APIs to workflows"
    ],
    technologies: ["Gemini API", "Python", "React", "TypeScript"],
    icon: <Cpu className="w-5 h-5 text-blue-600" />,
    statusLabel: "Applied AI",
    relatedProject: { title: "Executive Decision Intelligence Platform", pageId: "case-studies" },
    relatedSolution: { title: "AI Automation", pageId: "solutions" },
    relatedArticle: { title: "Human-in-the-Loop AI Reporting", pageId: "insights" }
  },
  {
    id: "local-bi",
    title: "Local Visibility & Maps",
    description: "I optimize map profiles and local business listings so nearby customers can find your physical locations easily and click to call or get directions.",
    bullets: [
      "Optimize maps profiles for search",
      "Improve neighborhood search rankings",
      "Track and analyze customer reviews",
      "Keep business listings accurate",
      "Drive physical foot traffic"
    ],
    technologies: ["Google Business Profile", "Power BI", "Python"],
    icon: <MapPin className="w-5 h-5 text-blue-600" />,
    statusLabel: "Verified Field Work",
    relatedProject: { title: "Executive Decision Intelligence Platform", pageId: "case-studies" },
    relatedSolution: { title: "Local Business Intelligence", pageId: "solutions" },
    relatedArticle: { title: "Local BI: Leveraging Maps Analytics", pageId: "insights" }
  }
];

export default function EvidenceCenter({ onNavigate }: EvidenceCenterProps) {
  return (
    <section 
      id="evidence-center" 
      className="relative py-20 md:py-24 bg-white text-slate-800 px-6 md:px-8 border-b border-slate-200 overflow-hidden"
      aria-label="Evidence Lab"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase font-semibold">
                PRACTICAL PROOF OF WORK
              </span>
            </div>
          }
          title="Evidence Lab"
          description="A clear, verified list of my practical skills, backed by real-world projects, active automations, and functional business dashboards."
        />

        {/* Evidence Grid: Desktop (3 columns), Tablet (2 columns), Mobile (1 column) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <ExecutiveCard
              key={cap.id}
              level={2}
              className="h-full"
            >
              <div className="p-6 md:p-8 flex flex-col justify-between h-full w-full">
                <div>
                  {/* Header Row: Professional Icon & Verification Badge */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                    <div className="p-2 bg-white border border-slate-150 rounded-xl shadow-3xs">
                      {cap.icon}
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-md shadow-3xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9.5px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                        {cap.statusLabel}
                      </span>
                    </div>
                  </div>

                {/* Capability Title & Short Executive Description */}
                <div className="space-y-2.5 mb-5">
                  <h3 className="text-base font-bold text-slate-900 font-display tracking-tight leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3 shadow-3xs mb-5">
                  <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-1.5 font-bold">
                    PRACTICAL DELIVERABLES
                  </span>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    {cap.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-sans font-medium text-slate-800 leading-normal">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SPRINT 3.5 SMART CROSS-LINKS SECTION */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-2.5 shadow-3xs mb-5">
                  <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block font-semibold border-b border-slate-100 pb-1.5 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    Related Assets
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onNavigate?.(cap.relatedProject.pageId)}
                      className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus:outline-none"
                    >
                      <span className="font-mono text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                        Project
                      </span>
                      <span>{cap.relatedProject.title} →</span>
                    </button>
                    <button
                      onClick={() => onNavigate?.(cap.relatedSolution.pageId)}
                      className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer focus:outline-none"
                    >
                      <span className="font-mono text-[8px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 uppercase">
                        Solution
                      </span>
                      <span>{cap.relatedSolution.title} →</span>
                    </button>
                    <button
                      onClick={() => onNavigate?.(cap.relatedArticle.pageId)}
                      className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline cursor-pointer focus:outline-none"
                    >
                      <span className="font-mono text-[8px] font-bold bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded border border-violet-100 uppercase">
                        Research
                      </span>
                      <span>{cap.relatedArticle.title} →</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Technology chips row */}
              <div className="border-t border-slate-200 pt-5 mt-auto">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-2.5 font-bold">
                  TOOLS I USE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.technologies.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="text-[13px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </ExecutiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
