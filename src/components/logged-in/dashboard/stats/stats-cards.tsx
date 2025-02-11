import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, CheckCircle, Clock, UserPlus, Users } from "lucide-react";

interface StatsCardsProps {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  archived: number;
}

export function StatsCards({
  total,
  new: newCount,
  inProgress,
  completed,
  archived,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total",
      value: total,
      icon: Users,
      description: "contacts",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Nouveaux",
      value: newCount,
      icon: UserPlus,
      description: "ce mois",
      trend: "+4.5%",
      trendUp: true,
    },
    {
      title: "En cours",
      value: inProgress,
      icon: Clock,
      description: "en traitement",
      trend: "-2.5%",
      trendUp: false,
    },
    {
      title: "Complétés",
      value: completed,
      icon: CheckCircle,
      description: "finalisés",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Archivés",
      value: archived,
      icon: Archive,
      description: "inactifs",
      trend: "+0.8%",
      trendUp: true,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div
                className={`text-xs ${
                  stat.trendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend} depuis le mois dernier
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
