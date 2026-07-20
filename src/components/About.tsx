import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PresenceAndKnowledge from "./PresenceAndKnowledge";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import Expertise from "./Expertise";
import ContentPlaceholder from "./ContentPlaceholder";
import { 
  Compass, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Layers, 
  Lock, 
  Cpu,
  Sparkles,
  TrendingUp,
  Github
} from "lucide-react";

interface PhilosophyItem {
  id: string;
  title: string;
  short: string;
  expanded: string;
  metric: string;
}

interface LearningTheme {
  title: string;
  desc: string;
  contribution: string;
  icon: React.ComponentType<{ className?: string }>;
}

const philosophyList: PhilosophyItem[] = [
  {
    id: "evidence",
    title: "Evidence before assumptions",
    short: "Every project starts by looking at the facts. We test our assumptions against real numbers before drawing conclusions or making decisions.",
    expanded: "In practice, this means checking where data comes from before building reports. By auditing the records, looking for missing details, and cleaning up inconsistencies, we make sure you are making decisions based on accurate information.",
    metric: "SIGNAL VALIDATION"
  },
  {
    id: "business-first",
    title: "Business questions before technology",
    short: "A reporting tool is only useful if it answers your real-world questions. I start by understanding what you need to decide, then choose the simplest tools to help you get there.",
    expanded: "Instead of choosing database systems or visualization tools just because they are trendy, we focus on the specific questions you face daily. Once we know what answers you need, we set up the database and reports to deliver exactly that.",
    metric: "PRACTICAL SOLUTIONS"
  },
  {
    id: "communication",
    title: "Clear communication creates better decisions",
    short: "Data shouldn't be confusing. I translate complex databases and formulas into clear, simple reports that anyone on your team can understand immediately.",
    expanded: "Technical databases are only helpful if people can actually use them. I focus on creating clean, intuitive screens so you and your team can check performance in seconds, without needing a technical degree.",
    metric: "CLEAR REPORTING"
  },
  {
    id: "improvement",
    title: "Continuous improvement over perfection",
    short: "Getting a reliable, simple dashboard up and running quickly is far better than waiting months for a 'perfect' system that might not fit your actual needs.",
    expanded: "I believe in building a solid, working version first. This gives your team immediate value and allows us to refine the report based on how you actually use it in your daily work.",
    metric: "HELPFUL STEP-BY-STEP"
  },
  {
    id: "responsible-ai",
    title: "Responsible AI supports human judgment",
    short: "AI tools and automation are great for speeding up repetitive work, but they always need a human check and oversight.",
    expanded: "I use language models and automated scripts to handle typing tasks, sort comments, or summarize reports quickly. But I always keep a human in the loop to double-check the accuracy and protect your privacy.",
    metric: "SAFE AUTOMATION"
  }
];

const workSteps = [
  {
    step: "01",
    title: "Understand the Goal",
    description: "We discuss what decisions you need to make, what is currently slowing your team down, and what a successful project looks like."
  },
  {
    step: "02",
    title: "Find the Numbers",
    description: "We identify where your business information is saved—whether in spreadsheets, emails, an online system, or a local database."
  },
  {
    step: "03",
    title: "Clean up the Records",
    description: "We remove double entries, fix typos, fill in missing details, and make sure everything is accurate and organized."
  },
  {
    step: "04",
    title: "Look for Trends",
    description: "We analyze the clean data to find busy periods, identify customer behaviors, and separate real patterns from daily fluctuations."
  },
  {
    step: "05",
    title: "Create Simple Reports",
    description: "We build clean, easy-to-read dashboards and charts so you can see exactly how your business is doing in seconds."
  },
  {
    step: "06",
    title: "Plan Next Steps",
    description: "We write a brief, plain-English summary of what the data shows and outline practical steps your team can take."
  },
  {
    step: "07",
    title: "Keep Improving",
    description: "We check back to see how the new tools are working for your team and make simple updates as your business grows."
  }
];

