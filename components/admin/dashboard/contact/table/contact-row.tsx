"use client";

import { ContactDesktopCell } from "@/components/admin/dashboard/contact/table/cells/contact-desktop-cell";
import { ContactMobileCell } from "@/components/admin/dashboard/contact/table/cells/contact-mobile-cell";
import { TableRow } from "@/components/ui/table";
import { Contact } from "@/types/contact";

interface ContactRowProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onAction: (
    action:
      | "archive"
      | "unarchive"
      | "delete"
      | "mark_important"
      | "mark_completed"
      | "mark_in_progress"
  ) => void;
  onView: () => void;
  onEdit: () => void;
  isLoading?: boolean;
}

export function ContactRow(props: ContactRowProps) {
  return (
    <TableRow>
      <ContactMobileCell {...props} />
      <ContactDesktopCell {...props} />
    </TableRow>
  );
}
