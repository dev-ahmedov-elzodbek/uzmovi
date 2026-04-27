import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const variants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:  "bg-brand text-surface-1 hover:bg-brand-light hover:-translate-y-px shadow-[0_4px_16px_rgba(56,189,248,.25)] hover:shadow-[0_8px_24px_rgba(56,189,248,.35)]",
        danger:   "bg-accent-danger/10 text-accent-danger border border-accent-danger/30 hover:bg-accent-danger/20",
        outline:  "bg-surface-3 border border-white/8 text-slate-300 hover:border-white/15 hover:text-white",
        ghost:    "text-slate-400 hover:text-white hover:bg-white/5",
      },
      size: {
        default: "h-11 px-7",
        sm:      "h-8  px-4 text-xs rounded-lg",
        icon:    "h-9  w-9  rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export function Button({ className, variant, size, asChild, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(variants({ variant, size }), className)} {...props} />;
}
