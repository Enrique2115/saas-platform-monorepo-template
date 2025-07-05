"use client";

import type { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { Button } from "@repo/design-system/src/components/ui/button";
import { cn } from "@repo/design-system/src/lib/utils";

export interface SortHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  align?: "left" | "center" | "right";
}

function SortHeader<TData, TValue>({
  column,
  title,
  align = "left",
  className,
  ...props
}: SortHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        data-slot="sort-header"
        className={cn(
          "flex items-center font-normal text-gray-500 text-xs uppercase",
          {
            "justify-start": align === "left",
            "justify-center": align === "center",
            "justify-end": align === "right",
          },
          className
        )}
        {...props}
      >
        {title}
      </div>
    );
  }

  const sorted = column.getIsSorted();

  return (
    <div
      data-slot="sort-header"
      className={cn(
        "flex items-center",
        {
          "justify-start": align === "left",
          "justify-center": align === "center",
          "justify-end": align === "right",
        },
        className
      )}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 font-normal text-gray-500 text-xs uppercase hover:text-gray-700 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        <span>{title}</span>
        {sorted === "desc" ? (
          <ChevronDown className="ml-2 h-3 w-3" />
        ) : sorted === "asc" ? (
          <ChevronUp className="ml-2 h-3 w-3" />
        ) : (
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        )}
      </Button>
    </div>
  );
}

export { SortHeader };
