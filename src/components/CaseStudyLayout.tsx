import React from "react";
import { useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import GlobalModal from "./GlobalModal";
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Workflow, 
  BookOpen, 
  Compass, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Laptop,
  Tablet,
  Smartphone,
  Server
} from "lucide-react";
import ContentPlaceholder from "./ContentPlaceholder";
import ImageGallery from "./ImageGallery";

export interface ScreenshotMock {
  device: "desktop" | "tablet" | "mobile";
  label: string;
  description: string;
}

export interface LessonLearnedItem {
  challenge: string;
  decision: string;
}

export interface CaseStudyLayoutProps {
  title: string;
  category: string;
  status: string;
  overview: string;
  businessProblem: string;
  challenge: string;
  solution: string;
  workflow: string[];
  technology: string[];
  architecture: string[]; // List of nodes in order, e.g. ["User", "React Frontend", "Dialogflow", "Apps Script", "Google Sheets", "Email Automation"]
  keyFeatures: string[];
  screenshots: ScreenshotMock[];
  github?: string;
  liveDemo?: string;
  businessOutcome: string;
  lessonsLearned: LessonLearnedItem[];
  nextSteps: string[];
  onClose: () => void;
  onContactCta: () => void;
  // SPRINT 3.5 ADDITIONS
  relatedSolution?: { title: string; pageId: string };
  relatedArticle?: { title: string; pageId: string };
  onNavigate?: (pageId: string) => void;
  
