"use server";

import { ContactService } from "@/lib/services/contact.service";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip");

    const data = contactSchema.parse({ name, email, message });

    console.log("Calling ContactService.create");
    // Utilisation du ContactService pour créer le contact et envoyer l'email
    const result = await ContactService.create(data, clientIp || "");

    if (!result.success) {
      console.error("ContactService.create failed:", result.error);
      return NextResponse.json(result, { status: 400 });
    }

    console.log("Contact created successfully");
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST] Unexpected error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: `Database error: ${error.code}`,
        },
        { status: 500 }
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
