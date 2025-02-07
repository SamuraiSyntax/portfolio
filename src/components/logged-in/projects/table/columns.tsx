"use client";

import { createBaseColumns } from "@/components/logged-in/data-table/columns/base-columns";
import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export function createProjectColumns(): ColumnDef<Project>[] {
  return [
    createBaseColumns.select<Project>(),
    createBaseColumns.expand<Project>(),
    {
      accessorKey: "name",
      header: "Nom du projet",
      cell: ({ row }) => (
        <Link
          href={`/dashboard/projects/${row.original.id}`}
          className="font-medium text-primary hover:underline"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    createBaseColumns.badge<Project>("status", "Statut", {
      NEW: { label: "Nouveau", variant: "default" },
      IN_PROGRESS: { label: "En cours", variant: "warning" },
      COMPLETED: { label: "Terminé", variant: "success" },
      ARCHIVED: { label: "Archivé", variant: "secondary" },
    }),
    createBaseColumns.date<Project>("startDate", "Date de début"),
    createBaseColumns.date<Project>(
      "estimatedDeliveryDate",
      "Date de livraison estimée"
    ),
    {
      accessorKey: "projectManagerUser",
      header: "Chef de projet",
      cell: ({ row }) => {
        const manager = row.original.projectManagerUser;
        return manager ? manager.name || manager.email : "Non assigné";
      },
    },
    createBaseColumns.badge<Project>("priority", "Priorité", {
      LOW: { label: "Basse", variant: "default" },
      NORMAL: { label: "Normale", variant: "info" },
      HIGH: { label: "Haute", variant: "warning" },
      URGENT: { label: "Urgente", variant: "destructive" },
    }),
    createBaseColumns.array<Project>("technologies", "Technologies", {
      limit: 3,
    }),
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const budget = row.getValue("budget") as number;
        return budget
          ? new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(budget)
          : "-";
      },
    },
  ];
}
