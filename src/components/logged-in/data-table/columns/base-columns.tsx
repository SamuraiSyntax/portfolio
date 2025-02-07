"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";

export interface BadgeVariant {
  label: string;
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
}

export interface BadgeVariants {
  [key: string]: BadgeVariant;
}

export const createBaseColumns = {
  select: <T,>(): ColumnDef<T> => ({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  expand: <T,>(): ColumnDef<T> => ({
    id: "expand",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => row.toggleExpanded()}
        className="p-0 hover:bg-transparent"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  sortable: <T,>(accessorKey: keyof T, header: string): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  date: <T,>(accessorKey: keyof T, header: string): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey as string) as Date;
      return value ? formatDate(value) : "-";
    },
  }),

  badge: <T,>(
    accessorKey: keyof T,
    header: string,
    variants: BadgeVariants
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey as string) as string;
      const variant = variants[value];
      return variant ? (
        <Badge
          variant={
            variant.variant as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
              | null
          }
        >
          {variant.label}
        </Badge>
      ) : (
        value
      );
    },
  }),

  array: <T,>(
    accessorKey: keyof T,
    header: string,
    options?: { limit?: number; separator?: string }
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const values = row.getValue(accessorKey as string) as string[];
      if (!values?.length) return "-";
      const limit = options?.limit || values.length;
      const separator = options?.separator || ", ";
      return values.slice(0, limit).join(separator);
    },
  }),
};
