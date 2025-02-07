import prisma from "@/lib/prisma";
import { JsonValue } from "@prisma/client/runtime/library";

interface FindRecentByEntityParams {
  entityType: string;
  entityId: string;
  contactId?: string;
  limit?: number;
}

export const activityLogService = {
  async findRecentByEntity({
    entityType,
    entityId,
    contactId,
    limit = 10,
  }: FindRecentByEntityParams) {
    return prisma.activityLog.findMany({
      where: {
        OR: [{ entityType, entityId }, ...(contactId ? [{ contactId }] : [])],
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  },

  async create(data: {
    action: string;
    entityType: string;
    entityId: string;
    userId?: string;
    contactId?: string;
    details?: JsonValue;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return prisma.activityLog.create({
      data: {
        ...data,
        details: data.details || undefined,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  },
};
