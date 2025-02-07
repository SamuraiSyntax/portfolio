import { auth } from "@/lib/auth/helper";
import prisma from "@/lib/prisma";
import { ContactStatus, Priority } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    function isValidJson(str: string) {
      try {
        // Tente de parser comme JSON
        JSON.parse(str);
        return true;
      } catch (e) {
        // Si cela échoue, vérifiez si c'est une chaîne simple
        if (typeof str === "string") {
          return true; // Accepter les chaînes simples
        }
        console.error(
          "[CONTACT_PUT]_isValidJson",
          e,
          "Invalid JSON string:",
          str
        );
        return false;
      }
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name: data.name as string,
        email: data.email as string,
        phone: (data.phone as string) || null,
        company: (data.company as string) || null,
        message: data.message as string,
        clientType: (data.clientType as string) || null,
        projectType: (data.projectType as string) || null,
        budget: data.budget
          ? new Decimal(data.budget as string).toNumber()
          : null,
        status: (data.status as ContactStatus) || "NEW",
        priority: (data.priority as Priority) || "NORMAL",
        deadline: data.deadline ? new Date(data.deadline as string) : null,
        existingSite: (data.existingSite as string) || null,
        companySize: (data.companySize as string) || null,
        industry: (data.industry as string) || null,
        locale: (data.locale as string) || null,
        notes: data.notes as string,
        objectives: data.objectives as string,
        position: (data.position as string) || null,
        preferredContactMethod: (data.preferredContactMethod as string) || null,
        marketingSource: (data.marketingSource as string) || null,
        newsletter: (data.newsletter as unknown as boolean) || false,
        nextFollowUp: data.nextFollowUp
          ? new Date(data.nextFollowUp as string)
          : null,

        ipAddress: (data.ipAddress as string) || null,
        userAgent: (data.userAgent as string) || null,
        annualRevenue: data.annualRevenue
          ? new Decimal(data.annualRevenue as string).toNumber()
          : null,
        contractValue: data.contractValue
          ? new Decimal(data.contractValue as string).toNumber()
          : null,
        lastContact: data.lastContact
          ? new Date(data.lastContact as string)
          : null,
        projectScope: (data.projectScope as string) || null,
        quotationAmount: data.quotationAmount
          ? new Decimal(data.quotationAmount as string).toNumber()
          : null,
        targetAudience: (data.targetAudience as string) || null,
        timezone: (data.timezone as string) || null,
        comments: data.comments
          ? isValidJson(data.comments as string)
            ? JSON.parse(data.comments as string)
            : undefined
          : undefined,
        activities: data.activities
          ? isValidJson(data.activities as string)
            ? JSON.parse(data.activities as string)
            : undefined
          : undefined,
        attachments: data.attachments
          ? isValidJson(data.attachments as string)
            ? JSON.parse(data.attachments as string)
            : undefined
          : undefined,
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
  const { id } = await params;

  try {
    await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting contact" + error },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const contact = await prisma.contact.findUnique({
      where: { id: params.id },
      include: {
        projects: {
          include: {
            phases: {
              include: {
                responsibleUser: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
            risks: true,
            projectManagerUser: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        activities: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
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

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACT_GET]", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
