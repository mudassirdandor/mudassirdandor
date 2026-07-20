import React from "react";
import { motion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import ProblemSolutionCard from "./ProblemSolutionCard";
import { 
  BarChart3, 
  Workflow, 
  LineChart, 
  Bot, 
  MapPin, 
  Laptop, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface SolutionsProps {
  onNavigate: (pageId: string) => void;
}

export default function Solutions({ onNavigate }: SolutionsProps) {
  const solutionsData = [
    {
      category: "Business Intelligence",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      problemTitle: "Our business data is scattered across disconnected spreadsheets.",
      problemDescription: "When sales records, costs, and customer information live in isolated files, you cannot get a clear view of how your business or organization is actually performing.",
      symptoms: [
        "Spending hours manually copying and pasting numbers to build weekly reports",
        "Different files showing conflicting numbers for the same metrics",
        "Relying on slow, gut-feeling decisions because you lack clear, up-to-date summaries"
      ],
      solution: "I connect your scattered spreadsheets and databases into a single, clean visual dashboard. Your key metrics update automatically, giving your team and managers instant, reliable progress reports.",
      technologyList: ["Power BI", "SQL", "Python"],
      relatedProject: "Executive Dashboard",
      expectedOutcome: "You can check your core results in seconds, spot business trends early, and save hours of manual data compiling every single week.",
      ctaText: "Discuss This Solution",
      badge: "Clear Insights",
      relatedCaseStudy: { title: "Sales Analysis Dashboard", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "What Is Business Intelligence?", pageId: "insights" }
    },
    {
      category: "Workflow Automation",
      icon: <Workflow className="w-5 h-5 text-indigo-600" />,
      problemTitle: "Our team loses valuable hours repeating the same manual tasks.",
      problemDescription: "Doing repetitive data entry, manually copying contact details from web forms, and sending identical template emails one-by-one keeps your staff from focusing on growth.",
      symptoms: [
        "Wasting time manually copying user records between web apps and worksheets",
        "Sending standard email follow-ups by hand, leading to delayed replies",
        "Frequent data mistakes, typos, and double-entry errors"
      ],
      solution: "I write simple, automatic scripts that connect your spreadsheets, email, and daily business tools. When a client fills out a form, your records update instantly and automated emails send out immediately.",
      technologyList: ["Apps Script", "Google Sheets", "Gmail", "REST APIs"],
      relatedProject: "Student Registration System",
      expectedOutcome: "Repetitive steps are handled automatically behind the scenes, reducing human errors and saving your team valuable hours every day.",
      ctaText: "Talk About Your Project",
      badge: "Time Saver",
      relatedCaseStudy: { title: "Digital Student Registration Platform", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "Optimizing DAX Calculation Speed", pageId: "insights" }
    },
    {
      category: "Data Analytics",
      icon: <LineChart className="w-5 h-5 text-blue-500" />,
      problemTitle: "We collect customer data but do not know how to spot trends.",
      problemDescription: "You might have lists of transactions, customer feedback, or sign-ups, but without proper charts, it is difficult to see which products, services, or seasons are driving growth.",
      symptoms: [
        "Not knowing which services or customer groups are your most profitable",
        "Struggling to anticipate busy seasons or shifts in customer demand",
        "Drowning in rows of numbers without clear charts to guide your decisions"
      ],
      solution: "I clean and structure your raw customer records, applying straightforward statistical methods to show you clear patterns, seasonal trends, and realistic forecasts.",
      technologyList: ["Python", "R", "SQL", "Power BI"],
      relatedProject: "Analytics Projects",
      expectedOutcome: "You get clear trend charts and practical demand forecasts to help you plan stock levels, staffing, or budgets with confidence.",
      ctaText: "Start a Conversation",
      badge: "Smart Analytics",
      relatedCaseStudy: { title: "SaaS Customer Churn Modeling", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "Optimizing DAX Calculation Speed", pageId: "insights" }
    },
    {
      category: "AI Automation",
      icon: <Bot className="w-5 h-5 text-emerald-600" />,
      problemTitle: "Our specialists spend too much time drafting routine summaries.",
      problemDescription: "Whether it is summarizing lengthy client feedback, organizing massive files of text, or writing repetitive monthly summaries, manual document prep slows down your operations.",
      symptoms: [
        "Spending hours reading long text logs to write standard status updates",
        "Delays in updating customers or partners because writing reports takes too long",
        "Losing focus on client strategy because teams are stuck drafting routine paperwork"
      ],
      solution: "I set up practical AI-assisted systems to draft initial report outlines, summarize customer comments, and organize text documents. Your team always retains full control to review and edit the draft.",
      technologyList: ["Gemini", "OpenAI", "Python"],
      relatedProject: "AI Reporting Automation",
      expectedOutcome: "Large text files are summarized in seconds, allowing your team to complete routine reporting tasks quickly and respond to clients faster.",
      ctaText: "Discuss This Solution",
      badge: "AI Summaries",
      relatedCaseStudy: { title: "Executive Decision Intelligence Platform", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "Human-in-the-Loop AI Reporting", pageId: "insights" }
    },
    {
      category: "Local Business Intelligence",
      icon: <MapPin className="w-5 h-5 text-emerald-500" />,
      problemTitle: "Nearby clients cannot find our office or store on Google Maps.",
      problemDescription: "If your clinic, local store, or regional office does not appear on top of local search results when nearby clients need your services, you lose valuable phone calls to competitors.",
      symptoms: [
        "Your business listing failing to show up when customers search nearby",
        "Outdated or unoptimized profiles with missing contact details or low views",
        "Struggling to understand which local search terms are bringing you phone calls"
      ],
      solution: "I optimize your Google Business profile and map details, analyzing local search terms and nearby competitor locations to ensure your business listing gets found easily.",
      technologyList: ["Google Business Profile", "SEO", "Analytics"],
      relatedProject: "Quetta Local SEO Expert",
      expectedOutcome: "Much better visibility on Google Maps, making it easy for local clients to call, get directions, or visit your location.",
      ctaText: "Talk About Your Project",
      badge: "Google Maps",
      relatedCaseStudy: { title: "Executive Decision Intelligence Platform", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "Local BI: Leveraging Maps Analytics", pageId: "insights" }
    },
    {
      category: "Custom Web Solutions",
      icon: <Laptop className="w-5 h-5 text-slate-800" />,
      problemTitle: "Our sign-up and customer onboarding forms are slow and outdated.",
      problemDescription: "Relying on paper files, slow PDFs, or outdated web forms creates a frustrating experience for your clients and forces your staff to re-type registration details manually.",
      symptoms: [
        "Forcing clients or students to download and print physical registration forms",
        "Onboarding forms that look broken, feel slow, or are hard to use on mobile screens",
        "Staff wasting time manually re-typing form submissions into your main records"
      ],
      solution: "I build simple, secure, and mobile-friendly custom web portals. Your customers can easily sign up on any device, with all data immediately sent to your organized databases.",
      technologyList: ["React", "TypeScript", "Tailwind", "Dialogflow", "Apps Script"],
      relatedProject: "Saylani Projects",
      expectedOutcome: "An easy, modern sign-up process that reduces customer friction and saves your staff from manually copying files.",
      ctaText: "Start a Conversation",
      badge: "Custom Web Portals",
      relatedCaseStudy: { title: "Digital Student Registration Platform", pageId: "case-studies" },
      relatedKnowledgeArticle: { title: "What Is Business Intelligence?", pageId: "insights" }
    }
  ];

  const handleCtaClick = () => {
    onNavigate("contact");
  };

  return (
    <section className="py-20 bg-slate-50 min-h-screen relative overflow-hidden" aria-labelledby="solutions-title">
      {/* Decorative desaturated top light bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-blue-500/[0.02] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="My Solutions"
          title="How I Help Your Business Succeed"
          description="I build straightforward digital tools to solve your daily business challenges. Explore six core areas where we can work together to organize your records, automate repetitive tasks, and grow your local presence."
        />

        {/* Professional Core Framework Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-16 shadow-2xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono">
                A Practical, Human Approach to Technology
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">MY STEP-BY-STEP WORKING PROCESS</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 text-left pt-2">
            {[
              { step: "01", label: "Listen First", desc: "We discuss your daily business challenges." },
              { step: "02", label: "Find Root Causes", desc: "Identify exactly where things slow down." },
              { step: "03", label: "Design the Tool", desc: "Plan a simple, practical digital solution." },
              { step: "04", label: "Choose the Stack", desc: "Select reliable, easy-to-use software." },
              { step: "05", label: "Build & Test", desc: "Create the system and double-check it." },
              { step: "06", label: "Deliver Results", desc: "Save you time and manual effort." },
              { step: "07", label: "Stay in Touch", desc: "Provide friendly support whenever needed." }
            ].map((method, idx) => (
              <div key={idx} className="relative p-3 bg-slate-50 border border-slate-100/80 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-blue-500 font-extrabold">{method.step}</span>
                <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">{method.label}</h4>
                <p className="text-[10px] text-slate-500 leading-snug">{method.desc}</p>
                {idx < 6 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {solutionsData.map((sol, index) => (
            <ProblemSolutionCard
              key={index}
              icon={sol.icon}
              category={sol.category}
              problemTitle={sol.problemTitle}
              problemDescription={sol.problemDescription}
              symptoms={sol.symptoms}
              solution={sol.solution}
              technologyList={sol.technologyList}
              relatedProject={sol.relatedProject}
              expectedOutcome={sol.expectedOutcome}
              ctaText={sol.ctaText}
              onCtaClick={handleCtaClick}
              badge={sol.badge}
              relatedCaseStudy={sol.relatedCaseStudy}
              relatedKnowledgeArticle={sol.relatedKnowledgeArticle}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Global Closing Callout */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-radial-gradient from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">
              GET IN TOUCH
            </span>
            <h3 className="text-xl md:text-3xl font-extrabold font-display tracking-tight">
              Ready to simplify your business operations?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Let's talk about your project and find the easiest, most practical way to organize your data, automate your spreadsheets, or boost your local visibility.
            </p>
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer"
              >
                Discuss Your Project →
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
        </div>
      </div>
    </section>
  );
}
