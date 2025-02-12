import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { ErrorMessage } from "@/components/not-logged/ErrorMessage";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { LoadingSpinner } from "@/components/not-logged/LoadingSpinner";
import { SingleServiceSection } from "@/components/not-logged/services/SingleServiceSection";
import { LOCATIONS, getLocationBySlug } from "@/lib/constants/locations";
import { stripHtml, truncateText } from "@/lib/utils";
import { wpFetch } from "@/lib/wordpress";
import { WPService } from "@/types/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string; location: string }>;
}

async function getServices() {
  try {
    const services = await wpFetch<WPService[]>({
      endpoint: "services",
      embed: true,
      timeout: 30000,
    });

    if (!services || !Array.isArray(services)) {
      throw new Error(
        `Format de réponse invalide pour les services: ${JSON.stringify(
          services
        )}`
      );
    }

    if (services.length === 0) {
      console.warn("Aucun service trouvé dans l'API");
    }

    return services;
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    throw error;
  }
}

async function findServiceNavigation(
  services: WPService[],
  currentSlug: string
) {
  const currentIndex = services.findIndex(
    (service) => service.slug === currentSlug
  );
  const totalServices = services.length;

  return {
    previous:
      currentIndex > 0
        ? services[currentIndex - 1]
        : services[totalServices - 1], // Retourne au dernier service
    current: services[currentIndex],
    next:
      currentIndex < totalServices - 1
        ? services[currentIndex + 1]
        : services[0], // Retourne au premier service
  };
}

export async function generateStaticParams() {
  try {
    const services = await wpFetch<WPService[]>({
      endpoint: "services",
      embed: true,
      timeout: 30000,
    });

    if (!services || !Array.isArray(services)) {
      console.error("Format de services invalide:", services);
      return [];
    }

    if (services.length === 0) {
      console.warn("Aucun service trouvé");
      return [];
    }

    const paths = [];
    for (const service of services) {
      if (!service?.slug) {
        console.warn("Service sans slug détecté:", service);
        continue;
      }

      for (const location of LOCATIONS) {
        paths.push({
          slug: service.slug,
          location: location.slug,
        });
      }
    }

    console.log(
      `Génération de ${paths.length} chemins statiques pour les services localisés`
    );
    return paths;
  } catch (error) {
    console.error(
      "Erreur lors de la génération des paramètres statiques:",
      error
    );
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, location: locationSlug } = await params;
  const services = await getServices();
  const { current: service } = await findServiceNavigation(services, slug);
  const location = getLocationBySlug(locationSlug);

  if (!service || !location) return {};

  const title = stripHtml(service.title.rendered);
  const description = truncateText(service.content.rendered, 160);

  return {
    title: `${title} à ${location.name} | Bernard Rogier`,
    description: `${description} Services disponibles à ${location.name} et dans le département de la ${location.department}.`,
    openGraph: {
      title: `${title} à ${location.name}`,
      description: `${description} Services disponibles à ${location.name} et dans le département de la ${location.department}.`,
      type: "article",
      url: `https://www.dev-nanard.fr/services/${slug}/${location.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} à ${location.name}`,
      description: `${description} Services disponibles à ${location.name}.`,
    },
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  try {
    const { slug, location: locationSlug } = await params;

    if (!slug || !locationSlug) {
      console.error("Paramètres manquants:", { slug, locationSlug });
      return notFound();
    }

    const services = await getServices();
    const location = getLocationBySlug(locationSlug);

    if (!location) {
      console.error("Location non trouvée:", locationSlug);
      return notFound();
    }

    const serviceNavigation = await findServiceNavigation(services, slug);

    if (!serviceNavigation.current) {
      console.error("Service non trouvé:", slug);
      return notFound();
    }

    const { previous, current: service, next } = serviceNavigation;

    return (
      <>
        <Suspense fallback={<LoadingSpinner className="min-h-[50vh]" />}>
          <HeroSection
            title={`${stripHtml(service.title.rendered)} à ${location.name}`}
            subtitle={`${truncateText(
              service.content.rendered,
              160
            )} Services disponibles à ${location.name} et dans toute la ${
              location.department
            }.`}
            highlight={`${service.service_meta.price}`}
            primaryButtonText="Découvrir le service"
            primaryButtonLink="#services"
            secondaryButtonText="Discuter de votre projet"
            secondaryButtonLink="#contact"
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[30vh]" />}>
          <SingleServiceSection
            color="muted"
            waveType="type1"
            zIndex={10}
            service={service}
            previous={previous}
            next={next}
            location={location}
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ContactSection
            color="background"
            waveType="type1"
            zIndex={20}
            location={location}
          />
        </Suspense>

        <Footer />
      </>
    );
  } catch (error) {
    console.error("Erreur détaillée de la page service/location:", {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : String(error),
    });

    return (
      <ErrorMessage
        error={
          error instanceof Error
            ? error
            : new Error("Une erreur est survenue lors du chargement du service")
        }
      />
    );
  }
}
