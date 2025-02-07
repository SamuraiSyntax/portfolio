import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Prisma, Project } from "@prisma/client";
import {
  CalendarClock,
  CircleDollarSign,
  FileCode,
  LightbulbIcon,
  ListChecks,
  ShieldAlert,
  Target,
} from "lucide-react";

interface ProjectDetailsProps {
  project: Project;
}

const jsonToStringArray = (jsonValue: Prisma.JsonArray): string[] => {
  if (!jsonValue) return [];

  try {
    if (typeof jsonValue === "string") {
      const firstParse = JSON.parse(jsonValue);

      if (Array.isArray(firstParse)) {
        return firstParse;
      }

      if (typeof firstParse === "string") {
        const secondParse = JSON.parse(firstParse);
        return Array.isArray(secondParse) ? secondParse : [firstParse];
      }

      return [firstParse];
    }

    if (Array.isArray(jsonValue)) {
      return jsonValue.filter(
        (item): item is string => typeof item === "string"
      );
    }

    return [];
  } catch (error) {
    console.error("Erreur parsing JSON:", error);
    return [];
  }
};

const Section = ({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("space-y-3", className)}>
    <div className="flex items-center gap-2 font-semibold text-primary">
      <Icon className="h-5 w-5" />
      <h3 className="text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

const List = ({
  items,
  variant = "default",
}: {
  items: string[];
  variant?: "success" | "warning" | "default";
}) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div
        key={index}
        className={cn(
          "flex items-start gap-2 p-2 rounded-lg transition-colors",
          variant === "success" && "bg-green-50 text-green-700",
          variant === "warning" && "bg-red-50 text-red-700",
          variant === "default" && "bg-secondary/50"
        )}
      >
        <span className="text-sm">{item}</span>
      </div>
    ))}
  </div>
);

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const objectives = jsonToStringArray(project.objectives as Prisma.JsonArray);
  const scopeIncluded = jsonToStringArray(
    project.scopeIncluded as Prisma.JsonArray
  );
  const scopeExcluded = jsonToStringArray(
    project.scopeExcluded as Prisma.JsonArray
  );

  return (
    <div className="p-6 bg-background space-y-6">
      {/* Contexte et Contraintes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 space-y-4">
            <Section title="Contexte" icon={FileCode}>
              <p className="text-muted-foreground leading-relaxed">
                {project.context || "Aucun contexte spécifié"}
              </p>
            </Section>
          </CardContent>
        </Card>

        <Card className="col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="grid grid-cols-2 gap-6 pt-6">
            <Section
              className="col-span-1 flex flex-col justify-between"
              title="Contraintes budgétaires"
              icon={CircleDollarSign}
            >
              <p className="text-muted-foreground leading-relaxed grow flex items-center">
                {project.budgetConstraints ||
                  "Aucune contrainte budgétaire spécifiée"}
              </p>
            </Section>

            <Section
              className="col-span-1 flex flex-col justify-between"
              title="Contraintes techniques"
              icon={ShieldAlert}
            >
              <p className="text-muted-foreground leading-relaxed grow flex items-center">
                {project.technicalConstraints ||
                  "Aucune contrainte technique spécifiée"}
              </p>
            </Section>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Section title="Hypothèses" icon={LightbulbIcon}>
              <p className="text-muted-foreground leading-relaxed grow flex items-center">
                {project.assumptions || "Aucune hypothèse spécifiée"}
              </p>
            </Section>
          </CardContent>
        </Card>
        {/* Objectifs */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Section title="Objectifs" icon={Target}>
              {objectives.length > 0 ? (
                <List items={objectives} />
              ) : (
                <p className="text-muted-foreground">Aucun objectif spécifié</p>
              )}
            </Section>
          </CardContent>
        </Card>
      </div>

      {/* Périmètre */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Section title="Inclus dans le périmètre" icon={ListChecks}>
              {scopeIncluded.length > 0 ? (
                <List items={scopeIncluded} variant="success" />
              ) : (
                <p className="text-muted-foreground">
                  Aucun élément inclus spécifié
                </p>
              )}
            </Section>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Section title="Exclus du périmètre" icon={CalendarClock}>
              {scopeExcluded.length > 0 ? (
                <List items={scopeExcluded} variant="warning" />
              ) : (
                <p className="text-muted-foreground">
                  Aucun élément exclu spécifié
                </p>
              )}
            </Section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
