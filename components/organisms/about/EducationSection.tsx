"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

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
  colorReverse,
  utility,
  reverse,
  waveType,
  zIndex,
}: {
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

  const sortedEducation = [...education].sort((a, b) => {
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
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 lg:py-24 lg:px-8 text-center sticky top-0 bg-muted group"
      >
        <SectionDivider
          color={"muted"}
          colorReverse={colorReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <SectionTitle title="Éducation" subtitle="Mon parcours académique" />
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
          {sortedEducation.map((edu, index) => (
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
                      {edu.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-1">{edu.title}</h3>
                    <p className="text-muted-foreground">
                      {edu.domain} - {edu.level}
                    </p>
                  </Card>
                  <div /> {/* Empty div for spacing */}
                </>
              ) : (
                <>
                  <div /> {/* Empty div for spacing */}
                  <Card className="p-6 bg-muted/50 backdrop-blur-sm border border-primary/10 ml-8">
                    <span className="text-sm font-medium text-primary">
                      {edu.period}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-1">{edu.title}</h3>
                    <p className="text-muted-foreground">
                      {edu.domain} - {edu.level}
                    </p>
                  </Card>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div
        className={`md:hidden container mx-auto px-4 relative ${classNameMobile}`}
      >
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
          {sortedEducation.map((edu, index) => (
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
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1">{edu.title}</h3>
                <p className="text-muted-foreground">
                  {edu.domain} - {edu.level}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
