"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BreadcrumbNavigation() {
  const pathname = usePathname();

  // Vérifier si nous sommes sur la page dashboard
  if (pathname === "/dashboard") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments
    .filter((segment) => segment !== "dashboard")
    .map((segment, index) => {
      const href = `/dashboard/${segments.slice(1, index + 2).join("/")}`;
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (segment === "dashboard") {
        label = "Tableau de bord";
      }

      return {
        href,
        label,
      };
    });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={`breadcrumb-${index}`} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={breadcrumb.href}
            className="ml-2 hover:text-foreground transition-colors"
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
