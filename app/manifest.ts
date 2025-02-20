import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bernard Rogier EI | Développeur Web Freelance",
    short_name: "BR Web",
    description:
      "Expert en développement web, création de sites WordPress et solutions digitales sur mesure",
    start_url: "/",
    display: "browser",
    background_color: "#fdfaf7",
    theme_color: "#613b1a",
    icons: [
      {
        src: "/favicons/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    orientation: "portrait",
    lang: "fr-FR",
    dir: "ltr",
    categories: ["business", "productivity", "web development"],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Services",
        url: "/services",
        description: "Découvrez mes services de développement web",
      },
      {
        name: "Contact",
        url: "/contact",
        description: "Contactez-moi pour votre projet",
      },
    ],
  };
}
