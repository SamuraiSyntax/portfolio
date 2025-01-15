"use client";

import { Card } from "@/components/ui/card";
import { useContactFilters } from "@/hooks/contact/useContactFilters";
import { useContactPagination } from "@/hooks/contact/useContactPagination";
import { Contact, ContactView } from "@/types/contact";
import { useEffect, useState } from "react";
import { TableContainer } from "./table/table-container";
import { TableContent } from "./table/table-content";
import { TableHeader } from "./table/table-header";
import { TablePagination } from "./table/table-pagination";

interface ContactTableProps {
  contacts: Contact[];
  defaultView?: ContactView;
  showTitle?: boolean;
}

export function ContactTable({
  contacts: initialContacts,
  defaultView = "all",
  showTitle = true,
}: ContactTableProps) {
  const [contacts, setContacts] = useState(initialContacts);

  // Rafraîchir les données
  const refreshData = async () => {
    try {
      const response = await fetch("/api/contacts");
      const newContacts = await response.json();
      setContacts(newContacts);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des contacts:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // État et filtres
  const {
    view,
    search,
    filteredContacts,
    handleViewChange,
    handleSearchChange,
  } = useContactFilters(contacts, defaultView);

  // Pagination
  const {
    page,
    pageSize,
    paginatedContacts,
    handlePageChange,
    handlePageSizeChange,
  } = useContactPagination(filteredContacts);

  return (
    <Card className="space-y-4">
      <TableHeader
        view={view}
        search={search}
        showTitle={showTitle}
        onViewChange={handleViewChange}
        onSearchChange={handleSearchChange}
      />

      <TableContainer>
        <TableContent contacts={paginatedContacts} />
      </TableContainer>

      <TablePagination
        currentPage={page}
        pageSize={pageSize}
        totalItems={filteredContacts.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Card>
  );
}
