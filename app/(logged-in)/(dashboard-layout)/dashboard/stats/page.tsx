import { ChartBarDashboard } from "@/components/logged-in/dashboard/charts/ChartBar";
import { ChartBarProjects } from "@/components/logged-in/dashboard/charts/ChartBarProjects";
import { ChartLineConversion } from "@/components/logged-in/dashboard/charts/ChartLineConversion";
import { ChartPieStatus } from "@/components/logged-in/dashboard/charts/ChartPieStatus";
import { columns } from "@/components/logged-in/dashboard/stats/columns-client";
import { StatsCards } from "@/components/logged-in/dashboard/stats/stats-cards";
import { DataTable } from "@/components/logged-in/data-table/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { calculateConversionRates } from "@/lib/stats-utils";
import { ChartData } from "@/types/charts";
import { ContactStatus } from "@prisma/client";
import { AlertCircle, Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistiques - Administration",
  description: "Vue détaillée des statistiques et analyses",
};

interface MonthlyStats {
  createdAt: Date;
  _count: {
    _all: number;
  };
}

interface ConversionData {
  month: string;
  newToQualified: number;
  qualifiedToOpportunity: number;
  opportunityToWon: number;
}

export default async function StatsPage() {
  try {
    const [
      stats,
      monthlyStats,
      monthlyProjectStats,
      detailedContacts,
      conversionStats,
      statusDistribution,
    ] = await Promise.all([
      getStats(),
      getMonthlyStats(),
      getMonthlyProjectStats(),
      getDetailedContacts(),
      getConversionStats(),
      getStatusDistribution(),
    ]);

    const chartData = generateChartData(monthlyStats);
    const projectChartData = generateChartData(monthlyProjectStats);

    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Statistiques
            </h1>
            <p className="text-muted-foreground">
              Analyse détaillée des performances et métriques
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 derniers jours</SelectItem>
                <SelectItem value="30">30 derniers jours</SelectItem>
                <SelectItem value="90">90 derniers jours</SelectItem>
                <SelectItem value="365">Cette année</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatsCards {...stats} />
        </section>

        {/* Onglets pour les graphiques et tableaux */}
        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="charts">Graphiques</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <ChartBarDashboard
                chartData={chartData as unknown as ChartData[]}
              />
              <ChartBarProjects
                chartData={projectChartData as unknown as ChartData[]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ChartPieStatus data={statusDistribution} />
              <ChartLineConversion
                data={conversionStats as unknown as ConversionData[]}
              />
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Détails des contacts</CardTitle>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Lignes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 lignes</SelectItem>
                    <SelectItem value="20">20 lignes</SelectItem>
                    <SelectItem value="50">50 lignes</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={detailedContacts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors du chargement des statistiques.
          {error instanceof Error ? ` ${error.message}` : ""}
        </AlertDescription>
      </Alert>
    );
  }
}

async function getStats() {
  const stats = await prisma.contact.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });

  return {
    total: stats.reduce((acc, curr) => acc + curr._count._all, 0),
    new: stats.find((s) => s.status === ContactStatus.NEW)?._count._all || 0,
    inProgress:
      stats.find((s) => s.status === ContactStatus.IN_PROGRESS)?._count._all ||
      0,
    completed:
      stats.find((s) => s.status === ContactStatus.CONVERTED)?._count._all || 0,
    archived:
      stats.find((s) => s.status === ContactStatus.ARCHIVED)?._count._all || 0,
  };
}

async function getMonthlyStats() {
  const currentYear = new Date().getFullYear();
  return prisma.contact.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
    where: {
      createdAt: {
        gte: new Date(currentYear, 0, 1),
        lte: new Date(currentYear, 11, 31),
      },
    },
  });
}

async function getMonthlyProjectStats() {
  const currentYear = new Date().getFullYear();
  return prisma.project.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
    where: {
      createdAt: {
        gte: new Date(currentYear, 0, 1),
        lte: new Date(currentYear, 11, 31),
      },
    },
  });
}

async function getDetailedContacts() {
  return prisma.contact.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      priority: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}

function generateChartData(monthlyStats: MonthlyStats[]) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(new Date().getFullYear(), i, 1);
    return {
      month: date.toLocaleString("fr-FR", { month: "long" }),
      count: 0,
    };
  });

  monthlyStats.forEach((stat) => {
    const monthIndex = stat.createdAt.getMonth();
    months[monthIndex].count = stat._count._all;
  });

  return months;
}

async function getConversionStats() {
  const currentYear = new Date().getFullYear();
  const monthlyStats = await prisma.$transaction([
    // Nouveaux contacts
    prisma.contact.groupBy({
      by: ["createdAt"],
      where: {
        status: "NEW",
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lte: new Date(currentYear, 11, 31),
        },
      },
      _count: { _all: true },
      orderBy: [{ createdAt: "asc" }],
    }),
    // Contacts qualifiés
    prisma.contact.groupBy({
      by: ["createdAt"],
      where: {
        status: "QUALIFIED",
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lte: new Date(currentYear, 11, 31),
        },
      },
      _count: { _all: true },
      orderBy: [{ createdAt: "asc" }],
    }),
    // Opportunités
    prisma.contact.groupBy({
      by: ["createdAt"],
      where: {
        status: "OPPORTUNITY",
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lte: new Date(currentYear, 11, 31),
        },
      },
      _count: { _all: true },
      orderBy: [{ createdAt: "asc" }],
    }),
    // Gagnés
    prisma.contact.groupBy({
      by: ["createdAt"],
      where: {
        status: "WON",
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lte: new Date(currentYear, 11, 31),
        },
      },
      _count: { _all: true },
      orderBy: [{ createdAt: "asc" }],
    }),
  ]);

  // Créer un tableau avec tous les mois
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return {
      month: date.toLocaleString("fr-FR", { month: "long" }),
      new: 0,
      qualified: 0,
      opportunity: 0,
      won: 0,
    };
  });

  // Remplir les données pour chaque statut
  [
    monthlyStats[0], // NEW
    monthlyStats[1], // QUALIFIED
    monthlyStats[2], // OPPORTUNITY
    monthlyStats[3], // WON
  ].forEach((statGroup, index) => {
    statGroup.forEach((stat: any) => {
      const monthIndex = new Date(stat.createdAt).getMonth();
      switch (index) {
        case 0:
          months[monthIndex].new = stat._count._all;
          break;
        case 1:
          months[monthIndex].qualified = stat._count._all;
          break;
        case 2:
          months[monthIndex].opportunity = stat._count._all;
          break;
        case 3:
          months[monthIndex].won = stat._count._all;
          break;
      }
    });
  });

  return calculateConversionRates(months);
}

async function getStatusDistribution() {
  return prisma.contact.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });
}
