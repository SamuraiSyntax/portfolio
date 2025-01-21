import { ContactSection } from "@/components/organisms/contact/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ServiceDetailSection } from "@/components/organisms/services/ServiceDetailSection";
import Footer from "@/components/v2/footer";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Services WordPress & Développement Web",
  description:
    "Expertise en création de sites WordPress, intégration web et maintenance. Formation continue en React/Next.js pour des solutions toujours plus innovantes.",
  path: "/services",
  type: "website",
  keywords: [
    "services développement web",
    "création site WordPress",
    "développement Next.js",
    "solutions e-commerce",
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
        title="Solutions WordPress Sur Mesure"
        highlight="Sites Web Professionnels"
        subtitle="Développeur spécialisé WordPress, je conçois des sites web performants et évolutifs. Mon expertise technique et ma veille constante sur les nouvelles technologies garantissent des solutions adaptées à vos objectifs."
      />
      <ServiceDetailSection color="muted" waveType="type2" zIndex={10} />
      <ContactSection color="background" waveType="type1" zIndex={20} />
      <Footer />
    </>
  );
}
