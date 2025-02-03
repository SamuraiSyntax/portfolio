import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number): string {
  const cleanText = stripHtml(text);
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.slice(0, maxLength) + "...";
}

export function generateMetadata(title: string, description: string) {
  return {
    title: `${title} | Bernard Rogier`,
    description,
    openGraph: {
      title: `${title} | Bernard Rogier`,
      description,
      type: "website",
      url: "https://votresite.fr",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Bernard Rogier`,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/${path}`;
}

export function formatPrice(price: string): string {
  return new Intl.NumberFormat("fr-FR").format(parseInt(price));
}

export function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#8211;": "–",
    "&ndash;": "–",
    "&mdash;": "—",
  };

  return text.replace(/&[^;]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

export function stripHtml(html: string): string {
  // Supprime toutes les balises HTML et décode les entités
  return decodeHTMLEntities(html.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ") // Remplace les espaces multiples par un seul espace
    .trim();
}

export function formatCurrency(amount: number | null) {
  if (!amount) return "-";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