const learningThemes: LearningTheme[] = [
  {
    title: "Business Intelligence",
    desc: "Designing clear dashboard tables, automated data pipelines, and clean databases.",
    contribution: "Provides leadership with real-time operational visibility and unified cross-department metrics.",
    icon: Layers
  },
  {
    title: "Advanced Analytics",
    desc: "Predictive modeling, regression diagnostics, and automated anomaly detection.",
    contribution: "Helps businesses understand their numbers and prepare for busy seasons.",
    icon: TrendingUp
  },
  {
    title: "Statistics",
    desc: "Probability distributions, hypothesis testing bounds, and sample variance control.",
    contribution: "Ensures data-driven conclusions are empirically sound and backed by mathematical significance.",
    icon: Activity
  },
  {
    title: "Artificial Intelligence",
    desc: "Generative AI APIs, intelligent automation workflows, and retrieval architectures.",
    contribution: "Speeds up text sorting, summarizes long files, and saves hours of reading.",
    icon: Cpu
  },
  {
    title: "Data Visualization",
    desc: "Visual hierarchy principles, cognitive design, and custom dashboard layouts.",
    contribution: "Keeps dashboards simple and easy to read so you can spot trends instantly.",
    icon: FileText
  },
  {
    title: "Automation",
    desc: "Cron-scheduled scripts, API routing, and pipeline triggers.",
    contribution: "Handles repetitive copying tasks so your team can focus on their main work.",
    icon: Sparkles
  },
  {
    title: "Project Management",
    desc: "Agile alignment, strategic framing, and cross-functional scoping.",
    contribution: "Keeps database updates on track and aligned with your team's schedule.",
    icon: Briefcase
  },
  {
    title: "Cybersecurity Awareness",
    desc: "Role-based row-level database security, secure API protocols, and privacy standards.",
    contribution: "Helps protect your business files and customer records using standard security practices.",
    icon: Lock
  }
];

const professionalValues = [
  {
    title: "Integrity",
    description: "Delivering completely honest analyses, presenting the actual facts of your business performance with absolute clarity."
  },
  {
    title: "Analytical Curiosity",
    description: "Looking closely at underlying database tables to find hidden trends, quiet seasons, or opportunities to save costs."
  },
  {
    title: "Transparency",
    description: "Documenting database sources, formulas, and definitions clearly so your team can easily check and verify the numbers."
  },
  {
    title: "Responsible AI",
    description: "Using automated tools in safe, private ways that keep your business and customer files completely secure."
  },
  {
    title: "Continuous Learning",
    description: "Regularly learning new tools, statistical methods, and coding practices to bring the best ideas to your projects."
  },
  {
    title: "Evidence-Based Decision Making",
    description: "Making decisions based on real, checked facts rather than gut feeling or unverified guesses."
  },
  {
    title: "Professional Accountability",
    description: "Taking full personal responsibility for the accuracy, security, and reliability of every spreadsheet, script, and dashboard I build."
  }
];

interface AboutProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Professional biography and philosophical framework component.
 * Exhibits strategic analytical axioms, expandable implementation paradigms, 
 * standard workflows, and ongoing learning themes.
 */
