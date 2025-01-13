import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type StatusStat = Prisma.ContactGetPayload<{
  select: {
    status: true;
    _count: {
      select: { _all: true };
    };
  };
}>;

type ClientTypeStat = Prisma.ContactGetPayload<{
  select: {
    clientType: true;
    _count: {
      select: { _all: true };
    };
  };
}>;

export default async function StatsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }

  const stats = await prisma.$transaction([
    // Total des contacts
    prisma.contact.count(),
    // Contacts par statut
    prisma.contact.groupBy({
      by: ["status"],
      _count: true,
      orderBy: {
        status: "asc",
      },
    }),
    // Contacts par type de client
    prisma.contact.groupBy({
      by: ["clientType"],
      _count: true,
      orderBy: {
        clientType: "asc",
      },
    }),
    // Moyenne des budgets
    prisma.contact.aggregate({
      _avg: {
        budget: true,
      },
      orderBy: {
        budget: "asc",
      },
    }),
  ]);

  const [totalContacts, statusStats, clientTypeStats, budgetStats] = stats;

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Par Statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(statusStats as StatusStat[]).map((stat) => (
                <div
                  key={stat.status}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{stat.status}</span>
                  <span className="font-bold">{stat._count._all || 0}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Par Type de Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(clientTypeStats as ClientTypeStat[]).map((stat) => (
                <div
                  key={stat.clientType || "Non spécifié"}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">
                    {stat.clientType || "Non spécifié"}
                  </span>
                  <span className="font-bold">{stat._count._all || 0}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Budget Moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {budgetStats._avg.budget
                ? `${Math.round(budgetStats._avg.budget)}€`
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
