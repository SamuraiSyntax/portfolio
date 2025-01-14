import { Contact } from "@/types/contact";
import { useMemo, useState } from "react";

export function useContactPagination(contacts: Contact[]) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedContacts = useMemo(() => {
    return contacts.slice((page - 1) * pageSize, page * pageSize);
  }, [contacts, page, pageSize]);

  return {
    page,
    pageSize,
    paginatedContacts,
    handlePageChange: setPage,
    handlePageSizeChange: setPageSize,
  };
}
