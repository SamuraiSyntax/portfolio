"use client";

import { DataTable } from "@/components/logged-in/data-table/data-table";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { ProjectDetails } from "../../dashboard/project/project-details";
import { createProjectColumns } from "./columns";

interface ProjectTableProps {
  projects: Project[];
  onAdd?: () => void;
  isLoading?: boolean;
}

export function ProjectTable({
  projects,
  onAdd,
  isLoading,
}: ProjectTableProps) {
  const router = useRouter();
  const columns = createProjectColumns();

  const handleView = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const handleEdit = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}/edit`);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de la suppression du projet");
    }
  };

  return (
    <DataTable
      columns={columns}
      data={projects}
      searchKey="name"
      onAdd={onAdd}
      addButtonLabel="Ajouter un projet"
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      renderExpandedRow={(project) => <ProjectDetails project={project} />}
      isLoading={isLoading}
    />
  );
}
