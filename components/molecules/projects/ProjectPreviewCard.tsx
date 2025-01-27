"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProjectIcon } from "@/lib/icons";
import { decodeHTMLEntities } from "@/lib/utils";
import { WPProject } from "@/types/wordpress";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function ProjectPreviewCard({
  project,
  color = "muted",
}: {
  project: WPProject;
  color: string;
}) {
  const colorClass = color === "muted" ? "bg-background" : "bg-muted";
  const title = decodeHTMLEntities(project.title.rendered);
  const description = decodeHTMLEntities(project.project_meta.description);
  const IconComponent = getProjectIcon(project.project_meta.icon);

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, translateY: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full group"
      >
        <Card
          className={`h-full ${colorClass} hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary relative overflow-hidden cursor-pointer flex flex-col`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <CardHeader className="space-y-4 mb-3 h-[75px]">
            <div className="relative flex items-center justify-between gap-4">
              {" "}
              <div className="text-primary p-4 bg-background rounded-2xl transform group-hover:scale-110 transition-transform duration-300">
                {project.project_meta.icon.startsWith("http") ? (
                  <Image
                    src={project.project_meta.icon}
                    alt={title}
                    className="w-full h-full object-cover rounded-full"
                    fill
                    loading="lazy"
                  />
                ) : (
                  <IconComponent className="w-24 h-24 stroke-[1.5]" />
                )}
              </div>
              <div className="space-y-2 grow flex flex-col justify-center my-auto">
                <h3 className="h3 font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 flex-grow justify-start">
            {project.project_meta.featured_image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={project.project_meta.featured_image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          </CardContent>

          <CardFooter className="mt-auto flex-shrink-0">
            <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform duration-300">
              <span className="text-sm font-medium">Découvrir ce projet</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
