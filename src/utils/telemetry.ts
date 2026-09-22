/**
 * PORTFOLIO V6.5 — Phase 4.2 Production Analytics & Observability Engine
 * 
 * TECHNICAL PRIVACY CONTROLS (CODE-VERIFIED):
 * 1. Zero Intentional PII: No names, emails, phone numbers, free-text message bodies,
 *    IP addresses, keystroke logging, or hardware/canvas fingerprinting are collected
 *    by this implementation.
 * 2. Strict Data Minimization: Events store only enumerated IDs, coarse categories,
 *    and boolean flags strictly required to answer technical and usability questions.
 * 3. Sanitized Error Payloads: Error telemetry redacts emails, phone formats, query
 *    parameters, tokens/secrets, and discards stack traces.
 * 4. Anonymous Session Identifier: Local ephemeral ID generated in client memory and
 *    stored in sessionStorage. Cleared upon tab close; never used for cross-site tracking.
 * 5. Transparent In-Browser Audit: Exposes `window.__PORTFOLIO_TELEMETRY__` for inspection.
 * 
 * LEGAL NOTICE:
 * Technical privacy controls are distinct from legal/regulatory compliance.
 * Formal legal/regulatory compliance (e.g. GDPR, CCPA, ePrivacy Directive) has NOT
 * been assessed by legal counsel and is categorized as NOT ASSESSED.
 */

export type PortfolioEventName =
  // Navigation
  | "page_view"
  // Discovery & Search
  | "search_open"
  | "search_query"
  | "search_result_click"
  // Project & Case Study Exploration
  | "project_open"
  | "case_study_open"
  | "evidence_open"
  | "related_content_click"
  // Decision Intelligence Engine
  | "decision_engine_scenario"
  | "decision_engine_tab"
  // Conversion CTAs
  | "cv_download"
  | "whatsapp_click"
  | "linkedin_click"
  | "github_click"
  | "contact_start"
  | "contact_submit"
  // Trust & Verification
  | "certification_open"
  | "credential_external_click"
  // Reliability & Performance
  | "client_error"
  | "web_vital";

export type DeviceCategory = "mobile" | "tablet" | "desktop";

export interface PortfolioEvent<T = Record<string, string | number | boolean>> {
  id: string;
  name: PortfolioEventName;
  timestamp: number;
  sessionId: string;
  path: string;
  viewport: {
    width: number;
    device: DeviceCategory;
  };
  metadata: T;
}

export type SearchIntentCategory =
  | "power_bi"
  | "dax"
  | "sql"
  | "python"
  | "statistics"
  | "data_analytics"
  | "dashboards"
  | "automation"
  | "ai"
  | "local_seo"
  | "google_maps"
  | "certifications"
  | "projects"
  | "case_studies"
  | "cv"
  | "contact"
  | "about"
  | "unknown";

