import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-700)] px-4 py-2 text-white hover:bg-[var(--accent-800)] focus-visible:ring-[var(--accent-700)]",
        outline:
          "border border-[var(--border-strong)] bg-[var(--surface-0)] px-4 py-2 text-[var(--text-strong)] hover:bg-[var(--surface-1)] focus-visible:ring-[var(--accent-500)]",
        subtle:
          "bg-[var(--surface-2)] px-4 py-2 text-[var(--text-strong)] hover:bg-[var(--surface-3)] focus-visible:ring-[var(--accent-500)]",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
