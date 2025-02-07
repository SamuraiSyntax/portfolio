import { auth } from "@/lib/auth/helper";
import { projectService } from "@/services/projectService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const projects = await projectService.findAll();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();

    // Formatage des données pour Prisma
    const projectData = {
      ...data,
      // Conversion explicite en Prisma.JsonArray pour les champs JSON
      assumptions: data.assumptions,
      objectives: data.objectives,
      scopeIncluded: data.scopeIncluded,
      scopeExcluded: data.scopeExcluded,
      technologies: data.technologies,
      targetAudience: data.targetAudience,
      kpis: data.kpis,
      deliverables: data.deliverables,
      validationSteps: data.validationSteps,
      communicationMethods: data.communicationMethods,
      nextSteps: data.nextSteps,
      validationCriteria: data.validationCriteria,
    };

    const project = await projectService.create(projectData);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_POST]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
