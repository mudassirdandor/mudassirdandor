import React, { useState, useEffect } from "react";
import { telemetry, PortfolioEvent } from "../utils/telemetry";
import { performanceTracker, PerformanceMetrics } from "../utils/performance";

/**
 * PORTFOLIO V6.5 — Dev-Only Real-World Validation Mode Inspector
 * 
 * Strict constraints:
 * - Completely omitted in production builds (returns null when !import.meta.env.DEV).
 * - Zero PII displayed or stored.
 * - Non-intrusive floating inspector allowing real-time audit of the anonymous event stream.
 */
export default function ValidationModeInspector({ currentPath }: { currentPath: string }) {
  // Completely dead-code eliminated in production builds (import.meta.env.DEV is replaced with false)
  if (!import.meta.env.DEV) {
    return null;
  }

  return <DevValidationInspector currentPath={currentPath} />;
}

function DevValidationInspector({ currentPath }: { currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"session" | "events" | "performance" | "errors" | "conversion">("events");
  const [events, setEvents] = useState<PortfolioEvent[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>(performanceTracker.getSnapshot());
  const [summary, setSummary] = useState<Record<string, number>>({});

  const refreshData = () => {
    if (typeof window !== "undefined" && (window as any).__PORTFOLIO_TELEMETRY__) {
      const allEvents = (window as any).__PORTFOLIO_TELEMETRY__.getEvents();
      setEvents([...allEvents].reverse());
      setSummary((window as any).__PORTFOLIO_TELEMETRY__.getSummary().eventDistribution || {});
    }
    setMetrics(performanceTracker.getSnapshot());
  };

  useEffect(() => {
    refreshData();

    const handleTelemetryEvent = () => {
      refreshData();
    };

    window.addEventListener("portfolio:telemetry", handleTelemetryEvent);
    const interval = setInterval(refreshData, 2000);

    return () => {
      window.removeEventListener("portfolio:telemetry", handleTelemetryEvent);
      clearInterval(interval);
    };
  }, []);

  const sessionId = typeof window !== "undefined" && (window as any).__PORTFOLIO_TELEMETRY__
    ? (window as any).__PORTFOLIO_TELEMETRY__.getSessionId()
    : "anonymous-dev-session";

  const errorEvents = events.filter((e) => e.name === "client_error");
  const conversionEvents = events.filter((e) =>
    ["cv_download", "whatsapp_click", "contact_submit", "linkedin_click", "github_click"].includes(e.name)
  );

  return (
    <aside
      aria-label="Development Telemetry Validation Mode"
      className="fixed bottom-4 left-4 z-[9999] font-mono select-none"
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/90 hover:bg-slate-900 text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/40 shadow-xl backdrop-blur-md transition-all cursor-pointer"
          title="Open Dev-Only Validation Mode Inspector"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>VALIDATION MODE ({events.length})</span>
        </button>
      ) : (
        <div className="w-[360px] sm:w-[440px] max-h-[520px] bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-xs">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-[11px] text-white uppercase tracking-wider">Validation Mode (Dev)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if ((window as any).__PORTFOLIO_TELEMETRY__) {
                    (window as any).__PORTFOLIO_TELEMETRY__.clear();
                    refreshData();
                  }
                }}
                className="px-2 py-0.5 text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
                title="Clear Event Stream"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-2 py-0.5 text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Inspector"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 text-[10px] overflow-x-auto">
            {(["events", "session", "performance", "errors", "conversion"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 uppercase font-semibold transition-colors cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-400 bg-slate-900/50"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
                {tab === "errors" && errorEvents.length > 0 && ` (${errorEvents.length})`}
                {tab === "conversion" && conversionEvents.length > 0 && ` (${conversionEvents.length})`}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-mono text-[11px] max-h-[380px]">
            {activeTab === "events" && (
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Buffered: {events.length} events</span>
                  <span>Route: {currentPath}</span>
                </div>
                {events.length === 0 ? (
                  <p className="text-slate-500 italic py-4 text-center">No telemetry events logged yet.</p>
                ) : (
                  events.slice(0, 20).map((ev) => (
                    <div
                      key={ev.id}
                      className="p-2 rounded bg-slate-900/80 border border-slate-800 space-y-1 text-[10px]"
                    >
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold text-blue-400">{ev.name}</span>
                        <span className="text-slate-500">
                          {new Date(ev.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[9px] truncate">
                        Path: {ev.path} | Device: {ev.viewport.device} ({ev.viewport.width}px)
                      </div>
                      {Object.keys(ev.metadata).length > 0 && (
                        <pre className="text-[9px] text-emerald-400/90 overflow-x-auto whitespace-pre-wrap bg-black/40 p-1 rounded">
                          {JSON.stringify(ev.metadata, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "session" && (
              <div className="space-y-2.5">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Anonymous Session ID</span>
                  <span className="text-emerald-400 font-bold break-all">{sessionId}</span>
                  <p className="text-[9px] text-slate-500 mt-1">
                    CODE-VERIFIED: Ephemeral identifier stored locally in sessionStorage. No intentional PII collected.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1.5">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Event Distribution</span>
                  {Object.keys(summary).length === 0 ? (
                    <span className="text-slate-500 italic">No events recorded</span>
                  ) : (
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      {Object.entries(summary).map(([name, count]) => (
                        <div key={name} className="flex justify-between bg-black/30 px-2 py-1 rounded">
                          <span className="text-slate-300 truncate">{name}</span>
                          <span className="text-blue-400 font-bold ml-1">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>Instrumentation Status:</span>
                  <span className={`font-bold ${metrics.status === "measured" ? "text-emerald-400" : "text-amber-400"}`}>
                    {metrics.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 uppercase text-[8px] block">LCP (Max Paint)</span>
                    <span className="text-sm font-bold text-white">
                      {metrics.lcp.value !== null ? `${metrics.lcp.value} ms` : "Awaiting paint"}
                    </span>
                    <span className={`block text-[9px] mt-0.5 ${metrics.lcp.rating === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                      Rating: {metrics.lcp.rating}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 uppercase text-[8px] block">CLS (Layout Shift)</span>
                    <span className="text-sm font-bold text-white">
                      {metrics.cls.value !== null ? metrics.cls.value : "Awaiting shift"}
                    </span>
                    <span className={`block text-[9px] mt-0.5 ${metrics.cls.rating === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                      Rating: {metrics.cls.rating}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 uppercase text-[8px] block">INP (First Input)</span>
                    <span className="text-sm font-bold text-white">
                      {metrics.inp.value !== null ? `${metrics.inp.value} ms` : "Awaiting input"}
                    </span>
                    <span className={`block text-[9px] mt-0.5 ${metrics.inp.rating === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                      Rating: {metrics.inp.rating}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 uppercase text-[8px] block">TTFB (Server Latency)</span>
                    <span className="text-sm font-bold text-white">
                      {metrics.ttfb.value !== null ? `${metrics.ttfb.value} ms` : "Awaiting nav"}
                    </span>
                    <span className={`block text-[9px] mt-0.5 ${metrics.ttfb.rating === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                      Rating: {metrics.ttfb.rating}
                    </span>
                  </div>
                </div>

                {metrics.effectiveConnectionType && (
                  <div className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded">
                    Network: <span className="text-white font-bold">{metrics.effectiveConnectionType}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "errors" && (
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400">
                  Total Client Errors: {errorEvents.length}
                </div>
                {errorEvents.length === 0 ? (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded text-emerald-400 text-center">
                    ✔ Zero client errors captured in this session.
                  </div>
                ) : (
                  errorEvents.map((err) => (
                    <div key={err.id} className="p-2 bg-rose-950/30 border border-rose-800/50 rounded text-rose-300 text-[10px]">
                      <div className="font-bold text-rose-400">{err.metadata.category}</div>
                      <div className="text-slate-300 mt-1">{err.metadata.message}</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "conversion" && (
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400">
                  Primary Funnel Actions: {conversionEvents.length}
                </div>
                {conversionEvents.length === 0 ? (
                  <div className="p-4 bg-slate-900 rounded text-slate-400 text-center italic">
                    No conversion triggers fired yet (e.g. CV download, WhatsApp, Form submit).
                  </div>
                ) : (
                  conversionEvents.map((c) => (
                    <div key={c.id} className="p-2 bg-emerald-950/30 border border-emerald-800/50 rounded text-emerald-300 text-[10px]">
                      <div className="font-bold text-emerald-400">{c.name}</div>
                      <div className="text-slate-400 text-[9px] mt-0.5">
                        Source: {String(c.metadata.source || c.metadata.projectType || "direct")}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
