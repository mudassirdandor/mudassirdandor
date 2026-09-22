/**
 * PORTFOLIO V6.5 — Web Vitals & Performance Instrumentation
 * 
 * Safely measures Core Web Vitals (LCP, CLS, INP, TTFB) where supported by the browser.
 * Never fabricates values; returns `status: "not_measured"` or `status: "unavailable"`
 * when metrics are not yet observed or unsupported by the browser environment.
 * 
 * Uses standard Google Web Vitals classification thresholds:
 * - LCP: Good <= 2500ms, Needs Improvement <= 4000ms, Poor > 4000ms
 * - CLS: Good <= 0.1, Needs Improvement <= 0.25, Poor > 0.25
 * - INP: Good <= 200ms, Needs Improvement <= 500ms, Poor > 500ms
 * - TTFB: Good <= 800ms, Needs Improvement <= 1800ms, Poor > 1800ms
 */

import { telemetry } from "./telemetry";

export type MetricRating = "good" | "needs-improvement" | "poor";

export interface MetricSnapshot {
  value: number | null;
  rating: MetricRating | "unavailable";
}

export interface PerformanceMetrics {
  lcp: MetricSnapshot;
  cls: MetricSnapshot;
  inp: MetricSnapshot;
  ttfb: MetricSnapshot;
  domContentLoaded: number | null;
  effectiveConnectionType: string | null;
  status: "measured" | "not_measured";
}

class PerformanceTracker {
  private metrics: PerformanceMetrics = {
    lcp: { value: null, rating: "unavailable" },
    cls: { value: null, rating: "unavailable" },
    inp: { value: null, rating: "unavailable" },
    ttfb: { value: null, rating: "unavailable" },
    domContentLoaded: null,
    effectiveConnectionType: null,
    status: "not_measured",
  };

  private isObserved = false;

  constructor() {
    this.init();
  }

  private rateMetric(name: "lcp" | "cls" | "inp" | "ttfb", value: number): MetricRating {
    switch (name) {
      case "lcp":
        return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
      case "cls":
        return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
      case "inp":
        return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
      case "ttfb":
        return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor";
    }
  }

  private init() {
    if (typeof window === "undefined" || this.isObserved) return;
    this.isObserved = true;

    try {
      // Check for connection API (safe non-fingerprinting connection speed)
      const navAny = navigator as any;
      if (navAny.connection && navAny.connection.effectiveType) {
        this.metrics.effectiveConnectionType = String(navAny.connection.effectiveType);
      }

      // 1. Navigation Timing (TTFB & DOMContentLoaded)
      if (typeof performance !== "undefined" && performance.getEntriesByType) {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        if (navEntries && navEntries.length > 0) {
          const nav = navEntries[0];
          const ttfb = Math.round(nav.responseStart - nav.requestStart);
          const domContentLoaded = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
          
          if (ttfb > 0) {
            const rating = this.rateMetric("ttfb", ttfb);
            this.metrics.ttfb = { value: ttfb, rating };
            this.metrics.status = "measured";
            telemetry.trackWebVital("TTFB", ttfb, rating);
          }
          if (domContentLoaded > 0) {
            this.metrics.domContentLoaded = domContentLoaded;
          }
        }
      }

      // 2. PerformanceObserver for Web Vitals
      if ("PerformanceObserver" in window) {
        // Largest Contentful Paint (LCP)
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              const lcp = Math.round(lastEntry.startTime);
              const rating = this.rateMetric("lcp", lcp);
              this.metrics.lcp = { value: lcp, rating };
              this.metrics.status = "measured";
              telemetry.trackWebVital("LCP", lcp, rating);
            }
          });
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
        } catch {
          // Unsupported observer in older browser engine
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsScore = 0;
          const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsScore += entry.value;
                const roundedCls = Number(clsScore.toFixed(4));
                const rating = this.rateMetric("cls", roundedCls);
                this.metrics.cls = { value: roundedCls, rating };
                this.metrics.status = "measured";
                telemetry.trackWebVital("CLS", roundedCls, rating);
              }
            }
          });
          clsObserver.observe({ type: "layout-shift", buffered: true });
        } catch {
          // Unsupported observer
        }

        // Interaction to Next Paint (INP) / First Input Delay (FID)
        try {
          const inpObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const duration = entry.duration;
              const roundedDuration = Math.round(duration);
              if (this.metrics.inp.value === null || roundedDuration > this.metrics.inp.value) {
                const rating = this.rateMetric("inp", roundedDuration);
                this.metrics.inp = { value: roundedDuration, rating };
                this.metrics.status = "measured";
                telemetry.trackWebVital("INP", roundedDuration, rating);
              }
            }
          });
          inpObserver.observe({ type: "first-input", buffered: true });
        } catch {
          // Unsupported observer
        }
      }
    } catch {
      // Silent failure
    }
  }

  public getSnapshot(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

export const performanceTracker = new PerformanceTracker();
