"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Contact, ContactStatus, Priority } from "@/types/contact";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const createContactColumns = (): ColumnDef<Contact>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Sélectionner tout"
            className="mx-1"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Sélectionner la ligne"
            className="mx-1"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Link
            href={`/dashboard/contacts/${row.original.id}`}
            className="font-medium text-primary hover:underline whitespace-nowrap"
          >
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => row.getValue("email"),
    },

    {
      accessorKey: "phone",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Téléphone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {row.getValue("phone") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Entreprise
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {row.getValue("company") || "-"}
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Statut
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Badge
            variant={
              getStatusVariant(row.getValue("status")) as
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
            }
            className="whitespace-nowrap"
          >
            {getStatusLabel(row.getValue("status"))}
          </Badge>
        </div>
      ),
    },

    {
      accessorKey: "priority",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priorité
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Badge
            variant={
              getPriorityVariant(row.getValue("priority")) as
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
            }
            className="whitespace-nowrap"
          >
            {getPriorityLabel(row.getValue("priority"))}
          </Badge>
        </div>
      ),
    },

    {
      accessorKey: "projectType",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type de projet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {row.getValue("projectType") || "-"}
        </div>
      ),
    },

    {
      accessorKey: "budget",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Budget
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {formatCurrency(row.getValue("budget")) || "-"}
        </div>
      ),
    },

    {
      accessorKey: "lastContact",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dernier contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {formatDate(row.getValue("lastContact")) || "-"}
        </div>
      ),
    },

    {
      accessorKey: "nextFollowUp",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prochaine relance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          {formatDate(row.getValue("nextFollowUp")) || "-"}
        </div>
      ),
    },
  ];
};

const getStatusVariant = (status: ContactStatus) => {
  const variants: Record<ContactStatus, string> = {
    [ContactStatus.NEW]: "default",
    [ContactStatus.IN_PROGRESS]: "success",
    [ContactStatus.OPPORTUNITY]: "secondary",
    [ContactStatus.NEGOTIATION]: "warning",
    [ContactStatus.CONVERTED]: "success",
    [ContactStatus.WON]: "success",
    [ContactStatus.LOST]: "destructive",
    [ContactStatus.INACTIVE]: "secondary",
    [ContactStatus.ARCHIVED]: "destructive",
    [ContactStatus.LEAD]: "default",
    [ContactStatus.QUALIFIED]: "success",
    [ContactStatus.QUALIFIED_LEAD]: "warning",
  };
  return variants[status];
};

const getStatusLabel = (status: ContactStatus) => {
  const labels = {
    [ContactStatus.NEW]: "Nouveau",
    [ContactStatus.IN_PROGRESS]: "En cours",
    [ContactStatus.OPPORTUNITY]: "Opportunité",
    [ContactStatus.NEGOTIATION]: "Négociation",
    [ContactStatus.CONVERTED]: "Converti",
    [ContactStatus.WON]: "Gagné",
    [ContactStatus.LOST]: "Perdu",
    [ContactStatus.INACTIVE]: "Inactif",
    [ContactStatus.ARCHIVED]: "Archivé",
    [ContactStatus.LEAD]: "Lead",
    [ContactStatus.QUALIFIED]: "Qualifié",
    [ContactStatus.QUALIFIED_LEAD]: "Qualifié Lead",
  };
  return labels[status] || status;
};

const getPriorityVariant = (priority: Priority) => {
  const variants = {
    [Priority.LOW]: "secondary",
    [Priority.NORMAL]: "default",
    [Priority.HIGH]: "warning",
    [Priority.URGENT]: "destructive",
  };
  return variants[priority] || "default";
};

const getPriorityLabel = (priority: Priority) => {
  const labels = {
    [Priority.LOW]: "Basse",
    [Priority.NORMAL]: "Normale",
    [Priority.HIGH]: "Haute",
    [Priority.URGENT]: "Urgente",
  };
  return labels[priority] || priority;
};
