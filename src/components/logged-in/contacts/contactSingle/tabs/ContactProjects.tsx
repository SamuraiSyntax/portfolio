"use client";

import { Badge } from "@/components/ui/badge";
import { BadgeWithLabel } from "@/components/ui/badge-with-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { ProjectWithRelations } from "@/types/project";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Target,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectForm } from "../projects/ProjectForm";

const PROJECT_STATUS = {
  NOT_STARTED: {
    label: "Non démarré",
    variant: "secondary" as const,
    icon: Clock,
  },
  IN_PROGRESS: { label: "En cours", variant: "default" as const, icon: Target },
  ON_HOLD: {
    label: "En pause",
    variant: "outline" as const,
    icon: AlertCircle,
  },
  COMPLETED: {
    label: "Terminé",
    variant: "success" as const,
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Annulé",
    variant: "destructive" as const,
    icon: AlertCircle,
  },
};

interface ContactProjectsProps {
  projects: ProjectWithRelations[];
  contact: Contact;
  isLoading?: boolean;
}

export function ContactProjects({
  projects,
  contact,
  isLoading,
}: ContactProjectsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const calculateProgress = (project: ProjectWithRelations) => {
    if (!project.phases || project.phases.length === 0) return 0;
    const completedPhases = project.phases.filter(
      (phase) => phase.status === "COMPLETED"
    ).length;
    return Math.round((completedPhases / project.phases.length) * 100);
  };

  const getUpcomingDeadline = (project: ProjectWithRelations) => {
    if (!project.phases || project.phases.length === 0) return null;
    const incompletePhases = project.phases
      .filter((phase) => phase.status !== "COMPLETED")
      .sort(
        (a, b) =>
          new Date(a.estimatedDeliveryDate!).getTime() -
          new Date(b.estimatedDeliveryDate!).getTime()
      );
    return incompletePhases[0]?.estimatedDeliveryDate;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Projets</h2>
        <div className="flex items-center flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-md border bg-background"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau projet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ProjectForm
                contact={contact}
                onSubmit={() => setIsDialogOpen(false)}
                isModalOpen={isDialogOpen}
                setIsModalOpen={setIsDialogOpen}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="space-y-1 flex justify-between flex-wrap gap-2">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-xl font-semibold hover:text-primary flex items-center gap-2 flex-1"
                      >
                        {project.name}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{contact.company || "Pas d'entreprise"}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        PROJECT_STATUS[project.status]?.variant || "default"
                      }
                    >
                      <div className="flex items-center gap-2">
                        <BadgeWithLabel
                          label=""
                          value={project.status}
                          variant={
                            PROJECT_STATUS[
                              project.status as keyof typeof PROJECT_STATUS
                            ].variant
                          }
                        />
                      </div>
                    </Badge>
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{calculateProgress(project)}%</span>
                    </div>
                    <Progress value={calculateProgress(project)} />
                  </div>

                  <div className="flex flex-col gap-2">
                    {project.phases && project.phases.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {
                            project.phases.filter(
                              (phase) => phase.status !== "COMPLETED"
                            ).length
                          }{" "}
                          phases en cours
                        </span>
                      </div>
                    )}

                    {getUpcomingDeadline(project) && (
                      <div className="flex items-center gap-2 text-sm text-orange-500">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Prochaine échéance:{" "}
                          {formatDate(getUpcomingDeadline(project)!)}
                        </span>
                      </div>
                    )}

                    {project.projectManagerUser && (
                      <div className="flex items-center gap-2 text-sm">
                        <User2 className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Chef de projet:{" "}
                          {project.projectManagerUser.name || "Non assigné"}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {(!filteredProjects || filteredProjects.length === 0) && (
          <Card className="col-span-full p-6 text-center text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucun projet en cours</p>
            <p className="text-sm">
              Commencez par créer un nouveau projet pour ce contact
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
