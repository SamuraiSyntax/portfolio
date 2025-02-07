import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsonToStringArray } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  ListChecks,
  Target,
  Users,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

interface DetailsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const DetailsSection = ({ title, icon, children }: DetailsSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-lg font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const ListItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-start gap-2 text-muted-foreground">
    {icon}
    <span className="flex-1">{text}</span>
  </li>
);

export function DetailsProject({ project }: { project: ProjectWithRelations }) {
  const objectives = jsonToStringArray(project.objectives);
  const scopeIncluded = jsonToStringArray(project.scopeIncluded);
  const scopeExcluded = jsonToStringArray(project.scopeExcluded);

  return (
    <motion.div className="grid gap-6" {...fadeIn}>
      {/* Contexte et Objectifs */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Contexte et objectifs
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <DetailsSection
            title="Contexte du projet"
            icon={<FileText className="h-5 w-5 text-blue-500" />}
          >
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.context || "Aucun contexte défini"}
            </p>
          </DetailsSection>

          <DetailsSection
            title="Objectifs principaux"
            icon={<Target className="h-5 w-5 text-green-500" />}
          >
            <ul className="space-y-3">
              {objectives.length > 0 ? (
                objectives.map((objective, index) => (
                  <ListItem
                    key={index}
                    icon={
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    }
                    text={objective}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">Aucun objectif défini</p>
              )}
            </ul>
          </DetailsSection>
        </CardContent>
      </Card>

      {/* Périmètre du projet */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            Périmètre du projet
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <DetailsSection
            title="Inclus dans le périmètre"
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
          >
            <ul className="space-y-3">
              {scopeIncluded.length > 0 ? (
                scopeIncluded.map((item, index) => (
                  <ListItem
                    key={index}
                    icon={
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    }
                    text={item}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">
                  Aucun élément inclus défini
                </p>
              )}
            </ul>
          </DetailsSection>

          <DetailsSection
            title="Exclus du périmètre"
            icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
          >
            <ul className="space-y-3">
              {scopeExcluded.length > 0 ? (
                scopeExcluded.map((item, index) => (
                  <ListItem
                    key={index}
                    icon={
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                    }
                    text={item}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">
                  Aucun élément exclu défini
                </p>
              )}
            </ul>
          </DetailsSection>
        </CardContent>
      </Card>

      {/* Hypothèses et Public cible */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Hypothèses et Public cible
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Hypothèses de travail</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.assumptions || "Aucune hypothèse définie"}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Public cible</h3>
            <ul className="space-y-2">
              {jsonToStringArray(project.targetAudience).map(
                (audience, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Users className="h-4 w-4 text-blue-500 shrink-0" />
                    {audience}
                  </li>
                )
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
