import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div className={cn("rounded-[14px] border border-white/8 bg-surface-2 transition-all duration-200", className)} {...props} />
  );
}
export function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}
