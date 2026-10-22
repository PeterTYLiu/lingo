import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "check" | "secondary" | "danger" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-green-500 text-white border-green-700 active:bg-green-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300",
  check: "bg-blue-500 text-white border-blue-700 active:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300",
  secondary: "bg-white text-slate-700 border-slate-300 active:bg-slate-50",
  danger: "bg-rose-500 text-white border-rose-700 active:bg-rose-600",
  ghost: "bg-transparent text-slate-500 border-transparent shadow-none",
};

export function Button({ variant = "primary", className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`min-h-12 rounded-2xl border-2 border-b-4 px-5 py-3 font-bold uppercase tracking-wide transition active:translate-y-[2px] active:border-b-2 active:mb-[2px] disabled:active:translate-y-0 disabled:active:border-b-4 disabled:active:mb-0 ${styles[variant]} ${className}`}
      {...rest}
    />
  );
}
