"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackWebVital } from "@/lib/analytics";

/**
 * Streams Core Web Vitals (LCP/INP/CLS/FCP/TTFB) to GA4 via the shared
 * analytics wrapper. Renders nothing; lives in the root layout.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    trackWebVital(metric);
  });

  return null;
}
