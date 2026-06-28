export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Maps legacy/site-specific event names to the portfolio-wide standardized
 * funnel vocabulary. When a legacy name fires, the standardized alias is
 * emitted with the same params so reporting stays consistent across sites
 * without touching every call site.
 */
const STANDARD_EVENT_ALIASES: Record<string, string> = {
  tool_completed: "tool_result",
  tools_index_card_clicked: "tool_card_click",
  tools_featured_cta_clicked: "tool_card_click",
  tool_card_clicked: "tool_card_click",
};

function emit(eventName: string, eventParams: AnalyticsParams) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventParams });
  window.gtag?.("event", eventName, eventParams);
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const sanitized = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as AnalyticsParams;
  const pageFields = {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_path: window.location.pathname,
    page_title: document.title,
  };
  const eventParams = {
    ...sanitized,
    ...pageFields,
  };

  emit(eventName, eventParams);

  const alias = STANDARD_EVENT_ALIASES[eventName];
  if (alias && alias !== eventName) {
    emit(alias, eventParams);
  }
}

export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating?: string;
}

/**
 * Reports a Core Web Vital (LCP/INP/CLS/FCP/TTFB) to GA4 as a `web_vital`
 * event, matching the cross-site RUM convention.
 */
export function trackWebVital(metric: WebVitalMetric) {
  if (
    typeof window === "undefined" ||
    !metric ||
    typeof metric.name !== "string" ||
    !metric.name.trim() ||
    typeof metric.id !== "string" ||
    !metric.id.trim() ||
    !Number.isFinite(metric.value)
  ) {
    return;
  }

  trackEvent("web_vital", {
    name: metric.name,
    value: Math.round(metric.value * 1000) / 1000,
    rating: metric.rating || "unknown",
    id: metric.id,
  });
}
