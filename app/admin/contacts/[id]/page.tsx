import { ContactDetails } from "@/components/admin/dashboard/contact/contact-details";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/contacts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Détails du contact</h1>
        </div>
        <Link href={`/admin/contacts/${id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <ContactDetails contact={convertPrismaContactToContact(contact)} />
      </Card>
    </div>
  );
}

export const revalidate = 60;
