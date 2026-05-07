"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSourcesByTopic } from "@/data/official-sources";
import { getToolGuidance } from "@/data/tool-guidance";

function getToolSlug(pathname: string) {
  const match = pathname.match(/^\/tools\/([^/?#]+)/);
  return match?.[1];
}

export function ToolAuthorityAuto() {
  const pathname = usePathname();
  const slug = getToolSlug(pathname);
  if (!slug) return null;

  const guidance = getToolGuidance(slug);
  if (!guidance) return null;

  const sources = guidance.sourceTopics
    .flatMap((topic) => getSourcesByTopic(topic))
    .filter((source, index, list) => list.findIndex((item) => item.id === source.id) === index)
    .slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="rounded-[16px] border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-5">
          <p className="text-sm font-semibold text-brand-700">計算透明度</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {guidance.title}的公式、適用範圍與下一步
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">{guidance.summary}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">核心公式</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {guidance.formula.map((item) => (
                <li key={item} className="rounded-[10px] bg-slate-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">適用與限制</h3>
            <div className="grid gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">適合用來</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {guidance.useCases.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">需要另外確認</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {guidance.limitations.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {guidance.presets && guidance.presets.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-slate-900 mb-2">情境預設</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {guidance.presets.map((preset) => (
                <Link
                  key={preset.href}
                  href={preset.href}
                  data-track="tool_preset_clicked"
                  data-track-label={preset.label}
                  data-track-target={preset.href}
                  className="rounded-[12px] border border-brand-100 bg-brand-50 px-4 py-3 hover:border-brand-300 transition-colors"
                >
                  <p className="font-semibold text-brand-800">{preset.label}</p>
                  <p className="mt-1 text-xs text-brand-700">{preset.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">常見錯誤</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {guidance.mistakes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-danger-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">算完之後</h3>
            <div className="grid gap-2">
              {guidance.nextSteps.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-track="tool_next_step_clicked"
                  data-track-label={link.label}
                  data-track-target={link.href}
                  className="rounded-[10px] border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {sources.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-bold text-slate-900">官方依據</h3>
              <Link href="/sources" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                查看更新紀錄 →
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[12px] bg-slate-50 px-4 py-3 hover:bg-brand-50 transition-colors"
                >
                  <p className="text-sm font-semibold text-slate-900">{source.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {source.agency} · 查核 {source.lastChecked}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
