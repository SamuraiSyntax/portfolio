"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

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
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Expérience"
            subtitle="Mon parcours professionnel"
          />
        </motion.div>

        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-background/50 hover:bg-background backdrop-blur-sm">
                <div className="text-sm text-primary mb-2">{exp.period}</div>
                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-muted-foreground">
                  {exp.description.join(", ")}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
