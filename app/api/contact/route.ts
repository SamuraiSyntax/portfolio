"use server";

import { ContactService } from "@/lib/services/contact.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Récupération de l'IP du client
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0] : "127.0.0.1";

    const contentType = request.headers.get("content-type");
    let data;

    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (
      contentType?.includes("multipart/form-data") ||
      contentType?.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      data = Object.fromEntries(formData);
    } else {
      return new NextResponse(
        "Content-Type invalide. Utilisez application/json, multipart/form-data ou application/x-www-form-urlencoded",
        { status: 415 }
      );
    }

    // Ajout des informations du client
    data.userAgent = request.headers.get("user-agent");

    // Validation des champs requis
    const requiredFields = ["name", "email", "message"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new NextResponse(`Le champ ${field} est requis`, {
          status: 400,
        });
      }
    }

    // Utilisation du ContactService pour créer le contact et envoyer l'email
    const result = await ContactService.create(data, clientIp);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}
