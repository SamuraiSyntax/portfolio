"use client";

import { ErrorDisplay } from "@/components/error-display";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/errors/logger";
import { AuthError } from "@/lib/errors/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    logError(error, {
      path: pathname,
      additionalInfo: { section: "dashboard" },
    });
  }, [error, pathname]);

  const isAuthError = error instanceof AuthError;

  return (
    <ErrorDisplay
      error={error}
      reset={reset}
      showLoginButton={isAuthError}
      customActions={
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/admin")}
        >
          Retour au tableau de bord
        </Button>
      }
    />
  );
}
