import { ContactDetails } from "@/components/admin/dashboard/contact/contact-details";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { PrismaContact } from "@/types/prisma";
import { ArrowLeft, Edit } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function ContactPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = await params.id;

  const session = await auth();
  if (!session) {
    redirect("/admin");
  }

  const contact = await prisma.contact.findUnique({
    where: { id: id },
  });

  if (!contact) {
    notFound();
  }

  const contactData = convertPrismaContactToContact(contact as PrismaContact);
  contactData.budget = contactData.budget ? Number(contactData.budget) : null;

  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redirect("/admin/contacts")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Détails du contact</h1>
        </div>
        <Button onClick={() => redirect(`/admin/contacts/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>

      <Card className="p-6">
        <ContactDetails contact={contactData} />
      </Card>
    </div>
  );
}

export const revalidate = 60;
