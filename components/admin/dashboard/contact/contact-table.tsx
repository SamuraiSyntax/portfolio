"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Contact, ContactStatus } from "@/types/contact";
import { Archive, Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ContactHead } from "./table/contact-head";
import { ContactRow } from "./table/contact-row";

interface ContactTableProps {
  contacts: Contact[];
  defaultView?: "all" | "recent" | "archived";
  showTitle?: boolean;
}

export function ContactTable({
  contacts,
  defaultView = "all",
  showTitle = true,
}: ContactTableProps) {
  const router = useRouter();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(defaultView);

  const getTitle = () => {
    switch (view) {
      case "archived":
        return "Messages archivés";
      case "recent":
        return "Messages récents";
      default:
        return "Tous les messages";
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    switch (view) {
      case "archived":
        return contact.status === ContactStatus.ARCHIVED;
      case "recent":
        return contact.status !== ContactStatus.ARCHIVED;
      default:
        return true;
    }
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(
      checked ? filteredContacts.map((contact) => contact.id) : []
    );
  };

  const handleSelect = (contactId: string, checked: boolean) => {
    setSelectedContacts((current) =>
      checked
        ? [...current, contactId]
        : current.filter((id) => id !== contactId)
    );
  };

  const handleBulkAction = async (
    action:
      | "archive"
      | "unarchive"
      | "delete"
      | "mark_important"
      | "mark_completed"
      | "mark_in_progress"
  ) => {
    if (selectedContacts.length === 0) {
      toast.error("Aucun contact sélectionné");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint =
        action === "delete"
          ? "/api/contacts/bulk-delete"
          : "/api/contacts/bulk-update";

      const status =
        action === "archive" ? ContactStatus.ARCHIVED : ContactStatus.NEW;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedContacts,
          status: action !== "delete" ? status : undefined,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success(
        action === "delete"
          ? "Contacts supprimés avec succès"
          : action === "archive"
          ? "Contacts archivés avec succès"
          : "Contacts désarchivés avec succès"
      );

      setSelectedContacts([]);
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingleAction = async (
    contactId: string,
    action:
      | "archive"
      | "unarchive"
      | "delete"
      | "mark_important"
      | "mark_completed"
      | "mark_in_progress"
  ) => {
    setIsLoading(true);
    try {
      const endpoint =
        action === "delete"
          ? `/api/contacts/${contactId}`
          : "/api/contacts/bulk-update";

      const response = await fetch(endpoint, {
        method: action === "delete" ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: [contactId],
          action: action !== "delete" ? action : undefined,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success(
        action === "delete"
          ? "Contact supprimé"
          : action === "archive"
          ? "Contact archivé"
          : action === "unarchive"
          ? "Contact désarchivé"
          : action === "mark_important"
          ? "Priorité mise à jour"
          : "Statut mis à jour"
      );

      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              {showTitle && (
                <CardTitle className="flex items-center justify-between gap-2">
                  {getTitle()}
                </CardTitle>
              )}
              <span className="text-sm text-muted-foreground">
                {filteredContacts.length} contact(s)
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Select
                value={view}
                onValueChange={(value: "all" | "recent" | "archived") =>
                  setView(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par vue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les contacts</SelectItem>
                  <SelectItem value="recent">Messages récents</SelectItem>
                  <SelectItem value="archived">Messages archivés</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => (window.location.href = "/admin/contacts/new")}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 4v16m8-8H4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Nouveau Contact
                </div>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <ContactHead
                    selectedCount={selectedContacts.length}
                    totalCount={filteredContacts.length}
                    onSelectAll={handleSelectAll}
                  />
                  <TableBody>
                    {filteredContacts.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Aucun contact à afficher
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContacts.map((contact) => (
                        <ContactRow
                          key={contact.id}
                          contact={contact}
                          isSelected={selectedContacts.includes(contact.id)}
                          onSelect={(checked) =>
                            handleSelect(contact.id, checked)
                          }
                          onAction={(action) =>
                            handleSingleAction(contact.id, action)
                          }
                          onView={() =>
                            router.push(`/admin/contacts/${contact.id}`)
                          }
                          onEdit={() =>
                            router.push(`/admin/contacts/${contact.id}/edit`)
                          }
                          isLoading={isLoading}
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {selectedContacts.length > 0 && (
                <div className="p-4 border rounded-md flex items-center justify-between bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    {selectedContacts.length} contact(s) sélectionné(s)
                  </span>
                  <div className="flex items-center gap-2">
                    {view !== "archived" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("archive")}
                        disabled={isLoading}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver la sélection
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("unarchive")}
                        disabled={isLoading}
                      >
                        <Undo className="h-4 w-4 mr-2" />
                        Désarchiver la sélection
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleBulkAction("delete")}
                      disabled={isLoading}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Supprimer la sélection
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
