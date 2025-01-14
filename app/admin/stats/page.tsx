import { StatsDisplay } from "@/components/admin/dashboard/stats/stats-display";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistiques - Administration",
  description: "Statistiques du tableau de bord",
};

async function getStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const [
      totalContacts,
      recentContacts,
      contactsByStatus,
      contactsByPriority,
    ] = await Promise.all([
      // Total des contacts
      prisma.contact.count(),

      // Contacts des 30 derniers jours
      prisma.contact.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),

      // Contacts par status
      prisma.contact.groupBy({
        by: ["status"],
        _count: true,
      }),

      // Contacts par priorité
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
        {}
      ),
      contactsByPriority: contactsByPriority.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.priority]: curr._count,
        }),
        {}
      ),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}

export default async function StatsPage() {
  try {
    const stats = await getStats();

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
        <StatsDisplay stats={stats} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des statistiques.</p>
        <p>{error instanceof Error ? error.message : "Erreur inconnue"}</p>
      </div>
    );
  }
}
