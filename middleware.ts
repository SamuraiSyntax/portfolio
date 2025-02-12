import { LOCATIONS } from "@/lib/constants/locations";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclure explicitement les routes qui ne doivent pas être redirigées
  if (
    pathname.startsWith("/services/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Vérifier si l'utilisateur a déjà une préférence de localisation
  const locationPreference = request.cookies.get("preferred-location");

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
      default-src 'self' blob:;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://www.api.dev-nanard.fr https://*.googleusercontent.com;
      font-src 'self' data:;  
      connect-src 'self' https://www.api.dev-nanard.fr https://va.vercel-scripts.com data:;
      frame-src 'self' blob:;
      media-src 'self' https://www.api.dev-nanard.fr https://*.api.dev-nanard.fr;
    `
      .replace(/\s{2,}/g, " ")
      .trim()
  );

  // Ajout d'autres en-têtes de sécurité recommandés
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - services/* (pages de services)
     * - api/* (routes API)
     * - _next/* (fichiers Next.js)
     * - favicon.ico, robots.txt, sitemap.xml
     */
    "/((?!services|api|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
