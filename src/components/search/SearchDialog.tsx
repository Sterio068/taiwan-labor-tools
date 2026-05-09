"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getSearchIndex, searchItems, type SearchItem } from "@/lib/search-index";
import { trackEvent } from "@/lib/analytics";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(() => searchItems(query, index), [query, index]);

  const closeDialog = () => {
    setOpen(false);
    setQuery("");
  };

  const openDialog = (method: "button" | "keyboard") => {
    setOpen(true);
    trackEvent("site_search_opened", { method });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openDialog("keyboard");
      }
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (!open || normalizedQuery.length < 2) return;

    const id = window.setTimeout(() => {
      trackEvent("site_search_performed", {
        query_length: Math.min(normalizedQuery.length, 60),
        result_count: results.length,
        has_results: results.length > 0,
      });
    }, 600);

    return () => window.clearTimeout(id);
  }, [open, query, results.length]);

  const typeColors: Record<string, string> = {
    tool: "bg-brand-100 text-brand-700",
    article: "bg-accent-100 text-accent-700",
    page: "bg-slate-100 text-slate-700",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => openDialog("button")}
        className="inline-flex min-h-10 items-center gap-2 rounded-[10px] px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        aria-label="搜尋"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="hidden md:inline">搜尋</span>
        <span className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 md:inline">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          onClick={closeDialog}
        >
          <div className="fixed inset-0 bg-slate-900/45" />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-[18px] border border-slate-200 bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
              <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋工具、文章⋯⋯"
                className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={closeDialog}
                className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-500 hover:bg-slate-50"
              >
                ESC
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm">
                  找不到「{query}」的結果
                </div>
              )}
              {!query && (
                <div className="p-8 text-center text-slate-500 text-sm">
                  輸入關鍵字搜尋工具與文章
                </div>
              )}
              {results.length > 0 && (
                <ul className="py-2">
                  {results.map((r: SearchItem, i) => (
                    <li key={i}>
                      <Link
                        href={r.href}
                        onClick={() => {
                          trackEvent("site_search_result_clicked", {
                            query_length: Math.min(query.trim().length, 60),
                            result_count: results.length,
                            result_position: i + 1,
                            result_type: r.type,
                            label: r.title,
                            target: r.href,
                          });
                          closeDialog();
                        }}
                        className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-brand-50"
                      >
                        <span
                          className={`mt-0.5 shrink-0 px-2 py-0.5 rounded-[6px] text-xs font-semibold ${typeColors[r.type]}`}
                        >
                          {r.typeLabel}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-slate-900 truncate">
                            {r.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {r.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
