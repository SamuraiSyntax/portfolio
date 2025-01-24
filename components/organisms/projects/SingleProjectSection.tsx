"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { NavigationCard } from "@/components/molecules/NavigationCard";
import { Button } from "@/components/ui/button";
import { decodeHTMLEntities } from "@/lib/utils";
import { WPProject } from "@/types/wordpress";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

interface SingleProjectSectionProps {
  project: WPProject;
  previous: WPProject;
  next: WPProject;
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
}

export function SingleProjectSection({
  project,
  previous,
  next,
  color = "muted",
  waveType = "type1",
  zIndex = 0,
}: SingleProjectSectionProps) {
  const navigation = [
    {
      service: previous,
      label: "Projet précédent",
      icon: FaArrowLeft,
      type: "previous",
    },
    {
      service: next,
      label: "Projet suivant",
      icon: FaArrowRight,
      type: "next",
    },
  ];

  return (
    <section
      id="projets"
      className={`relative md:sticky md:top-0 min-h-screen bg-${color} transition-colors duration-300 ease-in-out`}
      style={{ zIndex }}
    >
      <SectionDivider color={color} waveType={waveType} zIndex={zIndex} />

      <div className="container mx-auto px-4 py-6 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Navigation */}
        <div className="col-span-2 grid grid-cols-2 gap-3 md:gap-6">
          {navigation.map((item) => (
            <NavigationCard
              key={item.service.id}
              href={`/projects/${item.service.slug}`}
              label={item.label}
              title={decodeHTMLEntities(item.service.title.rendered)}
              icon={item.icon}
              type={item.type as "previous" | "next"}
            />
          ))}
        </div>

        {/* Colonne de gauche */}
        {project.project_meta.featured_image && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-1 group relative w-full my-auto aspect-video rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Image
              src={project.project_meta.featured_image}
              alt={project.title.rendered}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        )}

        {/* Colonne de droite */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-2 md:col-span-1 bg-card p-4 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3"
        >
          <h3 className="text-xl font-semibold">Détails techniques</h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Technologies utilisées
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.project_meta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Date de réalisation
              </h4>
              <p className="text-sm font-medium">{project.project_meta.date}</p>
            </div>

            {project.project_meta.url && (
              <Link
                href={project.project_meta.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full group hover:scale-102 transition-transform duration-200"
                  size="lg"
                >
                  Voir le projet en ligne
                  <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        {project.content.rendered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-2"
          >
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-base prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: project.content.rendered }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
