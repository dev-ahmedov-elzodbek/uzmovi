import * as Sep from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";

export function Separator({ className, orientation = "horizontal", ...props }) {
  return (
    <Sep.Root
      orientation={orientation}
      className={cn("shrink-0 bg-white/8", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className)}
      {...props}
    />
  );
}
