import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Définir les en-têtes CSP
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

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
