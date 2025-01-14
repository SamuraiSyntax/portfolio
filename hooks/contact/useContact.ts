import { contactService } from "@/lib/api/contactService";
import { Contact } from "@/types/contact";
import { useCallback, useState } from "react";

export function useContact(initialContact?: Contact) {
  const [contact, setContact] = useState<Contact | undefined>(initialContact);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContact = useCallback(
    async (updatedContact: Partial<Contact>) => {
      if (!contact?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await contactService.update(
          contact.id,
          updatedContact
        );

        if (error) throw new Error(error);
        if (data) setContact(data);
      } catch (err) {
        setError(
          `Erreur lors de la mise à jour du contact: ${
            err instanceof Error ? err.message : "Erreur inconnue"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [contact?.id]
  );

  const refreshContact = useCallback(async () => {
    if (!contact?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await contactService.getById(contact.id);
      if (error) throw new Error(error);
      if (data) setContact(data);
    } catch (err) {
      setError(
        `Erreur lors du rafraîchissement du contact: ${
          err instanceof Error ? err.message : "Erreur inconnue"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }, [contact?.id]);

  return {
    contact,
    isLoading,
    error,
    updateContact,
    refreshContact,
    setContact,
  };
}
