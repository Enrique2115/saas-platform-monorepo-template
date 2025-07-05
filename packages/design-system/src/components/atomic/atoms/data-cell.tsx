"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { TableCell } from "@repo/design-system/src/components/ui/table";
import { cn } from "@repo/design-system/src/lib/utils";

const dataCellVariants = cva(
  "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      size: {
        sm: "p-1 text-xs",
        md: "p-2 text-sm",
        lg: "p-3 text-base",
      },
      variant: {
        default: "",
        numeric: "font-mono",
        emphasized: "font-semibold",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      align: "left",
      size: "md",
      variant: "default",
    },
  }
);

export interface DataCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align">,
    VariantProps<typeof dataCellVariants> {
  truncate?: boolean;
}

function DataCell({
  className,
  align,
  size,
  variant,
  truncate = false,
  children,
  ...props
}: DataCellProps) {
  return (
    <TableCell
      data-slot="data-cell"
      className={cn(
        dataCellVariants({ align, size, variant }),
        {
          "max-w-0 truncate": truncate,
        },
        className
      )}
      {...props}
    >
      {truncate ? (
        <div
          className="truncate"
          title={typeof children === "string" ? children : undefined}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </TableCell>
  );
}

export { DataCell, dataCellVariants };
