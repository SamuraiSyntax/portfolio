export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    // Erreurs opérationnelles connues
    console.error(`[${error.statusCode}] ${error.message}`);
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  // Erreurs inconnues
  console.error("Erreur inattendue:", error);
  return {
    message: "Une erreur inattendue est survenue",
    statusCode: 500,
  };
};
