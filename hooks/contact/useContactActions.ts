import { contactService } from "@/lib/api/contactService";
import { ContactStatus } from "@/types/contact";
import { useState } from "react";
import { toast } from "sonner";

export function useContactActions(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkAction = async (ids: string[], action: string) => {
    setIsLoading(true);
    try {
      await contactService.bulkUpdate(ids, action);
      toast.success("Opération réussie");
      onSuccess?.();
    } catch (error) {
      toast.error(
        `Une erreur est survenue: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ContactStatus) => {
    setIsLoading(true);
    try {
      await contactService.update(id, { status });
      toast.success("Statut mis à jour");
      onSuccess?.();
    } catch (error) {
      toast.error(
        `Une erreur est survenue: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleBulkAction,
    handleStatusUpdate,
  };
}
