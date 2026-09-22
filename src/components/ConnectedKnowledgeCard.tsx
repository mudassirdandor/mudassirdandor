import React from "react";
import { 
  FolderGit2, 
  BookOpen, 
  Terminal, 
  Award, 
  ArrowRight, 
  Compass, 
  ExternalLink,
  Sparkles,
  Info
} from "lucide-react";
import { getEntityConnectedData } from "../data/knowledgeGraph";
import { telemetry } from "../utils/telemetry";

interface ConnectedKnowledgeCardProps {
  entityId: string;
  onNavigate?: (pageId: string) => void;
  onOpenProject?: (projectId: string) => void;
  onOpenArticle?: (articleId: string) => void;
  onOpenScenario?: (scenarioId: string) => void;
}

export default function ConnectedKnowledgeCard({
  entityId,
  onNavigate,
  onOpenProject,
  onOpenArticle,
  onOpenScenario
}: ConnectedKnowledgeCardProps) {
  const connected = getEntityConnectedData(entityId);

  const hasConnectedItems = 
    connected.relatedProjects.length > 0 ||
    connected.relatedArticles.length > 0 ||
    connected.relatedScenarios.length > 0 ||
    connected.relatedCertifications.length > 0;

  if (!hasConnectedItems && !connected.nextRecommended) {
    return null;
  }

  const handleProjectClick = (projectId: string) => {
    telemetry.trackRelatedContentClick(entityId, "project", projectId);
    localStorage.setItem("selected-project-id", projectId);
    window.dispatchEvent(new CustomEvent("portfolio-open-project", { detail: { projectId } }));
    if (onOpenProject) {
      onOpenProject(projectId);
    } else if (onNavigate) {
      onNavigate("case-studies");
    }
  };

  const handleArticleClick = (articleId: string) => {
    telemetry.trackRelatedContentClick(entityId, "article", articleId);
    localStorage.setItem("selected-article-id", articleId);
    window.dispatchEvent(new CustomEvent("portfolio-open-article", { detail: { articleId } }));
    if (onOpenArticle) {
      onOpenArticle(articleId);
    } else if (onNavigate) {
      onNavigate("insights");
    }
  };

  const handleScenarioClick = (scenarioId: string) => {
    telemetry.trackRelatedContentClick(entityId, "scenario", scenarioId);
    window.dispatchEvent(new CustomEvent("portfolio-select-scenario", { detail: { scenarioId } }));
    if (onOpenScenario) {
      onOpenScenario(scenarioId);
    } else if (onNavigate) {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById("decision-intelligence-engine");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Helper for honest status pill display
  const getProjectStatusLabel = (status: string) => {
    switch (status) {
      case "Production": return "Production System";
      case "Open Source": return "Open Source";
      case "In Development": return "In Development";
      case "Research": return "Research Framework";
      default: return "Interactive Demonstration";
    }
  };

  return (
    <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 md:p-8 space-y-6 my-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-blue-600 shrink-0" />
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase">
              Connected Knowledge Network
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Explore correlated client evidence, methodology research, live decision simulators, and credentials.
          </p>
        </div>

        {connected.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Stack:</span>
            {connected.technologies.slice(0, 4).map((tech, idx) => (
              <span key={tech} className="text-[11px] font-mono font-medium text-slate-700">
                {tech}{idx < Math.min(3, connected.technologies.length - 1) ? " ·" : ""}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Grid of connected categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Related Case Studies */}
        {connected.relatedProjects.length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span>Related Deliverables ({connected.relatedProjects.length})</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Architecture</span>
            </div>
            <div className="space-y-2">
              {connected.relatedProjects.slice(0, 2).map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => handleProjectClick(proj.id)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100/90 transition-colors group cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 group-hover:text-blue-600 truncate">
                      {proj.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      <span>{proj.category}</span>
                      <span>·</span>
                      <span className="text-slate-500 font-medium">{getProjectStatusLabel(proj.status)}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles & Methodologies */}
        {connected.relatedArticles.length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Methodology Research ({connected.relatedArticles.length})</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Theory & Standards</span>
            </div>
            <div className="space-y-2">
              {connected.relatedArticles.slice(0, 2).map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleArticleClick(art.id)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100/90 transition-colors group cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 group-hover:text-emerald-600 truncate">
                      {art.title}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {art.category} · {art.readTime}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Decision Simulators */}
        {connected.relatedScenarios.length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-600" />
                <span>Decision Simulator</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Interactive</span>
            </div>
            <div className="space-y-2">
              {connected.relatedScenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioClick(sc.actionId || "finance")}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100/90 transition-colors group cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-slate-800 group-hover:text-indigo-600 truncate">
                        {sc.title}
                      </p>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      Live ETL & DAX simulation · {sc.metric || "Quantifiable"}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Certifications */}
        {connected.relatedCertifications.length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Verified Credentials ({connected.relatedCertifications.length})</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-medium">Authentic</span>
            </div>
            <div className="space-y-2">
              {connected.relatedCertifications.slice(0, 2).map((cert) => (
                <a
                  key={cert.id}
                  href={cert.verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100/90 transition-colors group cursor-pointer flex items-center justify-between gap-2 block"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 group-hover:text-amber-600 truncate">
                      {cert.title}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {cert.provider} · Verified Credential ID
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Next Step Callout with Contextual Reasoning */}
      {connected.nextRecommended && (
        <div className="p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-100/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-blue-700 uppercase tracking-widest">
                Recommended Exploration Step
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-900 truncate">
              {connected.nextRecommended.title}
            </p>
            {connected.contextualReason && (
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed flex items-start gap-1.5 pt-0.5">
                <Info className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                <span>{connected.contextualReason}</span>
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if ("tools" in connected.nextRecommended!) {
                handleProjectClick(connected.nextRecommended.id);
              } else {
                handleArticleClick(connected.nextRecommended.id);
              }
            }}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shrink-0 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Explore Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
