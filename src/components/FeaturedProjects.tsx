import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import ContentPlaceholder from "./ContentPlaceholder";
import ExecutiveCard from "./ExecutiveCard";

interface FeaturedProjectsProps {
  onNavigate: (pageId: string) => void;
}

const featuredCaseStudies = [
  {
    id: "saylani-form",
    category: "Workflow Automation",
    title: "Digital Student Registration System",
    summary: "A digital enrollment system replacing slow paper applications. Automatically validates applicant eligibility and logs entries in real time to handle massive volume.",
    outcomes: [
      "Completely replaced slow paper application files",
      "Automated applicant eligibility and background checks",
      "Drastically reduced enrollment processing times",
      "Structured student data securely stored in organized spreadsheets"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Dialogflow", "Google Apps Script", "Google Sheets"]
  },
  {
    id: "saylani-rotibank",
    category: "Operations Platform",
    title: "Digital Donation Management Platform",
    summary: "A logistics platform coordinating real-time food donations. Automatically tracks inventory levels and routes without manual phone coordination.",
    outcomes: [
      "Real-time tracking of incoming food donations",
      "Live inventory updates across all distribution centers",
      "Much higher transparency and community trust",
      "Eliminated manual phone coordination for pickups"
    ],
    technologies: ["React", "TypeScript", "Firebase", "Dialogflow", "Google Apps Script", "Google Sheets"]
  },
  {
    id: "weather-app",
    category: "Interactive Applications",
    title: "Weather Intelligence Platform",
    summary: "A fast, ad-free weather application with precise local forecasts and rain alerts designed for easy route planning and logistics coordination.",
    outcomes: [
      "Shows exact local weather based on user location",
      "Immediate rain warnings to help commuters prepare",
      "Debounced search saving considerable API traffic fees",
      "Visual display adapting dynamically to local temperature"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeatherMap API", "Geolocation API"]
  }
];

export default function FeaturedProjects({ onNavigate }: FeaturedProjectsProps) {
  const shouldReduceMotion = useReducedMotion();
  const handleProjectClick = (projectId: string) => {
    localStorage.setItem("selected-project-id", projectId);
    onNavigate("case-studies");
  };

  const projectFolderMap: Record<string, string> = {
    "saylani-form": "saylani-registration",
    "saylani-rotibank": "saylani-donation",
    "weather-app": "weather-intelligence",
    "job-applica": "job-application",
    "enterpret-steel": "enterpret-steel",
    "local-bi-framework": "local-seo",
    "lifedrop": "lifedrop",
    "executive-platform": "executive-dashboard",
  };

  return (
    <section 
      id="featured-projects" 
      className="py-16 md:py-20 bg-white border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Featured Consulting Case Studies"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Case Studies"
          title="Proven Projects & Real Results"
          description="See how I help businesses and organizations organize their data, automate manual tasks, and build practical tools."
          actions={
            <button
              onClick={() => onNavigate("case-studies")}
              className="self-start md:self-auto flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold tracking-wider uppercase rounded-xl border border-slate-200 transition-all duration-200 ease-out cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
            >
              Browse Full Project Directory
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />

        {/* Responsive Grid: Desktop (3), Tablet (2), Mobile (1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCaseStudies.map((proj, index) => {
            const variantType = index % 2 === 0 ? "left" : "right";
            const cardVariants = getRevealVariants(variantType, shouldReduceMotion);
            return (
              <ExecutiveCard
                key={proj.id}
                level={1}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                variants={cardVariants}
                onClick={() => handleProjectClick(proj.id)}
                className="h-full"
              >
              {/* Image Header Zone (45% of visual weight) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.015] group-hover:brightness-[1.01]">
                  <ContentPlaceholder
                    variant={proj.id === "weather-app" ? "dashboard" : "desktop screenshot"}
                    src={`/assets/projects/${projectFolderMap[proj.id] || proj.id}/desktop-01.webp`}
                    alt={`${proj.title} production capture`}
                    title={proj.title}
                    borderless={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content Zone */}
              <div className="p-5 md:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category & Live Badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="text-[9px] font-mono text-executive-blue uppercase tracking-widest font-bold bg-blue-50/50 px-2.5 py-0.5 rounded border border-blue-100">
                      {proj.category}
                    </span>
                    <div className="flex items-center gap-1.5 bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-emerald-700 uppercase tracking-widest font-bold">
                        Live / Functional
                      </span>
                    </div>
                  </div>

                  {/* Title & Two-Sentence Executive Summary */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="text-[24px] font-semibold text-slate-900 font-sans tracking-tight leading-[1.3]">
                      {proj.title}
                    </h3>
                    <p className="text-[16px] leading-[1.65] text-slate-600 font-sans">
                      {proj.summary}
                    </p>
                  </div>

                  {/* Business Outcome Panel */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-2.5 shadow-3xs mb-4">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-1 font-bold">
                      Verified Business Outcomes
                    </span>
                    <div className="space-y-1.5 text-[10.5px] text-slate-700">
                      {proj.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-sans font-medium text-slate-800 leading-normal">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Section: Technology Stack & Primary CTA */}
                <div className="border-t border-slate-200 pt-4 mt-1 space-y-3">
                  {/* Technology chips row */}
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((tool, idx) => (
                      <span 
                        key={idx} 
                        className="text-[13px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Direct CTA */}
                  <button
                    onClick={() => handleProjectClick(proj.id)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-executive-blue hover:text-blue-700 font-sans tracking-wider uppercase pt-0.5 group/btn cursor-pointer transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 rounded-xl px-2 -mx-2 py-1"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </ExecutiveCard>
          );
          })}
        </div>
      </div>
    </section>
  );
}
