import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { ContactSection } from "@/components/organisms/contact/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsPreviewSection } from "@/components/organisms/projects/ProjectsPreviewSection";
import { ServicesPreviewSection } from "@/components/organisms/services/ServicesPreviewSection";
import { TestimonialsSection } from "@/components/organisms/testimonials/TestimonialsSection";
import Footer from "@/components/v2/footer";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bernard Rogier | Développeur WordPress & Expert en Développement Web",
  description:
    "Développeur web spécialisé dans la création de sites WordPress sur mesure et performants. J'offre des solutions innovantes en intégration web, développement d'applications Next.js, et optimisation SEO. Découvrez mes projets et services personnalisés.",
  keywords: [
    "développeur WordPress",
    "intégrateur web",
    "création site WordPress",
    "développement web sur mesure",
    "applications Next.js",
    "optimisation SEO",
    "services web personnalisés",
    "sites web professionnels",
  ],
  authors: [{ name: "Bernard Rogier" }],
  creator: "Bernard Rogier",
  publisher: "Bernard Rogier",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.dev-nanard.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr",
    siteName: "Bernard Rogier - Développeur Web Full Stack",
    title: "Bernard Rogier | Développeur WordPress & Intégrateur Web",
    description:
      "Développeur web spécialisé WordPress, créateur de solutions web sur mesure et performantes",
    images: [
      {
        url: "https://www.dev-nanard.fr/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Bernard Rogier - Développeur Web Full Stack",
        type: "image/jpeg",
      },
    ],
  },
  category: "Portfolio",
  other: {
    "theme-color": "#0f172a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Bernard Rogier - Développeur Web",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection
        title="Développeur Web & Expert WordPress"
        subtitle="<span>Solutions web sur mesure et innovantes pour propulser votre entreprise vers de nouveaux sommets.</span><span>Profitez d'une expertise en développement WordPress et d'une approche personnalisée pour chaque projet.</span>"
        highlight="Innovation & Performance"
        primaryButtonText="Découvrez mes projets"
        primaryButtonLink="#projets"
        secondaryButtonText="Explorez mes services"
        secondaryButtonLink="#services"
      />

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ServicesPreviewSection
          color="muted"
          waveType="type1"
          zIndex={10}
          showPrice={false}
          showFeatures={false}
          showDuration={false}
        />
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ProjectsPreviewSection
          color="background"
          waveType="type2"
          zIndex={20}
          showPrimaryButton={true}
          primaryButtonText="Voir tous les projets"
          primaryButtonLink="/projects"
        />
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <TestimonialsSection color="muted" waveType="type3" zIndex={30} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ContactSection color="background" waveType="type3" zIndex={40} />
      </Suspense>

      <Footer />
    </>
  );
}