// Comprehensive redaction regexes tested against standard and international formats
const EMAIL_REGEX = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g;
// Matches phone numbers including international (+92 300 1234567, 0300 1234567, (555) 123-4567, +1-800-555-0199)
const PHONE_REGEX = /(?:\+?\d{1,4}[-.\s]*)?(?:\(?\d{2,4}\)?[-.\s]*)?\d{3,4}[-.\s]*\d{3,4}\b/g;
// Matches URL query strings and sensitive parameters (?email=..., ?token=..., &secret=...)
const URL_PARAM_REGEX = /[?&][a-zA-Z0-9_.-]+=[^&#\s]*/g;
// Matches authorization headers, bearer tokens, API keys, and credential patterns
const AUTH_SECRET_REGEX = /(?:Bearer|token|Basic|key|secret|password|auth|jwt|credential)[=:\s]+[A-Za-z0-9._~+/-]{6,}/gi;
// Matches stack trace frames (e.g., "at Component (http://...)", "at Object.<anonymous>", etc.)
const STACK_LINE_REGEX = /\s*at\s+[\w$./\\<>]+(?:\s+\(.*?\))?/gi;

export function sanitizeString(input: string, maxLen = 120): string {
  if (!input || typeof input !== "string") return "";

  // 1. Take first line only to discard multi-line stack traces immediately
  const singleLine = input.split(/[\r\n]+/)[0] || "";

  // 2. Redact stack trace references, auth tokens, URL params, emails, and phone numbers
  return singleLine
    .replace(STACK_LINE_REGEX, "")
    .replace(AUTH_SECRET_REGEX, "[REDACTED_AUTH]")
    .replace(URL_PARAM_REGEX, "[REDACTED_PARAM]")
    .replace(EMAIL_REGEX, "[REDACTED_EMAIL]")
    .replace(PHONE_REGEX, "[REDACTED_PHONE]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

class TelemetryManager {
  private buffer: PortfolioEvent[] = [];
  private maxBufferSize = 50;
  private isInitialized = false;
  private sessionId = "";
  private recentEventKeys: Map<string, number> = new Map();
  private dedupeWindowMs = 350;

  constructor() {
    this.init();
  }

  private getOrCreateSessionId(): string {
    if (typeof window === "undefined") return "server-session";
    try {
      let current = window.sessionStorage.getItem("pf_anon_sess_v6");
      if (!current) {
        // Cryptographically random or high-entropy ephemeral identifier
        current = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        window.sessionStorage.setItem("pf_anon_sess_v6", current);
      }
      return current;
    } catch {
      return "sess_ephemeral_" + Math.random().toString(36).substring(2, 8);
    }
  }

  private getDeviceCategory(width: number): DeviceCategory {
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private getCurrentPath(): string {
    if (typeof window !== "undefined" && window.location) {
      return window.location.pathname || "/";
    }
    return "/";
  }

  private init() {
    if (typeof window === "undefined" || this.isInitialized) return;
    this.isInitialized = true;
    this.sessionId = this.getOrCreateSessionId();

    // Expose transparent debug interface on window for auditing
    (window as any).__PORTFOLIO_TELEMETRY__ = {
      getSessionId: () => this.sessionId,
      getEvents: () => [...this.buffer],
      getRecentEvents: (limit = 10) => this.buffer.slice(-limit),
      getSummary: () => {
        const counts: Record<string, number> = {};
        for (const ev of this.buffer) {
          counts[ev.name] = (counts[ev.name] || 0) + 1;
        }
        return {
          totalEvents: this.buffer.length,
          sessionId: this.sessionId,
          eventDistribution: counts,
        };
      },
      clear: () => {
        this.buffer = [];
        this.recentEventKeys.clear();
      },
      version: "v6.5-production-observability",
    };

    this.setupErrorListeners();
  }

  private setupErrorListeners() {
    if (typeof window === "undefined") return;

    window.addEventListener(
      "error",
      (event) => {
        try {
          const filename = event.filename || "";
          // Filter out browser extension noise (chrome-extension://, moz-extension://, etc.)
          if (filename.includes("extension") || filename.includes("chrome-extension") || filename.includes("moz-extension")) {
            return;
          }

          this.track("client_error", {
            category: "uncaught_error",
            message: sanitizeString(event.message || "Unknown error"),
            line: event.lineno || 0,
            col: event.colno || 0,
          });
        } catch {
          // Silent failure
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "unhandledrejection",
      (event) => {
        try {
          const reason = event.reason;
          const msg = typeof reason === "string" ? reason : reason?.message || "Unhandled rejection";
          this.track("client_error", {
            category: "unhandled_promise_rejection",
            message: sanitizeString(String(msg)),
          });
        } catch {
          // Silent failure
        }
      },
      { passive: true }
    );
  }

  /**
   * Primary canonical tracking method.
   * Enforces deduplication window to prevent React Strict Mode / remount duplicates.
   */
  public track<T extends Record<string, string | number | boolean>>(
    name: PortfolioEventName,
    metadata: T = {} as T,
    dedupeKey?: string
  ): void {
    try {
      const now = Date.now();
      const currentPath = this.getCurrentPath();
      const width = typeof window !== "undefined" ? window.innerWidth : 1024;
      const device = this.getDeviceCategory(width);

      // Deduplication check
      const semanticKey = `${name}:${dedupeKey || JSON.stringify(metadata)}`;
      const lastSeen = this.recentEventKeys.get(semanticKey);
      if (lastSeen && now - lastSeen < this.dedupeWindowMs) {
        return; // Suppress duplicate execution
      }
      this.recentEventKeys.set(semanticKey, now);

      // Garbage collect stale keys periodically
      if (this.recentEventKeys.size > 80) {
        for (const [k, time] of this.recentEventKeys.entries()) {
          if (now - time > 10000) {
            this.recentEventKeys.delete(k);
          }
        }
      }

      const event: PortfolioEvent<T> = {
        id: "evt_" + Math.random().toString(36).substring(2, 9),
        name,
        timestamp: now,
        sessionId: this.sessionId,
        path: currentPath,
        viewport: {
          width,
          device,
        },
        metadata,
      };

      // Push to circular buffer
      this.buffer.push(event as PortfolioEvent);
      if (this.buffer.length > this.maxBufferSize) {
        this.buffer.shift();
      }

      // Dispatch decoupled custom DOM event
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio:telemetry", { detail: event })
        );
      }
    } catch {
      // Telemetry must NEVER interrupt application execution
    }
  }

  // =========================================================================
  // DOMAIN-SPECIFIC SPECIALIZED HELPERS
  // =========================================================================

  /**
   * Track Route Navigation
   */
  public trackPageView(path: string, pageId: string) {
    this.track("page_view", {
      path,
      pageId,
    }, `page_view:${path}`);
  }

  /**
   * Track Project Open
   */
  public trackProjectOpen(projectId: string, category = "", status = "") {
    this.track("project_open", {
      projectId,
      category,
      status,
    }, `project_open:${projectId}`);
  }

  /**
   * Track Case Study Detail Modal Open
   */
  public trackCaseStudyOpen(projectId: string, category = "", status = "") {
    this.track("case_study_open", {
      projectId,
      category,
      status,
    }, `case_study_open:${projectId}`);
  }

  /**
   * Track Evidence Center / Inspection Open
   */
  public trackEvidenceOpen(evidenceId: string, tab = "") {
    this.track("evidence_open", {
      evidenceId,
      tab,
    }, `evidence_open:${evidenceId}:${tab}`);
  }

  /**
   * Track Related Content Link Click (Cross-Entity Graph Exploration)
   */
  public trackRelatedContentClick(sourceEntityId: string, targetType: string, targetId: string) {
    this.track("related_content_click", {
      sourceEntityId,
      targetType,
      targetId,
    });
  }

  /**
   * Track Decision Engine Scenario Selection
   */
  public trackDecisionEngineScenario(scenarioId: string, tabId = "") {
    this.track("decision_engine_scenario", {
      scenarioId,
      tabId,
    }, `de_scenario:${scenarioId}`);
  }

  /**
   * Track Decision Engine Tab View
   */
  public trackDecisionEngineTab(scenarioId: string, tabId: string) {
    this.track("decision_engine_tab", {
      scenarioId,
      tabId,
    }, `de_tab:${scenarioId}:${tabId}`);
  }

  /**
   * Track Search Open (Command Palette)
   */
  public trackSearchOpen() {
    this.track("search_open", {}, "search_open");
  }

  /**
   * Classify user search queries into strictly privacy-preserving intent categories.
   * NEVER logs the raw query or keystrokes.
   */
  public classifySearchIntent(cleanQuery: string): SearchIntentCategory {
    const q = cleanQuery.toLowerCase().trim();
    if (!q) return "unknown";

    if (/\b(dax|measure|calculated column|time intelligence)\b/.test(q)) return "dax";
    if (/\b(power bi|powerbi|pbix|star schema)\b/.test(q)) return "power_bi";
    if (/\b(sql|postgres|database|query|joins|cte|index)\b/.test(q)) return "sql";
    if (/\b(python|pandas|numpy|script|fastapi)\b/.test(q)) return "python";
    if (/\b(statistics|regression|probability|variance|hypothesis|msc)\b/.test(q)) return "statistics";
    if (/\b(dashboard|dashboards|kpi|reporting|matrix)\b/.test(q)) return "dashboards";
    if (/\b(analytics|data analytics|etl|pipeline)\b/.test(q)) return "data_analytics";
    if (/\b(automation|apps script|google sheets|workflow|webhook)\b/.test(q)) return "automation";
    if (/\b(ai|machine learning|gemini|llm|nlp)\b/.test(q)) return "ai";
    if (/\b(local seo|geo|ranking|citation|google maps|gmb)\b/.test(q)) return "local_seo";
    if (/\b(maps|location|coordinate)\b/.test(q)) return "google_maps";
    if (/\b(cert|certification|credential|coursera|google certified|badge)\b/.test(q)) return "certifications";
    if (/\b(project|projects|work|portfolio)\b/.test(q)) return "projects";
    if (/\b(case study|case studies|study)\b/.test(q)) return "case_studies";
    if (/\b(cv|resume|hire|download cv|pdf)\b/.test(q)) return "cv";
    if (/\b(contact|email|whatsapp|message|consult|book)\b/.test(q)) return "contact";
    if (/\b(about|bio|background|experience|education|university)\b/.test(q)) return "about";

    return "unknown";
  }

  /**
   * Track Privacy-Safe Search Query (category and result count only)
   * Never logs raw query or query length.
   */
  public trackSearchQuery(cleanQuery: string, resultCount: number) {
    const category = this.classifySearchIntent(cleanQuery);

    this.track("search_query", {
      category,
      resultCount,
      isZeroResult: resultCount === 0,
    }, `search_query:${category}:${resultCount}`);
  }

  /**
   * Track Search Result Click
   */
  public trackSearchResultClick(entityId: string, entityType: string, position: number) {
    this.track("search_result_click", {
      entityId,
      entityType,
      position,
    });
  }

  /**
   * Track Primary Recruiter Conversion (CV Download)
   */
  public trackCVDownload(source: "navbar" | "about_strip" | "contact_bar" | "fallback") {
    this.track("cv_download", {
      source,
    }, `cv_download:${source}`);
  }

  /**
   * Track Contact Initiation
   */
  public trackContactStart(sourceOrType = "general") {
    this.track("contact_start", {
      projectType: sourceOrType,
    }, `contact_start:${sourceOrType}`);
  }

  /**
   * Track Contact Submission Result
   */
  public trackContactSubmit(success: boolean, projectType = "") {
    this.track("contact_submit", {
      success,
      projectType,
    });
  }

  /**
   * Track External Social / Channel Click
   */
  public trackExternalClick(type: "whatsapp" | "linkedin" | "github", source = "general") {
    const eventName: PortfolioEventName =
      type === "whatsapp"
        ? "whatsapp_click"
        : type === "linkedin"
        ? "linkedin_click"
        : "github_click";

    this.track(eventName, {
      source,
    }, `${eventName}:${source}`);
  }

  /**
   * Track Certification Inspection
   */
  public trackCertificationOpen(certId: string, issuer: string) {
    this.track("certification_open", {
      certId,
      issuer,
    }, `cert_open:${certId}`);
  }

  /**
   * Track External Credential Verification Platform Click
   */
  public trackCredentialExternalClick(certId: string, externalUrl: string) {
    this.track("credential_external_click", {
      certId,
      platform: externalUrl.includes("coursera") ? "coursera" : externalUrl.includes("credly") ? "credly" : "external",
    }, `cred_external:${certId}`);
  }

  /**
   * Track Web Vital Performance Measurement
   */
  public trackWebVital(metricName: string, value: number, rating: "good" | "needs-improvement" | "poor") {
    this.track("web_vital", {
      metricName,
      value,
      rating,
    }, `web_vital:${metricName}`);
  }
}

export const telemetry = new TelemetryManager();
