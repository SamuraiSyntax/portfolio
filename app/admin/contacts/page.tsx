import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import prisma from "@/lib/prisma";
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
      <section className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Gestion des contacts</h1>
        <ContactTable contacts={convertedContacts} />
      </section>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error);
    return (
      <section className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des contacts.</p>
      </section>
    );
  }
}
