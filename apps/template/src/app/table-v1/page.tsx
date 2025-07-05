"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { SortHeader } from "@repo/design-system/atoms/sort-header";
import { StatusBadge } from "@repo/design-system/atoms/status-badge";
import type { FilterTab } from "@repo/design-system/molecules/table-filter-tabs";
import { DataTable } from "@repo/design-system/organisms/data-table";
import { Button } from "@repo/design-system/ui/button";
import { Checkbox } from "@repo/design-system/ui/checkbox";

// Example data type
interface Project {
  id: string;
  name: string;
  status: "success" | "warning" | "danger" | "neutral" | "info";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  progress: number;
}

// Example data
const exampleData: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "success",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2025-02-15", // Future date - Active
    progress: 85,
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "success",
    priority: "medium",
    assignee: "Jane Smith",
    dueDate: "2025-03-01", // Future date - Completed
    progress: 100,
  },
  {
    id: "3",
    name: "Database Migration",
    status: "danger",
    priority: "high",
    assignee: "Bob Johnson",
    dueDate: "2024-01-30", // Past date - Overdue
    progress: 25,
  },
  {
    id: "4",
    name: "API Documentation",
    status: "warning",
    priority: "low",
    assignee: "Alice Brown",
    dueDate: "2025-04-15", // Future date - Active
    progress: 40,
  },
  {
    id: "5",
    name: "Security Audit",
    status: "danger",
    priority: "high",
    assignee: "Mike Wilson",
    dueDate: "2024-12-01", // Past date - Overdue
    progress: 15,
  },
  {
    id: "6",
    name: "UI/UX Design Review",
    status: "warning",
    priority: "medium",
    assignee: "Emily Davis",
    dueDate: "2025-05-01", // Future date - Active
    progress: 60,
  },
  {
    id: "7",
    name: "Performance Optimization",
    status: "info",
    priority: "high",
    assignee: "Sarah Wilson",
    dueDate: "2025-07-15", // Future date - Active
    progress: 35,
  },
];

// Example filter tabs
const filterTabs: FilterTab[] = [
  { id: "all", label: "All Projects", value: "all", count: 5 },
  { id: "active", label: "Active", value: "active", count: 2 },
  { id: "completed", label: "Completed", value: "completed", count: 1 },
  { id: "overdue", label: "Overdue", value: "overdue", count: 2 },
];

// Example columns definition
const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortHeader column={column} title="Project Name" />,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <StatusBadge
          variant={
            status as "success" | "warning" | "danger" | "neutral" | "info"
          }
          showDot
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const variant =
        priority === "high"
          ? "danger"
          : priority === "medium"
            ? "warning"
            : "neutral";
      return (
        <StatusBadge variant={variant} size="sm">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => <SortHeader column={column} title="Assignee" />,
    cell: ({ row }) => <div>{row.getValue("assignee")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <SortHeader column={column} title="Due Date" />,
    cell: ({ row }) => (
      <div>{new Date(row.getValue("dueDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "progress",
    header: ({ column }) => <SortHeader column={column} title="Progress" />,
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      return (
        <div className="flex items-center space-x-2">
          <div className="h-2 w-16 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-muted-foreground text-sm">{progress}%</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;

      const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log("Edit project:", project);
        // Example: navigate to edit page, open modal, etc.
      };

      const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log("Delete project:", project);
        // Example: show confirmation dialog, call delete API, etc.
      };

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
          >
            Delete
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function DataTableExample() {
  const [activeTab, setActiveTab] = React.useState("all");

  // Filter data based on active tab
  const filteredData = React.useMemo(() => {
    if (activeTab === "all") {
      return exampleData;
    }

    const currentDate = new Date();

    switch (activeTab) {
      case "active":
        // Projects that are not completed and not overdue
        return exampleData.filter((project) => {
          const dueDate = new Date(project.dueDate);
          return project.progress < 100 && dueDate >= currentDate;
        });
      case "completed":
        // Projects with 100% progress
        return exampleData.filter((project) => project.progress >= 100);
      case "overdue":
        // Projects that are past due date and not completed
        return exampleData.filter((project) => {
          const dueDate = new Date(project.dueDate);
          return project.progress < 100 && dueDate < currentDate;
        });
      default:
        return exampleData;
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6 px-1 md:mb-8">
        <h1 className="font-bold text-2xl md:text-3xl">Projects Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your projects with the migrated DataTable component
        </p>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        config={{
          enableSorting: true,
          enableFiltering: true,
          enablePagination: true,
          enableRowSelection: true,
        }}
        initialState={{
          pageSize: 10,
        }}
        styling={{
          className: "space-y-4",
        }}
        filterTabs={{
          tabs: filterTabs,
          activeTab: activeTab,
          onTabChange: setActiveTab,
        }}
        search={{
          enabled: true,
          key: "name",
          placeholder: "Search projects...",
        }}
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
        }}
        messages={{
          emptyMessage:
            "No projects found. Create your first project to get started.",
        }}
      />
    </div>
  );
}
