import { auth } from "@/lib/auth/helper";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

enum ContactStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

enum Priority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

interface UpdateRequest {
  ids: string[];
  status?: ContactStatus;
  priority?: Priority;
  action?: "mark_in_progress" | "mark_completed" | "mark_important";
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = (await request.json()) as UpdateRequest;
    const { ids, status, priority, action } = body;

    if (!ids || !Array.isArray(ids)) {
      return new NextResponse("Données invalides", { status: 400 });
    }

    const updateData: {
      status?: { set: ContactStatus };
      priority?: { set: Priority };
    } = {};

    if (action) {
      switch (action) {
        case "mark_in_progress":
          updateData.status = { set: ContactStatus.IN_PROGRESS };
          break;
        case "mark_completed":
          updateData.status = { set: ContactStatus.COMPLETED };
          break;
        case "mark_important":
          const contact = await prisma.contact.findFirst({
            where: { id: ids[0] },
            select: { priority: true },
          });
          updateData.priority = {
            set:
              contact?.priority === Priority.HIGH
                ? Priority.NORMAL
                : Priority.HIGH,
          };
          break;
      }
    } else {
      if (status) updateData.status = { set: status };
      if (priority) updateData.priority = { set: priority };
    }

    const updatedContacts = await prisma.contact.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: updateData as Prisma.ContactUpdateManyMutationInput,
    });

    return NextResponse.json(updatedContacts);
  } catch (error) {
    console.error("[CONTACTS_BULK_UPDATE]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
