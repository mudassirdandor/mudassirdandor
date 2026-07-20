import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, AlertTriangle, Cpu, HelpCircle } from "lucide-react";
import ExecutiveCard from "./ExecutiveCard";

export interface ProblemSolutionCardProps {
  icon: React.ReactNode;
  category: string;
  problemTitle: string;
  problemDescription: string;
  symptoms: string[];
  solution: string;
  technologyList: string[];
  relatedProject: string;
  expectedOutcome: string;
  ctaText: string;
  onCtaClick: () => void;
  badge?: string;
  // SPRINT 3.5 ADDITIONS
  relatedCaseStudy?: { title: string; pageId: string };
  relatedKnowledgeArticle?: { title: string; pageId: string };
  onNavigate?: (pageId: string) => void;
}

export default function ProblemSolutionCard({
  icon,
  category,
  problemTitle,
  problemDescription,
  symptoms,
  solution,
  technologyList,
  relatedProject,
  expectedOutcome,
  ctaText,
  onCtaClick,
  badge,
  relatedCaseStudy,
  relatedKnowledgeArticle,
  onNavigate,
}: ProblemSolutionCardProps) {
  return (
    <ExecutiveCard
      level={1}
      className="p-6 md:p-8 relative overflow-hidden h-full"
    >
      {/* Visual Accent Top Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-transparent z-10 pointer-events-none" />

      <div className="space-y-6 flex flex-col justify-between h-full w-full">
        {/* Header: Icon, Category & Optional Badge */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 shadow-3xs shrink-0">
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                {category}
              </span>
            </div>
          </div>
          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
              {badge}
            </span>
          )}
        </div>

        {/* Problem Section */}
        <div className="space-y-2">
          <div className="flex items-start gap-1.5">
            <span className="text-[9px] font-mono font-extrabold uppercase bg-red-50 text-red-500 px-1.5 py-0.5 rounded border border-red-100 shrink-0 mt-1">
              Problem
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 font-display">
              {problemTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            {problemDescription}
          </p>
        </div>

        {/* Common Symptoms */}
        <div className="space-y-2 bg-slate-50/50 rounded-xl p-3.5 border border-slate-100/80">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold">
            <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Common Symptoms & Friction Points</span>
          </div>
          <ul className="grid grid-cols-1 gap-1.5">
            {symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                <span className="text-amber-500 font-semibold select-none mt-0.5">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Section */}
        <div className="space-y-2.5 border-t border-dashed border-slate-200/80 pt-4">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Consultant Resolution</span>
          </div>
          <p className="text-xs font-semibold text-slate-800 leading-relaxed font-sans">
            {solution}
          </p>
        </div>

        {/* Technology Stack Chips */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {technologyList.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md hover:bg-slate-100 hover:text-slate-800 transition-all duration-200 hover:scale-[1.02] cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Related Project Badge */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-sans bg-slate-50/20 border border-slate-100 rounded-lg p-2.5">
          <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>
            Proven via: <strong className="text-slate-800 font-medium">{relatedProject}</strong>
          </span>
        </div>

        {/* SPRINT 3.5 SMART CROSS-LINKS */}
        {(relatedCaseStudy || relatedKnowledgeArticle) && (
          <div className="space-y-2 pt-2 border-t border-slate-100/80">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
              Related Knowledge & Assets
            </span>
            <div className="flex flex-col gap-1.5">
              {relatedCaseStudy && (
                <button
                  onClick={() => onNavigate?.(relatedCaseStudy.pageId)}
                  className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus:outline-none rounded"
                >
                  <span className="font-mono text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                    Case Study
                  </span>
                  <span>View Case Study →</span>
                </button>
              )}
              {relatedKnowledgeArticle && (
                <button
                  onClick={() => onNavigate?.(relatedKnowledgeArticle.pageId)}
                  className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-1 focus:outline-none rounded"
                >
                  <span className="font-mono text-[9px] font-bold bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded border border-violet-100 uppercase">
                    Article
                  </span>
                  <span>Read Article →</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expected Outcome Box & CTA */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-4">
        <div className="bg-blue-50/20 border border-blue-100/50 rounded-xl p-3.5">
          <span className="text-[9px] font-mono uppercase text-blue-600 font-bold block mb-1">
            Expected Business Outcome
          </span>
          <p className="text-xs font-medium text-slate-900 font-sans">
            {expectedOutcome}
          </p>
        </div>

        <button
          onClick={onCtaClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-md group/btn"
        >
          {ctaText}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </ExecutiveCard>
  );
}
