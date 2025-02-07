import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { ProjectsPreviewSection } from "@/components/not-logged/projects/ProjectsPreviewSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Portfolio & Projets Web | Bernard Rogier",
  description:
    "Découvrez mes réalisations en développement web : sites WordPress, applications Next.js, et solutions sur mesure. Plus de 10 projets livrés avec succès, incluant des sites vitrines et e-commerce.",
  path: "/projects",
  type: "website",
  keywords: [
    "portfolio développeur web",
    "projets web",
    "développeur WordPress",
    "développement Next.js",
    "sites web professionnels",
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

export default function ProjectsPage() {
  return (
    <>
      <HeroSection
        title="Mes Réalisations"
        highlight="Projets Innovants & Sur Mesure"
        subtitle="<span>En tant que jeune diplômé, découvrez une sélection de mes projets en développement web, allant de WordPress à Next.js, en passant par React.</span><span>Chaque projet est conçu pour répondre aux besoins spécifiques de mes clients.</span>"
        primaryButtonText="Voir mes projets"
        primaryButtonLink="#projets"
        secondaryButtonText="Explorer mes services"
        secondaryButtonLink="/services"
      />
      <ProjectsPreviewSection
        color="muted"
        waveType="type2"
        zIndex={10}
        showPrimaryButton={false}
      />
      <ContactSection color="background" waveType="type1" zIndex={20} />
      <Footer />
    </>
  );
}
