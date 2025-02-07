import { ChartBarDashboard } from "@/components/logged-in/dashboard/charts/ChartBar";
import { RecentClients } from "@/components/logged-in/dashboard/RecentClients";
import { StatsCards } from "@/components/logged-in/dashboard/stats/stats-cards";
import prisma from "@/lib/prisma";
import { ChartData } from "@/types/charts";
import { Contact } from "@/types/contact";

interface MonthlyStats {
  createdAt: Date;
  _count: {
    _all: number;
  };
}

export default async function DashboardPage() {
  const statsData = await getStats();
  const contacts = await getRecentContacts();
  const monthlyStats = await getMonthlyStats();

  const chartData = generateChartData(monthlyStats);

  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4">
      <section className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatsCards {...statsData} />
      </section>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <ChartBarDashboard chartData={chartData as unknown as ChartData[]} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <RecentClients contacts={contacts as Contact[]} />
        </div>
      </section>
    </div>
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
    new: stats.find((s) => s.status === "NEW")?._count._all || 0,
    inProgress: stats.find((s) => s.status === "IN_PROGRESS")?._count._all || 0,
    completed: stats.find((s) => s.status === "COMPLETED")?._count._all || 0,
    archived: stats.find((s) => s.status === "ARCHIVED")?._count._all || 0,
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
  const chartData = monthlyStats.map((stat) => ({
    month: stat.createdAt.toLocaleString("default", { month: "long" }),
    count: stat._count._all,
  }));

  return chartData;
}
