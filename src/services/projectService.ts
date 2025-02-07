import prisma from "@/lib/prisma";
import { convertDecimalToNumber } from "@/lib/utils";
import { Prisma } from "@prisma/client";

const defaultProjectInclude = {
  client: true,
  projectManagerUser: {
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

  async create(data: Prisma.ProjectCreateInput) {
    const project = await prisma.project.create({
      data,
      include: defaultProjectInclude,
    });
    return convertDecimalFields(project);
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
