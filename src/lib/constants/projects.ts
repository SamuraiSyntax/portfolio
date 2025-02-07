interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  period: string;
  url: string;
  github?: string;
  image?: string;
  type: "client" | "personnel" | "formation";
}

export const PROJECTS: Project[] = [
  {
    id: "atelier-peinture",
    title: "Atelier Peinture Ferrer",
    description: "Site vitrine pour une entreprise de peinture",
    longDescription:
      "Création d'un site vitrine professionnel avec Elementor pour une entreprise de peinture. " +
      "Le site présente les services, réalisations et permet aux clients de contacter l'entreprise facilement.",
    technologies: ["WordPress", "Elementor", "PHP", "CSS"],
    period: "2018-2019",
    url: "https://www.peinture.travauxef.fr/",
    type: "client",
    image: "/projects/atelier-peinture.png",
  },
  {
    id: "entreprise-ferrer",
    title: "Entreprise Ferrer",
    description: "Plateforme de gestion interne sur mesure",
    longDescription:
      "Développement d'une plateforme complète avec une partie publique et un espace privé. " +
      "Fonctionnalités : chat entre collègues, gestion de chantiers, suivi des interventions, " +
      "et outils de collaboration. Réalisé pendant mon alternance.",
    technologies: [
      "WordPress",
      "PHP",
      "MySQL",
      "JavaScript",
      "CSS",
      "API REST",
      "WebSocket",
    ],
    period: "2022-2024",
    url: "https://www.travauxef.fr/",
    type: "formation",
    image: "/projects/entreprise-ferrer.png",
  },
  {
    id: "portfolio-wp",
    title: "Bernard Rogier - Portfolio WordPress",
    description: "Portfolio professionnel développé from scratch",
    longDescription:
      "Portfolio développé entièrement sur mesure avec WordPress pour valider mon diplôme " +
      "de développeur intégrateur web. Développement from scratch sans builder, " +
      "démontrant mes compétences en développement WordPress et intégration web.",
    technologies: ["WordPress", "HTML", "CSS", "jQuery", "PHP", "MySQL"],
    period: "2024",
    url: "https://wp.dev-nanard.fr/",
    type: "formation",
    github: "https://github.com/votre-username/portfolio-wp",
    image: "/projects/portfolio-wp.png",
  },
];

// Grouper les projets par type
export const getProjectsByType = () => {
  return {
    client: PROJECTS.filter((project) => project.type === "client"),
    formation: PROJECTS.filter((project) => project.type === "formation"),
    personnel: PROJECTS.filter((project) => project.type === "personnel"),
  };
};

// Obtenir les technologies uniques utilisées
export const getAllTechnologies = () => {
  const technologies = new Set<string>();
  PROJECTS.forEach((project) => {
    project.technologies.forEach((tech) => technologies.add(tech));
  });
  return Array.from(technologies);
};
