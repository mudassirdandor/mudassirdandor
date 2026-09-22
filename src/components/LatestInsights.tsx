import React from "react";
import { blogPosts } from "../data/blog";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getContainerVariants, getChildVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveCard from "./ExecutiveCard";

interface LatestInsightsProps {
  onNavigate: (pageId: string) => void;
}

export default function LatestInsights({ onNavigate }: LatestInsightsProps) {
  const shouldReduceMotion = useReducedMotion();
  const container = getContainerVariants();
  const child = getChildVariants("upward", shouldReduceMotion);

  // Fetch first 3 articles
  const insights = blogPosts.slice(0, 3);

  return (
    <section 
      id="latest-insights" 
      className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Conceptual Thought Leadership"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Insights"
          title="Articles & Practical Guides"
          description="Practical strategies and tutorials on data sanitization, custom automation, and local SEO optimization."
          actions={
            <button
              onClick={() => onNavigate("insights")}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold tracking-wider uppercase rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Explore Complete Library</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          }
        />

        {/* Modern Editorial Asymmetrical Layout: Featured Article + Supplementary Stack */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
        >
          
          {/* Column 1 & 2: Featured Article */}
          <div className="lg:col-span-2 flex">
            <ExecutiveCard
              level={1}
              variants={child}
              onClick={() => onNavigate("insights")}
              className="w-full h-full"
            >
              <div className="p-6 md:p-8 flex flex-col justify-between h-full w-full">
                {/* Subtle visual banner to highlight featured status */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden" aria-hidden="true">
                  <div className="absolute top-3 right-[-35px] bg-blue-50 text-executive-blue border border-blue-100/50 text-[8px] font-mono font-bold tracking-widest uppercase py-1 px-8 rotate-45 text-center">
                    Featured
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Header row */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-[12px] font-mono text-executive-blue uppercase tracking-widest font-semibold bg-blue-50/50 px-2.5 py-1 rounded border border-blue-100">
                      {insights[0].category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] font-mono text-slate-500 mr-8">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{insights[0].date}</span>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="space-y-4 max-w-2xl">
                    <h3 className="text-[22px] md:text-[26px] font-bold text-slate-950 font-display leading-tight tracking-tight">
                      {insights[0].title}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-slate-700 leading-relaxed font-sans">
                      {insights[0].summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Read details */}
                <div className="border-t border-slate-100 pt-5 mt-8 flex items-center justify-between">
                  <span className="text-[12px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {insights[0].readTime}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("insights");
                    }}
                    className="flex items-center gap-1.5 text-[13px] font-mono text-slate-600 hover:text-executive-blue font-bold tracking-wider uppercase transition-colors cursor-pointer group/btn"
                  >
                    <span>Read Featured Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </div>
            </ExecutiveCard>
          </div>

          {/* Column 3: Stacked Supplementary Articles */}
          <div className="flex flex-col gap-6">
            {insights.slice(1, 3).map((post) => (
              <ExecutiveCard
                key={post.id}
                level={1}
                variants={child}
                onClick={() => onNavigate("insights")}
                className="flex-1"
              >
                <div className="p-5 md:p-6 flex flex-col justify-between h-full w-full">
                  <div className="space-y-3">
                    {/* Header row */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-mono text-executive-blue uppercase tracking-widest font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Article Info */}
                    <div className="space-y-2">
                      <h3 className="text-[16px] md:text-[18px] font-bold text-slate-950 font-display line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-slate-600 leading-relaxed font-sans line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Read details */}
                  <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("insights");
                      }}
                      className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-executive-blue font-bold tracking-wide uppercase transition-colors cursor-pointer group/btn"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </ExecutiveCard>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
