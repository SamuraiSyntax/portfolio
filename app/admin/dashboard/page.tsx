import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import { StatsCards } from "@/components/admin/dashboard/stats/stats-cards";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/types/contact";

interface StatusCount {
  status: ContactStatus;
  _count: {
    _all: number;
  };
}

export default async function DashboardPage() {
  const [contacts, stats] = await Promise.all([
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
  ]);

  const convertedContacts = contacts.map((contact) => ({
    ...contact,
    budget: contact.budget ? Number(contact.budget) : null,
    annualRevenue: contact.annualRevenue ? Number(contact.annualRevenue) : null,
    contractValue: contact.contractValue ? Number(contact.contractValue) : null,
    quotationAmount: contact.quotationAmount
      ? Number(contact.quotationAmount)
      : null,
    tags: contact.tags as string[],
    competitors: contact.competitors as string[],
    objectives: contact.objectives as string[],
    attachments: contact.attachments as string[],
  }));

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

  return (
    <div className="space-y-4 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCards {...statsData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Messages récents
          </h2>
          <p className="text-muted-foreground">
            Voici les 5 derniers messages reçus
          </p>
        </div>
      </div>

      <ContactTable contacts={convertedContacts} defaultView="recent" />
    </div>
  );
}
