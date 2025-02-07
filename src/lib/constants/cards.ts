import { CardType } from "../types";

export const ABOUT_CARDS: CardType[] = [
  {
    id: "about",
    title: "Découvrez mon parcours",
    description:
      "Passionné par le développement web depuis plus de 5 ans, je crée des solutions innovantes et sur mesure pour mes clients.",
    icon: "FaUser",
    action: {
      type: "modal",
      modalId: "about-modal",
    },
  },
  {
    id: "cv",
    title: "Mon expertise technique",
    description:
      "De WordPress aux technologies modernes comme Next.js, découvrez mon parcours et mes compétences en développement web.",
    icon: "FaFileAlt",
    action: {
      type: "modal",
      modalId: "cv-modal",
    },
  },
  {
    id: "contact",
    title: "Concrétisons votre projet",
    description:
      "Une idée ? Un projet ? Discutons ensemble de vos besoins et trouvons la meilleure solution pour votre entreprise.",
    icon: "FaEnvelope",
    action: {
      type: "modal",
      modalId: "contact-modal",
    },
  },
];

export const PROJECT_CARDS: CardType[] = [
  {
    id: "projects",
    title: "Portfolio de réalisations",
    description:
      "Explorez mes projets web : sites vitrines, e-commerce, applications sur mesure et solutions WordPress headless.",
    icon: "FaBriefcase",
    action: {
      type: "modal",
      modalId: "projects-modal",
    },
  },
];

export const SOCIAL_CARDS: CardType[] = [
  {
    id: "linkedin",
    title: "Connectons-nous !",
    description:
      "Suivez mon actualité professionnelle et échangeons sur LinkedIn autour du développement web.",
    icon: "FaLinkedin",
    action: {
      type: "external-link",
      href: "https://linkedin.com/in/bernard-rogier",
    },
  },
  {
    id: "github",
    title: "Code & Contributions",
    description:
      "Découvrez mes projets open source et contributions à la communauté des développeurs.",
    icon: "FaGithub",
    action: {
      type: "external-link",
      href: "https://github.com/SamuraiSyntax",
    },
  },
];

export const OPTIONS_CARDS: CardType[] = [
  {
    id: "options",
    title: "Personnalisation",
    description:
      "Adaptez l'interface à vos préférences pour une expérience optimale.",
    icon: "FaCog",
    action: {
      type: "options",
    },
  },
];
