"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import * as React from "react";

export const education = [
  {
    title: "Développeur Intégrateur Web",
    level: "Niveau 5 (anciennement III)",
    domain: "Programmation Web",
    period: "2022 - 2024",
  },
  {
    title: "Bac Pro SEN",
    level: "Niveau 4 (anciennement IV)",
    domain: "Électronique",
    period: "2010 - 2012",
  },
  {
    title: "TP Agent Magasinier",
    level: "Certification",
    domain: "Magasinage",
    period: "2020",
  },
  {
    title: "BEP SEID",
    level: "Niveau 3 (anciennement V)",
    domain: "Électronique",
    period: "2008 - 2010",
  },
];

export function EducationSection({
  color,
  colorReverse,
  utility,
  reverse,
  waveType,
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
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const classNameMobile = `flex md:hidden items-center border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <>
        {/* Desktop titre */}
        <section
          className={`hidden md:flex items-center border-none border-0 group sticky top-0 bg-muted py-12`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"muted"}
            colorReverse={colorReverse}
            reverse={reverse}
            waveType={waveType}
            zIndex={zIndex}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12"
          >
            <SectionTitle
              title="Éducation"
              subtitle="Mon parcours académique"
            />
          </motion.div>
        </section>

        {/* Desktop education carousel */}
        <section
          className={`hidden md:flex items-center border-none border-0 group sticky top-0 min-h-screen bg-background`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"background"}
            colorReverse={colorReverse}
            reverse={reverse}
            waveType={waveType}
            zIndex={zIndex}
          />
          <Carousel
            orientation="vertical"
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full px-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-mt-1 h-[400px] flex flex-col justify-between p-0">
              {education.map((edu, index) => (
                <CarouselItem
                  key={index}
                  className="pt-1 basis-1/2 flex flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.01 }}
                    className="p-1"
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-muted/50 hover:bg-muted backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-1">
                        {edu.title}
                      </h3>
                      <div className="text-sm text-primary mb-2">
                        {edu.period}
                      </div>
                      <p className="text-muted-foreground">
                        {edu.domain} - {edu.level}
                      </p>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-muted/50 hover:bg-primary hover:text-white" />
            <CarouselNext className="bg-muted/50 hover:bg-primary hover:text-white" />
          </Carousel>
        </section>
      </>

      {/* Mobile */}
      <>
        {/* Mobile titre */}
        <section
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-muted`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"muted"}
            colorReverse={colorReverse}
            reverse={reverse}
            waveType={waveType}
            zIndex={zIndex}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12"
          >
            <SectionTitle
              title="Éducation"
              subtitle="Mon parcours académique"
            />
          </motion.div>
        </section>

        {/* Mobile education carousel */}
        <section
          className={`${classNameMobile} min-h-screen`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={color || "muted"}
            colorReverse={colorReverse}
            reverse={reverse}
            waveType={waveType}
            zIndex={zIndex}
          />
          <Carousel
            orientation="vertical"
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full px-10 container mx-auto flex flex-col justify-center min-h-[50vh]"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-mt-1 h-[50vh] flex flex-col">
              {education.map((edu, index) => (
                <CarouselItem
                  key={index}
                  className="p-0 basis-full h-auto flex flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow bg-muted/50 hover:bg-muted backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-1">
                        {edu.title}
                      </h3>
                      <div className="text-sm text-primary mb-2">
                        {edu.period}
                      </div>
                      <p className="text-muted-foreground">
                        {edu.domain} - {edu.level}
                      </p>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1/2 -translate-x-1/2 top-0 bg-muted/50 hover:bg-primary hover:text-white" />
            <CarouselNext className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-muted/50 hover:bg-primary hover:text-white" />
          </Carousel>
        </section>
      </>
    </>
  );
}
