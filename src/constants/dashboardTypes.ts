/**
 * Standard Dashboard Sandbox visualization type constants.
 */
export const DASHBOARD_TYPES = {
  BI_REPORT: "bi_report",
  LIVE_STREAM: "live_stream",
  INTERACTIVE_CHART: "interactive_chart",
  DATA_GRID: "data_grid",
} as const;

export type DashboardType = typeof DASHBOARD_TYPES[keyof typeof DASHBOARD_TYPES];
