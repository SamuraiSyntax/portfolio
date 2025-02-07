"use client";

import { DataTable } from "@/components/logged-in/data-table/data-table";
import { Project } from "@/types/project";
import { createProjectColumns } from "./project-columns";
import { ProjectDetails } from "./project-details";

interface ProjectTableProps {
  projects: Project[];
  onAdd?: () => void;
  isLoading?: boolean;
  setSelectedProject?: (project: Project) => void;
}

export function ProjectTable({
  projects,
  onAdd,
  isLoading,
  setSelectedProject,
}: ProjectTableProps) {
  const columns = createProjectColumns({
    onView: (project) => setSelectedProject?.(project),
  });

  const renderExpandedRow = (project: Project) => (
    <ProjectDetails project={project} />
  );

  return (
    <DataTable
      columns={columns}
      data={projects}
      searchKey="name"
      onAdd={onAdd}
      addButtonLabel="Ajouter un projet"
      renderExpandedRow={renderExpandedRow}
      isLoading={isLoading}
    />
  );
}
