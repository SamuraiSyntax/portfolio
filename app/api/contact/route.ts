"use server";

import { ContactService } from "@/lib/services/contact.service";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(1, "Le message est requis"),
  phone: z.string().optional(),
  company: z.string().optional(),
  clientType: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.number().optional().nullable(),
  deadline: z.string().optional(),
  existingSite: z.string().optional(),
  newsletter: z.boolean().optional(),
  metadata: z.record(z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip");

    const data = contactSchema.parse(body);

    console.log("Calling ContactService.create");
    const result = await ContactService.create(data, clientIp || "");

    if (!result.success) {
      console.error("ContactService.create failed:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: result.error?.message || "Erreur inconnue",
            remainingTime: result.error?.remainingTime
              ? Math.ceil(result.error.remainingTime / (1000 * 60 * 60)) // Convertir en heures
              : undefined,
            details:
              process.env.NODE_ENV === "development"
                ? "Le rate limiting est plus permissif en développement (100 requêtes/24h)"
                : "Limite de 3 requêtes par 24h en production",
          },
        },
        { status: 400 }
      );
    }

    console.log("Contact created successfully");
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST] Unexpected error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation error",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }
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
