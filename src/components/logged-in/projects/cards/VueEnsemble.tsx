import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatBudget,
  formatDate,
  formatTimeRemaining,
  jsonToStringArray,
} from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { ActivityLog } from "@prisma/client";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useMemo } from "react";
import { PhasesCardVueEnsemble } from "./PhaseCard";

export function VueEnsemble({
  project,
  recentActivities,
}: {
  project: ProjectWithRelations;
  recentActivities: ActivityLog[];
}) {
  const objectives = useMemo(
    () => jsonToStringArray(project.objectives),
    [project.objectives]
  );

  const budget = formatBudget(Number(project.client.budget));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Résumé du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Client</span>
                <span className="font-medium">{project.client.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">
                  {budget ? budget : "À définir"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date de livraison</span>
                <span className="font-medium">
                  {formatDate(project.estimatedDeliveryDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Temps restant</span>
                <span className="font-medium">
                  {formatTimeRemaining(project.estimatedDeliveryDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <PhasesCardVueEnsemble project={project} />

        <Card>
          <CardHeader>
            <CardTitle>Objectifs principaux</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {objectives.slice(0, 3).map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
              {objectives.length > 3 && (
                <Button variant="link" className="p-0">
                  Voir les {objectives.length - 3} autres objectifs
                </Button>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risques critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.risks
                ?.filter((risk) => risk.impact === "ELEVE")
                .slice(0, 3)
                .map((risk, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {risk.description}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
