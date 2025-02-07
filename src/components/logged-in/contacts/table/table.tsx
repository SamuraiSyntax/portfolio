"use client";

import { DataTable } from "@/components/logged-in/data-table/data-table";
import { Contact } from "@/types/contact";
import { useRouter } from "next/navigation";
import { createContactColumns } from "./columns";

interface ContactTableProps {
  contacts: Contact[];
  onAdd?: () => void;
  isLoading?: boolean;
}

export function ContactTable({
  contacts,
  onAdd,
  isLoading,
}: ContactTableProps) {
  const router = useRouter();
  const columns = createContactColumns();

  const handleView = (contact: Contact) => {
    router.push(`/dashboard/contacts/${contact.id}`);
  };

  const handleEdit = (contact: Contact) => {
    router.push(`/dashboard/contacts/${contact.id}/edit`);
  };

  const handleDelete = async (contact: Contact) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) return;

    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de la suppression du contact");
    }
  };

  return (
    <DataTable
      columns={columns}
      data={contacts}
      searchKey="name"
      onAdd={onAdd}
      addButtonLabel="Ajouter un contact"
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}
