import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type tParams = Promise<{ id: string }>;

export default async function EditContactPage(props: { params: tParams }) {
  const { id } = await props.params;

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const contactData = {
    ...contact,
    budget: contact.budget ? contact.budget.toNumber() : null,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/admin/contacts/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Modifier le contact</h1>
      </div>

      <Card className="p-6">
        <ContactForm contact={contactData} isEditing={true} />
      </Card>
    </div>
  );
}

export const revalidate = 60;
