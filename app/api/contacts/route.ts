import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts.map(convertPrismaContactToContact));
  } catch (error) {
    console.error("[CONTACTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const contact = await prisma.contact.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || null,
        company: (formData.get("company") as string) || null,
        message: formData.get("message") as string,
        // ... autres champs
      },
    });

    return NextResponse.json(convertPrismaContactToContact(contact));
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
