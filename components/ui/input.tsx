import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-0)] px-3 text-sm text-[var(--text-strong)] shadow-[var(--shadow-soft)] placeholder:text-[var(--text-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-1",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
