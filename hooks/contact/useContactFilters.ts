import { useDebounce } from "@/hooks/useDebounce";
import { Contact, ContactStatus, ContactView } from "@/types/contact";
import { useMemo, useState } from "react";

export function useContactFilters(
  contacts: Contact[],
  defaultView: ContactView
) {
  const [view, setView] = useState<ContactView>(defaultView);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesView =
        view === "all" ||
        (view === "archived"
          ? contact.status === ContactStatus.ARCHIVED
          : contact.status !== ContactStatus.ARCHIVED);

      const matchesSearch = debouncedSearch
        ? contact.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          contact.email.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;

      return matchesView && matchesSearch;
    });
  }, [contacts, view, debouncedSearch]);

  return {
    view,
    search,
    filteredContacts,
    handleViewChange: setView,
    handleSearchChange: setSearch,
  };
}
