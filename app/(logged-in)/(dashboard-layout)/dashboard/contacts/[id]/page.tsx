import { ContactPage as ContactPageComponent } from "@/components/logged-in/contacts/contactSingle/ContactPage"; // Assurez-vous que le chemin est correct
import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { Contact } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function ContactPage({ params }: { params: tParams }) {
  "use server";
  const { id } = await params;

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

  const projects = await prisma.project.findMany({
    where: {
      clientId: id,
    },
    include: {
      phases: {
        include: {
          responsibleUser: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          startDate: "asc",
        },
      },
      risks: true,
      projectManagerUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4">
      <ContactPageComponent
        contact={convertedContact as Contact}
        id={id}
        projects={projects}
      />
    </div>
  );
}
