"use client";

import { logError } from "@/lib/errors/logger";
import { AuthError } from "@/lib/errors/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface ErrorWrapperProps {
  children: React.ReactNode;
}

export function ErrorWrapper({ children }: ErrorWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      logError(error.error, { path: pathname });
      toast.error("Une erreur inattendue est survenue");
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      logError(error, { path: pathname });

      if (error instanceof AuthError) {
        router.push(`/admin?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du traitement de votre demande"
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, [pathname, router]);

  return <>{children}</>;
}
