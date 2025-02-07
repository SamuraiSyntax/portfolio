import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatBudget, formatTimeRemaining } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart2,
  Clock,
  DollarSign,
  Target,
} from "lucide-react";
import { memo } from "react";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tooltip: string;
  gradient: string;
  progress?: number;
  trend?: {
    value: number;
    label: string;
  };
}

const KPICard = memo(function KPICard({
  title,
  value,
  icon,
  tooltip,
  gradient,
  progress,
  trend,
}: KPICardProps) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card
              className={`${gradient} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full`}
            >
              <CardContent className="pt-6 pb-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {title}
                  </span>
                  {icon}
                </div>
                <div className="flex flex-col gap-2 grow justify-center">
                  <span className="text-2xl font-bold">{value}</span>
                  {progress !== undefined && (
                    <Progress
                      value={progress}
                      className="h-1.5"
                      classNameIndicator={`${
                        progress >= 100
                          ? "bg-green-500"
                          : progress >= 50
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    />
                  )}
                  {trend && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                      <BarChart2 className="h-3 w-3" />
                      <span>{trend.label}</span>
                      <span
                        className={
                          trend.value >= 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {trend.value > 0 ? "+" : ""}
                        {trend.value}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

export const ProjectKPICards = memo(function ProjectKPICards({
  project,
}: {
  project: ProjectWithRelations;
}) {
  const progress = getProjectProgress(project);
  const timeProgress = getTimeProgress(project);
  const riskLevel = getRiskLevel(project);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <KPICard
        title="Progression"
        value={`${Math.round(progress)}%`}
        icon={<Target className="h-5 w-5 text-blue-500" />}
        tooltip="Progression globale du projet basée sur les phases complétées"
        gradient="bg-gradient-to-br from-blue-50 to-blue-100"
        progress={progress}
        trend={{
          value: 15,
          label: "vs mois dernier",
        }}
      />

      <KPICard
        title="Budget"
        value={
          project.budget ? formatBudget(Number(project.budget)) : "À définir"
        }
        icon={<DollarSign className="h-5 w-5 text-green-500" />}
        tooltip="Budget total alloué au projet"
        gradient="bg-gradient-to-br from-green-50 to-green-100"
      />

      <KPICard
        title="Temps restant"
        value={formatTimeRemaining(project.estimatedDeliveryDate)}
        icon={<Clock className="h-5 w-5 text-orange-500" />}
        tooltip="Temps restant jusqu'à la date de livraison estimée"
        gradient="bg-gradient-to-br from-orange-50 to-orange-100"
        progress={timeProgress}
      />

      <KPICard
        title="Niveau de risque"
        value={riskLevel.label}
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        tooltip="Niveau de risque basé sur le nombre et la gravité des risques identifiés"
        gradient="bg-gradient-to-br from-red-50 to-red-100"
        progress={riskLevel.value}
      />
    </motion.div>
  );
});

function getProjectProgress(project: ProjectWithRelations): number {
  const completedPhases =
    project.phases?.filter((p) => p.status === "COMPLETED").length || 0;
  const totalPhases = project.phases?.length || 1;
  return (completedPhases / totalPhases) * 100;
}

function getTimeProgress(project: ProjectWithRelations): number {
  const start = new Date(project.startDate).getTime();
  const end = new Date(project.estimatedDeliveryDate).getTime();
  const now = Date.now();
  const progress = ((now - start) / (end - start)) * 100;
  return Math.round(Math.min(100, Math.max(0, progress)) * 100) / 100;
}

function getRiskLevel(project: ProjectWithRelations) {
  const risks = project.risks || [];
  if (risks.length === 0) return { label: "Faible", value: 25 };

  const highRisks = risks.filter(
    (r) => r.impact === "ELEVE" || r.probability === "ELEVEE"
  ).length;
  const mediumRisks = risks.filter(
    (r) => r.impact === "MOYEN" || r.probability === "MOYENNE"
  ).length;

  if (highRisks > 2) return { label: "Critique", value: 100 };
  if (highRisks > 0) return { label: "Élevé", value: 75 };
  if (mediumRisks > 2) return { label: "Moyen", value: 50 };
  return { label: "Faible", value: 25 };
}
