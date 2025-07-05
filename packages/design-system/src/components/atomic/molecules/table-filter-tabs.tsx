"use client";

import { Separator } from "@repo/design-system/src/components/ui/separator";
import { cn } from "@repo/design-system/src/lib/utils";
import * as React from "react";

export interface FilterTab {
  id: string;
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
}

export interface TableFilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

function TableFilterTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TableFilterTabsProps) {
  return (
    <div
      data-slot="table-filter-tabs"
      className={cn(
        "scrollbar-hide flex flex-row items-center gap-3 overflow-x-auto px-1 sm:gap-5 sm:px-0",
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;
        const isLast = index === tabs.length - 1;

        return (
          <React.Fragment key={tab.id}>
            <button
              type="button"
              disabled={tab.disabled}
              className={cn(
                "flex min-w-fit cursor-pointer flex-row items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                {
                  "border-primary hover:border-primary": isActive,
                  "border-transparent hover:border-gray-300 dark:hover:border-gray-600":
                    !isActive,
                }
              )}
              onClick={() => {
                if (!tab.disabled) {
                  onTabChange(tab.value);
                }
              }}
              aria-pressed={isActive}
            >
              <h3
                className={cn(
                  "font-normal text-gray-900 transition-all dark:text-gray-100",
                  {
                    "font-bold text-primary": isActive,
                  }
                )}
              >
                {tab.label}
              </h3>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "rounded-xl bg-gray-200 px-[6px] font-light text-gray-700 text-xs transition-all dark:bg-gray-700 dark:text-gray-300",
                    {
                      "bg-primary text-white dark:bg-primary dark:text-white":
                        isActive,
                    }
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
            {!isLast && (
              <Separator
                orientation="vertical"
                className="h-8 bg-gray-400 dark:bg-gray-600"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { TableFilterTabs };
