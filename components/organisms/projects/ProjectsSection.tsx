"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ProjectCard } from "@/components/molecules/projects/ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProjects } from "@/hooks/useWordPress";
import { fadeInUp } from "@/lib/animations";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import * as React from "react";

export function ProjectsSection({
  color,
  colorReverse,
  utility,
  reverse,
  waveType,
  utilityReverse,
  zIndex,
}: {
  color?: string;
  colorReverse?: string;
  utility?: number;
  reverse?: boolean | false;
  waveType?: "type1" | "type2" | "type3";
  utilityReverse?: number;
  zIndex?: number;
}) {
  const { data: projects, isLoading, error } = useProjects();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !projects?.length) {
    return null;
  }

  const className = `min-h-screen flex items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <section className={`${className}`} style={{ zIndex: zIndex }}>
      <SectionDivider
        color={color || "muted"}
        colorReverse={colorReverse}
        utility={utilityReverse}
        reverse={reverse}
        waveType={waveType}
      />
      <div className="container mx-auto py-20 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            title="Projets Récents"
            subtitle="Découvrez mes dernières réalisations"
          />
        </motion.div>

        {/* Carousel pour mobile */}
        <Carousel
          orientation="horizontal"
          opts={{ align: "center", loop: true }}
          className="md:hidden w-full px-10"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id}>
                <div className="group">
                  <ProjectCard project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
        </Carousel>

        {/* Grille pour desktop */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className="h-full group"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
