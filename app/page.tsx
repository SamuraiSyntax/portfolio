import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { LoadingSpinner } from "@/components/not-logged/LoadingSpinner";
import { ProjectsPreviewSection } from "@/components/not-logged/projects/ProjectsPreviewSection";
import { ServicesPreviewSection } from "@/components/not-logged/services/ServicesPreviewSection";
import { TestimonialsSection } from "@/components/not-logged/testimonials/TestimonialsSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Bernard Rogier | Développeur Web Freelance à Bordeaux - Expert WordPress & Next.js",
  description:
    "Développeur web freelance à Bordeaux spécialisé en WordPress et Next.js. Solutions web sur mesure pour les entreprises de Nouvelle-Aquitaine. Devis gratuit et accompagnement personnalisé.",
  keywords: [
    "développeur web Bordeaux",
    "freelance WordPress Bordeaux",
    "création site web Nouvelle-Aquitaine",
    "expert WordPress Bordeaux",
    "développeur Next.js Bordeaux",
    "agence web Bordeaux",
    "création site internet Gironde",
    "développeur freelance Nouvelle-Aquitaine",
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
    siteName: "Bernard Rogier - Développeur Web Bordeaux",
    title:
      "Bernard Rogier | Expert WordPress & Développement Web sur Mesure à Bordeaux",
    description:
      "Solutions web professionnelles et performantes pour les entreprises de Bordeaux et de Nouvelle-Aquitaine. Expertise WordPress et Next.js au service de votre projet digital.",
    images: [
      {
        url: "https://www.dev-nanard.fr/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Bernard Rogier - Développeur Web Bordeaux",
        type: "image/jpeg",
      },
    ],
  },
  category: "Services Web Bordeaux",
  other: {
    "theme-color": "#0f172a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Bernard Rogier - Expert WordPress Bordeaux",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection
        title="Expert WordPress & Solutions Web"
        subtitle="<span>Votre vision mérite une réalisation exceptionnelle.</span><span>Des solutions web sur mesure qui transforment vos objectifs en résultats concrets.</span>"
        highlight="Excellence & Innovation"
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
