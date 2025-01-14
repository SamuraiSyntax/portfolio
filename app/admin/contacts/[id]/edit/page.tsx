import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function EditContactPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const session = await auth();
  if (!session) {
    redirect("/admin");
  }

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/contacts/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Modifier le contact</h1>
      </div>

      <Card className="p-6">
        <ContactForm
          contact={convertPrismaContactToContact(contact)}
          isEditing={true}
        />
      </Card>
    </div>
  );
}

export const revalidate = 60;
