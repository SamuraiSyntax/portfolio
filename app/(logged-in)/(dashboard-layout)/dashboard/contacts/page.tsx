import { ContactTable } from "@/components/logged-in/contacts/table/table";
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
      <div className="w-full h-full container mx-auto flex flex-col gap-4">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les contacts
            </h2>
            <p className="text-muted-foreground">
              Voici tous les contacts enregistrés
            </p>
          </div>
        </section>

        <section className="grid gap-4 grid-cols-1">
          <ContactTable contacts={convertedContacts} />
        </section>
      </div>
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
