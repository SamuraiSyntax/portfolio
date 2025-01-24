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
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import React from "react";

export function ProjectDetailSection({
  color,
  waveType,
  zIndex,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
}) {
  const { data: projects, isLoading } = useProjects();

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <div>Aucun projet trouvé</div>;
  }

  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group sticky top-0 bg-${color}`;

  return (
    <>
      {/* Desktop */}
      <section
        id="projets"
        className={`${classNameDesktop}`}
        style={{ zIndex }}
      >
        <SectionDivider
          color={color || "muted"}
          waveType={waveType}
          zIndex={zIndex}
        />
        <div className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl container mx-auto py-5 flex flex-col items-center justify-center gap-6">
          <SectionTitle
            title="Mes Projets"
            subtitle="Réalisations Récentes"
            description="Découvrez mes dernières réalisations en développement web, de WordPress à Next.js."
          />

          <Carousel
            orientation="horizontal"
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full px-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="ml-[0.125rem] w-full h-full">
              {projects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-1/2 flex flex-col items-stretch justify-center px-1"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <ProjectCard color="muted" project={project} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>

      {/* Mobile */}
      <>
        {/* Mobile titre */}
        <section
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-muted`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider color={"muted"} waveType={waveType} zIndex={zIndex} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12"
          >
            <SectionTitle
              title="Mes Projets"
              subtitle="Réalisations Récentes"
              description="Découvrez une sélection de mes dernières réalisations en développement web, de WordPress à Next.js."
            />
          </motion.div>
        </section>

        {/* Mobile education carousel */}
        <section
          id="projets-mobile"
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-background min-h-screen px-4`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"background"}
            waveType={waveType}
            zIndex={zIndex}
          />
          <Carousel
            orientation="horizontal"
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full h-full px-10 container mx-auto flex flex-col justify-center"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {projects.slice(0, 6).map((project) => (
                <CarouselItem key={project.id}>
                  <ProjectCard
                    color={"background"}
                    key={project.id}
                    project={project}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-muted/50 hover:bg-primary hover:text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted/50 hover:bg-primary hover:text-white" />
          </Carousel>
        </section>
      </>
    </>
  );
}
