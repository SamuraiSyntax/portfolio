"use client";

import { Button } from "@/components/ui/button";
import { AppError } from "@/lib/errors/types";
import { AlertCircle, LogIn, RefreshCcw } from "lucide-react";

interface ErrorDisplayProps {
  error: AppError | Error;
  reset?: () => void;
  showLoginButton?: boolean;
  customActions?: React.ReactNode;
}

export function ErrorDisplay({
  error,
  reset,
  showLoginButton = false,
  customActions,
}: ErrorDisplayProps) {
  const isAppError = "code" in error;
  const statusCode = isAppError ? error.statusCode : 500;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {statusCode === 404 ? "Page non trouvée" : "Une erreur est survenue"}
        </h2>
      </div>

      <p className="text-gray-600 text-center max-w-md">
        {error.message || "Une erreur inattendue s'est produite"}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {showLoginButton && (
          <Button
            variant="default"
            onClick={() => (window.location.href = "/admin")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Se connecter
          </Button>
        )}

        {reset && (
          <Button variant="outline" onClick={reset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        )}

        {customActions}
      </div>
    </div>
  );
}
