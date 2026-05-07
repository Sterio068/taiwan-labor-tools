export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const sanitized = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as AnalyticsParams;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...sanitized });
  window.gtag?.("event", eventName, sanitized);
}
