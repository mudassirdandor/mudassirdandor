import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  User, 
  Layout, 
  Award, 
  GitFork, 
  Clock, 
  Smartphone, 
  Monitor, 
  ChevronRight, 
  Database, 
  Workflow, 
  Server, 
  Layers, 
  FileCheck, 
  ExternalLink,
  Shield,
  Briefcase
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";

export type PlaceholderVariant = 
  | "portrait" 
  | "dashboard" 
  | "certificate" 
  | "architecture" 
  | "workflow" 
  | "mobile screenshot" 
  | "desktop screenshot" 
  | "gallery";

interface ContentPlaceholderProps {
  variant: PlaceholderVariant;
  src?: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  borderless?: boolean;
  aspectRatio?: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  // Extensible mock metadata for when actual content is populated
  metadata?: {
    issuer?: string;
    issuerLogo?: string;
    issueDate?: string;
    expirationDate?: string;
    credentialId?: string;
    verificationUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    techStack?: string[];
    beforeLabel?: string;
    afterLabel?: string;
    beforeSrc?: string;
    afterSrc?: string;
  };
  children?: React.ReactNode;
}

/**
 * Reusable ContentPlaceholder component.
 * Provides high-fidelity mockups when no real asset source is present,
 * and handles optimized production asset delivery when actual URLs are supplied.
 */
