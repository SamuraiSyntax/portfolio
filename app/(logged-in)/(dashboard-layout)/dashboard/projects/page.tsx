import { ProjectsTable } from "@/components/logged-in/projects/ProjectsTable";
import { contactService } from "@/services/contactService";
import { projectService } from "@/services/projectService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets - Administration",
  description: "Gestion des projets",
};

export default async function ProjectsPage() {
  try {
    const [projects, contacts] = await Promise.all([
      projectService.findAll({
        client: true,
        projectManagerUser: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        phases: {
          include: {
            responsibleUser: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            startDate: "asc",
          },
        },
        risks: {
          orderBy: [{ probability: "desc" }, { impact: "desc" }],
        },
      }),
      contactService.findAll(),
    ]);

    // Convertir les valeurs Decimal en nombres
    const sanitizedProjects = projects.map((project) => ({
      ...project,
      budget: project.budget ? Number(project.budget) : null,
      client: project.client
        ? {
            ...project.client,
            budget: project.client.budget
              ? Number(project.client.budget)
              : null,
            annualRevenue: project.client.annualRevenue
              ? Number(project.client.annualRevenue)
              : null,
            contractValue: project.client.contractValue
              ? Number(project.client.contractValue)
              : null,
            quotationAmount: project.client.quotationAmount
              ? Number(project.client.quotationAmount)
              : null,
          }
        : null,
    }));

    const sanitizedContacts = contacts.map((contact) => ({
      ...contact,
      budget: contact.budget ? Number(contact.budget) : null,
      annualRevenue: contact.annualRevenue
        ? Number(contact.annualRevenue)
        : null,
      contractValue: contact.contractValue
        ? Number(contact.contractValue)
        : null,
      quotationAmount: contact.quotationAmount
        ? Number(contact.quotationAmount)
        : null,
    }));

    return (
      <div className="w-full h-full container mx-auto flex flex-col gap-4">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les projets
            </h2>
            <p className="text-muted-foreground">
              Voici tous les projets enregistrés
            </p>
          </div>
        </section>

        <section className="grid gap-4 grid-cols-1">
          <ProjectsTable
            projects={sanitizedProjects}
            contacts={sanitizedContacts}
          />
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return (
      <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des projets.</p>
      </div>
    );
  }
}
