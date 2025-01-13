import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
