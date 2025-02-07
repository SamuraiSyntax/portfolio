"use client";

import { ContactDetails } from "@/components/logged-in/dashboard/contact/contact-details";
import { Button } from "@/components/ui/button";

import { ContactModalsPDF } from "@/components/logged-in/contacts/contactSingle/ContactModalsPDF";
import { ProjectForm } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { Phase, Project, Risk } from "@prisma/client";

import { ArrowLeft, Edit } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

import { ProjectsTable } from "@/components/logged-in/projects/ProjectsTable";
import { ProjectManagerUser, ProjectWithRelations } from "@/types/project";

interface ExtendedProject extends Project {
  phases?: Phase[];
  risks?: Risk[];
  projectManagerUser?: ProjectManagerUser;
  clientName?: string;
}

export function ContactPage({
  contact,
  id,
  projects,
}: {
  contact: Contact;
  id: string;
  projects: Project[];
}) {
  const router = useRouter();
  const [isModalPDFOpen, setIsModalPDFOpen] = useState(false);
  const [isModalProjetOpen, setIsModalProjetOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithRelations | null>(null);

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => redirect("/dashboard")}
            className="hover:bg-gray-200 transition duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Détails du contact</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => redirect(`/dashboard/contacts/${id}/edit`)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </Button>

          <ContactModalsPDF
            isModalOpen={isModalPDFOpen}
            setIsModalOpen={setIsModalPDFOpen}
            contact={contact}
            project={selectedProject as ExtendedProject}
          />
        </div>
      </section>

      {/* Métadonnées */}
      <section className="flex flex-row justify-between gap-2 text-sm text-muted-foreground">
        <p>Créé le {formatDate(contact.createdAt)}</p>
        <p>Dernière modification le {formatDate(contact.updatedAt)}</p>
      </section>

      <section className="flex flex-col gap-4">
        <ContactDetails contact={contact} />
      </section>

      <section className="flex flex-col gap-4">
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Projets liés</h2>
            <Button onClick={() => setIsModalProjetOpen(true)}>
              Ajouter un projet
            </Button>
          </div>

          <ProjectsTable projects={projects} contacts={[contact]} />

          {isModalProjetOpen && (
            <ProjectForm
              onSubmit={() => {
                setSelectedProject(null);
                setIsModalProjetOpen(false);
                router.refresh();
              }}
              isModalOpen={isModalProjetOpen}
              setIsModalOpen={setIsModalProjetOpen}
              contact={contact}
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
        </Card>
      </section>
    </>
  );
}
