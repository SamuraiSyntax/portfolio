"use client";

import { Badge } from "@/components/ui/badge";
import { BadgeWithLabel } from "@/components/ui/badge-with-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBudget, formatDate, getProjectStatusColor } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { Calendar, DollarSign, Target, Users } from "lucide-react";
import Link from "next/link";

interface RecentProjectsProps {
  projects: ProjectWithRelations[];
  isLoading?: boolean;
}

export function RecentProjects({ projects, isLoading }: RecentProjectsProps) {
  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Projets récents
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {projects.length} projets ce mois-ci
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 overflow-auto max-h-[350px]">
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="flex items-start gap-4 rounded-lg p-2 hover:bg-muted/50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${getProjectStatusColor(
                  project.status
                )}`}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                  {project.name}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  {project.budget && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>{formatBudget(Number(project.budget))}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end shrink-0">
                <BadgeWithLabel
                  value={project.status}
                  label="Statut"
                  useLabel={false}
                />

                {project.client && (
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {project.client.lastName} {project.client.firstName}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsSkeleton() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-2 w-2 rounded-full mt-2" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
