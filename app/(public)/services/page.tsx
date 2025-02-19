import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { ServicesPreviewSection } from "@/components/not-logged/services/ServicesPreviewSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title:
    "Services Web à Bordeaux | Bernard Rogier - Expert WordPress & Next.js",
  description:
    "Services de développement web sur mesure à Bordeaux : création de sites WordPress, applications Next.js, e-commerce et maintenance. Solutions digitales adaptées aux entreprises de Nouvelle-Aquitaine.",
  path: "/services",
  type: "website",
  keywords: [
    "services web Bordeaux",
    "création site WordPress Bordeaux",
    "développement Next.js Nouvelle-Aquitaine",
    "agence web Bordeaux",
    "création site internet Gironde",
    "maintenance WordPress Bordeaux",
    "développement e-commerce Bordeaux",
    "solutions digitales Nouvelle-Aquitaine",
  ],
  image: "/images/og-services.jpg",
  category: "Services Web Bordeaux",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/services",
    siteName: "Bernard Rogier - Services Web Bordeaux",
    title: "Services de Développement Web à Bordeaux",
    description:
      "Expert en création de sites web et solutions digitales sur mesure pour les entreprises de Bordeaux et de Nouvelle-Aquitaine. WordPress, Next.js, e-commerce et maintenance.",
    images: [
      {
        url: "/images/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Services Web Bordeaux - Bernard Rogier",
        type: "image/jpeg",
      },
    ],
  },
});

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="Solutions Web Sur Mesure"
        highlight="Expertise & Innovation"
        subtitle="<span>Développeur spécialisé WordPress, je conçois des sites web performants et évolutifs.</span><span>Mon expertise technique et ma veille constante sur les nouvelles technologies garantissent des solutions adaptées à vos objectifs.</span>"
        primaryButtonText="Voir mes services"
        primaryButtonLink="#services"
        secondaryButtonText="Voir mes projets"
        secondaryButtonLink="/projects"
      />
      <ServicesPreviewSection
        color="muted"
        waveType="type2"
        zIndex={10}
        showPrice={false}
        showFeatures={true}
        showPrimaryButton={false}
        showSecondaryButton={false}
        showDuration={true}
      />
      <ContactSection color="background" waveType="type1" zIndex={20} />
      <Footer />
    </>
  );
}
