import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import { prisma } from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <ContactTable contacts={contacts.map(convertPrismaContactToContact)} />
    </div>
  );
}
