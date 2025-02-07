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
  image = "/images/og-default.jpg",
  type = "website",
}: GenerateMetadataProps): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;

  return {
    title: `${title}`,
    description,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://votresite.fr"
    ),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Bernard Rogier",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fr_FR",
    },
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
