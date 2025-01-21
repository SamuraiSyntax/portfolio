"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

const skills = [
  { name: "WordPress", level: "Expert" },
  { name: "Next.js", level: "Expert" },
  { name: "React", level: "Expert" },
  { name: "TypeScript", level: "Avancé" },
  { name: "Node.js", level: "Avancé" },
  { name: "SEO Technique", level: "Expert" },
  { name: "Performance Web", level: "Expert" },
  { name: "UI/UX Design", level: "Avancé" },
  { name: "Tailwind CSS", level: "Avancé" },
  { name: "Prisma", level: "Avancé" },
  { name: "Google Workspace", level: "Expert" },
  { name: "Gestion de Projet", level: "Avancé" },
];

export function SkillsSection({
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
            title="Compétences"
            subtitle="Technologies et expertises"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-muted/50 hover:bg-muted backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                <p className="text-sm text-primary">{skill.level}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
