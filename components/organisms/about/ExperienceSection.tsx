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

export const experience = [
  {
    title: "Développeur Intégrateur Web",
    period: "2022 - 2024",
    description: [
      "Développement et maintenance de sites sous WordPress",
      "Personnalisation de thèmes et plugins",
      "Création de contenu web optimisé",
      "Optimisation SEO pour améliorer la visibilité",
      "Résolution de problèmes techniques complexes",
    ],
  },
  {
    title: "Agent Magasinier Gestionnaire de Stocks",
    period: "2020 - 2021",
    description: [
      "Stage pour le TP et intérimaire durant 6 mois",
      "Gestion des stocks et des approvisionnements",
    ],
  },
  {
    title: "Livraison, Manutention et Gestion",
    period: "2017 - 2019",
    description: [
      "Chargement et déchargement des commandes",
      "Livraisons en camion réfrigéré",
      "Gestion des relations clients et suivi des commandes",
    ],
  },
  {
    title: "Manutentionnaire",
    period: "2016 - 2017",
    description: [
      "Missions d'intérim au sein de plusieurs entreprises",
      "Travail en équipe et respect des délais",
    ],
  },
];

export function ExperienceSection({
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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const classNameDesktop = `hidden md:flex items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  const classNameMobile = `flex md:hidden items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <>
        {/* Desktop titre */}
        <section
          className={`${classNameDesktop} py-12`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={color || "muted"}
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
              title="Expérience"
              subtitle="Mon parcours professionnel"
            />
          </motion.div>
        </section>

        {/* Desktop experience carousel */}
        <section
          className={`hidden md:flex items-center border-none border-0 group sticky top-0 min-h-screen bg-background`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"background"}
            colorReverse={colorReverse}
            utility={utilityReverse}
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
              {experience.map((exp, index) => (
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
                      <div className="text-sm text-primary mb-2">
                        {exp.period}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {exp.description.join(", ")}
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
        <section className={`${classNameMobile}`} style={{ zIndex: zIndex }}>
          <SectionDivider
            color={color || "muted"}
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
              title="Expérience"
              subtitle="Mon parcours professionnel"
            />
          </motion.div>
        </section>

        {/* Mobile experience carousel */}
        <section
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-background min-h-screen`}
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
            className="w-full h-full px-10 container mx-auto flex flex-col justify-center min-h-[75vh]"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-mt-1 h-[75vh] flex flex-col">
              {experience.map((exp, index) => (
                <CarouselItem
                  key={index}
                  className="p-0 basis-full h-auto flex flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.01 }}
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-muted/50 hover:bg-muted backdrop-blur-sm">
                      <div className="text-sm text-primary mb-2">
                        {exp.period}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {exp.description.join(", ")}
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
