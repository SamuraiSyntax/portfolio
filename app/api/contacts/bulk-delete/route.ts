import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids)) {
      return new NextResponse("Données invalides", { status: 400 });
    }

    const deletedContacts = await prisma.contact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json(deletedContacts);
  } catch (error) {
    console.error("[CONTACTS_BULK_DELETE]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
