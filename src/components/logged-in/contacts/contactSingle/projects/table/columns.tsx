"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { Project } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  Edit,
  Eye,
  MoreHorizontal,
  Trash,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ColumnActionsProps {
  setSelectedProject: (project: ProjectWithRelations) => void;
  setIsModalProjetOpen: (isOpen: boolean) => void;
}

const ActionCell = ({
  row,
  setSelectedProject,
  setIsModalProjetOpen,
}: {
  row: Row<Project>;
  setSelectedProject: (project: ProjectWithRelations) => void;
  setIsModalProjetOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <>
      <Button variant="ghost" onClick={() => row.toggleExpanded()}>
        {row.getIsExpanded() ? <ChevronDown /> : <ChevronLeft />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/projects/${row.original.id}`);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelectedProject(row.original as ProjectWithRelations);
              setIsModalProjetOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
                fetch(`/api/projects/${row.original.id}`, {
                  method: "DELETE",
                }).then((response) => {
                  if (response.ok) {
                    window.location.reload();
                  }
                });
              }
            }}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const createColumns = ({
  setSelectedProject,
  setIsModalProjetOpen,
}: ColumnActionsProps): ColumnDef<Project>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center mx-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Sélectionner tout"
        />
      </div>
    ),

    cell: ({ row }) => (
      <div className="flex items-center justify-center mx-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
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
          Nom du projet
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <Link
          href={`/dashboard/projects/${row.original.id}`}
          className="font-medium text-primary hover:underline"
        >
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },

  {
    accessorKey: "projectManagerUser",
    header: "Chef de projet",
    cell: ({ row }) => {
      const projectManager = row.getValue("projectManagerUser") as {
        name: string;
        email: string;
      } | null;
      return (
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <User className="h-4 w-4" />
          {projectManager?.name || projectManager?.email || "Non assigné"}
        </div>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de début
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        {formatDate(row.getValue("startDate"))}
      </div>
    ),
  },

  {
    accessorKey: "estimatedDeliveryDate",
    header: ({ column }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de livraison
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        {formatDate(row.getValue("estimatedDeliveryDate"))}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <ActionCell
          row={row}
          setSelectedProject={setSelectedProject}
          setIsModalProjetOpen={setIsModalProjetOpen}
        />
      </div>
    ),
  },
];
