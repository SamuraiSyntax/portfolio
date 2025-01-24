"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ProjectPreviewCard } from "@/components/molecules/projects/ProjectPreviewCard";
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
import * as React from "react";

export function ProjectsPreviewSection({
  color,
  waveType,
  zIndex,
  utility,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
  utility?: number;
}) {
  const { data: projects } = useProjects();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

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
        <div className="container mx-auto py-5 flex flex-col gap-6">
          <SectionTitle
            title="Mes Projets"
            subtitle="Réalisations Récentes"
            description="Découvrez une sélection de mes dernières réalisations en développement web, de WordPress à Next.js."
          />

          <Carousel
            orientation="horizontal"
            opts={{ align: "start", loop: true }}
            className="hidden md:block w-full h-full px-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="ml-[0.125rem] w-full h-full py-10">
              {projects.slice(0, 6).map((project) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-1/2 flex flex-col items-stretch justify-center px-1"
                >
                  <ProjectPreviewCard
                    color={color || "muted"}
                    key={project.id}
                    project={project}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-muted hover:bg-primary text-muted-foreground hover:text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted hover:bg-primary text-muted-foreground hover:text-white" />
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
                  <ProjectPreviewCard
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
