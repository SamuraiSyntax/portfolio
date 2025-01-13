import { Contact, ContactStatus, Priority } from "@/types/contact";
import { Prisma } from "@prisma/client";

type PrismaContact = Prisma.ContactGetPayload<object>;

export function convertPrismaContactToContact(
  prismaContact: PrismaContact
): Contact {
  return {
    ...prismaContact,
    status: prismaContact.status as ContactStatus,
    priority: prismaContact.priority as Priority,
    tags: prismaContact.tags as string[],
    competitors: prismaContact.competitors as string[],
    objectives: prismaContact.objectives as string[],
    attachments: prismaContact.attachments as string[],
  };
}
