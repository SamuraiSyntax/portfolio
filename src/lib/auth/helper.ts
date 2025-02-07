import { baseAuth } from "@/lib/auth";
import { AuthError } from "@/lib/errors/types";

export const auth = async () => {
  try {
    const session = await baseAuth();
    return session;
  } catch (error) {
    throw new AuthError({
      message: "Erreur lors de la vérification de l'authentification",
      code: "AUTH_ERROR",
      statusCode: 401,
      context: { error },
    });
  }
};

export const requiredAuth = async () => {
  const session = await auth();

  if (!session) {
    throw new AuthError({
      message: "Vous devez être connecté pour accéder à cette page",
      code: "AUTH_ERROR",
      statusCode: 401,
    });
  }

  return session;
};
