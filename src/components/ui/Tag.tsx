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
      className={`inline-flex items-center px-3.5 py-1.5 rounded-[8px] text-sm font-medium transition-all ${
        selected
          ? "bg-brand-500 text-white shadow-sm"
          : "bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600"
      }`}
    >
      {label}
    </button>
  );
}
