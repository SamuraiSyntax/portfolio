import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!contact) {
    redirect("/admin/contacts");
  }

  return (
    <div className="p-4">
      <ContactForm contact={contact} isEditing />
    </div>
  );
}
