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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  const classNameMobile = `flex md:hidden items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <section className={`${classNameDesktop}`} style={{ zIndex: zIndex }}>
        <SectionDivider
          color={color || "muted"}
          colorReverse={colorReverse}
          utility={utilityReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionTitle
              title="Compétences"
              subtitle="Technologies et expertises"
            />
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-muted/50 hover:bg-muted backdrop-blur-sm border-primary/10 hover:border-primary/20">
                  <h3 className="font-semibold text-lg mb-3">{skill.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{
                          width:
                            skill.level === "Expert"
                              ? "100%"
                              : skill.level === "Avancé"
                              ? "75%"
                              : "50%",
                        }}
                      />
                    </div>
                    <span className="text-sm text-primary font-medium">
                      {skill.level}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              title="Compétences"
              subtitle="Technologies et expertises"
            />
          </motion.div>
        </section>

        {/* Mobile skills carousel */}
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
            className="w-full h-full px-10 container mx-auto flex flex-col justify-center py-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-mt-1 h-[450px] flex flex-col">
              {skills.map((skill, index) => (
                <CarouselItem
                  key={skill.name}
                  className="p-0 basis-1/3 h-auto flex flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.01 }}
                    className=""
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-muted/50 hover:bg-muted backdrop-blur-sm border-primary/10 hover:border-primary/20">
                      <h3 className="font-semibold text-lg mb-3">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                              width:
                                skill.level === "Expert"
                                  ? "100%"
                                  : skill.level === "Avancé"
                                  ? "75%"
                                  : "50%",
                            }}
                          />
                        </div>
                        <span className="text-sm text-primary font-medium">
                          {skill.level}
                        </span>
                      </div>
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
