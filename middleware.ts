import { LOCATIONS } from "@/lib/constants/locations";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Ne pas appliquer le middleware aux routes de services localisés
  if (request.nextUrl.pathname.startsWith("/services/")) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur a déjà une préférence de localisation
  const locationPreference = request.cookies.get("preferred-location");

  if (!locationPreference) {
    // Obtenir la ville à partir des headers Vercel Edge
    const userCity =
      request.headers.get("x-vercel-ip-city")?.toLowerCase() || "";

    // Vérifier si nous avons une landing page pour cette ville
    const matchingLocation = LOCATIONS.find(
      (loc) => loc.slug === userCity || loc.name.toLowerCase() === userCity
    );

    if (matchingLocation) {
      // Rediriger vers la landing page appropriée
      return NextResponse.redirect(
        new URL(`/${matchingLocation.slug}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
