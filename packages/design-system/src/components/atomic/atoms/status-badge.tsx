"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@repo/design-system/src/lib/utils";

const statusBadgeVariants = cva(
  "flex h-6 w-fit items-center justify-center gap-2 rounded-sm px-3 font-normal text-sm",
  {
    variants: {
      variant: {
        success:
          "bg-[#E1FCEF] text-[#14804A] dark:bg-green-900/30 dark:text-green-400",
        warning:
          "bg-[#FCF2E6] text-[#AA5B00] dark:bg-yellow-900/30 dark:text-yellow-400",
        danger:
          "bg-[#FFEDEF] text-[#D1293D] dark:bg-red-900/30 dark:text-red-400",
        neutral: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
        info: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm",
        lg: "h-7 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

const statusDotVariants = cva("h-2 w-2 rounded-[2px]", {
  variants: {
    variant: {
      success: "bg-[#14804A] dark:bg-green-400",
      warning: "bg-[#AA5B00] dark:bg-yellow-400",
      danger: "bg-[#D1293D] dark:bg-red-400",
      neutral: "bg-gray-600 dark:bg-gray-300",
      info: "bg-blue-600 dark:bg-blue-400",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  showDot?: boolean;
  children: React.ReactNode;
}

function StatusBadge({
  className,
  variant,
  size,
  showDot = true,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ variant, size }), className)}
      {...props}
    >
      {showDot && (
        <div
          data-slot="status-dot"
          className={statusDotVariants({ variant })}
        />
      )}
      {children}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
