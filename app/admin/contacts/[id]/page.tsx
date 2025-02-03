import { ContactPage as ContactPageComponent } from "@/components/admin/ContactPage"; // Assurez-vous que le chemin est correct
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { Contact } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";
import { notFound, redirect } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function ContactPage({ params }: { params: tParams }) {
  "use server";
  const { id } = await params; // Récupération de l'ID du contact
  const session = await auth(); // Authentification dans le contexte de requête

  if (!session) {
    redirect("/admin");
    return;
  }

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    notFound();
    return;
  }

  const convertedContact = convertPrismaContactToContact(
    contact as PrismaContact
  );
  convertedContact.budget = convertedContact.budget
    ? Number(convertedContact.budget)
    : null;

  return (
    <div className="p-4 md:p-8">
      <ContactPageComponent contact={convertedContact as Contact} id={id} />
    </div>
  ); // Utilisez le bon nom de composant
}
