import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { ServicesPreviewSection } from "@/components/not-logged/services/ServicesPreviewSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Services WordPress & Développement Web | Bernard Rogier",
  description:
    "Expertise en création de sites WordPress, intégration web et maintenance. Formation continue en React/Next.js pour des solutions toujours plus innovantes. Découvrez mes services de développement web sur mesure.",
  path: "/services",
  type: "website",
  keywords: [
    "services développement web",
    "création site WordPress",
    "développement Next.js",
    "solutions e-commerce",
    "maintenance WordPress",
    "SEO",
  ],
  image: "/images/og-services.jpg",
  category: "Services",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/services",
    siteName: "Bernard Rogier - Services Web",
    title: "Services de Développement Web",
    description: "Services web sur mesure pour votre entreprise",
    images: [
      {
        url: "/images/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Services Web - Bernard Rogier",
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
        showPrice={true}
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
