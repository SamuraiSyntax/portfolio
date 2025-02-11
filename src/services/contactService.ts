import { prisma } from "@/lib/prisma";

export const contactService = {
  findAll: async () => {
    return prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
