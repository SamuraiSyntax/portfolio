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
  title: "Bernard Rogier | Expert WordPress & Développement Web sur Mesure",
  description:
    "Transformez votre vision en réalité digitale. Expert en développement WordPress et solutions web performantes pour les entreprises ambitieuses.",
  keywords: [
    "développeur WordPress",
    "expert web",
    "sites sur mesure",
    "développement web",
    "solutions digitales",
    "WordPress professionnel",
    "applications web",
    "optimisation web",
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
    siteName: "Bernard Rogier - Expert WordPress",
    title: "Bernard Rogier | Expert WordPress & Développement Web sur Mesure",
    description:
      "Solutions web professionnelles et performantes pour votre succès digital",
    images: [
      {
        url: "https://www.dev-nanard.fr/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Bernard Rogier - Expert WordPress",
        type: "image/jpeg",
      },
    ],
  },
  category: "Portfolio",
  other: {
    "theme-color": "#0f172a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Bernard Rogier - Expert WordPress",
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
