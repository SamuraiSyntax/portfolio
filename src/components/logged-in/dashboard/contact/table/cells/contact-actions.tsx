"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact, ContactStatus } from "@/types/contact";
import {
  Archive,
  Edit,
  Eye,
  History,
  Mail,
  MoreHorizontal,
  Phone,
  Trash,
  Undo,
} from "lucide-react";
import { toast } from "sonner";

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
  const handleEmailClick = async (email: string) => {
    try {
      // Création du template d'email
      const subject = `RE: ${
        contact.projectType || "Votre demande de contact"
      }`;
      const body = `Bonjour ${
        contact.name
      },\n\nMerci pour votre message concernant ${
        contact.projectType || "votre projet"
      }.\n\nCordialement,\n[Votre nom]`;

      // Construction de l'URL Gmail
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Ouvrir Gmail dans un nouvel onglet
      window.open(gmailUrl, "_blank");
    } catch (error) {
      toast.error("Erreur lors de l'ouverture de Gmail", {
        description: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  };

  const handlePhoneClick = (phone: string | null) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 sticky right-0 bg-background border-l top-[100px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            Voir les détails
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit} disabled={isLoading}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleEmailClick(contact.email)}>
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un email
          </DropdownMenuItem>
          {contact.phone && (
            <DropdownMenuItem onClick={() => handlePhoneClick(contact.phone)}>
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {contact.status !== ContactStatus.ARCHIVED ? (
            <DropdownMenuItem
              onClick={() => onAction("archive")}
              disabled={isLoading}
            >
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
