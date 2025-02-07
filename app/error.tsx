"use client";

import { ErrorDisplay } from "@/components/error-display";
import { logError } from "@/lib/errors/logger";
import { AuthError } from "@/lib/errors/types";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    logError(error, { path: "/" });
  }, [error]);

  const isAuthError = error instanceof AuthError;

  return (
    <div className="flex items-center justify-center h-screen">
      <ErrorDisplay error={error} reset={reset} showLoginButton={isAuthError} />
    </div>
  );
}
