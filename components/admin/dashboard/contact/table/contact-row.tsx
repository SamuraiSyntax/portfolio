"use client";

import { TableRow } from "@/components/ui/table";
import { Contact } from "@prisma/client";
import { ContactDesktopCell } from "./cells/contact-desktop-cell";
import { ContactMobileCell } from "./cells/contact-mobile-cell";

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
