import Link from "next/link";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-8 flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </p>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex min-h-11 items-center justify-center rounded-[12px] border border-brand-200 bg-surface px-4 text-sm font-bold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
