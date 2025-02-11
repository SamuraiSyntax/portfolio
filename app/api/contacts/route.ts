import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { PrismaContact } from "@/types/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      contacts.map((contact) =>
        convertPrismaContactToContact(contact as PrismaContact)
      )
    );
  } catch (error) {
    console.error("[CONTACTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
        projectType: data.projectType || null,
        budget: data.budget || null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        existingSite: data.existingSite || null,
        status: data.status,
        priority: data.priority,
        source: data.source,
        industry: data.industry || null,
        companySize: data.companySize || null,
        annualRevenue: data.annualRevenue || null,
        preferredContactMethod: data.preferredContactMethod || null,
        nextFollowUp: data.nextFollowUp ? new Date(data.nextFollowUp) : null,
        newsletter: data.newsletter || false,
      },
    });

    return NextResponse.json(
      convertPrismaContactToContact(contact as PrismaContact)
    );
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
