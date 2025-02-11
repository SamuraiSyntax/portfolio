import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Prisma, Project } from "@prisma/client";
import { motion } from "framer-motion";
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
      if (Array.isArray(firstParse)) return firstParse;
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
  tooltip,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
}) => (
  <div className={cn("space-y-3", className)}>
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {tooltip ? (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2 font-semibold text-primary">
                <Icon className="h-5 w-5" />
                <h3 className="text-base md:text-lg">{title}</h3>
              </div>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Icon className="h-5 w-5" />
            <h3 className="text-base md:text-lg">{title}</h3>
          </div>
        )}
      </div>
    </TooltipProvider>
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-2"
  >
    {items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className={cn(
          "flex items-start gap-2 p-2 rounded-lg transition-all hover:scale-[1.02]",
          variant === "success" && "bg-green-50 text-green-700",
          variant === "warning" && "bg-red-50 text-red-700",
          variant === "default" && "bg-secondary/50"
        )}
      >
        <span className="text-sm md:text-base">{item}</span>
      </motion.div>
    ))}
  </motion.div>
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
    <TooltipProvider>
      <div className="p-4 md:p-6 bg-background space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="col-span-full shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6 space-y-4">
              <Section
                title="Contexte"
                icon={FileCode}
                tooltip="Contexte général du projet"
              >
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.context || "Aucun contexte spécifié"}
                </p>
              </Section>
            </CardContent>
          </Card>

          <Card className="col-span-full shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6">
              <Section
                className="flex flex-col justify-between"
                title="Contraintes budgétaires"
                icon={CircleDollarSign}
                tooltip="Limitations et considérations budgétaires"
              >
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.budgetConstraints ||
                    "Aucune contrainte budgétaire spécifiée"}
                </p>
              </Section>

              <Section
                className="flex flex-col justify-between"
                title="Contraintes techniques"
                icon={ShieldAlert}
                tooltip="Limitations techniques et exigences spécifiques"
              >
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.technicalConstraints ||
                    "Aucune contrainte technique spécifiée"}
                </p>
              </Section>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <Section
                title="Hypothèses"
                icon={LightbulbIcon}
                tooltip="Hypothèses de travail et suppositions"
              >
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.assumptions || "Aucune hypothèse spécifiée"}
                </p>
              </Section>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <Section
                title="Objectifs"
                icon={Target}
                tooltip="Objectifs principaux du projet"
              >
                {objectives.length > 0 ? (
                  <List items={objectives} />
                ) : (
                  <p className="text-muted-foreground text-sm md:text-base">
                    Aucun objectif spécifié
                  </p>
                )}
              </Section>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <Section
                title="Inclus dans le périmètre"
                icon={ListChecks}
                tooltip="Éléments inclus dans le projet"
              >
                {scopeIncluded.length > 0 ? (
                  <List items={scopeIncluded} variant="success" />
                ) : (
                  <p className="text-muted-foreground text-sm md:text-base">
                    Aucun élément inclus spécifié
                  </p>
                )}
              </Section>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <Section
                title="Exclus du périmètre"
                icon={CalendarClock}
                tooltip="Éléments exclus du projet"
              >
                {scopeExcluded.length > 0 ? (
                  <List items={scopeExcluded} variant="warning" />
                ) : (
                  <p className="text-muted-foreground text-sm md:text-base">
                    Aucun élément exclu spécifié
                  </p>
                )}
              </Section>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};
