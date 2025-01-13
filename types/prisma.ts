import { Prisma } from "@prisma/client";

export type PrismaContact = Prisma.ContactGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    company: true;
    position: true;
    message: true;
    projectType: true;
    projectScope: true;
    budget: true;
    deadline: true;
    existingSite: true;
    status: true;
    priority: true;
    tags: true;
    targetAudience: true;
    competitors: true;
    objectives: true;
    clientType: true;
    industry: true;
    companySize: true;
    annualRevenue: true;
    preferredContactMethod: true;
    marketingSource: true;
    newsletter: true;
    lastContact: true;
    nextFollowUp: true;
    notes: true;
    assignedTo: true;
    attachments: true;
    quotationAmount: true;
    contractValue: true;
    ipAddress: true;
    userAgent: true;
    locale: true;
    timezone: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type ContactCreateInput = Prisma.ContactCreateInput;
export type ContactUpdateInput = Prisma.ContactUpdateInput;
