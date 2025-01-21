"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { decodeHTMLEntities } from "@/lib/utils";
import { WPProject } from "@/types/wordpress";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: WPProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.project_meta?.featured_image || "/placeholder.jpg";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow group overflow-hidden bg-background/50 hover:bg-background backdrop-blur-sm">
      <CardHeader className="p-0 hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={project.title.rendered}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg transition-all duration-300 ease-in-out"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {decodeHTMLEntities(project.title.rendered)}
        </h3>
        <div className="text-sm text-muted-foreground mb-4">
          <span>{project.project_meta?.date}</span>
        </div>
        <div
          className="text-muted-foreground mb-4"
          dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        />
        <div className="flex flex-wrap gap-2">
          {project.project_meta?.technologies?.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-4">
        {project.project_meta?.url && (
          <Link
            href={project.project_meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Voir le projet →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
