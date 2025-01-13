"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact, ContactStatus, Priority } from "@/types/contact";
import {
  Archive,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  History,
  Mail,
  MoreHorizontal,
  Phone,
  Star,
  StarOff,
  Trash,
  Undo,
} from "lucide-react";

interface ContactActionsProps {
  contact: Contact;
  isLoading: boolean;
  onView: () => void;
  onEdit: () => void;
  onAction: (
    action:
      | "archive"
      | "unarchive"
      | "delete"
      | "mark_important"
      | "mark_completed"
      | "mark_in_progress"
  ) => void;
}

export function ContactActions({
  contact,
  isLoading,
  onView,
  onEdit,
  onAction,
}: ContactActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            Voir les détails
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => (window.location.href = `mailto:${contact.email}`)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un email
          </DropdownMenuItem>
          {contact.phone && (
            <DropdownMenuItem
              onClick={() => (window.location.href = `tel:${contact.phone}`)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => onAction("mark_in_progress")}
            disabled={isLoading || contact.status === ContactStatus.IN_PROGRESS}
          >
            <Clock className="h-4 w-4 mr-2" />
            Marquer en cours
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAction("mark_completed")}
            disabled={isLoading || contact.status === ContactStatus.COMPLETED}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marquer comme traité
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("mark_important")}
            disabled={isLoading}
          >
            {contact.priority === Priority.HIGH ? (
              <>
                <StarOff className="h-4 w-4 mr-2" />
                Retirer l&apos;importance
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-2" />
                Marquer comme important
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => onView()}>
            <Calendar className="h-4 w-4 mr-2" />
            Planifier un suivi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onView()}>
            <FileText className="h-4 w-4 mr-2" />
            Ajouter une note
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {contact.status !== ContactStatus.ARCHIVED ? (
            <DropdownMenuItem onClick={() => onAction("archive")}>
              <Archive className="h-4 w-4 mr-2" />
              Archiver
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => onAction("unarchive")}>
              <Undo className="h-4 w-4 mr-2" />
              Désarchiver
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => onAction("delete")}
            className="text-destructive focus:text-destructive"
          >
            <Trash className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onView}>
            <History className="h-4 w-4 mr-2" />
            Voir l&apos;historique
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
