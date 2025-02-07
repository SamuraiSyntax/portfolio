"use client";

import { ErrorDisplay } from "@/components/error-display";
import { logError } from "@/lib/errors/logger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticatedError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    logError(error, { path: pathname });
  }, [error, pathname]);

  const isAuthError =
    error.message.includes("connecté") ||
    error.message.includes("authentification");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ErrorDisplay error={error} reset={reset} showLoginButton={isAuthError} />
    </div>
  );
}
