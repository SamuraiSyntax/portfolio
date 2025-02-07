import { ContactModalsPDF } from "@/components/logged-in/contacts/contactSingle/ContactModalsPDF";
import { ProjectKPICards } from "@/components/logged-in/projects/ProjectKPICards";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTimeRemaining } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { ProjectWithRelations } from "@/types/project";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Edit, Target, Users } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const ProjectHeader = memo(function ProjectHeader({
  project,
  onBack,
  isModalPDFOpen,
  setIsModalPDFOpen,
  contact,
}: {
  project: ProjectWithRelations;
  onBack: () => void;
  isModalPDFOpen: boolean;
  setIsModalPDFOpen: (isOpen: boolean) => void;
  contact: Contact;
}) {
  const projectStatus = getProjectStatus(project);
  /* const progress = getProjectProgress(project); */

  return (
    <TooltipProvider>
      <motion.section
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="hover:bg-primary/10 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Retour à la liste</TooltipContent>
            </Tooltip>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge
                  variant="outline"
                  className={`${projectStatus.color} transition-colors`}
                >
                  {projectStatus.label}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    {project.projectManagerUser?.name || "Non assigné"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {formatTimeRemaining(project.estimatedDeliveryDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">ID: {project.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ContactModalsPDF
              isModalOpen={isModalPDFOpen}
              setIsModalOpen={setIsModalPDFOpen}
              contact={contact}
              project={project as unknown as Project}
            />

            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <Button className="hover:bg-primary/90 transition-colors">
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </Link>
          </div>
        </div>

        <ProjectKPICards project={project} />
      </motion.section>
    </TooltipProvider>
  );
});

/* 
function getProjectProgress(project: ProjectWithRelations): number {
  const completedPhases =
    project.phases?.filter((p) => p.status === "COMPLETED").length || 0;
  const totalPhases = project.phases?.length || 1;
  return (completedPhases / totalPhases) * 100;
}
 */
function getProjectStatus(project: ProjectWithRelations) {
  if (project.status === "COMPLETED")
    return { label: "Terminé", color: "bg-green-500/10 text-green-700" };
  return new Date() > new Date(project.estimatedDeliveryDate)
    ? { label: "En retard", color: "bg-red-500/10 text-red-700" }
    : { label: "En cours", color: "bg-blue-500/10 text-blue-700" };
}
