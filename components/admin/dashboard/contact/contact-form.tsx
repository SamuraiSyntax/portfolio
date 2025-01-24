"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContactStatus, Priority } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
  contact?: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    message: string;
    clientType?: string | null;
    projectType?: string | null;
    budget?: number | null;
    status: ContactStatus;
    priority: Priority;
    updatedAt: Date;
    deadline?: Date | null;
    existingSite?: string | null;
  };
  isEditing?: boolean;
}

export function ContactForm({ contact, isEditing = false }: ContactFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const endpoint = isEditing
        ? `/api/contacts/${contact?.id}`
        : "/api/contacts";

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Une erreur est survenue");

      toast.success(
        isEditing ? "Contact modifié avec succès" : "Contact créé avec succès"
      );
      router.push("/admin/contacts");
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 px-2">
          <Label htmlFor="name">Nom *</Label>
          <Input id="name" name="name" required defaultValue={contact?.name} />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={contact?.email}
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Numéro de téléphone"
            defaultValue={contact?.phone || ""}
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            name="company"
            placeholder="Nom de l'entreprise"
            defaultValue={contact?.company || ""}
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="clientType">Type de client</Label>
          <Select name="clientType" defaultValue={contact?.clientType || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PARTICULIER">Particulier</SelectItem>
              <SelectItem value="ENTREPRISE">Entreprise</SelectItem>
              <SelectItem value="ASSOCIATION">Association</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="projectType">Type de projet</Label>
          <Select name="projectType" defaultValue={contact?.projectType || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SITE_VITRINE">Site Vitrine</SelectItem>
              <SelectItem value="E_COMMERCE">E-Commerce</SelectItem>
              <SelectItem value="APPLICATION">Application</SelectItem>
              <SelectItem value="AUTRE">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            placeholder="Budget"
            defaultValue={contact?.budget || ""}
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="deadline">Date limite</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={
              contact?.deadline
                ? contact.deadline.toISOString().split("T")[0]
                : ""
            }
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="existingSite">Site existant</Label>
          <Input
            id="existingSite"
            name="existingSite"
            placeholder="URL du site existant"
            defaultValue={contact?.existingSite || ""}
          />
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            name="status"
            defaultValue={contact?.status || ContactStatus.NEW}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContactStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2 px-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          className="min-h-[100px]"
          placeholder="Message du contact"
          defaultValue={contact?.message}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : isEditing ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
