"use client";

import { SectionDivider } from "@/components/not-logged/SectionDivider";
import { SectionTitle } from "@/components/not-logged/SectionTitle";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import {
  FaGit,
  FaGithub,
  FaHtml5,
  FaNode,
  FaPhp,
  FaReact,
  FaSass,
  FaTerminal,
  FaVial,
  FaWordpress,
} from "react-icons/fa";
import { MdSecurity, MdSpeed } from "react-icons/md";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiCpanel,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWoo,
  SiWordpress,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

interface Skill {
  name: string;
  icon: React.ElementType;
  level: string;
  description: string;
}

const skillCategories = [
  {
    category: "Développement Frontend",
    skills: [
      {
        name: "React",
        icon: FaReact,
        level: "Expert",
        description:
          "Développement d'interfaces utilisateur dynamiques et réactives",
      },
      {
        name: "Next.js",
        icon: RiNextjsFill,
        level: "Expert",
        description: "Création d'applications web performantes et SEO-friendly",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        level: "Avancé",
        description: "Développement robuste avec typage statique",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        level: "Avancé",
        description: "Création d'interfaces modernes et responsives",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        level: "Expert",
        description: "Programmation frontend moderne et interactive",
      },
      {
        name: "HTML5/CSS3",
        icon: FaHtml5,
        level: "Expert",
        description: "Structure et style des pages web",
      },
      {
        name: "SCSS/Sass",
        icon: FaSass,
        level: "Avancé",
        description:
          "Préprocesseur CSS pour des styles avancés et maintenables",
      },
    ],
  },
  {
    category: "Développement Backend",
    skills: [
      {
        name: "WordPress",
        icon: FaWordpress,
        level: "Expert",
        description:
          "Expert en développement de thèmes et plugins personnalisés",
      },
      {
        name: "PHP",
        icon: FaPhp,
        level: "Avancé",
        description: "Développement backend WordPress et applications web",
      },
      {
        name: "Node.js",
        icon: FaNode,
        level: "Avancé",
        description: "Développement backend JavaScript performant",
      },
      {
        name: "Prisma",
        icon: SiPrisma,
        level: "Avancé",
        description: "ORM moderne pour la gestion de bases de données",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        level: "Avancé",
        description: "Gestion de bases de données relationnelles",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        level: "Avancé",
        description: "Base de données relationnelle avancée",
      },
      {
        name: "API REST",
        icon: TbApi,
        level: "Expert",
        description: "Création et intégration d'APIs RESTful",
      },
    ],
  },
  {
    category: "Expertise Technique",
    skills: [
      {
        name: "SEO Technique",
        icon: BsSearch,
        level: "Expert",
        description: "Optimisation pour les moteurs de recherche",
      },
      {
        name: "Performance Web",
        icon: MdSpeed,
        level: "Expert",
        description: "Optimisation des performances et temps de chargement",
      },
      {
        name: "WP Headless",
        icon: SiWordpress,
        level: "Expert",
        description: "Architecture WordPress découplée avec Next.js",
      },
      {
        name: "WooCommerce",
        icon: SiWoo,
        level: "Avancé",
        description: "Développement e-commerce sur WordPress",
      },
      {
        name: "Sécurité Web",
        icon: MdSecurity,
        level: "Avancé",
        description: "Sécurisation des applications et sites web",
      },
      {
        name: "Testing",
        icon: FaVial,
        level: "Intermédiaire",
        description: "Tests unitaires et d'intégration",
      },
    ],
  },
  {
    category: "Gestion & Outils",
    skills: [
      {
        name: "GitHub",
        icon: FaGithub,
        level: "Avancé",
        description: "Collaboration et déploiement continu",
      },
      {
        name: "Git",
        icon: FaGit,
        level: "Expert",
        description: "Gestion de versions et workflow Git",
      },
      {
        name: "VS Code",
        icon: VscVscode,
        level: "Expert",
        description: "Environnement de développement principal",
      },
      {
        name: "Terminal",
        icon: FaTerminal,
        level: "Avancé",
        description: "Maîtrise des commandes Linux/Unix",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        level: "Avancé",
        description: "Déploiement et hébergement Next.js",
      },
      {
        name: "cPanel",
        icon: SiCpanel,
        level: "Expert",
        description: "Gestion d'hébergement WordPress",
      },
    ],
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="px-2"
  >
    <Card className="w-[175px] p-4 h-full hover:shadow-lg transition-all duration-300 bg-muted/50 hover:bg-muted backdrop-blur-sm border-primary/10 hover:border-primary/20">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                {skill.icon && (
                  <skill.icon className="w-12 h-12 text-primary" />
                )}
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-medium">{skill.name}</h3>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{skill.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  </motion.div>
);

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
  const plugins = {
    frontend: React.useRef(
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      })
    ),
    backend: React.useRef(
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      })
    ),
    technique: React.useRef(
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      })
    ),
    gestion: React.useRef(
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      })
    ),
  };

  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  const classNameMobile = `flex md:hidden items-center relative border-none border-0 group bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <section
        id="skills"
        className={`${classNameDesktop}`}
        style={{ zIndex: zIndex }}
      >
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
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionTitle
              title="Compétences"
              subtitle="Technologies et expertises"
            />
          </motion.div>

          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-primary">
                  {category.category}
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {category.skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <AnimatePresence>
        <section
          key="mobile-section"
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
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <SectionTitle
                title="Compétences"
                subtitle="Technologies et expertises"
              />
            </motion.div>

            <div className="space-y-12">
              {skillCategories.map((category, categoryIndex) => {
                const categoryPlugin =
                  category.category === "Développement Frontend"
                    ? plugins.frontend
                    : category.category === "Développement Backend"
                    ? plugins.backend
                    : category.category === "Expertise Technique"
                    ? plugins.technique
                    : plugins.gestion;

                return (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.2 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {category.category}
                    </h2>
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                        skipSnaps: true,
                        containScroll: "trimSnaps",
                      }}
                      plugins={[categoryPlugin.current]}
                      className="w-full"
                      onDragStart={categoryPlugin.current.stop}
                      onDragEnd={categoryPlugin.current.reset}
                    >
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {category.skills.map((skill, index) => (
                          <CarouselItem
                            key={`${category.category}-${skill.name}`}
                            className="pl-2 md:pl-4 basis-[200px] md:basis-[225px]"
                          >
                            <SkillCard skill={skill} index={index} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="hidden md:flex -left-12 bg-primary/10 hover:bg-primary/20" />
                      <CarouselNext className="hidden md:flex -right-12 bg-primary/10 hover:bg-primary/20" />
                    </Carousel>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatePresence>
    </>
  );
}
