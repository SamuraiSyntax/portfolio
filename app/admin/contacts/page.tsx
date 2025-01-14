import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { PrismaContact } from "@/types/prisma";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <ContactTable
        contacts={contacts.map((contact) =>
          convertPrismaContactToContact(contact as PrismaContact)
        )}
      />
    </div>
  );
}
