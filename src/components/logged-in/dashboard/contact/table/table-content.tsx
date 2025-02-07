import { ContactHead } from "@/components/logged-in/dashboard/contact/table/contact-head";
import { ContactRow } from "@/components/logged-in/dashboard/contact/table/contact-row";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

import { Contact } from "@/types/contact";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TableContentProps {
  contacts: Contact[];
}

export function TableContent({ contacts }: TableContentProps) {
  const router = useRouter();

  useEffect(() => {
    // Rafraîchir la page toutes les 30 secondes
    const interval = setInterval(() => {
      router.refresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [router]);

  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(
      checked ? new Set(contacts.map((c) => c.id)) : new Set()
    );
  };

  const handleSelect = (contactId: string, checked: boolean) => {
    const newSelected = new Set(selectedContacts);
    if (checked) {
      newSelected.add(contactId);
    } else {
      newSelected.delete(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleAction = async (
    contactId: string,
    action:
      | "archive"
      | "unarchive"
      | "delete"
      | "mark_important"
      | "mark_completed"
      | "mark_in_progress"
  ) => {
    setIsLoading(true);
    try {
      // TODO: Implémenter l'appel API pour chaque action
      switch (action) {
        case "archive":
          toast.success("Contact archivé");
          break;
        case "unarchive":
          toast.success("Contact désarchivé");

          break;
        case "delete":
          toast.success("Contact supprimé");
          break;
        case "mark_important":
          toast.success("Contact marqué comme important");
          break;
        case "mark_completed":
          toast.success("Contact marqué comme traité");
          break;
        case "mark_in_progress":
          toast.success("Contact marqué en cours");
          break;
      }
    } catch (error) {
      toast.error("Erreur", {
        description:
          "Une erreur est survenue lors de l'action" +
          (error instanceof Error ? error.message : ""),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (contactId: string) => {
    // TODO: Implémenter la navigation vers la vue détaillée
    router.push(`/dashboard/contacts/${contactId}`);
  };

  const handleEdit = (contactId: string) => {
    // TODO: Implémenter la navigation vers le formulaire d'édition
    router.push(`/dashboard/contacts/${contactId}/edit`);
  };

  return (
    <>
      <ContactHead
        selectedCount={selectedContacts.size}
        totalCount={contacts.length}
        onSelectAll={handleSelectAll}
      />
      <TableBody>
        {contacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            isSelected={selectedContacts.has(contact.id)}
            onSelect={(checked) => handleSelect(contact.id, checked)}
            onAction={(action) => handleAction(contact.id, action)}
            onView={() => handleView(contact.id)}
            onEdit={() => handleEdit(contact.id)}
            isLoading={isLoading}
          />
        ))}
        {contacts.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Aucun résultat
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
}
