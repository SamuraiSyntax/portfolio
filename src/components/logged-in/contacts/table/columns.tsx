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
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Sélectionner tout"
          className="mx-1"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
          className="mx-1"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Link
          href={`/dashboard/contacts/${row.original.id}`}
          className="font-medium text-primary hover:underline whitespace-nowrap"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
      cell: ({ row }) => row.getValue("phone") || "-",
    },
    {
      accessorKey: "company",
      header: "Entreprise",
      cell: ({ row }) => row.getValue("company") || "-",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
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
      ),
    },
    {
      accessorKey: "priority",
      header: "Priorité",
      cell: ({ row }) => (
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
      ),
    },
    {
      accessorKey: "projectType",
      header: "Type de projet",
      cell: ({ row }) => row.getValue("projectType") || "-",
    },
    {
      accessorKey: "budget",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatCurrency(row.getValue("budget")) || "-",
    },
    {
      accessorKey: "lastContact",
      header: "Dernier contact",
      cell: ({ row }) => formatDate(row.getValue("lastContact")) || "-",
    },
    {
      accessorKey: "nextFollowUp",
      header: "Prochaine relance",
      cell: ({ row }) => formatDate(row.getValue("nextFollowUp")) || "-",
    },
  ];
};

const getStatusVariant = (status: ContactStatus) => {
  const variants = {
    [ContactStatus.NEW]: "default",
    [ContactStatus.IN_PROGRESS]: "success",
    [ContactStatus.COMPLETED]: "secondary",
    [ContactStatus.ARCHIVED]: "destructive",
  };
  return variants[status] || "default";
};

const getStatusLabel = (status: ContactStatus) => {
  const labels = {
    [ContactStatus.NEW]: "Nouveau",
    [ContactStatus.IN_PROGRESS]: "En cours",
    [ContactStatus.COMPLETED]: "Terminé",
    [ContactStatus.ARCHIVED]: "Archivé",
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
