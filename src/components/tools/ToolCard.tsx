import Link from "next/link";
import { ToolIcon } from "@/components/tools/ToolIcon";

interface ToolCardProps {
  tool: {
    name: string;
    description: string;
    href: string;
    icon: string;
    keywords?: string[];
  };
  compact?: boolean;
  priority?: boolean;
  trackingSource?: string;
}

export function ToolCard({
  tool,
  compact = false,
  priority = false,
  trackingSource = "tool_card_clicked",
}: ToolCardProps) {
  if (compact) {
    return (
      <Link
        href={tool.href}
        data-track={trackingSource}
        data-track-label={tool.name}
        data-track-target={tool.href}
        className="group flex min-h-[92px] items-start gap-4 rounded-[16px] border border-slate-200 bg-surface p-4 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-brand-50 text-brand-700 transition-colors group-hover:bg-surface">
          <ToolIcon name={tool.icon} />
        </span>
        <span className="min-w-0">
          <span className="block font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-700">
            {tool.name}
          </span>
          <span className="mt-1 line-clamp-2 block text-sm leading-6 text-slate-600">
            {tool.description}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={tool.href}
      data-track={trackingSource}
      data-track-label={tool.name}
      data-track-target={tool.href}
      className={`group flex h-full flex-col rounded-[18px] border bg-surface p-5 transition-[background-color,border-color,box-shadow] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200 ${
        priority
          ? "border-brand-200 shadow-[0_12px_30px_rgba(37,99,235,0.12)] hover:border-brand-300 hover:shadow-[0_16px_40px_rgba(37,99,235,0.16)]"
          : "border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:border-brand-200 hover:shadow-[0_10px_25px_rgba(15,23,42,0.09)]"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-[14px] ${
            priority ? "bg-brand-500 text-surface" : "bg-brand-50 text-brand-700"
          }`}
        >
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </span>
        {tool.keywords?.[0] && (
          <span className="rounded-[8px] bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
            {tool.keywords[0]}
          </span>
        )}
      </div>
      <h3 className="text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-brand-700">
        {tool.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-brand-700">
        開始使用
      </span>
    </Link>
  );
}
