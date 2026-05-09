import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options: SelectOption[];
}

export function Select({
  label,
  hint,
  options,
  className = "",
  id,
  ...rest
}: SelectProps) {
  const selectId = id || label?.replace(/\s/g, "-").toLowerCase();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-slate-900 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full appearance-none rounded-[10px] border border-slate-200 bg-slate-50 bg-[right_1rem_center] bg-no-repeat px-4 py-2.5 pr-10 text-base text-slate-900 transition-colors focus:border-brand-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-200 ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748B' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        }}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
