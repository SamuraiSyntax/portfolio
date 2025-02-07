import { ProjetSinglePage } from "@/components/logged-in/projects/ProjetSinglePage";
import { activityLogService } from "@/services/activityLogService";
import { projectService } from "@/services/projectService";
import { ProjectWithRelations } from "@/types/project";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }> | { id: string };
}

const prisma = new PrismaClient();

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
    select: { name: true },
  });

  if (!project) {
    return {
      title: "Projet non trouvé",
      description: "Le projet demandé n'existe pas",
    };
  }

  return {
    title: `${project.name} - Gestion de Projet`,
    description: `Détails et suivi du projet ${project.name}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const project = await projectService.findById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  // Convertir le client en type Contact pour le PDF
  const contactForPDF = {
    ...project.client,
    annualRevenue: project.client.annualRevenue
      ? Number(project.client.annualRevenue.toString())
      : null,
    budget: project.client.budget
      ? Number(project.client.budget.toString())
      : null,
  };

  // Récupérer les activités récentes
  const recentActivities = await activityLogService.findRecentByEntity({
    entityType: "PROJECT",
    entityId: project.id,
    contactId: project.client.id,
    limit: 10,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6">
        <ProjetSinglePage
          project={project as ProjectWithRelations}
          contact={contactForPDF}
          recentActivities={recentActivities}
        />
      </div>
    </div>
  );
}
