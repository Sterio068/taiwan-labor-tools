import { CHECKED_AT } from "@/data/tool-explainers/types";

export interface OfficialSourceLink {
  label: string;
  url: string;
  note: string;
}

interface OfficialSourcesProps {
  title?: string;
  sources: OfficialSourceLink[];
}

/** 頁面底部的官方法源清單：連到全國法規資料庫或主管機關公告。 */
export function OfficialSources({ title = "法源與官方資料", sources }: OfficialSourcesProps) {
  return (
    <section className="mt-12 rounded-[16px] border border-slate-200 bg-surface p-5 shadow-[var(--shadow-card)] md:p-6">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.url} className="text-sm leading-6 text-slate-700">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 underline-offset-2 hover:underline"
            >
              {source.label}
            </a>
            ：{source.note}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">最後查核：{CHECKED_AT}。法規與費率以主管機關最新公告為準。</p>
    </section>
  );
}
