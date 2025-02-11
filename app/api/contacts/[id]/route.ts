import { auth } from "@/lib/auth/helper";
import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { PrismaContact } from "@/types/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();
    const { id } = await params;

    // Conversion des dates
    if (data.deadline) data.deadline = new Date(data.deadline);
    if (data.nextFollowUp) data.nextFollowUp = new Date(data.nextFollowUp);
    if (data.lastContactDate)
      data.lastContactDate = new Date(data.lastContactDate);

    // Conversion des nombres
    const numericFields = [
      "budget",
      "annualRevenue",
      "quotationAmount",
      "contractValue",
    ];
    numericFields.forEach((field) => {
      if (data[field]) data[field] = Number(data[field]);
    });

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    // Conversion du contact pour le retour
    const convertedContact = convertPrismaContactToContact(
      updatedContact as PrismaContact
    );

    // Revalidation du cache
    revalidatePath("/dashboard/contacts");
    revalidatePath(`/dashboard/contacts/${id}`);

    return NextResponse.json(convertedContact);
  } catch (error) {
    console.error("[CONTACT_UPDATE]", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du contact" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { status } = await request.json();
    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating contact" + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.contact.delete({ where: { id } });

    // Revalidation du cache
    revalidatePath("/dashboard/contacts");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONTACT_DELETE]", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du contact" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact non trouvé" },
        { status: 404 }
      );
    }

    const convertedContact = convertPrismaContactToContact(
      contact as PrismaContact
    );
    return NextResponse.json(convertedContact);
  } catch (error) {
    console.error("[CONTACT_GET]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
