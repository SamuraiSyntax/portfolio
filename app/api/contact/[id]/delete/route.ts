"use server";

import { ContactService } from "@/lib/services/contact.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const contactId = params.id;

  // Vérifications de sécurité
  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!contactId) {
    return NextResponse.json(
      { error: "ID du contact manquant" },
      { status: 400 }
    );
  }

  try {
    await ContactService.delete(contactId);

    // Redirection vers la page d'administration avec un message de succès
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/contacts?deleted=true`
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du contact:", error);

    if ((error as PrismaClientKnownRequestError)?.code === "P2025") {
      return NextResponse.json(
        { error: "Contact non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
