import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Définir les en-têtes CSP
  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://www.api.dev-nanard.fr https://*.googleusercontent.com;
      font-src 'self';
      connect-src 'self' https://www.api.dev-nanard.fr https://va.vercel-scripts.com;
      frame-src 'self';
      media-src 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim()
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
