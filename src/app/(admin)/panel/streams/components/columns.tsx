"use client";

import { MoreHorizontal } from "lucide-react";

import type {
  Column,
  ColumnDef,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { SortableColumn } from "@/components/sortable-column";
import { tableFeaturesConfig } from "@/lib/table-features";

import type { Prisma } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export type Streams = Prisma.StreamGetPayload<object>;

type StreamColumn = Column<typeof tableFeaturesConfig, Streams, unknown>;

function StreamSortableColumn({
  column,
  title,
}: {
  column: StreamColumn;
  title: string;
}) {
  const handleSort = column.getToggleSortingHandler();

  return (
    <SortableColumn
      title={title}
      sorted={column.getIsSorted()}
      onSort={handleSort}
    />
  );
}

type StreamsTableAction = {
  setType: (props: "edit" | "add") => void;
  onEdit: (props: boolean) => void;
  onView: (props: boolean) => void;
  onDelete: (props: boolean) => void;
  setData: (props: Streams) => void;
  setTypeDelete: (type: "single" | "many") => void;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
};

export const getColumns = ({
  onEdit,
  onView,
  onDelete,
  setData,
  setType,
  setSelectedIds,
  setTypeDelete,
  setRowSelection,
}: StreamsTableAction): ColumnDef<typeof tableFeaturesConfig, Streams>[] => [
  {
    id: "select",

    enableSorting: false,
    enableHiding: false,

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) => {
          table.toggleAllPageRowsSelected(checked === true);

          const pageRows = table.getRowModel().rows;

          setSelectedIds((prev) => {
            if (checked === true) {
              const newIds = pageRows
                .filter((row) => row.getCanSelect())
                .map((row) => row.original.id);

              return Array.from(new Set([...prev, ...newIds]));
            }

            const pageIds = new Set(pageRows.map((row) => row.original.id));

            return prev.filter((id) => !pageIds.has(id));
          });
        }}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => {
          row.toggleSelected(checked === true);

          setSelectedIds((prev) => {
            if (checked === true) {
              return Array.from(new Set([...prev, row.original.id]));
            }

            return prev.filter((id) => id !== row.original.id);
          });
        }}
        aria-label="Select row"
      />
    ),
  },

  {
    accessorKey: "name",

    header: ({ column }) => (
      <StreamSortableColumn column={column} title="Name" />
    ),

    cell: ({ row }) => (
      <div className="max-w-100 truncate font-medium">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "type",

    header: "Type",

    cell: ({ row }) => {
      const type = row.getValue("type") as Streams["type"];

      return (
        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {type.toUpperCase()}
        </span>
      );
    },
  },

  {
    accessorKey: "url",

    header: "URL",

    cell: ({ row }) => (
      <div className="max-w-100 truncate font-mono text-xs">
        {row.getValue("url")}
      </div>
    ),
  },

  {
    accessorKey: "directLinkActive",

    header: "Direct Link",

    cell: ({ row }) => {
      const active = row.getValue(
        "directLinkActive",
      ) as Streams["directLinkActive"];

      return (
        <span
          className={
            active
              ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          }
        >
          {active ? "ACTIVE" : "NONACTIVE"}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <StreamSortableColumn column={column} title="Created" />
    ),

    cell: ({ row }) =>
      formatDistanceToNow(new Date(row.original.createdAt), {
        addSuffix: true,
        locale: id,
      }),
  },

  {
    id: "actions",

    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
              inline-flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              border
              border-transparent
              hover:bg-muted
            "
          >
            <MoreHorizontal className="h-4 w-4" />

            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setData(row.original);
                onView(true);
              }}
            >
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setData(row.original);
                setType("edit");
                onEdit(true);
              }}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                setSelectedIds([]);
                setRowSelection({});
                setTypeDelete("single");
                setData(row.original);
                onDelete(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
