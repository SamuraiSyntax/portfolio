"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        clientType: (formData.get("clientType") as string) || null,
        projectType: (formData.get("projectType") as string) || null,
        budget: formData.get("budget") ? Number(formData.get("budget")) : null,
        deadline: formData.get("deadline")
          ? new Date(formData.get("deadline") as string)
          : null,
        existingSite: (formData.get("existingSite") as string) || null,
        status: "NEW",
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
