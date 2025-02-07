import { ProjetSinglePage } from "@/components/logged-in/projects/ProjetSinglePage";
import { activityLogService } from "@/services/activityLogService";
import { projectService } from "@/services/projectService";
import { ProjectWithRelations } from "@/types/project";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: tParams }) {
  "use server";
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
