import { ContactPage as ContactPageComponent } from "@/components/logged-in/contacts/contactSingle/ContactPage";
import prisma from "@/lib/prisma";
import { convertPrismaContactToContact } from "@/lib/utils/contact";
import { Contact } from "@/types/contact";
import { PrismaContact } from "@/types/prisma";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function ContactPage({ params }: { params: tParams }) {
  const { id } = await params;

  // Récupération optimisée avec toutes les relations nécessaires
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      activities: {
        orderBy: { createdAt: "desc" },
        take: 10, // Limite pour optimiser les performances
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      comments: {
        orderBy: { createdAt: "desc" },
        take: 5, // Limite pour optimiser les performances
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      documents: {
        orderBy: { createdAt: "desc" },
      },
      communications: {
        orderBy: { date: "desc" },
        take: 10, // Limite pour optimiser les performances
        include: {
          attachments: true,
        },
      },
      projects: {
        include: {
          projectManager: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          phases: {
            orderBy: { startDate: "asc" },
          },
          risks: true,
        },
      },
      quotes: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      invoices: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      notes: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!contact) {
    notFound();
  }

  // Conversion et formatage des données
  const convertedContact = convertPrismaContactToContact(
    contact as unknown as PrismaContact
  );

  // Formatage du budget
  convertedContact.budget = convertedContact.budget
    ? Number(convertedContact.budget)
    : null;

  // Récupération des projets avec pagination
  const projects = await prisma.project.findMany({
    where: { clientId: id },
    take: 6, // Limite pour la première page
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
        orderBy: { startDate: "asc" },
      },
      risks: true,
      projectManager: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Récupération des activités récentes
  const activities = await prisma.activityLog.findMany({
    where: { contactId: id },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <ContactPageComponent
      contact={convertedContact as Contact}
      id={id}
      projects={projects}
      activities={activities}
      documents={contact.documents}
      communications={contact.communications}
      quotes={contact.quotes}
      invoices={contact.invoices}
    />
  );
}
