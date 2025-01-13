"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PROJECTS } from "@/lib/constants/projects";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaExternalLinkAlt, FaFilter, FaGithub } from "react-icons/fa";
import { DialogTitle } from "../../ui/dialog";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = "client" | "formation" | "personnel" | "all";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>("all");

  // Trier les projets du plus récent au plus ancien
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const yearA = parseInt(a.period.split("-")[1] || a.period);
    const yearB = parseInt(b.period.split("-")[1] || b.period);
    return yearB - yearA;
  });

  // Filtrer les projets selon le type sélectionné
  const filteredProjects =
    selectedType === "all"
      ? sortedProjects
      : sortedProjects.filter((project) => project.type === selectedType);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
        {/* En-tête fixe */}
        <motion.div
          variants={itemAnimation}
          initial="hidden"
          animate="show"
          className="flex-shrink-0 pb-4 sticky top-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="h-5 w-5 text-primary" />
            <DialogTitle className="text-2xl font-bold">
              Mes Projets
            </DialogTitle>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 text-sm rounded-full capitalize transition-all duration-300 ${neobrutalismClassPrimary} ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-muted hover:scale-105"
              }`}
            >
              Tous
            </button>
            {["client", "formation", "personnel"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as ProjectType)}
                className={`px-3 py-1.5 text-sm rounded-full capitalize transition-all duration-300 ${neobrutalismClassPrimary} ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-muted hover:scale-105"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Zone de défilement */}
        <ScrollArea className="flex-grow -mr-6 pr-6">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-6 pb-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemAnimation}
                className={`${neobrutalismClassPrimary} bg-card p-4 rounded-lg space-y-4 transition-all duration-300 hover:scale-[1.01]`}
              >
                {/* En-tête du projet */}
                <div className="flex flex-wrap gap-4 items-start justify-between">
                  <div className="space-y-1 flex-grow">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-primary font-medium whitespace-nowrap">
                      {project.period}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary capitalize">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Image du projet */}
                {project.image && (
                  <div className="relative h-48 w-full rounded-md overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                {/* Description détaillée */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-muted rounded-md text-xs transition-colors duration-300 hover:bg-muted/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Liens */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className={`${neobrutalismClassPrimary} transition-all duration-300 hover:scale-105`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FaExternalLinkAlt className="h-4 w-4" />
                      Voir le site
                    </a>
                  </Button>
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className={`${neobrutalismClassPrimary} transition-all duration-300 hover:scale-105`}
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaGithub className="h-4 w-4" />
                        Code source
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </div>
    </Modal>
  );
}
