import { DocumentTable } from "@/components/logged-in/dashboard/document/document-table";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents - Administration",
  description: "Gestion des documents",
};

export default async function DocumentsPage() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (
      <div className="w-full h-full container mx-auto flex flex-col gap-4">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les documents
            </h2>
            <p className="text-muted-foreground">
              Voici tous les documents enregistrés
            </p>
          </div>
        </section>

        <section className="grid gap-4 grid-cols-1">
          <DocumentTable documents={documents} />
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return (
      <section className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Erreur</h1>
        <p>Une erreur est survenue lors du chargement des documents.</p>
      </section>
    );
  }
}
