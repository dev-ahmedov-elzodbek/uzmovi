import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex w-full rounded-xl border border-white/8 bg-surface-3 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all",
        "focus:border-brand/40 focus:shadow-[0_0_0_3px_rgba(56,189,248,.07)]",
        className
      )}
      {...props}
    />
  );
}
