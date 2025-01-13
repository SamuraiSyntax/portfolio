import { Prisma } from "@prisma/client";

export type PrismaContact = Prisma.ContactCreateInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
