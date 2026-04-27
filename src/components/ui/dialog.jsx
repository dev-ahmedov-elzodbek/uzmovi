import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog        = D.Root;
export const DialogTrigger = D.Trigger;

export function DialogContent({ className, children, ...props }) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-up" />
      <D.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg",
          "rounded-2xl border border-white/8 bg-surface-2 p-6 shadow-[0_24px_64px_rgba(0,0,0,.6)]",
          "data-[state=open]:animate-fade-up",
          className
        )}
        {...props}
      >
        {children}
        <D.Close className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer">
          <X size={16} />
        </D.Close>
      </D.Content>
    </D.Portal>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("mb-5", className)} {...props} />;
}
export function DialogTitle({ className, ...props }) {
  return <D.Title className={cn("font-head text-3xl tracking-wide text-slate-100", className)} {...props} />;
}
export function DialogDescription({ className, ...props }) {
  return <D.Description className={cn("text-sm text-slate-400 mt-1", className)} {...props} />;
}
