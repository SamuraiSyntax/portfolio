import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { ProjectsPreviewSection } from "@/components/not-logged/projects/ProjectsPreviewSection";
import { ServicesPreviewSection } from "@/components/not-logged/services/ServicesPreviewSection";
import { LOCATIONS, getLocationBySlug } from "@/lib/constants/locations";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    location: location.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) return {};

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://www.dev-nanard.fr/${location.slug}`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: locationSlug } = await params;
  const locationData = getLocationBySlug(locationSlug);

  if (!locationData) {
    notFound();
  }

  return (
    <>
      <HeroSection
        title={`Expert WordPress & Solutions Web à ${locationData.name}`}
        subtitle={`<span>Développeur web freelance à ${locationData.name}, je crée des sites web professionnels pour les entreprises de ${locationData.department}.</span>`}
        highlight={`Solutions Web ${locationData.name}`}
        primaryButtonText="Découvrir mes services"
        primaryButtonLink="#services"
        secondaryButtonText="Me contacter"
        secondaryButtonLink="#contact"
      />

      <ServicesPreviewSection
        color="muted"
        waveType="type1"
        zIndex={10}
        location={locationData}
      />

      <ProjectsPreviewSection
        color="background"
        waveType="type2"
        zIndex={20}
        location={locationData}
      />

      <ContactSection
        color="muted"
        waveType="type3"
        zIndex={30}
        location={locationData}
      />

      <Footer />
    </>
  );
}
