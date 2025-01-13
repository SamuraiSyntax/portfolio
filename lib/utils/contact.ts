import { Contact, ContactStatus, Priority } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";

export function convertPrismaContactToContact(
  prismaContact: PrismaContact
): Contact {
  return {
    id: prismaContact.id,
    name: prismaContact.name,
    email: prismaContact.email,
    phone: prismaContact.phone ?? null,
    company: prismaContact.company ?? null,
    position: prismaContact.position ?? null,
    message: prismaContact.message,
    projectType: prismaContact.projectType ?? null,
    projectScope: prismaContact.projectScope ?? null,
    budget: prismaContact.budget ?? null,
    deadline: prismaContact.deadline ? new Date(prismaContact.deadline) : null,
    existingSite: prismaContact.existingSite ?? null,
    status: prismaContact.status as ContactStatus,
    priority: prismaContact.priority as Priority,
    tags: prismaContact.tags as string[],
    targetAudience: prismaContact.targetAudience ?? null,
    competitors: prismaContact.competitors as string[],
    objectives: prismaContact.objectives as string[],
    clientType: prismaContact.clientType ?? null,
    industry: prismaContact.industry ?? null,
    companySize: prismaContact.companySize ?? null,
    annualRevenue: prismaContact.annualRevenue ?? null,
    preferredContactMethod: prismaContact.preferredContactMethod ?? null,
    marketingSource: prismaContact.marketingSource ?? null,
    newsletter: prismaContact.newsletter ?? false,
    lastContact: prismaContact.lastContact
      ? new Date(prismaContact.lastContact)
      : null,
    nextFollowUp: prismaContact.nextFollowUp
      ? new Date(prismaContact.nextFollowUp)
      : null,
    notes: prismaContact.notes ?? null,
    assignedTo: prismaContact.assignedTo ?? null,
    attachments: prismaContact.attachments as string[],
    quotationAmount: prismaContact.quotationAmount ?? null,
    contractValue: prismaContact.contractValue ?? null,
    ipAddress: prismaContact.ipAddress ?? null,
    userAgent: prismaContact.userAgent ?? null,
    locale: prismaContact.locale ?? null,
    timezone: prismaContact.timezone ?? null,
    createdAt: prismaContact.createdAt,
    updatedAt: prismaContact.updatedAt,
  };
}