export default function About({ onNavigate }: AboutProps) {
  const [expandedPhilosophies, setExpandedPhilosophies] = useState<Record<string, boolean>>({
    evidence: true // Pre-expanded to guide user interaction
  });

  const togglePhilosophy = (id: string) => {
    setExpandedPhilosophies(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="about" 
      className="relative py-24 bg-brand-bg-primary text-brand-body px-6 md:px-8 border-t border-slate-200 overflow-hidden"
      aria-label="Professional Philosophy & Journey"
    >
      {/* McKinsey-style minimal light backgrounds */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-executive-blue" />
              <span className="font-mono text-[10px] tracking-widest text-executive-blue uppercase font-semibold">
                Mindset & Approach
              </span>
            </div>
          }
          title="Professional Mindset & Journey"
          description="The practical principles, ongoing learning, and curiosity that guide how I build helpful digital systems."
        />

        {/* SECTION 1: Why Business Intelligence & Academic Foundation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Why Business Intelligence */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.02] rounded-full blur-[60px] pointer-events-none" />
            
            <div className="space-y-5">
              <span className="text-[12px] font-mono text-executive-blue uppercase tracking-widest font-bold block">
                01 • Why Data Matters
              </span>
              <h3 className="text-[20px] md:text-[22px] font-extrabold text-slate-950 tracking-tight font-sans">
                Why Business Intelligence
              </h3>
              
              {/* Responsive Portrait & Text Integration Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-4">
                  <p className="text-[16px] md:text-[17px] text-slate-700 leading-relaxed font-normal">
                    At its core, Business Intelligence is about helping people see what is actually happening in their organization so they can make decisions with confidence. In any business, team members and managers are flooded with numbers from different tools, emails, and spreadsheets. My job is to step in, organize that information, and translate it into clear, simple paths forward.
                  </p>
                  <p className="text-[16px] md:text-[17px] text-slate-700 leading-relaxed font-normal">
                    I have always had a deep curiosity about how things work. By looking closely at the details and checking the numbers, I help teams spot patterns and make choices based on clear, reliable evidence rather than guesswork.
                  </p>
                </div>
                
                {/* SPRINT 5.0 Professional Portrait Placeholder */}
                <div className="md:col-span-4 h-full flex flex-col justify-center">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-2 text-center font-semibold">Executive Portrait</span>
                  <ContentPlaceholder
                    variant="portrait"
                    src="/assets/portraits/portrait-about.webp"
                    alt="Mudassir Javed - Executive Biography Portrait"
                    title="Mudassir Javed Portrait"
                    className="w-full max-w-[160px] mx-auto rounded-xl overflow-hidden"
                  />
                </div>
              </div>
            </div>

            {/* SPRINT 5.0 Authorized Signature Integration */}
            <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2.5 text-[12px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-executive-blue" />
                <span>ACCURATE DATA • CLEAR CHOICES</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">Verified Lead:</span>
                <div className="w-24 h-8 text-slate-500/80">
                  <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" stroke="currentColor">
                    <path d="M10,20 Q25,5 35,25 T60,10 T85,22 T95,12" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Academic Foundation */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/[0.02] rounded-full blur-[60px] pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="text-[12px] font-mono text-emerald-600 uppercase tracking-widest font-bold">
                  02 • My Background
                </span>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-extrabold text-slate-950 tracking-tight">
                Academic Foundation
              </h3>
              <p className="text-[13px] font-mono text-slate-600 font-semibold uppercase tracking-wider">
                MSc in Statistics • Applying Science to Everyday Business
              </p>
              <p className="text-[16px] text-slate-700 leading-relaxed font-sans">
                Studying for my MSc in Statistics taught me to look at data with a careful, objective eye. It showed me that data is never just a collection of numbers on a screen—it is a story of how a business or organization is performing.
              </p>
              <p className="text-[16px] text-slate-700 leading-relaxed font-sans">
                When looking at a dashboard, it is easy to mistake a brief seasonal spike for a long-term trend. Applying statistical principles helps ensure that the patterns we see are real, giving your team solid, dependable facts to build on.
              </p>

              {/* SPRINT 5.0 Workspace Image Placeholder */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-2 font-semibold">Pilot Workspace Station</span>
                <ContentPlaceholder
                  variant="dashboard"
                  src="/assets/dashboards/workspace.webp"
                  alt="Corporate development pilot workspace showing multi-monitor telemetry setups"
                  title="Mudassir Javed Analytical Workspace"
                  className="w-full h-28 rounded-lg"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-6 flex flex-wrap gap-2 text-[12px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">Probability Theory</span>
              <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">Statistical Reasoning</span>
              <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">Evidence Evaluation</span>
            </div>
          </div>

        </div>

        {/* SECTION 2: My Analytical Philosophy (Expandable Cards) */}
        <div className="mb-20 space-y-6">
          <div className="space-y-1">
            <span className="text-[12px] font-mono text-slate-500 uppercase tracking-widest pl-1 block font-bold">
              My Guidelines
            </span>
            <h3 className="text-[26px] md:text-[30px] font-extrabold text-slate-950 tracking-tight">
              How I Approach Every Project
            </h3>
            <p className="text-[16px] text-slate-700 font-sans">
              Five straightforward guidelines that keep my work accurate, useful, and secure. Click a card to read more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {philosophyList.map((item) => {
              const isExpanded = !!expandedPhilosophies[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => togglePhilosophy(item.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer ${
                    isExpanded 
                      ? "bg-blue-50/20 border-blue-500/30 col-span-1 md:col-span-2 md:row-span-1 shadow-sm" 
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Subtle inner highlight card glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-colors ${
                    isExpanded ? "bg-blue-500/10" : "bg-slate-50/50"
                  }`} />

                  <div className="space-y-3.5 w-full">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                        {item.metric}
                      </span>
                      <span className={`text-[11px] font-mono font-bold transition-all px-1.5 py-0.5 rounded border ${
                        isExpanded 
                          ? "text-blue-600 border-blue-200 bg-blue-50" 
                          : "text-slate-400 border-slate-100 group-hover:text-slate-600"
                      }`}>
                        {isExpanded ? "ACTIVE BRIEF" : "EXPAND CONTEXT"}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[16px] md:text-[18px] font-bold text-slate-950 tracking-tight group-hover:text-executive-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[15px] text-slate-700 leading-relaxed font-sans">
                        {item.short}
                      </p>
                    </div>

                    {/* Expandable Box */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-slate-100 pt-3.5 mt-2"
                        >
                          <span className="text-[11px] font-mono text-executive-blue uppercase tracking-widest block font-bold mb-1">
                            Executive Context & Real-World Application
                          </span>
                          <p className="text-[15px] text-slate-800 leading-relaxed italic font-sans">
                            "{item.expanded}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: How I Work (Mindset Visual Workflow) */}
        <div className="mb-20 space-y-6">
          <div className="space-y-1">
            <span className="text-[12px] font-mono text-slate-500 uppercase tracking-widest pl-1 block font-bold">
              Step-by-Step Process
            </span>
            <h3 className="text-[26px] md:text-[30px] font-extrabold text-slate-950 tracking-tight">
              How We Work Together
            </h3>
            <p className="text-[16px] text-slate-700 font-sans">
              A simple, step-by-step approach to turning messy business numbers into clear answers you can use.
            </p>
          </div>

          {/* Visual rail workflow */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
            
            {/* Background connectors for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 z-0 pointer-events-none" />

            {workSteps.map((s, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl p-5 relative z-10 flex flex-col justify-between min-h-[140px] hover:border-slate-300 shadow-sm transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      PHASE
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-950 tracking-tight leading-snug">
                    {s.title}
                  </h4>
                </div>

                <p className="text-[15px] text-slate-700 leading-relaxed pt-3 border-t border-slate-100 mt-2 font-sans">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => onNavigate?.("consulting")}
              className="inline-flex items-center gap-2 text-[13px] font-mono font-bold text-blue-600 hover:text-blue-500 cursor-pointer transition-colors"
            >
              Explore the 7-Stage Consulting Framework →
            </button>
          </div>
        </div>

        {/* SECTION 4 & SECTION 6: Continuous Learning & Professional Values Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Continuous Learning Themes (Col 1 - 7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="space-y-1.5">
              <span className="text-[12px] font-mono text-executive-blue uppercase tracking-widest font-bold block">
                Areas of Focus
              </span>
              <h3 className="text-[20px] md:text-[22px] font-extrabold text-slate-950 tracking-tight font-display">
                Continuous Learning
              </h3>
              <p className="text-[16px] text-slate-700 font-sans leading-relaxed">
                Technology changes quickly. I constantly keep my skills sharp in statistics, databases, and automation so I can build the most reliable and efficient systems for your team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {learningThemes.map((theme, i) => {
                const Icon = theme.icon;
                return (
                  <div 
                    key={i} 
                    className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-[16px] font-bold text-slate-950 font-sans">
                          {theme.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-slate-700 leading-normal font-sans">
                        {theme.desc}
                      </p>
                    </div>

                    <div className="text-[13px] text-slate-700 leading-relaxed font-mono bg-white px-2.5 py-1.5 rounded border border-slate-100 mt-2">
                      <span className="text-executive-blue font-bold block text-[11px] uppercase tracking-wider mb-0.5">Value Contribution:</span>
                      {theme.contribution}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SPRINT 5.0 Career Timeline Graphics Placeholder */}
            <div className="border-t border-slate-100 pt-4 mt-2">
              <span className="text-[12px] font-mono text-slate-500 uppercase tracking-widest block mb-2 font-bold">Professional Career Milestones</span>
              <ContentPlaceholder
                variant="workflow"
                src="/assets/workflows/career-timeline.webp"
                alt="Strategic Career Timeline - 2020 to Present"
                title="Professional Career Journey & Evolution"
                className="w-full h-32 rounded-lg"
              />
            </div>
          </div>

          {/* Professional Values (Col 2 - 5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1.5">
              <span className="text-[12px] font-mono text-emerald-600 uppercase tracking-widest font-bold block">
                My Standard
              </span>
              <h3 className="text-[20px] md:text-[22px] font-extrabold text-slate-950 tracking-tight font-display">
                What I Stand For
              </h3>
              <p className="text-[16px] text-slate-700 font-sans leading-relaxed">
                The core standards I bring to every spreadsheet, script, and database project.
              </p>
            </div>

            <div className="space-y-3.5">
              {professionalValues.map((v, idx) => (
                <div key={idx} className="space-y-0.5 pl-3 border-l-2 border-emerald-500/30 hover:border-emerald-500/50 transition-colors py-0.5 text-left">
                  <h4 className="text-[16px] font-bold text-slate-950 flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {v.title}
                  </h4>
                  <p className="text-[15px] text-slate-700 leading-normal font-sans">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[12px] font-mono text-slate-500 pt-4 border-t border-slate-100 flex items-center gap-1.5 mt-4 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>GUARANTEED ACCOUNTABILITY FRAMEWORK</span>
            </div>
          </div>

        </div>

        {/* SPRINT 6.1: Verified Presence Hub & AI Knowledge Graph (AEO/GEO Optimized) */}
        <PresenceAndKnowledge />

        {/* SECTION: About this Portfolio */}
        <div id="about-portfolio" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-sm mb-20 max-w-4xl mx-auto">
          <div className="space-y-1.5">
            <span className="text-[12px] font-mono text-executive-blue uppercase tracking-widest font-bold block">
              Portfolio Integrity
            </span>
            <h3 className="text-[20px] md:text-[22px] font-extrabold text-slate-950 tracking-tight font-display">
              About this Portfolio
            </h3>
            <p className="text-[15px] text-slate-700 font-sans leading-relaxed">
              This interactive digital command center serves as both a professional bio and a functional demonstration of software engineering principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="text-[14px] font-bold text-slate-950 font-sans uppercase tracking-wider text-executive-blue">
                Why It Was Built
              </h4>
              <p className="text-[14px] text-slate-700 leading-relaxed font-sans">
                Built as a high-fidelity business intelligence environment to show how data modeling, automation, and conversational AI companions integrate seamlessly into daily operations. It acts as a live playground for technical ideas rather than just a static list of links.
              </p>
              
              <h4 className="text-[14px] font-bold text-slate-950 font-sans uppercase tracking-wider text-executive-blue pt-2">
                System Architecture
              </h4>
              <p className="text-[14px] text-slate-700 leading-relaxed font-sans">
                Features a single-page application router with modular, stateful context boundaries, dynamic client-side simulation matrix modeling, and high-performance layout rendering with smooth transitions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[14px] font-bold text-slate-950 font-sans uppercase tracking-wider text-executive-blue">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Google Apps Script", "Gemini API", "Local Storage"].map((tech) => (
                  <span key={tech} className="text-[12px] font-mono bg-slate-50 text-slate-700 px-2.5 py-1 rounded border border-slate-200/80 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-[14px] font-bold text-slate-950 font-sans uppercase tracking-wider text-executive-blue pt-3">
                Repository Access
              </h4>
              <p className="text-[14px] text-slate-700 leading-relaxed font-sans pb-1">
                The codebase for this portfolio, along with deployment scripts and database schemas, is fully open source.
              </p>
              <div className="pt-1">
                <a 
                  href="https://github.com/mudassirdandor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  View Portfolio on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: Professional Commitment */}
        <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-emerald-50/50 border border-slate-200 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden max-w-4xl mx-auto shadow-sm">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="px-3 py-1 text-[12px] font-mono rounded-full border text-blue-600 bg-blue-50 border-blue-100 uppercase tracking-widest inline-block font-bold">
              My Promise
            </span>
            <blockquote className="text-[18px] md:text-[20px] font-extrabold text-slate-900 tracking-wide leading-relaxed italic font-sans">
              "I believe digital systems and data dashboards should simplify your work, provide absolute clarity, and help you run your business with confidence."
            </blockquote>
          </div>
        </div>

      </div>

      {/* Verified Credentials / Professional Certifications at the bottom (Merged into dynamic route bundle) */}
      <div className="bg-brand-bg-primary pb-20">
        <Expertise showFramework={false} showCertifications={true} />
      </div>
    </section>
  );
}
