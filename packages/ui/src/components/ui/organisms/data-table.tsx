"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataCell } from "@repo/ui/src/components/ui/atoms/data-cell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/src/components/ui/atoms/table";
import {
  type FilterTab,
  TableFilterTabs,
} from "@repo/ui/src/components/ui/molecules/table-filter-tabs";
import { TablePagination } from "@repo/ui/src/components/ui/molecules/table-pagination";
import { TableSearchBar } from "@repo/ui/src/components/ui/molecules/table-search-bar";
import { cn } from "@repo/ui/src/lib/utils";
import { Skeleton } from "../atoms/skeleton";

export interface TableConfig {
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
}

export interface TableInitialState {
  pageSize?: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  rowSelection?: RowSelectionState;
  columnVisibility?: VisibilityState;
}

export interface TableStyling {
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
}

export interface ITableFilterTabs {
  tabs?: FilterTab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export interface TableSearch {
  enabled?: boolean;
  key?: string;
  placeholder?: string;
}

export interface TablePaginationConfig {
  showPagination?: boolean;
  showSelection?: boolean;
  showPageSize?: boolean;
  showNavigation?: boolean;
  pageSizeOptions?: number[];
}

export interface TableMessages {
  emptyMessage?: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  config?: TableConfig;
  initialState?: TableInitialState;
  styling?: TableStyling;
  filterTabs?: ITableFilterTabs;
  search?: TableSearch;
  pagination?: TablePaginationConfig;
  messages?: TableMessages;
  loading?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  config = {},
  initialState = {},
  styling = {},
  filterTabs = {},
  search = {},
  pagination = {},
  messages = {},
  loading = false,
}: DataTableProps<TData, TValue>) {
  // Extract config with defaults
  const {
    enableSorting = true,
    enableFiltering = true,
    enablePagination = true,
    enableRowSelection = true,
    enableColumnVisibility = false,
  } = config;

  // Extract initial state with defaults
  const {
    pageSize: initialPageSize = 20,
    sorting: initialSorting = [],
    filters: initialFilters = [],
    rowSelection: initialRowSelection = {},
    columnVisibility: initialColumnVisibility = {},
  } = initialState;

  // Extract styling
  const { className, tableClassName, headerClassName } = styling;

  // Extract filter tabs
  const {
    tabs: filterTabsList,
    activeTab: activeFilterTab,
    onTabChange: onFilterTabChange,
  } = filterTabs;

  // Extract search config
  const {
    enabled: enableSearch = false,
    key: searchKey,
    placeholder: searchPlaceholder,
  } = search;

  // Extract pagination config with defaults
  const {
    showPagination = true,
    showSelection = true,
    showPageSize = true,
    showNavigation = true,
    pageSizeOptions = [10, 20, 30, 40, 50],
  } = pagination;

  // Extract messages with defaults
  const { emptyMessage = "No results found." } = messages;
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialFilters);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialColumnVisibility);
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialRowSelection);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
    },
    initialState: {
      pagination: enablePagination
        ? {
            pageSize: initialPageSize,
            pageIndex: 0,
          }
        : undefined,
    },
  });

  const pageSize = pageSizeOptions[1] ?? 20;

  if (loading) {
    return (
      <Table className={cn("min-w-full", tableClassName)}>
        <TableHeader
          className={cn("bg-table-headerBackground", headerClassName)}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-[34px] font-normal text-gray-500 text-xs uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: pageSize }).map((_) => (
            <TableRow key={`loading-row-${crypto.randomUUID()}`} tabIndex={-1}>
              {Array.from({ length: columns.length }).map((_) => (
                <TableCell
                  key={`skeleton-cell-${crypto.randomUUID()}`}
                  className="max-w-0 truncate px-4 py-2 text-left"
                  tabIndex={-1}
                >
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <div
      data-slot="data-table"
      className={cn("flex flex-col space-y-4", className)}
    >
      {/* Filter Tabs */}
      {filterTabsList && filterTabsList.length > 0 && (
        <TableFilterTabs
          tabs={filterTabsList}
          activeTab={activeFilterTab || ""}
          onTabChange={onFilterTabChange || (() => {})}
        />
      )}

      {/* Search Bar */}
      {enableSearch && searchKey && (
        <div className="px-1 sm:px-0">
          <TableSearchBar
            table={table}
            searchKey={searchKey}
            placeholder={searchPlaceholder}
            className="w-full max-w-sm sm:w-auto"
          />
        </div>
      )}

      {/* Table */}
      <div className="relative overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table className={cn("min-w-full", tableClassName)}>
            <TableHeader
              className={cn("bg-table-headerBackground", headerClassName)}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-[34px] font-normal text-gray-500 text-xs uppercase"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <DataCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </DataCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    align="center"
                  >
                    {emptyMessage}
                  </DataCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && enablePagination && (
        <TablePagination
          table={table}
          showSelection={showSelection && enableRowSelection}
          showPageSize={showPageSize}
          showNavigation={showNavigation}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}

export { DataTable };
