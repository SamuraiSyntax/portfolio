import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { notFound } from "next/navigation";

interface ContactPageProps {
  params: {
    id: string;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <div className="p-4">
      <ContactForm contact={convertPrismaContactToContact(contact)} isEditing />
    </div>
  );
}
