import { Article, WPService } from "@/types/wordpress";

import { WPPost } from "@/types/wordpress";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface WPFetchOptions {
  endpoint: string;
  query?: Record<string, string>;
  embed?: boolean;
}

export async function wpFetch<T>({
  endpoint,
  query = {},
  embed = false,
}: WPFetchOptions): Promise<T> {
  try {
    const queryParams = new URLSearchParams(query);
    if (embed) queryParams.append("_embed", "");

    const url = `${WP_API_URL}/wp-json/wp/v2/${endpoint}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600, // Cache pendant 1 heure
        tags: [endpoint],
      },
    });

    if (!response.ok) {
      throw new Error(
        `WordPress API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("WordPress fetch error:", error);
    throw error;
  }
}

export async function sanitizeHtml(html: string): Promise<string> {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

export async function getCategories() {
  const response = await fetch(`${WP_API_URL}/categories`);
  const categories = await response.json();
  return categories;
}

export function formatArticle(post: WPPost): Article {
  return {
    id: post.id,
    title: post.title.rendered,
    description:
      post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
    date: post.date,
    category: "Développement", // À adapter selon vos catégories
    readTime: estimateReadTime(post.content.rendered),
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/images/default-blog.jpg",
    slug: post.slug,
    content: post.content.rendered,
  };
}

export async function getServiceBySlug(slug: string) {
  try {
    const services = await wpFetch<WPService[]>({
      endpoint: "services",
      query: { slug },
      embed: true,
    });
    return services?.[0] || null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}
