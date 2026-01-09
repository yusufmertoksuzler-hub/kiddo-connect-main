import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        // Custom variants
        soft: "border-primary/20 bg-primary/10 text-primary",
        "soft-secondary": "border-secondary/20 bg-secondary/10 text-secondary",
        "soft-accent": "border-accent/20 bg-accent/10 text-accent",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/15 text-warning-foreground",
        info: "border-info/20 bg-info/10 text-info",
        age: "border-secondary/30 bg-secondary/15 text-secondary font-bold",
        category: "border-transparent bg-muted text-muted-foreground",
        price: "border-primary/20 bg-primary/10 text-primary font-bold",
        glass: "border-white/30 bg-white/80 backdrop-blur-md text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
