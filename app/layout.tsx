import { NavBar } from "@/components/admin/auth/nav-bar";
import { AuthProviders } from "@/components/providers/auth-providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Loader } from "@/components/ui/loader";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster));
const BlendCursor = dynamic(() =>
  import("@/components/ui/blend-cursor").then((mod) => mod.BlendCursor)
);
const BackgroundAnimated = dynamic(() =>
  import("@/components/ui/background-animated").then(
    (mod) => mod.BackgroundAnimated
  )
);

export const metadata: Metadata = {
  title: "Bernard Rogier | Développeur Web",
  description:
    "Développeur web passionné basé en France, spécialisé dans la création de sites web modernes et performants.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <main className="min-h-screen relative">
              <Loader />
              <BackgroundAnimated />
              <NavBar />
              {children}
              <BlendCursor />
              <Toaster richColors position="top-right" />
            </main>
          </ThemeProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
