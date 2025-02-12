"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ContactStatus, Priority } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: ContactStatus;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "lastName",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as ContactStatus;
      const statusMap: Record<
        ContactStatus,
        {
          label: string;
          variant: "default" | "secondary" | "destructive" | "outline";
        }
      > = {
        [ContactStatus.NEW]: { label: "Nouveau", variant: "default" },
        [ContactStatus.LEAD]: { label: "Lead", variant: "default" },
        [ContactStatus.QUALIFIED]: { label: "Qualifié", variant: "secondary" },
        [ContactStatus.QUALIFIED_LEAD]: {
          label: "Lead Qualifié",
          variant: "secondary",
        },
        [ContactStatus.OPPORTUNITY]: {
          label: "Opportunité",
          variant: "secondary",
        },
        [ContactStatus.IN_PROGRESS]: {
          label: "En cours",
          variant: "secondary",
        },
        [ContactStatus.NEGOTIATION]: {
          label: "Négociation",
          variant: "secondary",
        },
        [ContactStatus.CONVERTED]: { label: "Converti", variant: "outline" },
        [ContactStatus.WON]: { label: "Gagné", variant: "outline" },
        [ContactStatus.LOST]: { label: "Perdu", variant: "destructive" },
        [ContactStatus.INACTIVE]: { label: "Inactif", variant: "destructive" },
        [ContactStatus.ARCHIVED]: { label: "Archivé", variant: "destructive" },
      };

      return (
        <Badge variant={statusMap[status]?.variant || "default"}>
          {statusMap[status]?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priorité",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Priority;
      const priorityMap: Record<
        Priority,
        { label: string; variant: "default" | "secondary" | "destructive" }
      > = {
        [Priority.LOW]: { label: "Basse", variant: "default" },
        [Priority.NORMAL]: { label: "Normale", variant: "secondary" },
        [Priority.HIGH]: { label: "Haute", variant: "destructive" },
        [Priority.URGENT]: { label: "Urgente", variant: "destructive" },
      };

      return (
        <Badge variant={priorityMap[priority]?.variant || "default"}>
          {priorityMap[priority]?.label || priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
];
