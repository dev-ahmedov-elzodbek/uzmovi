import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const variants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "border-brand/25 bg-brand/10 text-brand",
      amber:   "border-accent-amber/25 bg-accent-amber/10 text-accent-amber",
      mint:    "border-accent-mint/25 bg-accent-mint/10 text-accent-mint",
      muted:   "border-white/8 bg-surface-3 text-slate-400",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }) {
  return <div className={cn(variants({ variant }), className)} {...props} />;
}
