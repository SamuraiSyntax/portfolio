import { Prisma, Contact as PrismaContactModel } from "@prisma/client";

export type PrismaContact = PrismaContactModel & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  competitors: string[];
  objectives: string[];
  attachments: string[];
};

export type ContactCreateInput = Prisma.ContactCreateInput;
export type ContactUpdateInput = Prisma.ContactUpdateInput;