  // SPRINT 5.0 AUTHENTIC CONTENT INTEGRATION ADDITIONS
  realScreenshots?: string[];
  realWorkflowImage?: string;
  realArchitectureImage?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function CaseStudyLayout({
  title,
  category,
  status,
  overview,
  businessProblem,
  challenge,
  solution,
  workflow,
  technology,
  architecture,
  keyFeatures,
  screenshots,
  github,
  liveDemo,
  businessOutcome,
  lessonsLearned,
  nextSteps,
  onClose,
  onContactCta,
  relatedSolution,
  relatedArticle,
  onNavigate,
  realScreenshots = [],
  realWorkflowImage,
  realArchitectureImage,
  beforeImage,
  afterImage
}: CaseStudyLayoutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <GlobalModal onClose={onClose} maxWidthClassName="max-w-5xl" heightClassName="h-[92vh]">
        {/* Header Block */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-50 border border-blue-100/80 px-2 py-0.5 rounded uppercase tracking-wider">
                {category}
              </span>
              <span className="text-[9px] font-mono text-slate-500 font-medium">
                {status}
              </span>
            </div>
            <h2 id="modal-case-title" className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 rounded-lg transition-all cursor-pointer shadow-3xs"
            aria-label="Close Case Study Details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Contents Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-12">
          
          {/* Top Grid: Primary Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side Stream: Problem Statement, Technology Stack, System Architecture */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* 1. Executive Brief */}
              <div className="space-y-3 bg-slate-50/50 p-6 border border-slate-150 rounded-xl shadow-3xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
                  Executive Brief
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                  {overview}
                </p>
              </div>

              {/* 2. Business Problem & Challenge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                  <div className="flex items-center gap-2 text-slate-800">
                    <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                      Business Bottleneck
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {businessProblem}
                  </p>
                </div>

                <div className="space-y-3 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Compass className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                      Primary Challenge
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {challenge}
                  </p>
                </div>
              </div>

              {/* 3. Solution */}
              <div className="space-y-3 bg-emerald-50/10 p-6 border border-emerald-200/60 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    My Solution
                  </h4>
                </div>
                <p className="text-sm text-slate-800 font-medium leading-relaxed font-sans">
                  {solution}
                </p>
              </div>

              {/* 4. Implementation Workflow */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <Workflow className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Implementation Workflow
                  </h4>
                </div>
                <div className="space-y-3">
                  {workflow.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-xs text-slate-600 leading-relaxed items-start">
                      <span className="font-mono text-blue-500 font-extrabold select-none bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* SPRINT 5.0 Workflow Graphic Support */}
                <div className="pt-3">
                  <ContentPlaceholder
                    variant="workflow"
                    src={realWorkflowImage}
                    alt={`${title} Operational Workflow Architecture`}
                    title="Engineered Automation Workflow Pipeline"
                  />
                </div>
              </div>

              {/* 5. Technology Stack */}
              <div className="space-y-3 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Technology Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {technology.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. System Architecture (Visual Flow) */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    System Architecture
                  </h4>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-4 overflow-x-auto max-w-full">
                  {architecture.map((node, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center p-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[110px] text-center shadow-3xs hover:border-indigo-300 transition-colors">
                        {idx === 0 ? (
                          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Source</div>
                        ) : idx === architecture.length - 1 ? (
                          <div className="text-[10px] font-mono uppercase text-emerald-500 font-bold mb-1">Outcome</div>
                        ) : (
                          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-1">Process</div>
                        )}
                        <span className="text-xs font-bold text-slate-800 font-sans">{node}</span>
                      </div>
                      {idx < architecture.length - 1 && (
                        <div className="flex items-center justify-center text-indigo-500/80 rotate-90 md:rotate-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* SPRINT 5.0 Architecture Graphic Support */}
                <div className="pt-3">
                  <ContentPlaceholder
                    variant="architecture"
                    src={realArchitectureImage}
                    alt={`${title} System Architecture Topology`}
                    title="Production Systems Topology Diagram"
                  />
                </div>
              </div>

            </div>

            {/* Right Side Stream: Outcomes, Key Features, Screenshots, Links, Lessons Learned */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* 7. Expected Business Outcome */}
              <div className="space-y-3 bg-indigo-50/10 p-6 border border-indigo-200/50 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-indigo-600">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Business Outcome
                  </h4>
                </div>
                <p className="text-sm text-indigo-950 font-semibold leading-relaxed font-sans">
                  {businessOutcome}
                </p>
              </div>

              {/* 8. Key Delivered Features */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Key Features Delivered
                  </h4>
                </div>
                <ul className="space-y-3">
                  {keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-slate-600 leading-relaxed items-start">
                      <span className="text-emerald-500 font-extrabold select-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 9. Repository & Live Actions */}
              {(github || liveDemo) && (
                <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                  <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                    <Server className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                      Deployment Registries
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide uppercase rounded-lg transition-all shadow-3xs cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        Code Repository
                      </a>
                    )}
                    {liveDemo && (
                      <a
                        href={liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide uppercase rounded-lg transition-all shadow-3xs cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo View
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* 10. Lessons Learned & Decisions */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Lessons Learned & Architecture Decisions
                  </h4>
                </div>
                <div className="space-y-4">
                  {lessonsLearned.map((item, idx) => (
                    <div key={idx} className="space-y-2 p-3 bg-slate-50/50 border border-slate-100 rounded-lg">
                      <div className="flex gap-1.5 items-center text-[10px] font-mono text-red-500 uppercase font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Technical Challenge</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.challenge}</p>
                      
                      <div className="flex gap-1.5 items-center text-[10px] font-mono text-emerald-600 uppercase font-bold pt-1.5 border-t border-slate-100/60 mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Engineering Decision</span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold leading-relaxed font-sans">{item.decision}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 11. Future Improvements */}
              <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                  <TrendingUp className="w-4 h-4 text-indigo-500 shrink-0" />
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    Future Improvements
                  </h4>
                </div>
                <ul className="space-y-2">
                  {nextSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-slate-600 leading-relaxed items-start">
                      <span className="text-indigo-500 font-extrabold select-none">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SPRINT 3.5 SMART CROSS-LINKS */}
              {(relatedSolution || relatedArticle) && (
                <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl shadow-3xs">
                  <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                    <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                      Related Assets & Research
                    </h4>
                  </div>
                  <div className="flex flex-col gap-3">
                    {relatedSolution && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate?.(relatedSolution.pageId);
                        }}
                        className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus:outline-none"
                      >
                        <span className="font-mono text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                          Solution
                        </span>
                        <span>Explore Solution →</span>
                      </button>
                    )}
                    {relatedArticle && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate?.(relatedArticle.pageId);
                        }}
                        className="inline-flex items-center gap-1.5 text-left text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline cursor-pointer focus:outline-none"
                      >
                        <span className="font-mono text-[9px] font-bold bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded border border-violet-100 uppercase">
                          Research
                        </span>
                        <span>Read Article →</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 12. Screenshots & Interactive Mockups Gallery */}
          <div className="space-y-6 pt-6 border-t border-slate-150">
            <div className="flex items-center gap-2 mb-2">
              <Laptop className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">
                System Interface & Layout Visualization
              </h4>
            </div>

            <div className="space-y-8">
              {/* Before / After Comparison */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Interactive System Transformation (Drag Slider)
                </span>
                <ImageGallery
                  variant="comparison"
                  beforeSrc={beforeImage}
                  afterSrc={afterImage}
                  altText={title}
                />
              </div>

              {/* Side-by-side Devices Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Desktop Layout view
                  </span>
                  <ImageGallery
                    variant="desktop"
                    images={realScreenshots}
                    altText={title}
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Mobile Phone view
                  </span>
                  <ImageGallery
                    variant="mobile"
                    images={realScreenshots}
                    altText={title}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 13. Call To Action (Standard Consultation Pitch) */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-xl mx-auto space-y-4 relative z-10">
              <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase font-bold">
                PROPOSAL INITIATION
              </span>
              <h4 className="text-lg md:text-xl font-bold font-display tracking-tight">
                Interested in building something similar?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Discuss custom student registration systems, high-efficiency Google Sheets integrations, or secure database validation rules with Mudassir.
              </p>
              <div className="pt-2 flex flex-col items-center gap-2.5">
                <button
                  onClick={onContactCta}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Let's Talk About Your Project →
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