export default function ContentPlaceholder({
  variant,
  src,
  alt,
  title,
  width,
  height,
  className = "",
  metadata,
  children,
  borderless = false,
  aspectRatio,
  imageClassName = "",
  imageStyle
}: ContentPlaceholderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"before" | "after" | "mockup">("after");
  const [imageFailed, setImageFailed] = useState(false);
  const [sigFailed, setSigFailed] = useState(false);

  // Determine if we are rendering a real image/asset or falling back to high-fidelity mockups
  const hasRealAsset = !!src && !imageFailed;

  // Outer container custom height/aspect ratio helper
  const getContainerStyles = () => {
    switch (variant) {
      case "portrait":
        return "aspect-[3/4]";
      case "certificate":
        return "aspect-[4/3]";
      case "dashboard":
      case "desktop screenshot":
      case "architecture":
      case "workflow":
        return "aspect-[16/10]";
      case "mobile screenshot":
        return "aspect-[9/19]";
      default:
        return "min-h-[280px]";
    }
  };

  if (hasRealAsset) {
    return (
      <div 
        className={`relative group overflow-hidden transition-all duration-300 ${
          borderless 
            ? "" 
            : "border border-slate-200/80 rounded-2xl bg-white shadow-xs hover:border-slate-300 hover:shadow-md"
        } ${className}`}
        style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          aspectRatio={
            aspectRatio || (
              variant === "portrait" ? "3/4" : 
              variant === "certificate" ? "4/3" : 
              variant === "mobile screenshot" ? "2/3" : "16/9"
            )
          }
          borderless={borderless}
          className={`w-full h-full object-cover ${imageClassName}`}
          style={imageStyle}
          onError={() => setImageFailed(true)}
        />
        {/* Hover Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-bold text-xs tracking-wide uppercase font-mono">{title || variant}</p>
          <p className="text-slate-300 text-[10px] mt-1 font-sans">{alt}</p>
          {(metadata?.liveUrl || metadata?.githubUrl) && (
            <div className="flex gap-2.5 mt-2.5">
              {metadata?.liveUrl && (
                <a 
                  href={metadata.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  LIVE DEMO
                </a>
              )}
              {metadata?.githubUrl && (
                <a 
                  href={metadata.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded border border-slate-700"
                >
                  <GitFork className="w-2.5 h-2.5" />
                  GITHUB
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // If we have custom children supplied and no real asset is present/has failed to load, render the children!
  if (children) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
      >
        {children}
      </div>
    );
  }

  // --- RENDER HIGH FIDELITY SVG/HTML MOCKUPS ---
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xs select-none ${getContainerStyles()} ${className}`}
      style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
    >
      {/* 1. PORTRAIT PLACEHOLDER */}
      {variant === "portrait" && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/30">
          {/* Subtle tech border overlay */}
          <div className="absolute inset-4 border border-dashed border-slate-200 rounded-xl pointer-events-none opacity-60" />
          
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-1.5 bg-slate-200/50 backdrop-blur-xs border border-slate-300/40 px-2.5 py-1 rounded-md text-[9px] font-mono text-slate-600 uppercase font-bold tracking-wider">
              <User className="w-3 h-3 text-slate-500" />
              Corporate Identity
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          </div>

          <div className="flex flex-col items-center justify-center py-8 z-10">
            <div className="w-32 h-32 rounded-full bg-slate-100/80 border border-slate-200 flex items-center justify-center relative shadow-sm">
              <User className="w-14 h-14 text-slate-400" />
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/20 animate-spin-slow pointer-events-none" />
            </div>
            
            <div className="text-center mt-5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-bold block">
                Executive Consultant
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Mudassir Javed
              </h4>
              <p className="text-[10.5px] text-slate-500 max-w-[220px] mx-auto leading-normal">
                Decision Intelligence Architect & Automation Strategist
              </p>
            </div>
          </div>

          {/* Simulated Signature SVG Placeholder */}
          <div className="flex items-end justify-between border-t border-slate-200/60 pt-3 z-10">
            <div className="text-left">
              <p className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">Verify Signature</p>
              <div className="h-6 w-24 flex items-center justify-start">
                {!sigFailed ? (
                  <img
                    src="/assets/signature/signature.svg"
                    alt="Mudassir Javed Signature"
                    className="h-full max-h-6 w-auto object-contain text-slate-400"
                    onError={() => setSigFailed(true)}
                  />
                ) : (
                  <svg className="w-full h-full text-slate-400/80" viewBox="0 0 100 30" fill="none" stroke="currentColor">
                    <path d="M10,20 Q25,5 35,25 T60,10 T85,22 T95,12" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Active Key</p>
              <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-bold">
                SECURE_ID
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CERTIFICATE PLACEHOLDER */}
      {variant === "certificate" && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-white border-[6px] border-slate-100 rounded-2xl relative">
          {/* Guilloche style background vector */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          
          <div className="flex justify-between items-start z-10 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-slate-400" />
              <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                {metadata?.issuer || "AUTHORIZED DEPLOYMENT"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">REGISTRY LOG</span>
              <p className="text-[9px] font-mono font-bold text-slate-700">{metadata?.credentialId || "CERT-ID-PLACEHOLDER"}</p>
            </div>
          </div>

          <div className="text-center py-4 space-y-2 z-10">
            <div className="inline-flex p-2.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shadow-3xs">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">
                Professional Verification Registry
              </span>
              <h3 className="text-xs font-bold text-slate-900 font-sans tracking-tight max-w-[280px] mx-auto leading-snug">
                {title || alt}
              </h3>
            </div>
            <div className="text-[10px] text-slate-500 leading-normal max-w-[320px] mx-auto">
              Documenting standard-verified expertise in enterprise systems integration, data analytics architectures, and decision-support optimization frameworks.
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-slate-100 pt-3 z-10">
            <div className="text-left space-y-0.5">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Issue Date</span>
              <p className="text-[9px] font-mono text-slate-800 font-bold">{metadata?.issueDate || "CURRENT_VERSION"}</p>
            </div>
            {metadata?.expirationDate && (
              <div className="text-left space-y-0.5">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Expires</span>
                <p className="text-[9px] font-mono text-slate-800 font-bold">{metadata.expirationDate}</p>
              </div>
            )}
            <div className="text-right">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Corporate Seal</span>
              <div className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-bold mt-0.5">
                <FileCheck className="w-3 h-3 text-blue-500" />
                VERIFIED
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD PLACEHOLDER */}
      {variant === "dashboard" && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between text-slate-200 overflow-hidden font-mono">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                {title || "DECISION PILOT v1.0"}
              </span>
            </div>
            <div className="flex gap-2">
              <div className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase">SYSTEMS: ONLINE</div>
              <div className="text-[8px] bg-blue-900/40 text-blue-400 border border-blue-800/40 px-1.5 py-0.5 rounded">AUTO_SYNC</div>
            </div>
          </div>

          {/* Dashboard Layout Grid */}
          <div className="flex-1 p-3.5 grid grid-cols-4 gap-3">
            {/* Sidebar Mock */}
            <div className="col-span-1 bg-slate-900/60 rounded-lg p-2.5 border border-slate-800/50 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-800/50 rounded w-3/4" />
                <div className="h-3 bg-slate-800/50 rounded w-2/3" />
                <div className="h-3 bg-slate-800/30 rounded w-1/2" />
              </div>
              <div className="space-y-1.5 pt-4 border-t border-slate-800/50">
                <div className="h-2.5 bg-slate-800/40 rounded w-full" />
                <div className="h-2.5 bg-slate-800/40 rounded w-3/4" />
              </div>
            </div>

            {/* Dashboard Contents Grid */}
            <div className="col-span-3 grid grid-cols-3 gap-2">
              {/* Metric 1 */}
              <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
                <span className="text-[8px] text-slate-400 uppercase">INGESTION_RATE</span>
                <p className="text-sm font-bold text-slate-100 tracking-tight">4.82 MB/s</p>
                <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
                  <div className="bg-blue-500 h-full w-4/5" />
                </div>
              </div>
              {/* Metric 2 */}
              <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
                <span className="text-[8px] text-slate-400 uppercase">SYS_EFFICIENCY</span>
                <p className="text-sm font-bold text-emerald-400 tracking-tight">99.84%</p>
                <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[98%]" />
                </div>
              </div>
              {/* Metric 3 */}
              <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
                <span className="text-[8px] text-slate-400 uppercase">INTELLIGENCE_MATCH</span>
                <p className="text-sm font-bold text-purple-400 tracking-tight">94.2%</p>
                <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
                  <div className="bg-purple-500 h-full w-[94%]" />
                </div>
              </div>

              {/* Main Chart Card Mock */}
              <div className="col-span-3 bg-slate-900/80 rounded-lg p-2.5 border border-slate-800 flex flex-col justify-between min-h-[90px]">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[8px] text-slate-400 uppercase font-bold">DECISION OPTIMIZATION PATHWAY</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                </div>
                {/* SVG Mock Line Graph */}
                <div className="flex-1 w-full flex items-end">
                  <svg className="w-full h-full text-blue-500/80" viewBox="0 0 300 60" fill="none" stroke="currentColor">
                    <path 
                      d="M0,50 L30,42 L60,45 L90,25 L120,38 L150,15 L180,28 L210,12 L240,18 L270,5 L300,10" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M0,50 L30,42 L60,45 L90,25 L120,38 L150,15 L180,28 L210,12 L240,18 L270,5 L300,10 L300,60 L0,60 Z" 
                      fill="url(#blue-gradient)" 
                      stroke="none"
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status Bar */}
          <div className="bg-slate-900 px-4 py-2 border-t border-slate-800/80 flex justify-between items-center text-[8px] text-slate-500">
            <span>METRIC: SECURE_HASH: 0x98A1...F02A</span>
            <span>LAST SYNC: JUST NOW</span>
          </div>
        </div>
      )}

      {/* 4. ARCHITECTURE PLACEHOLDER */}
      {variant === "architecture" && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-slate-50 relative overflow-hidden">
          {/* Subtle grid layer */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          {/* Header */}
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[9px] font-mono text-blue-600 font-bold uppercase tracking-widest block">System Topology</span>
              <h3 className="text-xs font-bold text-slate-800">{title || "Architecture Layout Platform"}</h3>
            </div>
            <div className="inline-flex items-center gap-1 text-[8px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-3xs">
              <GitFork className="w-2.5 h-2.5" />
              INTEGRATION_SPEC
            </div>
          </div>

          {/* Network Architecture Map */}
          <div className="flex-1 flex items-center justify-between px-2 py-4 z-10 max-w-xl mx-auto w-full">
            {/* Source */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-3xs">
                <Database className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Data Ingest</span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Ingestion Engine */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center shadow-3xs">
                <Server className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[8px] font-mono text-blue-600 uppercase font-bold">Pipeline</span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Processing Vault */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center shadow-3xs animate-pulse">
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[8px] font-mono text-purple-600 uppercase font-bold">BI Vault</span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Presentation Delivery */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shadow-3xs">
                <Layout className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-[8px] font-mono text-emerald-600 uppercase font-bold">Client API</span>
            </div>
          </div>

          {/* Legend/Status footer */}
          <div className="flex justify-between items-center border-t border-slate-200/60 pt-3 z-10 text-[8px] font-mono text-slate-400">
            <span>SECURE GATEWAY ENFORCED</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              TLS 1.3 ENCRYPTION ACTIVE
            </span>
          </div>
        </div>
      )}

      {/* 5. WORKFLOW PLACEHOLDER */}
      {variant === "workflow" && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-white relative">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-mono text-violet-600 font-bold uppercase tracking-widest block">Workflow Timeline</span>
              <h3 className="text-xs font-bold text-slate-800">{title || "Operational Workflow Strategy"}</h3>
            </div>
            <div className="inline-flex items-center gap-1 text-[8px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
              <Workflow className="w-2.5 h-2.5" />
              BI_LIFECYCLE
            </div>
          </div>

          {/* Workflow nodes timeline */}
          <div className="flex-1 flex flex-col justify-center space-y-4 max-w-md mx-auto w-full z-10">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold font-mono flex items-center justify-center">1</span>
              <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-800">Identify Business Bottlenecks</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase">Assessment</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold font-mono flex items-center justify-center">2</span>
              <div className="flex-1 bg-blue-50/50 border border-blue-200/60 rounded-xl px-3 py-2 flex justify-between items-center">
                <span className="text-[11px] font-bold text-blue-900">Establish Automated SQL pipelines</span>
                <span className="text-[8px] font-mono text-blue-500 uppercase">Engineering</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono flex items-center justify-center">3</span>
              <div className="flex-1 bg-emerald-50/50 border border-emerald-200/60 rounded-xl px-3 py-2 flex justify-between items-center">
                <span className="text-[11px] font-bold text-emerald-900">Deploy High-Contrast Dashboards</span>
                <span className="text-[8px] font-mono text-emerald-500 uppercase">Presentation</span>
              </div>
            </div>
          </div>

          {/* Timeline indicator label */}
          <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 border-t border-slate-100 pt-3">
            <span>PROCESS: CONTINUOUS DEPLOYMENT</span>
            <span>OWNER: MUDASSIR JAVED</span>
          </div>
        </div>
      )}

      {/* 6. MOBILE SCREENSHOT PLACEHOLDER */}
      {variant === "mobile screenshot" && (
        <div className="absolute inset-0 p-5 flex flex-col justify-between bg-slate-900 text-slate-100 relative">
          {/* Simulated iOS status bar */}
          <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 px-2">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>LTE</span>
            </div>
          </div>

          {/* Dynamic App Layout inside Bezel */}
          <div className="flex-1 my-3 bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[9px] font-bold tracking-tight">Executive App Hub</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>

              {/* Feed List Item 1 */}
              <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800 space-y-1.5">
                <span className="text-[7px] font-mono text-slate-400 uppercase block">Active Report</span>
                <h4 className="text-[9.5px] font-bold text-slate-100 leading-normal">Digital Registration Trends</h4>
                <div className="h-6 bg-slate-950 rounded border border-slate-800/60 flex items-center justify-between px-2">
                  <span className="text-[7.5px] font-mono text-emerald-400">+18.4% Efficiency</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Feed List Item 2 */}
              <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800 space-y-1.5">
                <span className="text-[7px] font-mono text-slate-400 uppercase block">Analytics Feed</span>
                <h4 className="text-[9.5px] font-bold text-slate-100 leading-normal">Workspace Telemetry Audit</h4>
                <div className="h-2 bg-slate-800 rounded w-full" />
              </div>
            </div>

            {/* Tabs Bar Mock */}
            <div className="border-t border-slate-800/80 pt-2 flex justify-around text-[7.5px] font-mono text-slate-500">
              <span className="text-blue-400">Dash</span>
              <span>Feed</span>
              <span>Prefs</span>
            </div>
          </div>

          {/* Simulated iOS home gesture indicator */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>
      )}

      {/* 7. DESKTOP SCREENSHOT PLACEHOLDER */}
      {variant === "desktop screenshot" && (
        <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between text-slate-700 font-sans overflow-hidden">
          {/* macOS window head bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              {/* Traffic light buttons */}
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            
            {/* Simulated browser URL Bar */}
            <div className="flex-1 max-w-[280px] mx-auto bg-white border border-slate-200 rounded-md px-3 py-0.5 text-center text-[9px] font-mono text-slate-400 truncate shadow-2xs">
              https://mudassirdandor.com/interactive-dashboard
            </div>

            <div className="w-10 flex justify-end">
              <Monitor className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Browser inner layout body */}
          <div className="flex-1 p-4 bg-white flex flex-col justify-between overflow-hidden relative">
            <div className="space-y-4">
              {/* Fake web hero */}
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                  <div className="h-2 bg-slate-100 rounded w-full" />
                  <div className="h-2 bg-slate-100 rounded w-5/6" />
                </div>
                <div className="w-12 h-12 rounded bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-slate-300" />
                </div>
              </div>

              {/* Layout Content block */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 space-y-1.5">
                  <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                  <div className="h-1.5 bg-slate-100 rounded w-full" />
                  <div className="h-1.5 bg-slate-100 rounded w-3/4" />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 space-y-1.5">
                  <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                  <div className="h-1.5 bg-slate-100 rounded w-full" />
                  <div className="h-1.5 bg-slate-100 rounded w-3/4" />
                </div>
              </div>
            </div>

            {/* Inner status log footer */}
            <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[7.5px] font-mono text-slate-400">
              <span>ACTIVE LAYOUT RESOLUTION: 1920x1080</span>
              <span>RENDER ENGINE: CHROMIUM / SAFARI</span>
            </div>
          </div>
        </div>
      )}

      {/* 8. GALLERY PLACEHOLDER */}
      {variant === "gallery" && (
        <div className="absolute inset-0 p-5 flex flex-col justify-between bg-slate-50">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
            <div>
              <span className="text-[8px] font-mono text-blue-600 font-bold uppercase tracking-widest block">Aesthetic Gallery</span>
              <h3 className="text-xs font-bold text-slate-800">{title || "Unified Visual Sandbox"}</h3>
            </div>
            
            {/* Gallery interactive tabs */}
            <div className="flex gap-1.5 bg-slate-200/60 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("mockup")}
                className={`px-2 py-1 rounded text-[8.5px] font-mono font-bold transition-all ${
                  activeTab === "mockup" ? "bg-white text-slate-900 shadow-3xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Mockup
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-2 py-1 rounded text-[8.5px] font-mono font-bold transition-all ${
                  activeTab === "after" ? "bg-white text-slate-900 shadow-3xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Framework
              </button>
            </div>
          </div>

          {/* Gallery viewport panel */}
          <div className="flex-1 flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              {activeTab === "mockup" ? (
                <motion.div
                  key="mockup"
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                  className="w-full h-full flex flex-col justify-between items-center max-w-[280px]"
                >
                  <div className="w-full bg-slate-950 rounded-xl p-3 border border-slate-800 text-slate-300 font-mono text-[9px] space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="text-[8px] text-slate-500">MOCKUP ENGINE</span>
                      <span className="text-[8px] text-blue-500 font-bold">READY</span>
                    </div>
                    <p className="text-[9px] text-slate-300 leading-normal">
                      The image gallery is fully prepared to handle high-resolution screenshots, mobile UI mockups, and responsive multi-device previews.
                    </p>
                    <div className="h-1 bg-slate-800 rounded overflow-hidden">
                      <div className="bg-blue-500 h-full w-2/3" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="framework"
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div className="grid grid-cols-3 gap-2 flex-1 items-center">
                    <div className="aspect-[3/4] bg-white border border-slate-200 rounded-lg p-2 flex flex-col justify-between">
                      <span className="text-[7px] font-mono text-slate-400 uppercase">A</span>
                      <div className="w-full h-1 bg-blue-500 rounded" />
                    </div>
                    <div className="aspect-[3/4] bg-white border border-slate-200 rounded-lg p-2 flex flex-col justify-between shadow-2xs scale-[1.03]">
                      <span className="text-[7px] font-mono text-slate-400 uppercase">B (Active)</span>
                      <div className="w-full h-1 bg-purple-500 rounded" />
                    </div>
                    <div className="aspect-[3/4] bg-white border border-slate-200 rounded-lg p-2 flex flex-col justify-between">
                      <span className="text-[7px] font-mono text-slate-400 uppercase">C</span>
                      <div className="w-full h-1 bg-emerald-500 rounded" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer of Gallery */}
          <div className="flex justify-between items-center border-t border-slate-200/80 pt-2 text-[8px] font-mono text-slate-400">
            <span>PREPARED: {alt}</span>
            <span>GALLERY ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}
