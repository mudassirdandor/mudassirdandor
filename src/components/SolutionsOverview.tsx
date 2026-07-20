import React from "react";
import { ChevronRight, Cpu, Map } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveCard from "./ExecutiveCard";

interface SolutionsOverviewProps {
  onNavigate: (pageId: string) => void;
}

export default function SolutionsOverview({ onNavigate }: SolutionsOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  const specialties = [
    {
      category: "Data & Automation",
      title: "Understand Your Data & Automate Workflows",
      desc: "I integrate spreadsheets and databases into automated dashboards, eliminating manual copying so you can track metrics with absolute confidence.",
      icon: <Cpu className="w-6 h-6 text-executive-blue" />,
      chips: ["Dashboards", "Automation", "Reporting", "Decision Support"],
      linkTo: "solutions"
    },
    {
      category: "Local Maps & Visibility",
      title: "Grow Your Local Presence & Attract Customers",
      desc: "I optimize Google Maps profiles and search presence for local businesses, ensuring nearby customers find and contact you first.",
      icon: <Map className="w-6 h-6 text-executive-blue" />,
      chips: ["Local SEO", "Maps", "Reputation", "Lead Generation"],
      linkTo: "solutions"
    }
  ];

  return (
    <section 
      id="solutions-overview" 
      className="py-24 bg-slate-50 border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Capabilities Overview"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Core Capabilities"
          title="How I Deliver Results"
          description="I design and deploy practical systems that help organizations optimize operations, automate workflows, and make better decisions through technology and data."
        />

        {/* Dual Specialty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specialties.map((spec, index) => {
            const variantType = index === 0 ? "left" : "right";
            const cardVariants = getRevealVariants(variantType, shouldReduceMotion);
            return (
              <ExecutiveCard
                key={index}
                level={1}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                variants={cardVariants}
                onClick={() => onNavigate(spec.linkTo)}
                className="h-full"
              >
                <div className="p-6 md:p-8 flex flex-col justify-between h-full w-full">
                  <div className="space-y-5">
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-[12px] font-sans text-executive-blue uppercase tracking-wider font-semibold">
                        {spec.category}
                      </span>
                      <div className="p-2 bg-slate-50 border border-slate-150 rounded-xl">
                        {spec.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-[24px] font-semibold text-slate-950 font-sans leading-[1.3] tracking-tight">
                        {spec.title}
                      </h3>
                      <p className="text-[15px] text-slate-650 leading-relaxed font-sans">
                        {spec.desc}
                      </p>
                    </div>

                    {/* Capability Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {spec.chips.map((chip, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center bg-slate-50 border border-slate-150 text-slate-700 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: CTA ONLY */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(spec.linkTo);
                      }}
                      className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-50 hover:bg-slate-150 text-slate-700 text-[15px] font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs group/btn"
                    >
                      View Details
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover/btn:translate-x-1" />
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

