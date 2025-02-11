import prisma from "@/lib/prisma";
import { convertDecimalToNumber } from "@/lib/utils";
import { Prisma } from "@prisma/client";

const defaultProjectInclude = {
  client: true,
  projectManager: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  },
  phases: {
    include: {
      responsibleUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      startDate: "asc" as const,
    },
  },
  risks: {
    orderBy: [{ probability: "desc" as const }, { impact: "desc" as const }],
  },
} satisfies Prisma.ProjectInclude;

const convertDecimalFields = (project: any) => {
  if (!project) return project;

  // Convertir les champs Decimal du projet
  if (project.budget) {
    project.budget = convertDecimalToNumber(project.budget);
  }

  // Convertir les champs Decimal du client
  if (project.client) {
    if (project.client.annualRevenue) {
      project.client.annualRevenue = convertDecimalToNumber(
        project.client.annualRevenue
      );
    }
    if (project.client.budget) {
      project.client.budget = convertDecimalToNumber(project.client.budget);
    }
    if (project.client.contractValue) {
      project.client.contractValue = convertDecimalToNumber(
        project.client.contractValue
      );
    }
    if (project.client.quotationAmount) {
      project.client.quotationAmount = convertDecimalToNumber(
        project.client.quotationAmount
      );
    }
  }

  return project;
};

const formatProjectDataForCreate = (data: any) => {
  return {
    name: data.name,
    client: {
      connect: {
        id: data.clientId,
      },
    },
    projectManager: {
      connect: {
        id: data.projectManagerId,
      },
    },
    startDate: data.startDate,
    estimatedDeliveryDate: data.estimatedDeliveryDate,
    context: data.context || "",
    objectives: data.objectives || [],
    targetAudience: data.targetAudience || [],
    kpis: data.kpis || [],
    scopeIncluded: data.scopeIncluded || [],
    scopeExcluded: data.scopeExcluded || [],
    budgetConstraints: data.budgetConstraints || "",
    technicalConstraints: data.technicalConstraints || "",
    assumptions: data.assumptions || [],
    phases: {
      create:
        data.phases?.map((phase: any) => ({
          name: phase.name,
          startDate: phase.startDate,
          endDate: phase.endDate,
          status: "NOT_STARTED",
          responsible: phase.responsible,
        })) || [],
    },
    risks: {
      create:
        data.risks?.map((risk: any) => ({
          description: risk.description,
          probability:
            risk.probability === "Élevée"
              ? "ELEVEE"
              : risk.probability === "Moyenne"
              ? "MOYENNE"
              : "FAIBLE",
          impact:
            risk.impact === "Élevé"
              ? "ELEVE"
              : risk.impact === "Moyen"
              ? "MOYEN"
              : "FAIBLE",
          solution: risk.solution,
        })) || [],
    },
    technologies: data.technologies || [],
    validationCriteria: data.validationCriteria || [],
    communicationMethods: data.communicationMethods || [],
    nextSteps: data.nextSteps || [],
    validationSteps: data.validationSteps || [],
    deliverables: data.deliverables || [],
    securityMeasures: data.securityMeasures || "",
    contingencyPlan: data.contingencyPlan || "",
    productionUrl: data.productionUrl || "",
    integrationDetails: data.integrationDetails || "",
  };
};

export const projectService = {
  async findAll(include = defaultProjectInclude) {
    const projects = await prisma.project.findMany({
      include,
      orderBy: { createdAt: "desc" },
    });
    return projects.map(convertDecimalFields);
  },

  async findById(id: string, include = defaultProjectInclude) {
    const project = await prisma.project.findUnique({
      where: { id },
      include,
    });
    return convertDecimalFields(project);
  },

  async create(data: any) {
    const formattedData = formatProjectDataForCreate(data);
    return await prisma.project.create({
      data: formattedData,
      include: defaultProjectInclude,
    });
  },

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    const project = await prisma.project.update({
      where: { id },
      data,
      include: defaultProjectInclude,
    });
    return convertDecimalFields(project);
  },

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  },

  async findByClientId(clientId: string) {
    const projects = await prisma.project.findMany({
      where: { clientId },
      include: defaultProjectInclude,
    });
    return projects.map(convertDecimalFields);
  },

  async findNameById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      select: { name: true },
    });
  },
};
