import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        neutral:
          "border-[var(--border-muted)] bg-[var(--surface-2)] text-[var(--text-muted)]",
        synergy:
          "border-emerald-300 bg-emerald-50 text-emerald-800",
        caution:
          "border-amber-300 bg-amber-50 text-amber-900",
        avoid: "border-rose-300 bg-rose-50 text-rose-900",
        unknown:
          "border-slate-300 bg-slate-50 text-slate-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}
