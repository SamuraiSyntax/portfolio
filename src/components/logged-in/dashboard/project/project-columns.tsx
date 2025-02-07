"use client";

import {
  createBadgeColumn,
  createDateColumn,
  createSelectColumn,
  createSortableColumn,
} from "@/components/logged-in/data-table/columns/base-columns";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

interface ProjectColumnsOptions {
  onView?: (project: Project) => void;
}

export function createProjectColumns(
  options?: ProjectColumnsOptions
): ColumnDef<Project>[] {
  return [
    createSelectColumn<Project>(),
    createSortableColumn<Project>("name", "Nom du projet"),
    createBadgeColumn<Project>("status", "Statut", {
      NEW: { label: "Nouveau", variant: "default" },
      IN_PROGRESS: { label: "En cours", variant: "warning" },
      COMPLETED: { label: "Terminé", variant: "success" },
      ARCHIVED: { label: "Archivé", variant: "secondary" },
    }),
    createDateColumn<Project>("startDate", "Date de début"),
    createDateColumn<Project>(
      "estimatedDeliveryDate",
      "Date de livraison estimée"
    ),
    {
      accessorKey: "projectManagerUser.name",
      header: "Chef de projet",
    },
    createBadgeColumn<Project>("priority", "Priorité", {
      LOW: { label: "Basse", variant: "default" },
      NORMAL: { label: "Normale", variant: "info" },
      HIGH: { label: "Haute", variant: "warning" },
      URGENT: { label: "Urgente", variant: "destructive" },
    }),
    {
      accessorKey: "technologies",
      header: "Technologies",
      cell: ({ row }) => {
        const technologies = row.getValue("technologies") as string[];
        return technologies?.slice(0, 3).join(", ") || "-";
      },
    },
    {
      id: "actions",
      cell: ({ row }) =>
        options?.onView && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => options.onView?.(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        ),
    },
  ];
}
