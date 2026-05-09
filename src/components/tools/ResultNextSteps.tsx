import Link from "next/link";

export interface ResultNextStep {
  label: string;
  href: string;
  description: string;
}

interface ResultNextStepsProps {
  steps: ResultNextStep[];
  toolId: string;
  title?: string;
}

export function ResultNextSteps({
  steps,
  toolId,
  title = "算完可以接著做",
}: ResultNextStepsProps) {
  if (steps.length === 0) return null;

  return (
    <section className="mt-6 border-t border-slate-100 pt-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="text-xs font-semibold text-slate-500">下一步</span>
      </div>
      <div className="divide-y divide-slate-100">
        {steps.map((step, index) => (
          <Link
            key={step.href}
            href={step.href}
            data-track="tool_result_next_step_clicked"
            data-track-label={step.label}
            data-track-target={step.href}
            data-track-tool-id={toolId}
            className="group grid min-h-[64px] grid-cols-[32px_1fr] gap-3 py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-700 transition-colors group-hover:bg-brand-100">
              {index + 1}
            </span>
            <span>
              <span className="block font-bold text-slate-900 transition-colors group-hover:text-brand-700">
                {step.label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                {step.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
