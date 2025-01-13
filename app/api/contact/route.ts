"use server";

import { ContactService } from "@/lib/services/contact.service";
import { formSchema } from "@/lib/types/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Données reçues:", body);

    // Validation des données
    const validatedData = formSchema.parse(body);
    console.log("Données validées:", validatedData);

    // Création du contact via le service
    const contact = await ContactService.create(validatedData);
    console.log("Contact créé:", contact);

    return NextResponse.json(
      { message: "Contact créé avec succès", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du contact" },
      { status: 500 }
    );
  }
}
