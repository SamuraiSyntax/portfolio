"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

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
          <SectionTitle title="Éducation" subtitle="Mon parcours académique" />
        </motion.div>

        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-muted/50 hover:bg-muted backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-1">{edu.title}</h3>
                <div className="text-sm text-primary mb-2">{edu.period}</div>
                <p className="text-muted-foreground">
                  {edu.domain} - {edu.level}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
