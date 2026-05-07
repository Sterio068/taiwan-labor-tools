"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "square" | "vertical" | "auto";
  className?: string;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
const AD_SLOT_ALIASES: Record<string, string | undefined> = {
  "article-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP?.trim(),
  "article-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM?.trim(),
  "tool-result": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_RESULT?.trim(),
  "tool-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM?.trim(),
  "guide-salary-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SALARY_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-salary-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SALARY_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-severance-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SEVERANCE_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-severance-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_SEVERANCE_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-overtime-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_OVERTIME_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-overtime-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_OVERTIME_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-leave-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_LEAVE_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-leave-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_LEAVE_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-insurance-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_INSURANCE_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-insurance-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_INSURANCE_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-retirement-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_RETIREMENT_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-retirement-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_RETIREMENT_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "guide-disputes-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_DISPUTES_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_MID?.trim(),
  "guide-disputes-bottom":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_DISPUTES_BOTTOM?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_BOTTOM?.trim(),
  "compare-monthly-hourly-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_MONTHLY_HOURLY_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_MID?.trim(),
  "compare-insurance-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_INSURANCE_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_MID?.trim(),
  "compare-fired-quit-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_FIRED_QUIT_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_MID?.trim(),
  "compare-pension-mid":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_PENSION_MID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_COMPARE_MID?.trim(),
};

function normalizeAdSlot(slot?: string) {
  const trimmedSlot = slot?.trim();
  if (!trimmedSlot) return undefined;

  if (/^\d+$/.test(trimmedSlot)) return trimmedSlot;

  const mappedSlot = AD_SLOT_ALIASES[trimmedSlot]?.trim();
  if (mappedSlot && /^\d+$/.test(mappedSlot)) return mappedSlot;

  return undefined;
}

export function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const adClient = ADSENSE_ID?.trim();
  const adSlot = normalizeAdSlot(slot);

  useEffect(() => {
    if (!adClient || !adSlot) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not yet ready
    }
  }, [adClient, adSlot]);

  if (!adClient || !adSlot) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`my-10 p-4 rounded-[12px] border-2 border-dashed border-slate-200 bg-slate-50 text-center text-xs text-slate-400 ${className}`}
          aria-label="廣告位置"
        >
          [Ad · {slot ?? "unset"} · {format}]
        </div>
      );
    }
    return null;
  }

  const heights: Record<string, string> = {
    horizontal: "h-24 md:h-[90px]",
    square: "h-[250px]",
    vertical: "h-[600px]",
    auto: "min-h-[100px]",
  };

  return (
    <div className={`my-12 ${className}`} aria-label="廣告">
      <p className="mb-2 text-center text-[11px] font-medium tracking-wide text-slate-400">
        廣告
      </p>
      <ins
        className={`adsbygoogle block ${heights[format]}`}
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}
