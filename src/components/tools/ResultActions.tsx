"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ResultActionsProps {
  toolId: string;
  summary: string;
  shareTitle: string;
}

export function ResultActions({ toolId, summary, shareTitle }: ResultActionsProps) {
  const [status, setStatus] = useState<string | null>(null);

  const copySummary = async () => {
    try {
      await navigator.clipboard?.writeText(summary);
      setStatus("已複製摘要");
      trackEvent("tool_result_copied", { tool_id: toolId });
    } catch {
      setStatus("目前瀏覽器不支援複製");
    }
  };

  const shareSummary = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: summary,
          url,
        });
        trackEvent("tool_result_shared", { tool_id: toolId });
        setStatus("已開啟分享");
        return;
      }

      await navigator.clipboard?.writeText(`${summary}\n${url}`);
      trackEvent("tool_result_share_fallback", { tool_id: toolId });
      setStatus("已複製分享摘要");
    } catch {
      setStatus("分享已取消");
    }
  };

  const printSummary = () => {
    window.print();
    trackEvent("tool_result_printed", { tool_id: toolId });
  };

  return (
    <div className="mt-6 border-t border-slate-100 pt-4">
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-[12px] border border-slate-200 bg-surface px-3 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          複製摘要
        </button>
        <button
          type="button"
          onClick={shareSummary}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-[12px] border border-slate-200 bg-surface px-3 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51l6.83 3.98" />
            <path d="M15.41 6.51L8.59 10.49" />
          </svg>
          分享摘要
        </button>
        <button
          type="button"
          onClick={printSummary}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-[12px] border border-slate-200 bg-surface px-3 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          列印摘要
        </button>
      </div>
      {status && (
        <p className="mt-2 text-right text-xs font-semibold text-brand-700" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}
