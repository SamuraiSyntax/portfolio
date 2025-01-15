"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Contact, ContactStatus, Priority } from "@/types/contact";
import { ExternalLink, MessageSquare } from "lucide-react";
import { useState } from "react";
import { MessageModal } from "../../../modals/message-modal";
import { ContactActions } from "./contact-actions";

interface ContactDesktopCellProps {
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

export function ContactDesktopCell({
  contact,
  isSelected,
  onSelect,
  onAction,
  onView,
  onEdit,
  isLoading,
}: ContactDesktopCellProps) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const getStatusColor = (status: ContactStatus) => {
    const colors = {
      NEW: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      COMPLETED: "bg-green-100 text-green-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.NEW;
  };

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      LOW: "bg-gray-100 text-gray-800",
      NORMAL: "bg-blue-100 text-blue-800",
      HIGH: "bg-yellow-100 text-yellow-800",
      URGENT: "bg-red-100 text-red-800",
    };
    return colors[priority];
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fonction utilitaire pour gérer les tableaux JSON
  const safeArray = <T,>(value: T[] | null): T[] => {
    return Array.isArray(value) ? value : [];
  };

  return (
    <>
      <TableCell className="hidden md:table-cell">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          disabled={isLoading}
        />
      </TableCell>
      {/* Informations personnelles */}
      <TableCell className="hidden md:table-cell font-medium whitespace-nowrap">
        {contact.name}
      </TableCell>
      <TableCell className="hidden md:table-cell truncate whitespace-nowrap">
        {contact.email}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.phone || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.company || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.position || "-"}
      </TableCell>

      {/* Détails du projet */}
      <TableCell className="hidden md:table-cell">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsMessageModalOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          message={contact.message || ""}
          name={contact.name || ""}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.projectType || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.projectScope || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.budget ? formatCurrency(contact.budget) : "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.deadline ? formatDate(contact.deadline) : "-"}
      </TableCell>

      {/* Status et classification */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            contact.status
          )}`}
        >
          {contact.status}
        </span>
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            contact.priority || Priority.LOW
          )}`}
        >
          {contact.priority || Priority.LOW}
        </span>
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {safeArray(contact.tags).length > 0
          ? safeArray(contact.tags).join(", ")
          : "-"}
      </TableCell>

      {/* Informations techniques */}
      <TableCell className="hidden md:table-cell">
        {contact.existingSite ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() =>
                    window.open(contact.existingSite || "", "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{contact.existingSite}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.targetAudience || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {safeArray(contact.competitors).length > 0
          ? safeArray(contact.competitors).join(", ")
          : "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {safeArray(contact.objectives).length > 0
          ? safeArray(contact.objectives).join(", ")
          : "-"}
      </TableCell>

      {/* Informations business */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.clientType || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.industry || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.companySize || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.annualRevenue ? formatCurrency(contact.annualRevenue) : "-"}
      </TableCell>

      {/* Préférences marketing */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.preferredContactMethod || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.marketingSource || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.newsletter ? "Oui" : "Non"}
      </TableCell>

      {/* Suivi commercial */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {formatDate(contact.lastContact)}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {formatDate(contact.nextFollowUp)}
      </TableCell>
      <TableCell className="hidden md:table-cell max-w-[200px] truncate whitespace-nowrap">
        {contact.notes || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.assignedUserId || "-"}
      </TableCell>

      {/* Documents */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {safeArray(contact.attachments).length > 0
          ? `${safeArray(contact.attachments).length} fichier(s)`
          : "-"}
      </TableCell>

      {/* Données financières */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.quotationAmount
          ? formatCurrency(contact.quotationAmount)
          : "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap  ">
        {contact.contractValue ? formatCurrency(contact.contractValue) : "-"}
      </TableCell>

      {/* Métadonnées */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.ipAddress || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.userAgent || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.locale || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {contact.timezone || "-"}
      </TableCell>

      {/* Dates */}
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {formatDate(contact.createdAt)}
      </TableCell>
      <TableCell className="hidden md:table-cell whitespace-nowrap">
        {formatDate(contact.updatedAt)}
      </TableCell>

      {/* Actions */}
      <TableCell className="hidden md:table-cell sticky right-0 bg-background border-l">
        <ContactActions
          contact={contact}
          isLoading={isLoading || false}
          onView={onView}
          onEdit={onEdit}
          onAction={onAction}
        />
      </TableCell>
    </>
  );
}
