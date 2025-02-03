import { ChartBarDashboard } from "@/components/admin/dashboard/charts/ChartBar";
import { RecentClients } from "@/components/admin/dashboard/RecentClients";
import { StatsCards } from "@/components/admin/dashboard/stats/stats-cards";

import prisma from "@/lib/prisma";
import { Contact, ContactStatus } from "@/types/contact";

interface StatusCount {
  status: ContactStatus;
  _count: {
    _all: number;
  };
}

export default async function DashboardPage() {
  const [contacts, stats, monthlyStats] = await Promise.all([
    prisma.contact.findMany({
      where: {
        status: {
          not: ContactStatus.ARCHIVED,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.contact.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
    prisma.contact.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const getStatusCount = (status: ContactStatus) => {
    const stat = (stats as StatusCount[]).find((s) => s.status === status);
    return stat ? stat._count._all : 0;
  };

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

  const allMonths = Array.from({ length: 12 }, (_, i) => {
    return new Date(new Date().getFullYear(), i, 1);
  });

  const chartData = allMonths.map((month) => {
    const monthString = new Intl.DateTimeFormat("fr-FR", {
      month: "short",
    }).format(month);
    const stat = monthlyStats.find(
      (stat) => new Date(stat.createdAt).getMonth() === month.getMonth()
    );

    return {
      month: monthString,
      clients: stat ? stat._count._all : 0,
    };
  });

  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <section className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatsCards {...statsData} />
      </section>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <ChartBarDashboard chartData={chartData} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <RecentClients contacts={contacts as Contact[]} />
        </div>
      </section>
    </div>
  );
}
