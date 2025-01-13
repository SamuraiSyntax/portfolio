"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Contact, ContactStatus } from "@prisma/client";
import {
  Archive,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
  Undo,
} from "lucide-react";

interface ContactMobileCellProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onAction: (action: "archive" | "unarchive" | "delete") => void;
  onView: () => void;
  onEdit: () => void;
  isLoading?: boolean;
}

export function ContactMobileCell({
  contact,
  isSelected,
  onSelect,
  onAction,
  onView,
  onEdit,
  isLoading,
}: ContactMobileCellProps) {
  const getStatusColor = (status: ContactStatus) => {
    const colors = {
      NEW: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      COMPLETED: "bg-green-100 text-green-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.NEW;
  };

  return (
    <TableCell className="p-4 md:hidden">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            disabled={isLoading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                Voir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              {contact.status !== ContactStatus.ARCHIVED ? (
                <DropdownMenuItem
                  onClick={() => onAction("archive")}
                  disabled={isLoading}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archiver
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onAction("unarchive")}
                  disabled={isLoading}
                >
                  <Undo className="h-4 w-4 mr-2" />
                  Désarchiver
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onAction("delete")}
                disabled={isLoading}
                className="text-destructive"
              >
                <Trash className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <div className="font-medium">{contact.name}</div>
          <div className="text-sm text-muted-foreground">{contact.email}</div>
        </div>
        <div className="text-sm">{contact.message}</div>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              contact.status
            )}`}
          >
            {contact.status}
          </span>
          <span className="text-sm text-muted-foreground">
            {contact.updatedAt.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </TableCell>
  );
}
