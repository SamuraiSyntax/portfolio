import { ContactSection } from "@/components/organisms/contact/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectDetailSection } from "@/components/organisms/projects/ProjectDetailSection";
import Footer from "@/components/v2/footer";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Portfolio & Projets Web",
  description:
    "Découvrez mes réalisations en développement web : sites WordPress, applications Next.js, et solutions sur mesure. Plus de 10 projets livrés avec succès.",
  path: "/projects",
  type: "website",
  keywords: [
    "portfolio développeur web",
    "projets web",
    "développeur WordPress",
    "développeur Next.js",
  ],
  image: "/images/og-projects.jpg",
  category: "Portfolio",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/v2/projects",
    siteName: "Bernard Rogier - Portfolio",
    title: "Portfolio & Projets Web",
    description: "Découvrez mes réalisations en développement web",
    images: [
      {
        url: "/images/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio de projets web - Bernard Rogier",
        type: "image/jpeg",
      },
    ],
  },
});

const heroContent = {
  title: "Mes Réalisations",
  highlight: "Projets & Portfolio",
  subtitle:
    "En tant que jeune diplômé, découvrez une sélection de mes projets en développement web, de WordPress à Next.js en passant par React.",
  primaryButtonText: "Voir mes projets",
  primaryButtonLink: "#projets",
  secondaryButtonText: "Voir mes services",
  secondaryButtonLink: "/services",
};

export default function ProjectsPage() {
  return (
    <>
      <HeroSection {...heroContent} />
      <ProjectDetailSection color="muted" waveType="type2" zIndex={10} />
      <ContactSection color="background" waveType="type1" zIndex={20} />
      <Footer />
    </>
  );
}
