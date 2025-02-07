import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { ProjectPhase, ProjectWithRelations } from "@/types/project";
import { PhaseStatus } from "@prisma/client";
import { Calendar, Clock, Target, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Ajoutez cette interface pour définir les statuts possibles
const PHASE_STATUSES = [
  { value: "NOT_STARTED", label: "Non démarré" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "COMPLETED", label: "Terminé" },
  { value: "BLOCKED", label: "Bloqué" },
  { value: "ON_HOLD", label: "En pause" },
] as const;

// Ajoutez cet objet pour les libellés des statuts
const PHASE_STATUS_LABELS: Record<PhaseStatus, string> = {
  NOT_STARTED: "Non démarré",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminé",
  BLOCKED: "Bloqué",
  ON_HOLD: "En pause",
};

// Ajoutez ces styles CSS dans votre fichier global.css ou dans un module CSS
const progressStyles = {
  inProgress: "animate-progress-stripes bg-primary/75",
  blocked: "bg-destructive",
  onHold: "bg-gray-500 progress-striped",
  completed: "bg-green-500",
};

function getPhaseProgress(status: PhaseStatus): number {
  switch (status) {
    case "COMPLETED":
      return 100;
    case "IN_PROGRESS":
      return 33;
    case "BLOCKED":
      return 50;
    case "ON_HOLD":
      return 33;
    case "NOT_STARTED":
    default:
      return 0;
  }
}

// Ajoutez cette fonction utilitaire pour obtenir la variante du badge en fonction du statut
const getPhaseStatusBadgeVariant = (status: PhaseStatus) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
      return "default";
    case "BLOCKED":
      return "destructive";
    case "ON_HOLD":
      return "warning";
    case "NOT_STARTED":
    default:
      return "secondary";
  }
};

export function PhaseCard({
  phase,
  totalPhases,
  phaseNumber,
}: {
  phase: ProjectPhase;
  totalPhases: number;
  phaseNumber: number;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/projects/${phase.projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "phase",
          phaseId: phase.id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }

      toast.success("Statut de la phase mis à jour avec succès");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setIsUpdating(false);
    }
  };

  const getProgressStyle = (status: PhaseStatus) => {
    switch (status) {
      case "IN_PROGRESS":
        return progressStyles.inProgress;
      case "BLOCKED":
        return progressStyles.blocked;
      case "ON_HOLD":
        return progressStyles.onHold;
      case "COMPLETED":
        return progressStyles.completed;
      default:
        return "bg-muted";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Phase {phaseNumber}/{totalPhases}
              </Badge>
              <h3 className="font-semibold">{phase.name}</h3>
            </div>
            <Progress
              value={getPhaseProgress(phase.status)}
              className={`h-2 mt-2`}
              classNameIndicator={getProgressStyle(phase.status)}
            />
          </div>
          <Select
            defaultValue={phase.status}
            onValueChange={handleStatusChange}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PHASE_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getPhaseStatusBadgeVariant(
                        status.value as PhaseStatus
                      )}
                      className="pointer-events-none"
                    >
                      {PHASE_STATUS_LABELS[status.value as PhaseStatus]}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-muted-foreground mb-4">{phase.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Début: {formatDate(phase.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Fin: {formatDate(phase.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Équipe: {phase.team || "Non assignée"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Objectifs: {phase.objectives?.length || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PhasesCardVueEnsemble({
  project,
}: {
  project: ProjectWithRelations;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression des phases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {project.phases?.map((phase, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{phase.name}</span>
                <Badge variant={getPhaseStatusBadgeVariant(phase.status)}>
                  {PHASE_STATUS_LABELS[phase.status]}
                </Badge>
              </div>
              <Progress
                value={getPhaseProgress(phase.status)}
                className="h-2"
                classNameIndicator={
                  phase.status === "IN_PROGRESS"
                    ? progressStyles.inProgress
                    : phase.status === "BLOCKED"
                    ? progressStyles.blocked
                    : phase.status === "ON_HOLD"
                    ? progressStyles.onHold
                    : phase.status === "COMPLETED"
                    ? progressStyles.completed
                    : "bg-muted"
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
