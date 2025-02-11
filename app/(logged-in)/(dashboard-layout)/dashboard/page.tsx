import { ChartBarDashboard } from "@/components/logged-in/dashboard/charts/ChartBar";
import { ChartBarProjects } from "@/components/logged-in/dashboard/charts/ChartBarProjects";
import { RecentClients } from "@/components/logged-in/dashboard/RecentClients";
import { RecentProjects } from "@/components/logged-in/dashboard/RecentProjects";
import { StatsCards } from "@/components/logged-in/dashboard/stats/stats-cards";
import prisma from "@/lib/prisma";
import { ChartData } from "@/types/charts";
import { Contact, ContactStatus } from "@/types/contact";
import { ProjectWithRelations } from "@/types/project";

interface MonthlyStats {
  createdAt: Date;
  _count: {
    _all: number;
  };
}

export default async function DashboardPage() {
  const statsData = await getStats();
  const contacts = await getRecentContacts();
  const projects = await getRecentProjects();
  const monthlyStats = await getMonthlyStats();
  const monthlyProjectStats = await getMonthlyProjectStats();
  const chartData = generateChartData(monthlyStats);
  const projectChartData = generateChartData(monthlyProjectStats);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre activité
        </p>
      </div>

      <section className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatsCards {...statsData} />
      </section>

      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-h-[400px]">
        <ChartBarDashboard chartData={chartData as unknown as ChartData[]} />
        <ChartBarProjects
          chartData={projectChartData as unknown as ChartData[]}
        />
      </section>

      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-h-[400px]">
        <RecentClients contacts={contacts as Contact[]} />
        <RecentProjects
          projects={projects as unknown as ProjectWithRelations[]}
        />
      </section>
    </>
  );
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
    new:
      stats.find((s) => s.status === ("NEW" as ContactStatus))?._count._all ||
      0,
    inProgress:
      stats.find((s) => s.status === ("IN_PROGRESS" as ContactStatus))?._count
        ._all || 0,
    completed:
      stats.find((s) => s.status === ("COMPLETED" as ContactStatus))?._count
        ._all || 0,

    archived:
      stats.find((s) => s.status === ("ARCHIVED" as ContactStatus))?._count
        ._all || 0,
  };
}

async function getRecentContacts() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return contacts;
}

async function getMonthlyStats() {
  const currentYear = new Date().getFullYear();
  const monthlyStats = await prisma.contact.groupBy({
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

  return monthlyStats;
}

function generateChartData(monthlyStats: MonthlyStats[]) {
  // Créer un tableau avec tous les mois de l'année
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(new Date().getFullYear(), i, 1);
    return {
      month: date.toLocaleString("default", { month: "long" }),
      count: 0,
    };
  });

  // Mettre à jour les compteurs pour les mois avec des données
  monthlyStats.forEach((stat) => {
    const monthIndex = stat.createdAt.getMonth();
    months[monthIndex].count = stat._count._all;
  });

  return months;
}

async function getRecentProjects() {
  const projects = await prisma.project.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: true,
      phases: true,
      projectManager: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  // Convertir les valeurs Decimal en nombres
  return projects.map((project) => ({
    ...project,
    budget: project.budget ? Number(project.budget.toString()) : null,
    client: project.client
      ? {
          ...project.client,
          budget: project.client.budget
            ? Number(project.client.budget.toString())
            : null,
          annualRevenue: project.client.annualRevenue
            ? Number(project.client.annualRevenue.toString())
            : null,
          contractValue: project.client.contractValue
            ? Number(project.client.contractValue.toString())
            : null,
          quotationAmount: project.client.quotationAmount
            ? Number(project.client.quotationAmount.toString())
            : null,
        }
      : null,
  }));
}

async function getMonthlyProjectStats() {
  const currentYear = new Date().getFullYear();
  const monthlyStats = await prisma.project.groupBy({
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

  return monthlyStats;
}
