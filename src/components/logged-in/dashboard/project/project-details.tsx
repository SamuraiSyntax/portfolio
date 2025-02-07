"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Project } from "@/types/project";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="p-4 space-y-4 bg-muted/50">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Contexte</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.context || "Non renseigné"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectifs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              {(project.objectives as string[])?.map((objective, index) => (
                <li key={index}>{objective}</li>
              )) || <li>Aucun objectif défini</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.phases?.map((phase) => (
                <div key={phase.id} className="border-b pb-2">
                  <h4 className="font-medium">{phase.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                  </p>
                  <p className="text-sm">
                    Responsable: {phase.responsibleUser?.name || "Non assigné"}
                  </p>
                </div>
              )) || <p>Aucune phase définie</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.risks?.map((risk, index) => (
                <div key={index} className="border-b pb-2">
                  <p className="font-medium">{risk.description}</p>
                  <p className="text-sm">
                    Impact: {risk.impact} | Probabilité: {risk.probability}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Solution: {risk.solution}
                  </p>
                </div>
              )) || <p>Aucun risque identifié</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
