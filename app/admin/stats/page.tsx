import { StatsCards } from "@/components/admin/dashboard/stats/stats-cards";
import { StatsChart } from "@/components/admin/stats/stats-chart";
import { StatsTable } from "@/components/admin/stats/stats-table";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/types/contact";

interface StatusCount {
  status: ContactStatus;
  _count: {
    _all: number;
  };
}

interface TimeSeriesData {
  date: string;
  count: number;
}

export default async function StatsPage() {
  // Récupération des statistiques globales
  const [stats, timeSeriesData] = await Promise.all([
    // Statistiques par statut
    prisma.contact.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
    // Données temporelles (30 derniers jours)
    prisma.$queryRaw<TimeSeriesData[]>`
      SELECT 
        DATE(DATE_TRUNC('day', "createdAt")) as date,
        COUNT(*) as count
      FROM "Contact"
      WHERE "createdAt" >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(DATE_TRUNC('day', "createdAt"))
      ORDER BY date ASC
    `,
  ]);

  // Fonction utilitaire pour obtenir le compte par statut
  const getStatusCount = (status: ContactStatus) => {
    const stat = (stats as StatusCount[]).find((s) => s.status === status);
    return stat ? stat._count._all : 0;
  };

  // Préparation des données pour les cartes de statistiques
  const statsData = {
    total: (stats as StatusCount[]).reduce(
      (acc: number, curr) => acc + curr._count._all,
      0
    ),
    new: getStatusCount(ContactStatus.NEW),
    inProgress: getStatusCount(ContactStatus.IN_PROGRESS),
    completed: getStatusCount(ContactStatus.COMPLETED),
    archived: getStatusCount(ContactStatus.ARCHIVED),
  };

  // Calcul des taux de conversion
  const conversionRates = {
    newToInProgress: (statsData.inProgress / (statsData.new || 1)) * 100,
    inProgressToCompleted:
      (statsData.completed / (statsData.inProgress || 1)) * 100,
    completedToArchived:
      (statsData.archived / (statsData.completed || 1)) * 100,
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
        <p className="text-muted-foreground">
          Analyse détaillée des messages et des conversions
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCards {...statsData} />
      </div>

      {/* Graphique d'évolution */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Évolution des messages</h3>
              <p className="text-sm text-muted-foreground">
                Nombre de messages reçus sur les 30 derniers jours
              </p>
              <StatsChart data={timeSeriesData} />
            </div>
          </div>
        </div>

        {/* Tableau des taux de conversion */}
        <div className="col-span-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Taux de conversion</h3>
              <StatsTable data={conversionRates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
