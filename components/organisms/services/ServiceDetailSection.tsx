"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ServiceDetailCard } from "@/components/molecules/services/ServiceDetailCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useServices } from "@/hooks/useWordPress";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import React from "react";

export function ServiceDetailSection({
  color,
  waveType,
  zIndex,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
}) {
  const { data: services, isLoading } = useServices();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section
      id="services"
      className={`min-h-screen relative md:sticky md:top-0 bg-${color} flex flex-col justify-center items-center group`}
      style={{ zIndex }}
    >
      <SectionDivider
        color={color || "muted"}
        waveType={waveType}
        zIndex={zIndex}
      />
      <div className="container mx-auto py-5 flex flex-col gap-6">
        <SectionTitle
          title="Mes Services"
          subtitle="Solutions Complètes"
          description="Découvrez l'ensemble de mes services, de la création de sites WordPress aux solutions web modernes."
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
            {services.map((service, index) => (
              <CarouselItem
                key={service.id}
                className="md:basis-1/2 flex flex-col items-stretch justify-center px-1"
              >
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <ServiceDetailCard service={service} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
