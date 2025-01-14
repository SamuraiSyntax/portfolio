import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { PrismaContact } from "@/types/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts - Administration",
  description: "Gestion des contacts",
};

export default async function ContactsPage() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const convertedContacts = contacts.map((contact) =>
      convertPrismaContactToContact(contact as PrismaContact)
    );

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des contacts</h1>
        <ContactTable contacts={convertedContacts} />
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des contacts.</p>
      </div>
    );
  }
}
