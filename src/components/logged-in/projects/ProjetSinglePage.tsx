"use client";

import { ActivityCard } from "@/components/logged-in/projects/cards/ActivityCard";
import { CommentCard } from "@/components/logged-in/projects/cards/CommentCard";
import { DetailsProject } from "@/components/logged-in/projects/cards/DetailsProject";
import { DocumentCard } from "@/components/logged-in/projects/cards/DocumentCard";
import { InfosClient } from "@/components/logged-in/projects/cards/InfosClient";
import { InfosTech } from "@/components/logged-in/projects/cards/InfosTech";
import { PhaseCard } from "@/components/logged-in/projects/cards/PhaseCard";
import { RiskCard } from "@/components/logged-in/projects/cards/RiskCard";
import { VueEnsemble } from "@/components/logged-in/projects/cards/VueEnsemble";
import { ProjectHeader } from "@/components/logged-in/projects/ProjectSingleHeader";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact } from "@/types/contact";
import { ProjectWithRelations } from "@/types/project";
import { ActivityLog, Comment, Document } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ProjectProps {
  project: ProjectWithRelations;
  contact: Contact;
  recentActivities: ActivityLog[];
  documents?: Document[];
  comments?: Comment[];
  isLoading?: boolean;
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export function ProjetSinglePage({
  project,
  contact,
  recentActivities,
  documents,
  comments,
  isLoading,
}: ProjectProps) {
  const router = useRouter();
  const [isModalPDFOpen, setIsModalPDFOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleBack = useCallback(() => {
    router.push("/dashboard/projects");
  }, [router]);

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  return (
    <motion.div className="w-full px-4 flex flex-col gap-6" {...fadeIn}>
      <ProjectHeader
        project={project}
        onBack={handleBack}
        isModalPDFOpen={isModalPDFOpen}
        setIsModalPDFOpen={setIsModalPDFOpen}
        contact={contact}
      />

      <AnimatePresence mode="wait">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="technical">Technique</TabsTrigger>
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="risks">Risques</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="comments">Commentaires</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <VueEnsemble
              project={project}
              recentActivities={recentActivities}
            />
          </TabsContent>

          <TabsContent value="client">
            <ProjectSection>
              <InfosClient project={project} />
            </ProjectSection>
          </TabsContent>

          <TabsContent value="details">
            <ProjectSection title="Détails du projet">
              <DetailsProject project={project} />
            </ProjectSection>
          </TabsContent>

          <TabsContent value="technical">
            <ProjectSection title="Informations techniques">
              <InfosTech project={project} />
            </ProjectSection>
          </TabsContent>

          <TabsContent value="phases" className="space-y-6">
            <ProjectSection title="Phases du projet">
              <div className="grid gap-4">
                {project.phases?.map((phase, index) => (
                  <PhaseCard
                    key={index}
                    phase={phase}
                    totalPhases={project.phases?.length || 0}
                    phaseNumber={index + 1}
                  />
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une phase
                </Button>
              </div>
            </ProjectSection>
          </TabsContent>

          <TabsContent
            value="risks"
            className="space-y-6 w-full flex flex-col gap-6"
          >
            <ProjectSection title="Risques identifiés">
              <div className="grid gap-4">
                {project.risks?.map((risk, index) => (
                  <RiskCard key={index} risk={risk} />
                ))}
              </div>
            </ProjectSection>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <ProjectSection title="Documents du projet">
              <div className="grid gap-4">
                {documents?.map((doc, index) => (
                  <DocumentCard key={index} document={doc} />
                ))}
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Ajouter un document
                </Button>
              </div>
            </ProjectSection>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <ProjectSection title="Commentaires">
              <div className="grid gap-4">
                {comments?.map((comment, index) => (
                  <CommentCard key={index} comment={comment} />
                ))}
              </div>
            </ProjectSection>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ProjectSection title="Journal d'activité">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            </ProjectSection>
          </TabsContent>
        </Tabs>
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="w-full px-4 space-y-6">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid grid-cols-4 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

function ProjectSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </section>
  );
}
