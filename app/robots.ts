import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dev-nanard.fr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/mentions-legales",
          "/politique-confidentialite",
          "/projects",
          "/projects/*",
          "/services",
          "/services/*",
          "/_next/static/*",
          "/_next/image*",
        ],
        disallow: [
          "/api/*",
          "/admin/*",
          "/dashboard/*",
          "/(logged-in)/*",
          "/login/*",
        ],
        crawlDelay: 2,
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: [
          "/",
          "/about",
          "/contact",
          "/mentions-legales",
          "/politique-confidentialite",
          "/projects",
          "/projects/*",
          "/services",
          "/services/*",
          "/_next/static/*",
          "/_next/image*",
        ],
        disallow: [
          "/api/*",
          "/admin/*",
          "/dashboard/*",
          "/(logged-in)/*",
          "/login/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
