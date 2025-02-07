"use client";

import { ProjectForm } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { createColumns } from "@/components/logged-in/contacts/contactSingle/projects/table/columns";
import { ProjectDetails } from "@/components/logged-in/contacts/contactSingle/projects/table/ProjectDetails";
import { DataTable } from "@/components/logged-in/data-table/data-table";
import { Contact } from "@/types/contact";
import { ProjectWithRelations } from "@/types/project";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectsTableProps {
  projects: Project[];
  contacts: Contact[];
}

export function ProjectsTable({ projects, contacts }: ProjectsTableProps) {
  const router = useRouter();
  const [isModalProjetOpen, setIsModalProjetOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithRelations | null>(null);

  const columns = createColumns({
    setSelectedProject: (project: ProjectWithRelations) => {
      setSelectedProject(project);
      setIsModalProjetOpen(true);
    },
    setIsModalProjetOpen,
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={projects}
        renderExpandedRow={(row) => <ProjectDetails project={row} />}
      />

      {isModalProjetOpen && contacts.length > 0 && (
        <ProjectForm
          onSubmit={() => {
            setSelectedProject(null);
            setIsModalProjetOpen(false);
            router.refresh();
          }}
          isModalOpen={isModalProjetOpen}
          setIsModalOpen={setIsModalProjetOpen}
          contact={contacts[0] as Contact}
          existingProject={
            selectedProject
              ? {
                  ...selectedProject,
                  phases: selectedProject.phases || [],
                  risks: selectedProject.risks || [],
                }
              : null
          }
        />
      )}
    </>
  );
}
