import React from "react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import GlobalModal from "./GlobalModal";
import ConnectedKnowledgeCard from "./ConnectedKnowledgeCard";
import {
  X,
  Clock,
  Calendar,
  Layers,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Workflow,
  Cpu,
  Bookmark,
  Share2,
  Database,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Link2,
  Award,
  TrendingUp,
  FileText
} from "lucide-react";

export interface ArticleLayoutProps {
  articleId?: string;
  title: string;
  category: string;
  summary: string;
  readingTime: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  publishedDate: string;
  lastUpdated?: string;
  author?: string;
  heroVisual?: "workflow" | "architecture" | "chart" | "infographic" | "screenshot";
  tableOfContents?: string[];
  sections?: { heading: string; content: string }[];
  keyTakeaways?: string[];
  relatedCaseStudies?: { title: string; id?: string; onClick?: () => void }[];
  relatedSolutions?: { title: string; id?: string; onClick?: () => void }[];
  relatedTechnologies?: string[];
  references?: string[];
  nextArticle?: { title: string; onClick: () => void };
  previousArticle?: { title: string; onClick: () => void };
  cta?: { title: string; text: string; buttonText: string; onClick: () => void };
  onClose: () => void;
  onNavigate?: (pageId: string) => void;
}

export default function ArticleLayout({
  articleId,
  title,
  category,
  summary,
  readingTime,
  difficulty = "Intermediate",
  publishedDate,
  lastUpdated,
  author = "Mudassir Javed",
  heroVisual = "workflow",
  tableOfContents = [],
  sections = [],
  keyTakeaways = [],
  relatedCaseStudies = [],
  relatedSolutions = [],
  relatedTechnologies = [],
  references = [],
  nextArticle,
  previousArticle,
  cta,
  onClose,
  onNavigate,
}: ArticleLayoutProps) {

  // Function to smooth scroll to a section ID within the modal
  const handleScrollToSection = (index: number) => {
    const element = document.getElementById(`section-heading-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper to render interactive visual placeholders using clean SVG / CSS
  const renderVisualPlaceholder = () => {
    switch (heroVisual) {
      case "workflow":
        return (
          <div id="visual-workflow-placeholder" className="bg-slate-950 text-slate-300 p-6 md:p-8 rounded-xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                Operational Pipeline Workflow
              </span>
              <span className="text-[9px] font-mono text-slate-500">SYSTEM FLOW DIAGRAM</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="border border-indigo-500/30 bg-indigo-950/20 p-4 rounded-lg text-center relative">
                <span className="text-[10px] font-mono text-indigo-400 block mb-1">STEP 01</span>
                <span className="text-xs font-bold text-white block">Raw Sourcing</span>
                <p className="text-[9px] text-slate-400 mt-1">Multi-channel ingestion</p>
              </div>
              <div className="flex justify-center text-indigo-500 rotate-90 md:rotate-0">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="border border-blue-500/30 bg-blue-950/20 p-4 rounded-lg text-center">
                <span className="text-[10px] font-mono text-blue-400 block mb-1">STEP 02</span>
                <span className="text-xs font-bold text-white block">ETL Processing</span>
                <p className="text-[9px] text-slate-400 mt-1">Cleaning & modeling</p>
              </div>
              <div className="flex justify-center text-indigo-500 rotate-90 md:rotate-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-1" />
              <div className="border border-emerald-500/30 bg-emerald-950/20 p-4 rounded-lg text-center col-span-1 md:col-span-2">
                <span className="text-[10px] font-mono text-emerald-400 block mb-1">STEP 03 (OUTCOME)</span>
                <span className="text-xs font-bold text-white block">Decision Support Layer</span>
                <p className="text-[9px] text-slate-400 mt-1">Interactive dashboards & predictive forecasting models</p>
              </div>
              <div className="md:col-span-1" />
            </div>
          </div>
        );
      case "architecture":
        return (
          <div id="visual-architecture-placeholder" className="bg-slate-950 text-slate-300 p-6 md:p-8 rounded-xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                Enterprise Business Intelligence Architecture
              </span>
              <span className="text-[9px] font-mono text-slate-500">NODE TOPOLOGY</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-around py-4">
              <div className="border border-slate-800 p-3.5 rounded bg-slate-900/60 min-w-[120px] text-center">
                <span className="text-[9px] font-mono text-slate-500">SOURCE LAYERS</span>
                <div className="text-xs font-bold text-slate-200 mt-1">SaaS / ERP / APIs</div>
              </div>
              <div className="flex items-center justify-center text-slate-600 rotate-90 md:rotate-0">
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="border border-indigo-500/30 bg-indigo-950/20 p-3.5 rounded min-w-[140px] text-center">
                <span className="text-[9px] font-mono text-indigo-400">DATA LAKEHOUSE</span>
                <div className="text-xs font-bold text-white mt-1">BigQuery / Snowflake</div>
              </div>
              <div className="flex items-center justify-center text-slate-600 rotate-90 md:rotate-0">
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="border border-emerald-500/30 bg-emerald-950/20 p-3.5 rounded min-w-[120px] text-center">
                <span className="text-[9px] font-mono text-emerald-400">BI INTERFACE</span>
                <div className="text-xs font-bold text-white mt-1">Power BI / Looker</div>
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-500 text-center leading-relaxed">
              Design pattern enforces end-to-end data pipelines with fully isolated staging and distribution zones.
            </p>
          </div>
        );
      case "chart":
        return (
          <div id="visual-chart-placeholder" className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 space-y-4 shadow-3xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Performance Variance Analysis
              </span>
              <span className="text-[9px] font-mono text-blue-600">PREDICTIVE TREND</span>
            </div>
            <div className="h-44 flex items-end gap-3 pt-6 px-4 border-b border-l border-slate-200 relative">
              {/* Reference Grid lines */}
              <div className="absolute left-0 right-0 top-1/4 border-t border-slate-100/80 border-dashed pointer-events-none" />
              <div className="absolute left-0 right-0 top-2/4 border-t border-slate-100/80 border-dashed pointer-events-none" />
              <div className="absolute left-0 right-0 top-3/4 border-t border-slate-100/80 border-dashed pointer-events-none" />
              
              {/* Bars */}
              <div className="flex-1 bg-slate-100 h-[60%] rounded-t-sm relative group hover:bg-blue-100 transition-colors">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500">Q1</span>
              </div>
              <div className="flex-1 bg-slate-100 h-[75%] rounded-t-sm relative group hover:bg-blue-100 transition-colors">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500">Q2</span>
              </div>
              <div className="flex-1 bg-blue-500 h-[92%] rounded-t-sm relative group hover:bg-blue-600 transition-colors">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-blue-600 font-bold">Q3</span>
              </div>
              <div className="flex-1 bg-slate-200 h-[45%] rounded-t-sm relative group hover:bg-blue-100 transition-colors">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500">Q4</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 px-2 pt-1">
              <span>* Target Goal: 85%+ Ingestion Efficiency</span>
              <span>Compiled Real-Time</span>
            </div>
          </div>
        );
      case "infographic":
        return (
          <div id="visual-infographic-placeholder" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
              <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">40% Efficiency Gain</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                By standardizing multi-channel pipelines and eliminating human file translation loops.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
              <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
                <Award className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Defensible Rigor</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Eliminating anecdotal reports in favor of rigorous statistical confidence values.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
              <div className="w-7 h-7 rounded bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800">Strategic Alignment</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bridges physical team objectives directly to the core digital data streams.
              </p>
            </div>
          </div>
        );
      case "screenshot":
        return (
          <div id="visual-screenshot-placeholder" className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-[16/10] w-full relative">
            <div className="h-7 bg-slate-950 border-b border-slate-800/80 px-3 flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
              <span className="text-[8px] font-mono text-slate-500">mudassirdandor-bi-platform.app</span>
              <div className="w-8" />
            </div>
            <div className="p-4 space-y-4 font-mono text-[10px] text-slate-400">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-white font-bold">BI ANALYTICS SERVER CONSOLE</span>
                <span className="text-emerald-400 text-[8px] border border-emerald-500/20 bg-emerald-500/5 px-1.5 py-0.5 rounded">CONNECTED</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-slate-800 p-2.5 rounded bg-slate-950">
                  <span className="text-slate-500 block">DB CONCURRENCY</span>
                  <span className="text-white text-xs font-extrabold">Instant Synced</span>
                </div>
                <div className="border border-slate-800 p-2.5 rounded bg-slate-950">
                  <span className="text-slate-500 block">API RESPONSIVENESS</span>
                  <span className="text-white text-xs font-extrabold">&lt; 140ms Avg</span>
                </div>
              </div>
              <div className="bg-slate-950 p-2 border border-slate-800 rounded text-[9px] text-slate-500">
                $ npm run build:bi-pipeline --target=production<br/>
                &gt; Resolving Star Schema relations ... [OK]<br/>
                &gt; Instantiating VertiPaq caching layers ... [OK]
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GlobalModal onClose={onClose} maxWidthClassName="max-w-5xl" heightClassName="h-[92vh]">
        {/* Sticky Top Bar Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/95 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2.5 py-0.5 text-[8px] font-mono font-bold rounded border uppercase tracking-wider bg-slate-100 border-slate-200 text-slate-800">
              {category}
            </span>
            <span className="px-2.5 py-0.5 text-[8px] font-mono font-bold rounded border uppercase tracking-wider bg-blue-50 border-blue-100 text-blue-600">
              {difficulty} LEVEL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close Knowledge Viewer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Article Area */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-12 font-sans text-slate-700 bg-slate-50/20">
          
          {/* 1. Header Section */}
          <div className="border-b border-slate-100 pb-8">
            <ExecutiveSectionHeader
              eyebrow={category.toUpperCase()}
              title={title}
              description={summary}
              alignment="left"
            />

            {/* Visual Metadata Panel */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-mono mt-6 pt-6 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                {readingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                Published: {publishedDate}
              </span>
              {lastUpdated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                  Last Updated: {lastUpdated}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                Author: {author}
              </span>
            </div>
          </div>

          {/* Table of Contents & Main Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Table of Contents Column (Left sidebar on desktop) */}
            {tableOfContents && tableOfContents.length > 0 && (
              <div className="lg:col-span-4 lg:sticky lg:top-4 bg-white p-5 border border-slate-200 rounded-xl shadow-3xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-2 text-xs">
                  {tableOfContents.map((toc, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScrollToSection(idx)}
                      className="w-full text-left font-sans text-slate-600 hover:text-blue-600 hover:pl-1.5 transition-all flex items-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{toc}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Main Article Stream (Right column on desktop) */}
            <div className={`space-y-8 ${tableOfContents && tableOfContents.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}`}>
              
              {/* Executive Summary Statement Box */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden text-white shadow-3xs">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.05] rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-3 relative z-10">
                  <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-bold block">
                    ARTICLE SUMMARY
                  </span>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-200 italic font-sans font-medium">
                    "{summary}"
                  </p>
                </div>
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-8">
                {sections.map((sec, idx) => (
                  <div key={idx} id={`article-section-${idx}`} className="space-y-3 scroll-mt-6">
                    <h4
                      id={`section-heading-${idx}`}
                      className="text-sm font-bold text-slate-900 font-sans tracking-tight border-b border-slate-100 pb-2 uppercase"
                    >
                      {sec.heading}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-sans">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* 5. Dynamic Visual Illustration Placeholder */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Workflow className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold">
                    Visual System Overview
                  </span>
                </div>
                {renderVisualPlaceholder()}
              </div>

              {/* 6. Key Takeaways */}
              {keyTakeaways && keyTakeaways.length > 0 && (
                <div id="key-takeaways" className="p-6 bg-blue-50/20 border border-blue-200/60 rounded-xl shadow-3xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-blue-100 pb-2 text-blue-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">
                      Key Takeaways
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-slate-700 leading-relaxed items-start">
                        <span className="font-mono text-blue-600 font-extrabold select-none shrink-0">•</span>
                        <span className="font-sans">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Connected Knowledge System */}
              {articleId && (
                <ConnectedKnowledgeCard
                  entityId={articleId}
                  onNavigate={(pageId) => {
                    onClose();
                    onNavigate?.(pageId);
                  }}
                  onOpenProject={(pid) => {
                    onClose();
                    localStorage.setItem("selected-project-id", pid);
                    window.dispatchEvent(new CustomEvent("portfolio-open-project", { detail: { projectId: pid } }));
                    onNavigate?.("case-studies");
                  }}
                  onOpenArticle={(aid) => {
                    localStorage.setItem("selected-article-id", aid);
                    window.dispatchEvent(new CustomEvent("portfolio-open-article", { detail: { articleId: aid } }));
                  }}
                />
              )}

              {/* Related content block */}
              {(relatedSolutions.length > 0 || relatedCaseStudies.length > 0 || relatedTechnologies.length > 0) && (
                <div id="related-analysis-meta" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  
                  {/* Related Business Solutions */}
                  {relatedSolutions && relatedSolutions.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Related Solutions
                      </span>
                      <div className="space-y-2">
                        {relatedSolutions.map((sol, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs flex justify-between items-center group cursor-pointer transition-all"
                            onClick={() => sol.onClick?.()}
                          >
                            <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors font-sans">{sol.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Case Studies */}
                  {relatedCaseStudies && relatedCaseStudies.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Related Case Studies
                      </span>
                      <div className="space-y-2">
                        {relatedCaseStudies.map((caseStudy, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs flex justify-between items-center group cursor-pointer transition-all"
                            onClick={() => caseStudy.onClick?.()}
                          >
                            <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors font-sans">{caseStudy.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Technologies */}
                  {relatedTechnologies && relatedTechnologies.length > 0 && (
                    <div className="space-y-3 md:col-span-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Associated Technologies
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {relatedTechnologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* References */}
              {references && references.length > 0 && (
                <div id="references" className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase font-bold">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>References & Further Reading</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-500 font-mono">
                    {references.map((ref, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-relaxed">
                        <span>[{idx + 1}]</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Previous / Next Article Navigation */}
              {(previousArticle || nextArticle) && (
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-xs">
                  {previousArticle ? (
                    <button
                      onClick={previousArticle.onClick}
                      className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-left hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none flex flex-col justify-between h-20"
                    >
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Previous Article</span>
                      <span className="font-bold text-slate-700 truncate w-full font-sans">{previousArticle.title}</span>
                    </button>
                  ) : <div />}
                  {nextArticle ? (
                    <button
                      onClick={nextArticle.onClick}
                      className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-right hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none flex flex-col justify-between items-end h-20"
                    >
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Next Article</span>
                      <span className="font-bold text-slate-700 truncate w-full font-sans">{nextArticle.title}</span>
                    </button>
                  ) : <div />}
                </div>
              )}

            </div>
          </div>

          {/* 13. Consultation Pitch / Call To Action */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-xl mx-auto space-y-4 relative z-10">
              <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase font-bold">
                {cta?.title || "DISCUSS YOUR PROJECT"}
              </span>
              <h4 className="text-lg md:text-xl font-bold font-display tracking-tight font-sans">
                {cta?.text || "If you'd like help applying these ideas, I'm happy to discuss your project."}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-sans">
                We can look at your current systems together, clear up any data issues, and build simple, reliable tools that save you time.
              </p>
              <div className="pt-2 flex flex-col items-center gap-2.5">
                <button
                  onClick={cta?.onClick}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cta?.buttonText || "Consult With Mudassir"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <div className="text-[10px] text-slate-400">
                  Prefer WhatsApp?{" "}
                  <a
                    href={`https://wa.me/923112777061?text=${encodeURIComponent("Hello Mudassir,\n\nI visited your portfolio website and would like to discuss a project with you.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discuss on WhatsApp with Mudassir"
                    className="text-blue-400 hover:text-blue-300 underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    Start a conversation
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
    </GlobalModal>
  );
}
