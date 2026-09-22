import React, { useState, useEffect, useId } from "react";
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Workflow, 
  Code2, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Maximize2, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Info,
  Laptop,
  Tablet,
  Smartphone,
  Eye,
  Sparkles,
  GitBranch,
  Clock,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Project } from "../types";
import { projects } from "../data/projects";
import { getCaseStudyAudit, CaseStudyAuditData } from "../data/caseStudyAudit";
import { telemetry } from "../utils/telemetry";
import GlobalModal from "./GlobalModal";
import ConnectedKnowledgeCard from "./ConnectedKnowledgeCard";
import ContentPlaceholder from "./ContentPlaceholder";

export interface CaseStudyLayoutProps {
  project: Project;
  onClose: () => void;
  onNavigate?: (pageId: string) => void;
  onSelectProject?: (project: Project) => void;
  // Optional legacy props for backwards compatibility
  title?: string;
  category?: string;
  status?: string;
  overview?: string;
  businessProblem?: string;
}

export default function CaseStudyLayout({
  project,
  onClose,
  onNavigate,
  onSelectProject
}: CaseStudyLayoutProps) {
  const shouldReduceMotion = useReducedMotion();
  const audit: CaseStudyAuditData = getCaseStudyAudit(project.id, project);

  // Viewport switcher for implementation screens
  const [activeViewport, setActiveViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // Code inspector tab
  const [activeCodeTab, setActiveCodeTab] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Progressive disclosure accordions for technical depth
  const [isTechDepthOpen, setIsTechDepthOpen] = useState<boolean>(false);
  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState<boolean>(false);

  // Fullscreen Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");

  // Reading progress tracker
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active workflow node selected for inspection
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState<number>(0);

  // Navigation: Find prev & next projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Scroll listener
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
    setScrollProgress(progress);
  };

  // Keyboard navigation: Escape closes modal, Left/Right cycles project
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft" && !isLightboxOpen && onSelectProject) {
        onSelectProject(prevProject);
      } else if (e.key === "ArrowRight" && !isLightboxOpen && onSelectProject) {
        onSelectProject(nextProject);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, prevProject, nextProject, onClose, onSelectProject]);

  useEffect(() => {
    telemetry.trackEvidenceOpen(project.id, `code_tab_${activeCodeTab}`);
  }, [project.id, activeCodeTab]);

  useEffect(() => {
    if (isTechDepthOpen) {
      telemetry.trackEvidenceOpen(project.id, "technical_depth");
    }
  }, [project.id, isTechDepthOpen]);

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper for honest status label
  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case "Production":
        return { label: "Production System", color: "text-emerald-700 font-semibold" };
      case "Open Source":
        return { label: "Open Source Platform", color: "text-blue-700 font-semibold" };
      case "In Development":
        return { label: "In Active Development", color: "text-amber-700 font-semibold" };
      case "Research":
        return { label: "Research & Methodology", color: "text-purple-700 font-semibold" };
      default:
        return { label: "Interactive Demonstration", color: "text-slate-600 font-semibold" };
    }
  };

  const statusInfo = getStatusDisplay(project.status);

  return (
    <GlobalModal
      onClose={onClose}
      maxWidthClassName="max-w-5xl"
      heightClassName="max-h-[92vh]"
      overlayClassName="bg-slate-950/80 backdrop-blur-md"
    >
      <div className="relative flex flex-col h-full bg-white text-slate-900 overflow-hidden font-sans">
        
        {/* Top Reading Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[3px] bg-blue-600 z-50 transition-all duration-75 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        {/* Modal Header & Lightweight Navigation */}
        <header className="px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between gap-4 z-40 shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-slate-600 flex-wrap">
            <span className="font-mono text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-300 select-none">·</span>
            <span className={`text-[11px] ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            <span className="text-slate-300 select-none">·</span>
            <span className="font-mono text-[10px] text-slate-400">
              ID: {project.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Previous / Next Case Study controls */}
            {onSelectProject && (
              <div className="hidden sm:flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                <button
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-md transition-colors cursor-pointer text-xs font-medium flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-blue-600 focus:outline-none"
                  title={`Previous: ${prevProject.title}`}
                  aria-label={`Previous Case Study: ${prevProject.title}`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Previous</span>
                </button>
                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-md transition-colors cursor-pointer text-xs font-medium flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-blue-600 focus:outline-none"
                  title={`Next: ${nextProject.title}`}
                  aria-label={`Next Case Study: ${nextProject.title}`}
                >
                  <span className="hidden md:inline">Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus:outline-none"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Modal Content */}
        <div 
          className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-12"
          onScroll={handleScroll}
          tabIndex={0}
        >

          {/* ========================================================================= */}
          {/* 30-SECOND SUMMARY BANNER (Immediate Essentials, Zero Pill Fluff) */}
          {/* ========================================================================= */}
          <section 
            aria-label="30-Second Executive Summary"
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  <span>30-Second Summary</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-blue-700 font-bold">{audit.summary30s.projectType}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  {project.title}
                </h1>
              </div>

              {/* Verified Evidence Tag (Unboxed Clean Typography) */}
              <div className="shrink-0 text-left md:text-right">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Evidence Status</div>
                <div className="text-xs font-bold font-mono text-emerald-700 flex items-center md:justify-end gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{audit.summary30s.evidenceAvailability}</span>
                </div>
              </div>
            </div>

            {/* Quick 4-Grid Fact Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">My Role</span>
                <p className="font-semibold text-slate-800">{audit.summary30s.role}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">System Status</span>
                <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.label}</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Key Technology Stack</span>
                <p className="font-mono text-slate-700 font-medium">
                  {audit.summary30s.keyTechnology.join(" · ")}
                </p>
              </div>
            </div>

            {/* Problem & Solution Compact Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200/80 text-xs leading-relaxed">
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-rose-800">
                  Core Bottleneck
                </div>
                <p className="text-slate-700">{audit.summary30s.coreProblem}</p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-blue-800">
                  Delivered Solution
                </div>
                <p className="text-slate-700">{audit.summary30s.primarySolution}</p>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 01 — CONTEXT */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-01-heading" className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-bold text-blue-700">01</span>
              <h2 id="section-01-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                Context & Operational Landscape
              </h2>
            </div>

            <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>{audit.contextAndProblem.businessContext}</p>
              <div className="text-xs text-slate-500 font-mono">
                <span className="font-bold text-slate-700">Data Environment: </span>
                {audit.contextAndProblem.dataSources}
              </div>
            </div>

            {/* Strategic Business Questions */}
            {audit.contextAndProblem.businessQuestions.length > 0 && (
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Strategic Diagnostics Addressed
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {audit.contextAndProblem.businessQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-blue-600 font-bold text-[11px] shrink-0 mt-0.5">
                        Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>


          {/* ========================================================================= */}
          {/* 02 — PROBLEM */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-02-heading" className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-bold text-blue-700">02</span>
              <h2 id="section-02-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                Problem Decomposition
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  User Challenge
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {audit.contextAndProblem.userProblem}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Technical Bottleneck
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {audit.contextAndProblem.technicalBottleneck}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Operational Effect
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {audit.contextAndProblem.operationalEffect}
                </p>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 03 — APPROACH */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-03-heading" className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-bold text-blue-700">03</span>
              <h2 id="section-03-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                Methodology & Analytical Approach
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audit.contextAndProblem.methodologySteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs"
                >
                  <span className="font-mono text-xs font-bold text-blue-700 bg-white border border-slate-200 w-6 h-6 rounded-md flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 04 — SYSTEM / VISUAL WORKFLOW */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-04-heading" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">04</span>
                <h2 id="section-04-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                  System Architecture & Visual Workflow
                </h2>
              </div>
              <button
                onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
                className="text-[11px] font-mono text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer focus-visible:outline-none"
              >
                <span>{isWorkflowExpanded ? "Compact View" : "Expand Nodes"}</span>
                {isWorkflowExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {audit.visualWorkflow.description}
            </p>

            {/* Interactive Visual Node Sequence */}
            <div className="p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 space-y-6 overflow-x-auto">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-blue-400" />
                  <span className="font-mono uppercase font-bold text-slate-300">
                    {audit.visualWorkflow.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  CLICK NODE TO INSPECT
                </span>
              </div>

              {/* Node Pipeline Ribbon */}
              <div className="flex items-stretch gap-2 min-w-[620px] py-2">
                {audit.visualWorkflow.nodes.map((node, idx) => {
                  const isSelected = selectedWorkflowNode === idx;
                  const isLast = idx === audit.visualWorkflow.nodes.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      <button
                        onClick={() => setSelectedWorkflowNode(idx)}
                        className={`flex-1 text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-900/40 border-blue-500 shadow-sm"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                            STEP 0{idx + 1}
                          </span>
                          <span className={`text-[8px] font-mono uppercase px-1.5 py-0.2 rounded ${
                            node.role === "input" ? "bg-amber-950 text-amber-300" :
                            node.role === "process" ? "bg-blue-950 text-blue-300" :
                            node.role === "integration" ? "bg-purple-950 text-purple-300" :
                            node.role === "storage" ? "bg-emerald-950 text-emerald-300" :
                            "bg-teal-950 text-teal-300"
                          }`}>
                            {node.role}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1 line-clamp-2">
                          {node.label}
                        </h4>
                      </button>

                      {!isLast && (
                        <div className="flex items-center justify-center text-slate-600 px-0.5 shrink-0 select-none">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Active Node Detail Card */}
              {audit.visualWorkflow.nodes[selectedWorkflowNode] && (
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="p-2 bg-blue-950 text-blue-400 rounded-lg shrink-0 mt-0.5">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">
                        {audit.visualWorkflow.nodes[selectedWorkflowNode].label}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        Role: {audit.visualWorkflow.nodes[selectedWorkflowNode].role.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {audit.visualWorkflow.nodes[selectedWorkflowNode].description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 05 — IMPLEMENTATION & VIEWPORTS */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-05-heading" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">05</span>
                <h2 id="section-05-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                  Implementation & Device Viewports
                </h2>
              </div>

              {/* Viewport switchers */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-600">
                <button
                  onClick={() => setActiveViewport("desktop")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeViewport === "desktop" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "hover:text-slate-900"
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setActiveViewport("tablet")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeViewport === "tablet" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "hover:text-slate-900"
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setActiveViewport("mobile")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeViewport === "mobile" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Viewport Preview Stage */}
            <div className="p-4 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 px-2">
                <span>VIEWPORT: {activeViewport.toUpperCase()}</span>
                <button
                  onClick={() => {
                    setLightboxCaption(`${project.title} — ${activeViewport.toUpperCase()} View`);
                    setIsLightboxOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Fullscreen</span>
                </button>
              </div>

              {/* Viewport container */}
              <div className={`transition-all duration-300 w-full flex justify-center ${
                activeViewport === "desktop" ? "max-w-4xl" :
                activeViewport === "tablet" ? "max-w-xl" :
                "max-w-xs"
              }`}>
                <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2 shadow-2xl">
                  {/* Browser chrome header */}
                  <div className="flex items-center gap-1.5 pb-2 px-2 border-b border-slate-850 text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-[9px] text-slate-500 ml-2 truncate">
                      {project.liveUrl || `https://${project.id}.app/analytics`}
                    </span>
                  </div>

                  {/* Screen Content / Fallback Vector Mockup */}
                  <div className="pt-2">
                    <ContentPlaceholder
                      variant={
                        activeViewport === "mobile" 
                          ? "mobile screenshot" 
                          : project.isSimulated 
                            ? "dashboard" 
                            : "desktop screenshot"
                      }
                      alt={`${project.title} ${activeViewport} interface`}
                      title={project.title}
                      aspectRatio="16/9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 06 — EVIDENCE & TECHNICAL ARTIFACTS */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-06-heading" className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">06</span>
                <h2 id="section-06-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                  Evidence & Verifiable Deliverables
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                STANDARDIZED EVIDENCE STATUS
              </span>
            </div>

            {/* Evidence Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audit.evidenceItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        {item.type === "demo" ? <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" /> :
                         item.type === "repo" ? <Github className="w-3.5 h-3.5 text-slate-800 shrink-0" /> :
                         item.type === "schema" ? <Database className="w-3.5 h-3.5 text-purple-600 shrink-0" /> :
                         <Code2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        <span>{item.title}</span>
                      </h4>

                      <span className="text-[10px] font-mono font-bold text-emerald-700">
                        {item.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200/80 rounded-lg p-3">
                      <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                        What This Proves
                      </span>
                      {item.proves}
                    </div>
                  </div>

                  {item.url && (
                    <div className="pt-1">
                      {item.url.startsWith("http") ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer focus-visible:underline"
                        >
                          <span>Inspect Live Artifact</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            onClose();
                            const element = document.getElementById(item.url.replace("#", ""));
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer focus-visible:underline"
                        >
                          <span>Open Live Sandbox</span>
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Code / Schema Inspector */}
            {audit.codeExcerpts.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-700" />
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
                      Technical Code & Schema Inspector
                    </h3>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1">
                    {audit.codeExcerpts.map((excerpt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCodeTab(idx)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-colors cursor-pointer ${
                          activeCodeTab === idx
                            ? "bg-slate-900 text-white font-bold"
                            : "bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {excerpt.language.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {audit.codeExcerpts[activeCodeTab] && (
                  <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden text-xs font-mono shadow-md">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{audit.codeExcerpts[activeCodeTab].label}</span>
                      <button
                        onClick={() => handleCopyCode(audit.codeExcerpts[activeCodeTab].code, activeCodeTab)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        title="Copy Code"
                      >
                        {copiedIndex === activeCodeTab ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950 overflow-x-auto text-[11px] leading-relaxed max-h-72">
                      <pre><code>{audit.codeExcerpts[activeCodeTab].code}</code></pre>
                    </div>

                    <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-850 text-[10px] text-slate-400">
                      <span className="font-bold text-slate-300">Explanation: </span>
                      {audit.codeExcerpts[activeCodeTab].explanation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>


          {/* ========================================================================= */}
          {/* 07 — OUTCOME OR CURRENT STATUS */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-07-heading" className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-bold text-blue-700">07</span>
              <h2 id="section-07-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                Outcome & Current Status
              </h2>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 font-bold">
                  {audit.statusAwareOutcome.badge}
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  {audit.statusAwareOutcome.headline}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {audit.statusAwareOutcome.points.map((pt, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 text-xs">
                    <span className="font-mono font-bold text-blue-700 block">
                      {pt.metric}
                    </span>
                    <p className="text-slate-600 leading-relaxed">{pt.detail}</p>
                  </div>
                ))}
              </div>

              {/* Ethical Disclaimer */}
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>{audit.statusAwareOutcome.disclaimer}</p>
              </div>
            </div>
          </section>


          {/* ========================================================================= */}
          {/* 08 — TECHNICAL DETAILS (Progressive Disclosure) */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-08-heading" className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">08</span>
                <h2 id="section-08-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                  Technical Architecture & Specifications
                </h2>
              </div>
              <button
                onClick={() => setIsTechDepthOpen(!isTechDepthOpen)}
                className="text-xs font-mono text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer focus-visible:outline-none"
              >
                <span>{isTechDepthOpen ? "Hide Specifications" : "View Deep Specifications"}</span>
                {isTechDepthOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isTechDepthOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2"
              >
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    System Architecture
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {audit.technicalDepth.architectureSummary}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Data Model Schema
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {audit.technicalDepth.dataModelSummary}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Security & Concurrency Safeguards
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {audit.technicalDepth.securityOrOptimization}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Deployment Pipeline
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {audit.technicalDepth.deploymentDetails}
                  </p>
                </div>
              </motion.div>
            )}
          </section>


          {/* ========================================================================= */}
          {/* 09 — RELATED WORK & KNOWLEDGE GRAPH */}
          {/* ========================================================================= */}
          <section aria-labelledby="section-09-heading" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700">09</span>
              <h2 id="section-09-heading" className="text-sm font-mono uppercase tracking-wider text-slate-900 font-bold">
                Connected Knowledge & Related Artifacts
              </h2>
            </div>

            {/* Knowledge Graph Card Integration */}
            <ConnectedKnowledgeCard
              entityId={project.id}
              onNavigate={(pageId) => {
                onClose();
                onNavigate?.(pageId);
              }}
              onOpenProject={(pid) => {
                const target = projects.find((p) => p.id === pid);
                if (target && onSelectProject) {
                  onSelectProject(target);
                }
              }}
            />
          </section>

        </div>

        {/* Modal Footer Controls */}
        <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4 z-40 shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>MUDASSIR JAVED · VERIFIED EVIDENCE PORTFOLIO</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.trackExternalClick("github", `case_study_${project.id}`)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.trackRelatedContentClick(project.id, "live_site", project.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Website</span>
              </a>
            )}

            <button
              onClick={() => {
                telemetry.trackContactStart(`case_study_${project.id}`);
                onClose();
                onNavigate?.("contact");
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Discuss Similar Solution →</span>
            </button>
          </div>
        </footer>

        {/* Interactive Lightbox Overlay */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Image Lightbox"
            >
              <div className="w-full max-w-5xl flex items-center justify-between text-white mb-4">
                <span className="font-mono text-xs">{lightboxCaption}</span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-2 max-h-[80vh] flex items-center justify-center">
                <ContentPlaceholder
                  variant={project.isSimulated ? "dashboard" : "desktop screenshot"}
                  alt={`${project.title} Fullscreen Preview`}
                  title={project.title}
                  aspectRatio="16/9"
                />
              </div>

              <span className="text-[11px] font-mono text-slate-400 mt-3">
                PRESS ESC TO CLOSE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </GlobalModal>
  );
}
