import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { ErrorMessage } from "@/components/not-logged/ErrorMessage";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { LoadingSpinner } from "@/components/not-logged/LoadingSpinner";
import { SingleServiceSection } from "@/components/not-logged/services/SingleServiceSection";
import { stripHtml, truncateText } from "@/lib/utils";
import { wpFetch } from "@/lib/wordpress";
import { WPService } from "@/types/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getServices() {
  return wpFetch<WPService[]>({
    endpoint: "services",
    embed: true,
  });
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const { current: service } = await findServiceNavigation(services, slug);

  if (!service) return {};

  const title = stripHtml(service.title.rendered);
  const description = truncateText(service.content.rendered, 160);

  return {
    title: `${title} | Bernard Rogier`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.dev-nanard.fr/services/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  try {
    const { slug } = await params;
    const services = await getServices();
    const {
      previous,
      current: service,
      next,
    } = await findServiceNavigation(services, slug);

    if (!service) return notFound();

    return (
      <>
        <Suspense fallback={<LoadingSpinner className="min-h-[50vh]" />}>
          <HeroSection
            title={stripHtml(service.title.rendered)}
            subtitle={truncateText(service.content.rendered, 160)}
            highlight={`${service.service_meta.price}`}
            primaryButtonText="Découvrir le services"
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
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ContactSection color="background" waveType="type1" zIndex={20} />
        </Suspense>

        <Footer />
      </>
    );
  } catch (error) {
    console.error("Service page error:", error);
    return (
      <ErrorMessage
        error={
          error instanceof Error ? error : new Error("Une erreur est survenue")
        }
      />
    );
  }
}
