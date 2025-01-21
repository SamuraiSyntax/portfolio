"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ServiceCard } from "@/components/molecules/services/ServiceCard";
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
import * as React from "react";

export function ServicesSection({
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
  const { data: services, isLoading, error } = useServices();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !services?.length) {
    return null;
  }

  const className = `min-h-screen flex items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <section
      id="services"
      className={`${className}`}
      style={{ zIndex: zIndex }}
    >
      <SectionDivider
        color={color || "muted"}
        colorReverse={colorReverse}
        reverse={reverse}
        waveType={waveType}
        utility={utilityReverse}
      />
      <div className="container mx-auto py-20 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Mes Services"
            subtitle="Des solutions adaptées à vos besoins"
          />
        </motion.div>

        <Carousel
          orientation="horizontal"
          opts={{ align: "center", loop: true }}
          className="md:hidden w-full h-auto px-10"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-auto">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="flex flex-col items-center justify-center"
              >
                <ServiceCard
                  service={service}
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
        </Carousel>

        <Carousel
          orientation="horizontal"
          opts={{ align: "start", loop: true }}
          className="hidden md:block w-full px-10"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="md:basis-1/2 lg:basis-1/3 flex flex-col items-center justify-center ml-[0.125rem]"
              >
                <ServiceCard
                  service={service}
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
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
