import { StatsDisplay } from "@/components/logged-in/dashboard/stats/stats-display";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistiques - Administration",
  description: "Statistiques du tableau de bord",
};

async function getStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [totalContacts, recentContacts, contactsByStatus, contactsByPriority] =
    await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.contact.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.contact.groupBy({
        by: ["priority"],
        _count: true,
      }),
    ]);

  return {
    totalContacts,
    recentContacts,
    contactsByStatus: contactsByStatus.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.status]: curr._count,
      }),
      {} as Record<string, number>
    ),
    contactsByPriority: contactsByPriority.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.priority]: curr._count,
      }),
      {} as Record<string, number>
    ),
  };
}

export default async function StatsPage() {
  try {
    const stats = await getStats();
    return (
      <section className="container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
        <StatsDisplay stats={stats} />
      </section>
    );
  } catch (error) {
    return (
      <section className="container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des statistiques.</p>
        <p>{error instanceof Error ? error.message : "Erreur inconnue"}</p>
      </section>
    );
  }
}
