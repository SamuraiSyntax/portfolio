import { LOCATIONS } from "@/lib/constants/locations";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ne pas rediriger la page d'accueil
  if (pathname === "/") {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Exclure explicitement les routes qui ne doivent pas être redirigées
  if (
    pathname.startsWith("/services/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/manifest.json" ||
    pathname === "/mentions-legales" ||
    pathname === "/politique-confidentialite" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/projects"
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Vérifier si l'utilisateur a déjà une préférence de localisation
  const locationPreference = request.cookies.get("preferred-location");

  // Vérifier si le chemin actuel correspond à une location
  const isLocationPath = LOCATIONS.some((loc) => pathname === `/${loc.slug}`);

  // Ne pas rediriger si on est déjà sur une page de location
  if (isLocationPath) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  if (!locationPreference) {
    const userCity =
      request.headers.get("x-vercel-ip-city")?.toLowerCase() || "";
    const matchingLocation = LOCATIONS.find(
      (loc) => loc.slug === userCity || loc.name.toLowerCase() === userCity
    );

    if (matchingLocation) {
      // Stocker la préférence dans un cookie avant la redirection
      const response = NextResponse.redirect(
        new URL(`/${matchingLocation.slug}`, request.url)
      );
      response.cookies.set("preferred-location", matchingLocation.slug, {
        maxAge: 30 * 24 * 60 * 60, // 30 jours
        path: "/",
      });
      addSecurityHeaders(response);
      return response;
    }
  }

  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self' https://www.api.dev-nanard.fr https://*.vercel-scripts.com;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://www.api.dev-nanard.fr https://*.googleusercontent.com;
      font-src 'self' data:;
      connect-src 'self' https://www.api.dev-nanard.fr https://*.vercel-scripts.com https://va.vercel-scripts.com data:;
      frame-src 'self' blob:;
      media-src 'self' https://www.api.dev-nanard.fr https://*.api.dev-nanard.fr;
      worker-src 'self' blob:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim()
  );

  // En-têtes de sécurité supplémentaires
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|manifest.json).*)",
  ],
};
