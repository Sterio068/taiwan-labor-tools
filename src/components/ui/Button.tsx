import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-[12px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-200";
  const variants = {
    primary:
      "bg-brand-500 text-surface hover:bg-brand-600 active:bg-brand-700 shadow-sm",
    secondary:
      "bg-surface text-brand-700 hover:bg-brand-50 active:bg-brand-100 border border-brand-200",
    ghost:
      "bg-transparent text-brand-700 hover:bg-brand-50 border border-brand-200",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
