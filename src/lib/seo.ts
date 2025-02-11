import { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  authors?: Array<{ name: string }>;
  creator?: string;
  publisher?: string;
  robots?: {
    index: boolean;
    follow: boolean;
    googleBot: {
      index: boolean;
      follow: boolean;
      "max-image-preview": string | number | "-1";
      "max-snippet": string | number | "-1";
      "max-video-preview": string | number | "-1";
    };
  };
  alternates?: {
    canonical: string;
    types?: {
      "application/rss+xml": string;
    };
  };
  openGraph?: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    title: string;
    description: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
      type?: string;
    }[];
  };
  category?: string;
  other?: Record<string, string>;
}

export function generateMetadata({
  title,
  description,
  path,
  type = "website",
  keywords = [],
  image = "/images/og-default.jpg",
  category = "",
  openGraph = {
    type: "website",
    locale: "fr_FR",
    url: "",
    siteName: "Bernard Rogier",
    title: "",
    description: "",
    images: [],
  },
}: GenerateMetadataProps): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dev-nanard.fr";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...openGraph,
      url,
      type,
      locale: "fr_FR",
      siteName: "Bernard Rogier",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    category,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
