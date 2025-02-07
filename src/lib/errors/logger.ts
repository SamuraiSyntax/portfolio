import { AppError } from "./types";

interface LogContext {
  userId?: string;
  path?: string;
  timestamp?: string;
  additionalInfo?: Record<string, unknown>;
}

export const logError = (error: AppError | Error, context?: LogContext) => {
  const errorLog = {
    message: error.message,
    stack: error.stack,
    code: (error as AppError).code,
    statusCode: (error as AppError).statusCode,
    context: (error as AppError).context,
    ...context,
    timestamp: context?.timestamp || new Date().toISOString(),
  };

  // Log en développement
  if (process.env.NODE_ENV === "development") {
    console.error("[ERROR]", errorLog);
  }

  // En production, on pourrait envoyer à un service comme Sentry
  if (process.env.NODE_ENV === "production") {
    // Exemple avec Sentry
    // Sentry.captureException(error, { extra: errorLog });
  }
};
