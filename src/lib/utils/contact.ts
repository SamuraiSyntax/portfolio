import { Contact, ContactStatus, Priority } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";

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
    budget: prismaContact.budget ? Number(prismaContact.budget) : null,
    deadline: prismaContact.deadline,
    existingSite: prismaContact.existingSite,
    status: prismaContact.status as ContactStatus,
    priority: prismaContact.priority as Priority,
    clientType: prismaContact.clientType,
    industry: prismaContact.industry,
    companySize: prismaContact.companySize,
    annualRevenue: prismaContact.annualRevenue
      ? Number(prismaContact.annualRevenue)
      : null,
    preferredContactMethod: prismaContact.preferredContactMethod,
    lastContact: prismaContact.lastContact,
    nextFollowUp: prismaContact.nextFollowUp,
    createdAt: prismaContact.createdAt,
    updatedAt: prismaContact.updatedAt,
  };
}
