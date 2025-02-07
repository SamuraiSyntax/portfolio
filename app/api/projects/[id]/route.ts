import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { projectService } from "@/services/projectService";
import {
  PhaseStatus,
  Prisma,
  RiskImpact,
  RiskProbability,
} from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const project = await projectService.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_GET]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();

    // Nettoyage et formatage des données JSON
    const cleanJsonArray = (arr: string[] | null | undefined) => {
      if (!arr || !Array.isArray(arr)) return [];
      return arr
        .map((item) => {
          if (typeof item === "string") {
            try {
              const parsed = JSON.parse(item);
              return Array.isArray(parsed) ? parsed : item;
            } catch {
              return item;
            }
          }
          return item;
        })
        .flat()
        .filter(Boolean);
    };

    // Formatage des données pour Prisma
    const projectData: Prisma.ProjectUpdateInput = {
      name: data.name,
      client: {
        connect: {
          id: data.clientId,
        },
      },
      startDate: data.startDate,
      estimatedDeliveryDate: data.estimatedDeliveryDate,
      projectManager: data.projectManager,
      // Champs JSON avec nettoyage uniforme
      objectives: cleanJsonArray(data.objectives),
      scopeIncluded: cleanJsonArray(data.scopeIncluded),
      scopeExcluded: cleanJsonArray(data.scopeExcluded),
      // Convertir le tableau assumptions en chaîne de caractères
      assumptions: Array.isArray(data.assumptions)
        ? data.assumptions.join("\n")
        : data.assumptions || "",
      communicationMethods: data.communicationMethods
        ? cleanJsonArray(data.communicationMethods)
        : Prisma.JsonNull,
      nextSteps: data.nextSteps
        ? cleanJsonArray(data.nextSteps)
        : Prisma.JsonNull,
      validationCriteria: data.validationCriteria
        ? cleanJsonArray(data.validationCriteria)
        : Prisma.JsonNull,
      deliverables: data.deliverables
        ? cleanJsonArray(data.deliverables)
        : Prisma.JsonNull,
      kpis: data.kpis ? cleanJsonArray(data.kpis) : Prisma.JsonNull,
      targetAudience: data.targetAudience
        ? cleanJsonArray(data.targetAudience)
        : Prisma.JsonNull,
      technologies: data.technologies
        ? cleanJsonArray(data.technologies)
        : Prisma.JsonNull,
      validationSteps: data.validationSteps
        ? cleanJsonArray(data.validationSteps)
        : Prisma.JsonNull,
      // Champs texte
      budgetConstraints: data.budgetConstraints || "",
      technicalConstraints: data.technicalConstraints || "",
      context: data.context || "",
      legalConstraints: data.legalConstraints || "",
      integrationDetails: data.integrationDetails || "",
      securityMeasures: data.securityMeasures || "",
      contingencyPlan: data.contingencyPlan || "",
      productionUrl: data.productionUrl || "",
      phases: {
        deleteMany: {},
        create: data.phases || [],
      },
      risks: {
        deleteMany: {},
        create: data.risks || [],
      },
    };

    const project = await projectService.update(id, projectData);
    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof Error) {
      console.error("[PROJECT_PUT]", error.message);
    } else {
      console.error("[PROJECT_PUT]", "Une erreur inconnue s'est produite");
    }
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await projectService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();
    const { type } = data;

    let project;

    switch (type) {
      case "phase":
        const { phaseId, status } = data;
        project = await prisma.project.update({
          where: { id },
          data: {
            phases: {
              update: {
                where: { id: phaseId },
                data: { status: status as PhaseStatus },
              },
            },
          },
          include: {
            phases: true,
            client: true,
            risks: true,
          },
        });
        break;

      case "risk":
        const { riskId, impact, probability } = data;
        project = await prisma.project.update({
          where: { id },
          data: {
            risks: {
              update: {
                where: { id: riskId },
                data: {
                  ...(impact && { impact: impact as RiskImpact }),
                  ...(probability && {
                    probability: probability as RiskProbability,
                  }),
                },
              },
            },
          },
          include: {
            phases: true,
            client: true,
            risks: true,
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: "Type de mise à jour non reconnu" },
          { status: 400 }
        );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
