interface Skill {
  icon: string;
  name: string;
  details: string;
}

export const SKILLS: Skill[] = [
  {
    icon: "FaWordpress",
    name: "WordPress",
    details:
      "Développement de thèmes et plugins, expertise en personnalisation",
  },
  {
    icon: "SiNextdotjs",
    name: "Next.js",
    details: "Création d'applications modernes et performantes",
  },
  {
    icon: "FaReact",
    name: "React",
    details: "Développement d'interfaces utilisateur dynamiques",
  },
  {
    icon: "SiTailwindcss",
    name: "Tailwind CSS",
    details: "Stylisation moderne et responsive",
  },
  {
    icon: "SiPrisma",
    name: "Prisma",
    details: "Gestion de base de données type-safe",
  },
  {
    icon: "FaDatabase",
    name: "WordPress Headless",
    details: "Architecture découplée avec WordPress comme CMS",
  },
];
