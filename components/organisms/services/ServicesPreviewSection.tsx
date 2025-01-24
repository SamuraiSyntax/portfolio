"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ServicePreviewCard } from "@/components/molecules/services/ServicePreviewCard";
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

export function ServicesPreviewSection({
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
  const { data: services } = useServices();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <section
        id="services"
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
            title="Mes Services"
            subtitle="Solutions WordPress & Web"
            description="Spécialisé en WordPress, je propose des services adaptés à vos besoins, de la création de site à la maintenance, en passant par l'e-commerce."
          />

          <Carousel
            orientation="horizontal"
            opts={{ align: "start", loop: true }}
            className="hidden md:block w-full h-full px-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="w-full h-full py-12">
              {services.map((service) => (
                <CarouselItem
                  key={service.id}
                  className="md:basis-1/2 lg:basis-1/3 flex flex-col items-center justify-center ml-[0.125rem]"
                >
                  <ServicePreviewCard
                    color={"muted"}
                    key={service.id}
                    service={service}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-background hover:bg-primary text-muted-foreground hover:text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-background hover:bg-primary text-muted-foreground hover:text-white" />
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
              title="Mes Services"
              subtitle="Solutions WordPress & Web"
              description="Spécialisé en WordPress, je propose des services adaptés à vos besoins, de la création de site à la maintenance, en passant par l'e-commerce."
            />
          </motion.div>
        </section>

        {/* Mobile education carousel */}
        <section
          id="services-mobile"
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
            opts={{ align: "center", loop: true }}
            className="md:hidden w-full h-full px-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="w-full h-full mx-auto py-12">
              {services.map((service) => (
                <CarouselItem
                  key={service.id}
                  className="flex flex-col items-center justify-center px-1"
                >
                  <ServicePreviewCard
                    color={"background"}
                    key={service.id}
                    service={service}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
          </Carousel>
        </section>
      </>
    </>
  );
}
