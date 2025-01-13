import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ContactStatus, Priority } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await request.json();
    const { ids, status, priority, action } = body;

    if (!ids || !Array.isArray(ids)) {
      return new NextResponse("Données invalides", { status: 400 });
    }

    const updateData: {
      status?: ContactStatus;
      priority?: Priority;
    } = {};

    // Mapper les actions aux statuts et priorités
    if (action) {
      switch (action) {
        case "mark_in_progress":
          updateData.status = ContactStatus.IN_PROGRESS;
          break;
        case "mark_completed":
          updateData.status = ContactStatus.COMPLETED;
          break;
        case "mark_important":
          // Récupérer d'abord le contact pour vérifier sa priorité actuelle
          const contact = await prisma.contact.findFirst({
            where: { id: ids[0] },
            select: { priority: true },
          });

          updateData.priority =
            contact?.priority === Priority.HIGH
              ? Priority.NORMAL
              : Priority.HIGH;
          break;
      }
    } else {
      if (status) updateData.status = status;
      if (priority) updateData.priority = priority;
    }

    const updatedContacts = await prisma.contact.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: updateData,
    });

    return NextResponse.json(updatedContacts);
  } catch (error) {
    console.error("[CONTACTS_BULK_UPDATE]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
