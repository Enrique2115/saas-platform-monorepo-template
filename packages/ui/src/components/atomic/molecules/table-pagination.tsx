"use client";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@repo/ui/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/components/ui/select";
import { cn } from "@repo/ui/src/lib/utils";

export interface TablePaginationProps<TData> {
  table: Table<TData>;
  className?: string;
  showSelection?: boolean;
  showPageSize?: boolean;
  showNavigation?: boolean;
  pageSizeOptions?: number[];
  labels?: {
    rowsSelected?: string;
    rowsPerPage?: string;
    page?: string;
    of?: string;
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
  };
}

function TablePagination<TData>({
  table,
  className,
  showSelection = true,
  showPageSize = true,
  showNavigation = true,
  pageSizeOptions = [10, 20, 30, 40, 50],
  labels = {},
}: TablePaginationProps<TData>) {
  const {
    rowsSelected = "row(s) selected",
    rowsPerPage = "Rows per page",
    page = "Page",
    of = "of",
    previous = "Previous",
    next = "Next",
    first = "First",
    last = "Last",
  } = labels;

  return (
    <div
      data-slot="table-pagination"
      className={cn(
        "flex flex-col gap-4 p-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:p-5 sm:py-10",
        className
      )}
    >
      {/* Selection info */}
      {showSelection && (
        <div className="order-2 flex-1 text-muted-foreground text-sm sm:order-1">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} {rowsSelected}
        </div>
      )}

      <div className="order-1 flex flex-col gap-4 sm:order-2 sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
        {/* Page size selector */}
        {showPageSize && (
          <div className="flex items-center justify-center space-x-2 sm:justify-start">
            <p className="whitespace-nowrap text-sm">{rowsPerPage}</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Page info */}
        <div className="flex items-center justify-center whitespace-nowrap font-medium text-sm">
          {page} {table.getState().pagination.pageIndex + 1} {of}{" "}
          {table.getPageCount()}
        </div>

        {/* Navigation */}
        {showNavigation && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{first}</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{previous}</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{next}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{last}</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export { TablePagination };
