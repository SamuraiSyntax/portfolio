import { AuthProviders } from "@/components/auth-providers";
import CookieBanner from "@/components/cookies-rgpd/CookieConsent";
import Favicon from "@/components/Favicon";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { BlendCursor } from "@/components/ui/blend-cursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const ubuntu = localFont({
  src: [
    {
      path: "./fonts/ubuntu-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ubuntu-300italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/ubuntu-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ubuntu-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/ubuntu-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/ubuntu-700italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bernard Rogier | Développeur Web Expert WordPress & Next.js",
  description:
    "Développeur web freelance spécialisé dans la création de sites WordPress performants et d'applications web modernes avec Next.js. Solutions sur mesure pour votre entreprise.",
  keywords: [
    "développeur web",
    "WordPress",
    "Next.js",
    "freelance",
    "développement web",
    "Bordeaux",
    "Nouvelle-Aquitaine",
  ],
  authors: [{ name: "Bernard Rogier" }],
  creator: "Bernard Rogier",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://dev-nanard.fr",
    title: "Bernard Rogier | Développeur Web Expert",
    description: "Solutions web professionnelles avec WordPress et Next.js",
    siteName: "Bernard Rogier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bernard Rogier | Développeur Web Expert",
    description: "Solutions web professionnelles avec WordPress et Next.js",
    creator: "@BernardRogier",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${ubuntu.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <Favicon />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="preload"
          href="/fonts/ubuntu-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ubuntu-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ubuntu-300.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ScrollToTop />
            {children}
            <BlendCursor />
            <Toaster richColors position="top-right" closeButton />
            <SpeedInsights />
            <Analytics />
            <CookieBanner />
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
