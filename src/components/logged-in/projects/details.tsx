"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Project } from "@/types/project";
import { Prisma } from "@prisma/client";

interface ProjectDetailsProps {
  project: Project;
}

// Fonction utilitaire pour convertir le JSON en tableau de chaînes
const jsonToStringArray = (jsonValue: Prisma.JsonArray): string[] => {
  if (!jsonValue) return [];
  if (Array.isArray(jsonValue)) {
    return jsonValue.filter((item): item is string => typeof item === "string");
  }
  if (typeof jsonValue === "string") {
    try {
      const parsed = JSON.parse(jsonValue);
      return Array.isArray(parsed) ? parsed : [jsonValue];
    } catch {
      return [jsonValue];
    }
  }
  return [];
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="p-4 space-y-4 bg-muted/50">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Budget:</span>{" "}
              {project.budget
                ? formatCurrency(Number(project.budget))
                : "Non défini"}
            </div>
            <div>
              <span className="font-medium">Chef de projet:</span>{" "}
              {project.projectManagerUser?.name || "Non assigné"}
            </div>
            <div>
              <span className="font-medium">Technologies:</span>{" "}
              {project.technologies?.join(", ") || "Non définies"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contexte et contraintes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Contexte:</span>
              <p>{project.context || "Non renseigné"}</p>
            </div>
            <div>
              <span className="font-medium">Contraintes budgétaires:</span>
              <p>{project.budgetConstraints || "Non renseignées"}</p>
            </div>
            <div>
              <span className="font-medium">Contraintes techniques:</span>
              <p>{project.technicalConstraints || "Non renseignées"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Objectifs et périmètre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Objectifs:</h4>
                <ul className="list-disc pl-4">
                  {jsonToStringArray(
                    project.objectives as Prisma.JsonArray
                  ).map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Inclus dans le périmètre:</h4>
                <ul className="list-disc pl-4">
                  {jsonToStringArray(
                    project.scopeIncluded as Prisma.JsonArray
                  ).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Exclus du périmètre:</h4>
                <ul className="list-disc pl-4">
                  {jsonToStringArray(
                    project.scopeExcluded as Prisma.JsonArray
                  ).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phases et risques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Phases:</h4>
                <div className="space-y-2">
                  {project.phases?.map((phase) => (
                    <div key={phase.id} className="border-b pb-2">
                      <h5 className="font-medium">{phase.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(phase.startDate)} -{" "}
                        {formatDate(phase.endDate)}
                      </p>
                      <p className="text-sm">
                        Responsable:{" "}
                        {phase.responsibleUser?.name || "Non assigné"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Risques:</h4>
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
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
