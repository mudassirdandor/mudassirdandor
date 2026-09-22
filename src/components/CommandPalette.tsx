import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  Search, 
  X, 
  ArrowRight, 
  FolderGit2, 
  BookOpen, 
  Award, 
  Compass, 
  CornerDownLeft, 
  Layers, 
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RotateCcw
} from "lucide-react";
import { 
  searchKnowledgeGraph, 
  getAllKnowledgeEntities, 
  KnowledgeEntity, 
  NAVIGATION_PAGES, 
  DECISION_SCENARIOS 
} from "../data/knowledgeGraph";
import { telemetry } from "../utils/telemetry";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
  onSelectProject?: (projectId: string) => void;
  onSelectArticle?: (articleId: string) => void;
  onSelectScenario?: (scenarioId: string) => void;
}

const CURATED_SUGGESTIONS = [
  "Power BI",
  "Saylani Registration",
  "DAX Formulas",
  "Local Maps & SEO",
  "Customer Churn",
  "Google Data Analytics"
];

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onSelectArticle,
  onSelectScenario
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Focus management: save previous active element and restore on close
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      telemetry.track("search_open");
      previousActiveElement.current = document.activeElement as HTMLElement;
      setQuery("");
      setSelectedIndex(0);
      setActiveFilter("all");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    } else {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Results calculation
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      let items: KnowledgeEntity[] = [
        ...NAVIGATION_PAGES.slice(0, 5),
        ...DECISION_SCENARIOS
      ];

      if (activeFilter !== "all") {
        items = getAllKnowledgeEntities().filter((e) => e.type === activeFilter);
      }
      return items;
    }

    let results = searchKnowledgeGraph(query);
    if (activeFilter !== "all") {
      results = results.filter((e) => e.type === activeFilter);
    }
    return results;
  }, [query, activeFilter]);

  // Debounced search query telemetry
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      telemetry.trackSearchQuery(query.trim(), searchResults.length);
    }, 450);
    return () => clearTimeout(timer);
  }, [query, searchResults.length]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults.length, query, activeFilter]);

  // Scroll active item into view smoothly
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Execution handler
  const handleSelectEntity = (entity: KnowledgeEntity) => {
    telemetry.trackSearchResultClick(entity.id, entity.type, selectedIndex);
    onClose();

    switch (entity.type) {
      case "page": {
        const pageMap: Record<string, string> = {
          "page-home": "home",
          "page-solutions": "solutions",
          "page-case-studies": "case-studies",
          "page-evidence-lab": "evidence-lab",
          "page-insights": "insights",
          "page-certifications": "certifications",
          "page-about": "about",
          "page-contact": "contact"
        };
        const pageKey = pageMap[entity.id] || "home";
        onNavigate(pageKey);
        break;
      }

      case "case-study": {
        if (entity.actionId) {
          localStorage.setItem("selected-project-id", entity.actionId);
          window.dispatchEvent(new CustomEvent("portfolio-open-project", { detail: { projectId: entity.actionId } }));
          if (onSelectProject) {
            onSelectProject(entity.actionId);
          } else {
            onNavigate("case-studies");
          }
        }
        break;
      }

      case "article": {
        if (entity.actionId) {
          localStorage.setItem("selected-article-id", entity.actionId);
          window.dispatchEvent(new CustomEvent("portfolio-open-article", { detail: { articleId: entity.actionId } }));
          if (onSelectArticle) {
            onSelectArticle(entity.actionId);
          } else {
            onNavigate("insights");
          }
        }
        break;
      }

      case "scenario": {
        if (entity.actionId) {
          window.dispatchEvent(new CustomEvent("portfolio-select-scenario", { detail: { scenarioId: entity.actionId } }));
          if (onSelectScenario) {
            onSelectScenario(entity.actionId);
          } else {
            onNavigate("home");
            setTimeout(() => {
              const el = document.getElementById("decision-intelligence-engine");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
        break;
      }

      case "certification": {
        if (entity.url) {
          window.open(entity.url, "_blank", "noopener,noreferrer");
        } else {
          onNavigate("certifications");
        }
        break;
      }

      default:
        onNavigate("home");
    }
  };

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, searchResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % Math.max(1, searchResults.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelectEntity(searchResults[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "page":
        return <Compass className="w-4 h-4 text-slate-500" />;
      case "case-study":
        return <FolderGit2 className="w-4 h-4 text-blue-600" />;
      case "article":
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case "scenario":
        return <Terminal className="w-4 h-4 text-indigo-600" />;
      case "certification":
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "page": return "Section";
      case "case-study": return "Case Study";
      case "article": return "Article";
      case "scenario": return "Simulator";
      case "certification": return "Credential";
      default: return "Resource";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/65 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Executive Global Search & Command Palette"
      >
        <motion.div
          ref={dialogRef}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header search bar */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search case studies, Power BI, DAX, local maps, certifications, or jump to page..."
              className="w-full bg-transparent text-sm md:text-[15px] font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={searchResults.length > 0}
              aria-controls="command-results-list"
              aria-activedescendant={`command-result-${selectedIndex}`}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md text-xs font-mono mr-2 cursor-pointer transition-colors"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 px-4 py-2 bg-slate-50/75 border-b border-slate-100 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Filter:
            </span>
            {[
              { id: "all", label: "All Items" },
              { id: "case-study", label: "Case Studies" },
              { id: "article", label: "Articles & Research" },
              { id: "scenario", label: "Simulators" },
              { id: "certification", label: "Certifications" },
              { id: "page", label: "Pages" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 cursor-pointer min-h-[28px] ${
                  activeFilter === tab.id
                    ? "bg-white text-slate-950 shadow-xs border border-slate-200/80 font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screen reader live notification */}
          <div className="sr-only" aria-live="polite">
            {searchResults.length} {searchResults.length === 1 ? "result" : "results"} available.
          </div>

          {/* Search results list */}
          <div 
            ref={listRef}
            id="command-results-list"
            role="listbox"
            className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 max-h-[460px]"
          >
            {searchResults.length === 0 ? (
              <div className="py-10 px-6 text-center text-slate-500 space-y-4">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    No resources found matching "{query}"
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try searching by tool (Python, SQL, DAX), sector (Retail, Healthcare, Finance), or credential (Google BI).
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase w-full mb-1">
                    Try one of these:
                  </span>
                  {CURATED_SUGGESTIONS.slice(0, 4).map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs rounded-md transition-colors cursor-pointer font-sans"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              searchResults.map((entity, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={entity.id}
                    id={`command-result-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectEntity(entity)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all min-h-[44px] ${
                      isSelected
                        ? "bg-blue-50/70 border border-blue-200/60"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                      isSelected ? "bg-white text-blue-600 shadow-xs" : "bg-slate-100 text-slate-500"
                    }`}>
                      {getEntityIcon(entity.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {entity.title}
                        </span>
                        {entity.badgeText && (
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            · {entity.badgeText}
                          </span>
                        )}
                      </div>

                      <p className="text-[12px] text-slate-600 line-clamp-1 leading-snug">
                        {entity.description}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                        <span className="uppercase tracking-wider">{getTypeLabel(entity.type)}</span>
                        {entity.category && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{entity.category}</span>
                          </>
                        )}
                        {entity.metric && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-600 font-semibold">{entity.metric}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 self-center pl-2">
                      {isSelected ? (
                        <div className="flex items-center gap-1 text-[11px] font-mono text-blue-600 font-semibold">
                          <span>Open</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Suggestions footer when query is empty */}
          {!query && (
            <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Popular:</span>
              {CURATED_SUGGESTIONS.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 bg-white border border-slate-200/80 rounded text-[11px] text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* Palette Footer Help Bar */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-150 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↵</kbd>
                <span>Select</span>
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">ESC</kbd>
                <span>Dismiss</span>
              </span>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>Connected Knowledge Engine</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
