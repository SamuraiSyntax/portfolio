import { Contact } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";
import {
  CONTACT_SOURCE_LABELS,
  CONTACT_STATUS_LABELS,
  PREFERRED_CONTACT_METHOD_LABELS,
  PRIORITY_LABELS,
} from "../constants/contact";

export function getEnumLabel(
  value: string | null | undefined,
  labels: Record<string, { label: string; variant: string }>
): string {
  if (!value) return "";
  return labels[value]?.label || value;
}

export function convertPrismaContactToContact(
  prismaContact: PrismaContact
): Contact {
  return {
    id: prismaContact.id,
    name: `${prismaContact.firstName} ${prismaContact.lastName}`,
    firstName: prismaContact.firstName,
    lastName: prismaContact.lastName,
    email: prismaContact.email,
    phone: prismaContact.phone,
    mobilePhone: prismaContact.mobilePhone,
    company: prismaContact.company,
    position: prismaContact.position,
    message: prismaContact.message,
    projectType: prismaContact.projectType,
    budget: prismaContact.budget ? Number(prismaContact.budget) : null,
    deadline: prismaContact.deadline,
    existingSite: prismaContact.existingSite,
    status: prismaContact.status,
    statusLabel: getEnumLabel(prismaContact.status, CONTACT_STATUS_LABELS),
    priority: prismaContact.priority,
    priorityLabel: getEnumLabel(prismaContact.priority, PRIORITY_LABELS),
    source: prismaContact.source,
    sourceLabel: getEnumLabel(prismaContact.source, CONTACT_SOURCE_LABELS),
    clientType: prismaContact.clientType,
    industry: prismaContact.industry,
    companySize: prismaContact.companySize,
    annualRevenue: prismaContact.annualRevenue
      ? Number(prismaContact.annualRevenue)
      : null,
    preferredContactMethod: prismaContact.preferredContactMethod,
    preferredContactMethodLabel: getEnumLabel(
      prismaContact.preferredContactMethod,
      PREFERRED_CONTACT_METHOD_LABELS
    ),
    nextFollowUp: prismaContact.nextFollowUp,
    marketingSource: prismaContact.marketingSource,
    newsletter: prismaContact.newsletter,
    locale: prismaContact.locale,
    timezone: prismaContact.timezone,
    projectScope: prismaContact.projectScope,
    targetAudience: prismaContact.targetAudience,
    quotationAmount: prismaContact.quotationAmount
      ? Number(prismaContact.quotationAmount)
      : null,
    contractValue: prismaContact.contractValue
      ? Number(prismaContact.contractValue)
      : null,
    createdAt: prismaContact.createdAt,
    updatedAt: prismaContact.updatedAt,
    assignedUserId: prismaContact.assignedUserId,
  };
}
