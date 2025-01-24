"use client";

import { Button } from "@/components/ui/button";
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

export function ProjectPreviewCard({
  project,
  color = "muted",
}: {
  project: WPProject;
  color: string;
}) {
  const colorClass = color === "muted" ? "bg-background/50" : "bg-muted/50";
  const hoverColorClass = color === "muted" ? "bg-background" : "bg-muted";

  const btnColorClass = color === "muted" ? "bg-muted" : "bg-background";
  const btnHoverColorClass = color === "muted" ? "bg-primary" : "bg-primary";

  return (
    <Card
      className={`h-full w-full hover:shadow-lg transition-shadow flex flex-col ${colorClass} hover:${hoverColorClass} group/card`}
    >
      <CardHeader className="p-0">
        {project.project_meta.featured_image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={project.project_meta.featured_image}
              alt={decodeHTMLEntities(project.title.rendered)}
              fill
              className="object-cover transition-transform duration-300 group-hover/card:scale-110"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {project.title.rendered && (
          <h3 className="text-xl font-bold mb-2">
            {decodeHTMLEntities(project.title.rendered)}
          </h3>
        )}
        {project.project_meta.description && (
          <p className="text-sm text-muted-foreground">
            {decodeHTMLEntities(project.project_meta.description)}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Link href={`/projects/${project.slug}`} className="w-full">
          <Button
            variant="ghost"
            className={`w-full ${btnColorClass} hover:${btnHoverColorClass} text-primary hover:text-white`}
          >
            En savoir plus
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
