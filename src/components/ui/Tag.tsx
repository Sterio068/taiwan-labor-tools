interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Tag({ label, selected = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-9 items-center rounded-[8px] px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200 ${
        selected
          ? "bg-brand-500 text-surface shadow-sm"
          : "border border-slate-200 bg-surface text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );
}
