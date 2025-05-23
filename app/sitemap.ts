import { LOCATIONS } from "@/lib/constants/locations";
import { wpFetch } from "@/lib/wordpress";
import { WPProject, WPService } from "@/types/wordpress";
import { MetadataRoute } from "next";

async function getProjects() {
  try {
    return await wpFetch<WPProject[]>({
      endpoint: "projects",
      embed: true,
      timeout: 30000,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return [];
  }
}

async function getServices() {
  try {
    return await wpFetch<WPService[]>({
      endpoint: "services",
      embed: true,
      timeout: 30000,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dev-nanard.fr";

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Pages de localisation
  const locationPages = LOCATIONS.map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Pages dynamiques - Projets
  const projects = await getProjects();
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages dynamiques - Services avec Locations
  const services = await getServices();
  const servicePages = services.flatMap((service) => [
    // Page service standard
    {
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(service.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Pages service avec locations
    ...LOCATIONS.map((location) => ({
      url: `${baseUrl}/services/${service.slug}/${location.slug}`,
      lastModified: new Date(service.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [...staticPages, ...locationPages, ...projectPages, ...servicePages];
}
