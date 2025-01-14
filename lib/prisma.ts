import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    connectionTimeout: 60000 as never,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
