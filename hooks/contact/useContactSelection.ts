import { Contact } from "@/types/contact";
import { useState } from "react";

export function useContactSelection(contacts: Contact[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = (checked: boolean) => {
    setSelectedIds(checked ? contacts.map((c) => c.id) : []);
  };

  return {
    selectedIds,
    toggleSelection,
    selectAll,
    isSelected: (id: string) => selectedIds.includes(id),
  };
}
