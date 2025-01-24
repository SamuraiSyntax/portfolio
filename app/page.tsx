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
  title: "Bernard Rogier | Développeur WordPress & Intégrateur Web",
  description:
    "Développeur web spécialisé WordPress, je crée des sites web sur mesure et performants. Passionné par l'innovation, je me forme continuellement sur React/Next.js pour enrichir mes solutions.",
  keywords: [
    "développeur WordPress",
    "intégrateur web",
    "création site WordPress",
    "développeur web",
    "intégration web",
    "maintenance WordPress",
    "Bernard Rogier",
    "développement sur mesure",
    "React Next.js",
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
        title="Développeur WordPress"
        subtitle="Solutions web professionnelles et sur mesure"
        highlight="Innovation & Performance"
        primaryButtonText="Voir mes projets"
        primaryButtonLink="#projets"
        secondaryButtonText="Découvrir mes services"
        secondaryButtonLink="#services"
      />

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ServicesPreviewSection color="muted" waveType="type1" zIndex={10} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <ProjectsPreviewSection
          color="background"
          waveType="type2"
          zIndex={20}
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
