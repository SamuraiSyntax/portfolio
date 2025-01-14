import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ContactStatus, Priority } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: {
        name: data.name as string,
        email: data.email as string,
        phone: (data.phone as string) || null,
        company: (data.company as string) || null,
        message: data.message as string,
        clientType: (data.clientType as string) || null,
        projectType: (data.projectType as string) || null,
        budget: data.budget ? Number(data.budget) : null,
        status: (data.status as ContactStatus) || "NEW",
        priority: (data.priority as Priority) || "NORMAL",
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACT_PUT]", error);
    return new NextResponse("Erreur lors de la mise à jour du contact", {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const contact = await prisma.contact.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contact.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting contact" + error },
      { status: 500 }
    );
  }
}
