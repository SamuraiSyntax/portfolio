"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

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
  zIndex,
}: {
  color?: string;
  colorReverse?: string;
  utility?: number;
  reverse?: boolean | false;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const classNameDesktop = `hidden md:flex items-center relative border-none border-0 group sticky top-0 bg-background${
    utility ? `-${utility}` : ""
  }`;

  const classNameMobile = `flex md:hidden items-center relative border-none border-0 group sticky top-0 bg-background${
    utility ? `-${utility}` : ""
  }`;

  const sortedExperience = [...experience].sort((a, b) => {
    const yearA = parseInt(a.period.split(" - ")[0]);
    const yearB = parseInt(b.period.split(" - ")[0]);
    return yearA - yearB;
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full"
      style={{ zIndex }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-12 text-center sticky top-0 bg-muted group"
      >
        <SectionDivider
          color={"muted"}
          colorReverse={colorReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <SectionTitle
          title="Expérience"
          subtitle="Mon parcours professionnel"
        />
      </motion.div>

      {/* Desktop Version */}
      <div
        className={`hidden md:flex px-4 gap-12 relative ${classNameDesktop}`}
      >
        <SectionDivider
          color={"background"}
          colorReverse={colorReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <div className="absolute left-1/2 h-full w-0.5 bg-primary/20">
          <motion.div
            className="absolute top-0 w-full bg-primary origin-top"
            style={{ scaleY }}
          />
        </div>

        <div className="w-full space-y-12 py-12">
          {sortedExperience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative grid grid-cols-2 items-center"
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-6">
                <motion.div
                  className="w-4 h-4 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              </div>

              {index % 2 === 0 ? (
                <>
                  <Card className="p-6 bg-muted/50 backdrop-blur-sm border border-primary/10 mr-8">
                    <span className="text-sm font-medium text-primary">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}</h3>
                    <ul className="space-y-2 text-muted-foreground my-4 text-sm">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <div /> {/* Empty div for spacing */}
                </>
              ) : (
                <>
                  <div /> {/* Empty div for spacing */}
                  <Card className="p-6 bg-muted/50 backdrop-blur-sm border border-primary/10 ml-8">
                    <span className="text-sm font-medium text-primary">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}</h3>
                    <ul className="space-y-2 text-muted-foreground my-4 text-sm">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className={`md:hidden px-4 relative ${classNameMobile}`}>
        <SectionDivider
          color={"background"}
          colorReverse={colorReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <div className="absolute left-8 h-full w-0.5 bg-primary/20">
          <motion.div
            className="absolute top-0 w-full bg-primary origin-top"
            style={{ scaleY }}
          />
        </div>

        <div className="ml-8 space-y-12 py-12">
          {sortedExperience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[22px] top-6">
                <motion.div
                  className="w-4 h-4 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              </div>
              <Card className="p-6 bg-muted/50 backdrop-blur-sm border border-primary/10">
                <span className="text-sm font-medium text-primary">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}</h3>
                <ul className="space-y-2 text-muted-foreground my-4 text-sm">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
