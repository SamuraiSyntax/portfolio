import { Article, WPPost, WPService } from "@/types/wordpress";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface WPFetchOptions {
  endpoint: string;
  query?: Record<string, string>;
  embed?: boolean;
  method?: string;
  body?: Record<string, unknown>;
  token?: string;
  timeout?: number;
}

export async function wpFetch<T>({
  endpoint,
  query = {},
  embed = false,
  method = "GET",
  body,
  token,
  timeout = 10000,
}: WPFetchOptions): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const queryParams = new URLSearchParams(query);
    if (embed) queryParams.append("_embed", "");

    const url = `${WP_API_URL}/${endpoint}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      signal: controller.signal,
      next: {
        tags: [endpoint],
        revalidate: 3600, // Cache d'une heure
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `WordPress API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `La requête a dépassé le délai d'attente de ${timeout}ms`
      );
    }
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
