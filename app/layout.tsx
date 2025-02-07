import { AuthProviders } from "@/components/auth-providers";
import CookieBanner from "@/components/cookies-rgpd/CookieConsent";
import Header from "@/components/header";
import LayoutContent from "@/components/layout-content";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import localFont from "next/font/local";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={ubuntu.className} suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ScrollToTop />
            <Header />
            <LayoutContent>{children}</LayoutContent>
            <SpeedInsights />
            <Analytics />
            <CookieBanner />
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
