import { Contact, ContactStatus, Priority } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export function convertPrismaContactToContact(
  prismaContact: PrismaContact
): Contact {
  return {
    id: prismaContact.id,
    name: prismaContact.name,
    email: prismaContact.email,
    phone: prismaContact.phone,
    company: prismaContact.company,
    position: prismaContact.position,
    message: prismaContact.message,
    projectType: prismaContact.projectType,
    projectScope: prismaContact.projectScope,
    budget: prismaContact.budget as Decimal | null,
    deadline: prismaContact.deadline,
    existingSite: prismaContact.existingSite,
    status: prismaContact.status as ContactStatus,
    priority: prismaContact.priority as Priority,
    tags: (prismaContact.tags as string[]) || [],
    targetAudience: prismaContact.targetAudience as string | null,
    competitors: (prismaContact.competitors as string[]) || [],
    objectives: (prismaContact.objectives as string[]) || [],
    clientType: prismaContact.clientType,
    industry: prismaContact.industry,
    companySize: prismaContact.companySize,
    annualRevenue: prismaContact.annualRevenue
      ? Number(prismaContact.annualRevenue)
      : null,
    preferredContactMethod: prismaContact.preferredContactMethod,
    marketingSource: prismaContact.marketingSource,
    newsletter: prismaContact.newsletter as boolean,
    lastContact: prismaContact.lastContact,
    nextFollowUp: prismaContact.nextFollowUp,
    notes: prismaContact.notes,
    assignedTo: prismaContact.assignedTo,
    attachments: (prismaContact.attachments as string[]) || [],
    quotationAmount: prismaContact.quotationAmount
      ? Number(prismaContact.quotationAmount)
      : null,
    contractValue: prismaContact.contractValue
      ? Number(prismaContact.contractValue)
      : null,
    ipAddress: prismaContact.ipAddress,
    userAgent: prismaContact.userAgent,
    locale: prismaContact.locale,
    timezone: prismaContact.timezone,
    createdAt: prismaContact.createdAt,
    updatedAt: prismaContact.updatedAt,
  };
}
