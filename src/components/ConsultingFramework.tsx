import React, { useState } from "react";
import { motion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import {
  Search,
  Eye,
  Compass,
  Code,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  FileText,
  Video,
  Database,
  Building,
  Building2,
  GraduationCap,
  Globe,
  Users,
  Check,
  ArrowRight,
  Workflow,
  Sparkles,
  BarChart4,
  Library,
  Layers,
  HeartHandshake
} from "lucide-react";

interface Stage {
  number: string;
  icon: React.ReactNode;
  title: string;
  explanation: string;
  deliverables: string[];
  outcome: string;
}

interface Principle {
  title: string;
  explanation: string;
  icon: React.ReactNode;
}

interface DeliverableItem {
  title: string;
  explanation: string;
  items: string[];
  icon: React.ReactNode;
}

interface TargetAudience {
  segment: string;
  description: string;
  typicalNeeds: string[];
  icon: React.ReactNode;
}

interface ConsultingFrameworkProps {
  onNavigate?: (pageId: string) => void;
}

export default function ConsultingFramework({ onNavigate }: ConsultingFrameworkProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const stages: Stage[] = [
    {
      number: "01",
      icon: <Search className="w-5 h-5 text-blue-600" />,
      title: "Discovery",
      explanation: "We start with a conversation to understand your goals, check where your business numbers are stored, and pinpoint the exact challenges your team faces.",
      deliverables: [
        "Clear list of project goals",
        "Overview of current spreadsheets & databases",
        "Simple plan of what we will build"
      ],
      outcome: "A shared agreement on what we are building, which numbers we are tracking, and when it will be ready."
    },
    {
      number: "02",
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      title: "Assessment",
      explanation: "I look closely at how your team currently handles data, where the slow-downs or errors happen, and what we need to clean up.",
      deliverables: [
        "Summary of current data slow-downs",
        "Report on data errors & typos to fix",
        "List of missing details needed for your reports"
      ],
      outcome: "A clear picture of exactly why reports are slow or inaccurate, and a plan to fix them."
    },
    {
      number: "03",
      icon: <Compass className="w-5 h-5 text-violet-600" />,
      title: "Strategy",
      explanation: "We map out the project path, design how the database tables will link together simply, and choose the most reliable tools.",
      deliverables: [
        "Simple technology roadmap",
        "Draft design of the database tables",
        "Simple list of what success looks like"
      ],
      outcome: "A clean, straightforward plan for building your database and reports simply."
    },
    {
      number: "04",
      icon: <Code className="w-5 h-5 text-emerald-600" />,
      title: "Development",
      explanation: "I build your database, write scripts to automate repetitive copying tasks, and create clean, interactive reports.",
      deliverables: [
        "An organized, clean database",
        "Automated scripts to copy & update data",
        "Clean, interactive dashboards"
      ],
      outcome: "Your dashboards and scripts are built and running smoothly behind the scenes."
    },
    {
      number: "05",
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      title: "Validation",
      explanation: "We test the spreadsheets, scripts, and reports thoroughly to make sure every calculation is correct and the dashboards load instantly.",
      deliverables: [
        "Data accuracy report",
        "Speed & loading time checks",
        "Your final approval on the working version"
      ],
      outcome: "Complete certainty that your reports are perfectly accurate and load without delays."
    },
    {
      number: "06",
      icon: <CheckCircle className="w-5 h-5 text-teal-600" />,
      title: "Deployment",
      explanation: "We launch the new reports and dashboards for your team, write simple guides, and run short training sessions to make sure everyone is comfortable.",
      deliverables: [
        "A simple, plain-English user guide",
        "Short video walkthroughs of the dashboard",
        "A short training session for your team"
      ],
      outcome: "A smooth handoff to your team, with everyone knowing exactly how to use the new tools in their daily work."
    },
    {
      number: "07",
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      title: "Continuous Improvement",
      explanation: "We check in periodically to see how the reports are working, make simple updates based on your team's feedback, and plan any future tweaks.",
      deliverables: [
        "Regular dashboard check-ups",
        "A quick review after a month of usage",
        "A simple list of future ideas to add"
      ],
      outcome: "A reliable data setup that stays accurate and grows naturally alongside your business."
    }
  ];

  const principles: Principle[] = [
    {
      title: "Evidence before assumptions",
      explanation: "Every decision we make is guided by checked, reliable facts rather than gut feeling or unverified guesses.",
      icon: <BarChart4 className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Business problems before technology",
      explanation: "A tool is only helpful if it solves a real problem. I understand your daily challenges first, then choose the simplest tools to solve them.",
      icon: <Search className="w-5 h-5 text-indigo-600" />
    },
    {
      title: "Simple solutions over complexity",
      explanation: "Complex systems are hard to maintain and prone to errors. I focus on building clean, simple setups that run reliably with minimal maintenance.",
      icon: <Compass className="w-5 h-5 text-violet-600" />
    },
    {
      title: "Automation where valuable",
      explanation: "I automate tedious tasks like copying data or compiling reports, saving your team hours of manual work every week.",
      icon: <Workflow className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Human-centered design",
      explanation: "If your team finds a dashboard confusing, they won't use it. I design every chart and layout to be clean, simple, and instantly understandable.",
      icon: <Users className="w-5 h-5 text-teal-600" />
    },
    {
      title: "Continuous learning",
      explanation: "I constantly keep my skills sharp in statistics, databases, and automation to bring the most reliable ideas to your business.",
      icon: <Library className="w-5 h-5 text-amber-600" />
    },
    {
      title: "Transparent communication",
      explanation: "I keep you updated honestly at every step of the project. If there is a slow-down or a data issue, we discuss it and solve it together.",
      icon: <HeartHandshake className="w-5 h-5 text-sky-600" />
    }
  ];

  const deliverablesShowcase: DeliverableItem[] = [
    {
      title: "Business Assessment",
      explanation: "Simple summaries highlighting current data slow-downs, errors, and practical steps to organize your records.",
      items: ["Summary of data bottlenecks", "Database connection maps", "Clear next-step recommendations"],
      icon: <FileText className="w-4 h-4 text-blue-600" />
    },
    {
      title: "Clean Dashboards",
      explanation: "Interactive, easy-to-read reports and charts that show your business performance clearly in seconds.",
      items: ["Power BI or Looker Studio files", "Simple interactive layouts", "Clean, documented search formulas"],
      icon: <BarChart4 className="w-4 h-4 text-indigo-600" />
    },
    {
      title: "Data Pipelines & Automation",
      explanation: "Automated scripts that safely gather, clean, and organize your files from different sources behind the scenes.",
      items: ["Automated spreadsheet scripts", "Safe background schedules", "Clean, organized database tables"],
      icon: <Workflow className="w-4 h-4 text-violet-600" />
    },
    {
      title: "System Documentation",
      explanation: "Clear, plain-English user manuals and cheat sheets detailing how your new database and scripts work.",
      items: ["Simple data dictionary", "Short connection guide", "Security settings walkthrough"],
      icon: <Layers className="w-4 h-4 text-emerald-600" />
    },
    {
      title: "User Training Kits",
      explanation: "Personal training materials to help your team feel confident using and managing the new dashboards.",
      items: ["Short, custom screen recordings", "Step-by-step practice steps", "Quick-reference PDF cheat sheets"],
      icon: <Video className="w-4 h-4 text-amber-600" />
    },
    {
      title: "Practical Next Steps",
      explanation: "Simple guidelines detailing how to grow your data setup, add new databases, or keep things fast as you grow.",
      items: ["Future growth roadmap", "Tooling comparison list", "Next phase ideas"],
      icon: <Compass className="w-4 h-4 text-teal-600" />
    }
  ];

  const audiences: TargetAudience[] = [
    {
      segment: "International Agencies",
      description: "Helping teams organize and track large regional assistance efforts and community datasets accurately.",
      typicalNeeds: ["Strict administrative security", "Multi-source regional ingestion", "Operational audit trails"],
      icon: <Globe className="w-5 h-5 text-blue-600" />
    },
    {
      segment: "Non-Profits & Charities",
      description: "Creating maps and resource reports to show program results clearly to volunteers and donors.",
      typicalNeeds: ["Low-bandwidth rendering", "Resource tracking dashboards", "Transparent public reports"],
      icon: <Building className="w-5 h-5 text-indigo-600" />
    },
    {
      segment: "Public Services & Offices",
      description: "Organizing community databases to clear up slow-downs and help local departments serve people faster.",
      typicalNeeds: ["Legacy API standardizations", "Inter-departmental schemas", "Compliant storage layers"],
      icon: <Library className="w-5 h-5 text-violet-600" />
    },
    {
      segment: "SMEs & Growing Businesses",
      description: "Automating messy spreadsheets and manual financial reports into clean, fast dashboards.",
      typicalNeeds: ["Custom multi-platform ETL", "Automated margin analytics", "Operational query optimization"],
      icon: <Building2 className="w-5 h-5 text-emerald-600" />
    },
    {
      segment: "Startups & New Venturers",
      description: "Building simple, flexible databases and reports that grow easily alongside your new products.",
      typicalNeeds: ["Agile star-schema modeling", "Real-time performance APIs", "Automated marketing ingestion"],
      icon: <Sparkles className="w-5 h-5 text-amber-600" />
    },
    {
      segment: "Academic Researchers",
      description: "Setting up clean, structured datasets and statistical summaries ready for study or review.",
      typicalNeeds: ["Clean CSV/SQL exports", "Complex descriptive analytics", "Methodology documentation"],
      icon: <GraduationCap className="w-5 h-5 text-teal-600" />
    }
  ];

  return (
    <div className="bg-brand-bg-primary py-12 md:py-20 font-sans text-slate-700 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-24">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Consulting Process"
          title="How We Work Together: The 7-Stage Process"
          description="A transparent, step-by-step process to help you understand exactly what happens after you contact me, how your project moves forward, and the practical tools you will receive."
          badge="Simple & Transparent"
          alignment="left"
        />

        {/* 7-Stage Visual Timeline */}
        <section id="framework-timeline-section" className="space-y-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold block mb-2">
              Our Journey
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900">
              From our first conversation to a working system
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Click on any stage to see the exact deliverables, checks, and outcomes we complete.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 pl-6 md:pl-10 ml-4 space-y-12">
            {stages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <div
                  key={stage.number}
                  id={`framework-stage-${stage.number}`}
                  className="relative group scroll-mt-24"
                >
                  {/* Timeline bullet node */}
                  <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    isSelected ? "border-blue-600 scale-125 shadow-xs" : "border-slate-300 group-hover:border-slate-600"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-600 transition-colors" />
                  </div>

                  {/* Stage Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Stage Title and explanation */}
                    <div className="lg:col-span-5 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          STAGE {stage.number}
                        </span>
                        <div className="p-1 bg-slate-50 border border-slate-100 rounded-md">
                          {stage.icon}
                        </div>
                      </div>
                      <h4
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveStage(isSelected ? null : idx);
                          }
                        }}
                        className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus:outline-none rounded px-1 -mx-1"
                        onClick={() => setActiveStage(isSelected ? null : idx)}
                        aria-expanded={isSelected}
                        aria-controls={`framework-stage-${stage.number}-details`}
                      >
                        {stage.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {stage.explanation}
                      </p>
                    </div>

                    {/* Stage Deliverables & Expected Outcome details Card */}
                    <div className="lg:col-span-7">
                      <motion.div
                        role="button"
                        tabIndex={0}
                        id={`framework-stage-${stage.number}-details`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveStage(idx);
                          }
                        }}
                        className={`border rounded-xl p-5 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus:outline-none ${
                          isSelected 
                             ? "bg-white border-blue-200 shadow-md scale-[1.01]" 
                            : "bg-slate-50/50 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-2xs"
                        }`}
                        onClick={() => setActiveStage(idx)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           
                          {/* Deliverables Column */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                              What we build
                            </span>
                            <ul className="space-y-1.5">
                              {stage.deliverables.map((item, dIdx) => (
                                <li key={dIdx} className="flex gap-1.5 text-[11px] text-slate-600 items-start">
                                  <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Outcome Column */}
                          <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                              Expected Outcome
                            </span>
                            <p className="text-[11px] text-slate-600 leading-relaxed italic">
                              "{stage.outcome}"
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Consulting Principles */}
        <section id="consulting-principles-section" className="space-y-12 pt-12 border-t border-slate-200/60">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold block mb-2">
              My Guidelines
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900">
              My Working Principles
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              The straightforward standards I bring to every database, script, and dashboard project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div
                key={i}
                id={`principle-card-${i}`}
                className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 hover:shadow-3xs transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {p.icon}
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {p.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Panel */}
        <section id="deliverables-panel-section" className="space-y-12 pt-12 border-t border-slate-200/60">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold block mb-2">
              Your Deliverables
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900">
              What You Receive from a Project
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Every file, guide, and dashboard is fully documented, easy to use, and owned entirely by your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverablesShowcase.map((del, i) => (
              <div
                key={i}
                id={`deliverable-item-${i}`}
                className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-6 hover:bg-white hover:border-slate-300 hover:shadow-2xs transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white border border-slate-100 rounded-md shadow-4xs">
                    {del.icon}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    {del.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {del.explanation}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    What we build:
                  </span>
                  <ul className="space-y-1">
                    {del.items.map((item, keyIdx) => (
                      <li key={keyIdx} className="flex gap-1.5 text-[10px] text-slate-600 font-mono">
                        <span className="text-indigo-500 select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who I Work With */}
        <section id="target-audience-section" className="space-y-12 pt-12 border-t border-slate-200/60">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold block mb-2">
              Who I Work With
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900">
              Teams & Organizations I Support
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Whether you are an international charity organizing regional programs, or a local business wanting to understand your neighborhood sales, the solutions are built to fit your exact goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audiences.map((aud, i) => (
              <div
                key={i}
                id={`audience-card-${i}`}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-3xs transition-all space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md">
                    {aud.icon}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">
                    {aud.segment}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {aud.description}
                </p>
                <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Typical Project Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {aud.typicalNeeds.map((need, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[9px] font-mono text-slate-600 bg-slate-50 border border-slate-200/85 px-2 py-0.5 rounded-md"
                      >
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Palantir/Deloitte-style Consultation CTA */}
        <section id="consultation-framework-cta" className="bg-slate-950 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-5 relative z-10">
            <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-bold block">
              Let's Discuss Your Project
            </span>
            <h3 className="text-2xl font-bold font-display tracking-tight leading-tight">
              Ready to simplify your business data?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Get in touch to talk about your databases, automate your reports, or clarify any questions you have about your numbers.
            </p>
            <div className="pt-3 flex flex-col items-center gap-3">
              <button
                onClick={() => onNavigate?.("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-md cursor-pointer"
              >
                Discuss Your Project
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <div className="text-[11px] text-slate-400">
                Prefer WhatsApp?{" "}
                <a
                  href={`https://wa.me/923112777061?text=${encodeURIComponent("Hello Mudassir,\n\nI visited your portfolio website and would like to discuss a project with you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discuss on WhatsApp with Mudassir"
                  className="text-blue-400 hover:text-blue-300 underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
