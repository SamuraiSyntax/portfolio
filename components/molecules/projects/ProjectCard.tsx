"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { decodeHTMLEntities, truncateText } from "@/lib/utils";
import { WPProject } from "@/types/wordpress";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: WPProject;
  color: string;
}

export function ProjectCard({ project, color = "muted" }: ProjectCardProps) {
  const router = useRouter();
  const imageUrl = project.project_meta?.featured_image || "/placeholder.jpg";
  const description =
    truncateText(project.project_meta?.description || "", 100) || "";
  const category = project.project_meta?.category || "";

  const categoryLabel =
    category === "web"
      ? "Site Web"
      : category === "app"
      ? "Application"
      : category === "design"
      ? "Design"
      : "Autre";

  const colorClass = color === "muted" ? "bg-background/50" : "bg-muted/50";
  const hoverColorClass = color === "muted" ? "bg-background" : "bg-muted";

  return (
    <Card
      className={`h-full w-full hover:shadow-lg transition-shadow flex flex-col ${colorClass} hover:${hoverColorClass} group/card`}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={project.title.rendered}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 h-full flex flex-col gap-4">
        {project.title.rendered && (
          <h3 className="text-xl font-semibold">
            {decodeHTMLEntities(project.title.rendered)}
          </h3>
        )}
        {project.project_meta?.technologies && (
          <div className="text-sm flex flex-wrap gap-2">
            {project.project_meta.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-background text-primary"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
        <div className="text-sm flex flex-wrap gap-2 flex-grow">
          {categoryLabel && (
            <p className="text-muted-foreground text-sm font-bold flex flex-wrap gap-2 flex-grow line-clamp-3 mt-auto">
              {categoryLabel}
            </p>
          )}
          {description && (
            <p className="text-muted-foreground text-sm flex flex-wrap gap-2 flex-grow line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        {project.project_meta?.url && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            En savoir plus
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
