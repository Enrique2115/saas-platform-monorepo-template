"use client";

import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import * as React from "react";

import { Button } from "@repo/design-system/src/components/ui/button";
import { Input } from "@repo/design-system/src/components/ui/input";
import { cn } from "@repo/design-system/src/lib/utils";

export interface TableSearchBarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  debounceMs?: number;
}

function TableSearchBar<TData>({
  table,
  searchKey,
  placeholder = "Search...",
  className,
  showClearButton = true,
  debounceMs = 300,
}: TableSearchBarProps<TData>) {
  const [searchValue, setSearchValue] = React.useState<string>(
    (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
  );

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      table.getColumn(searchKey)?.setFilterValue(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, searchKey, table, debounceMs]);

  const handleClear = () => {
    setSearchValue("");
    table.getColumn(searchKey)?.setFilterValue("");
  };

  return (
    <div
      data-slot="table-search-bar"
      className={cn("relative flex items-center", className)}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="pr-9 pl-9"
      />
      {showClearButton && searchValue && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 h-7 w-7 p-0 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}

export { TableSearchBar };
