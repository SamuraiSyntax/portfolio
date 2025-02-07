"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  getPriorityColor,
  getPriorityLabel,
  PRIORITY_OPTIONS,
} from "@/hooks/priority/usePriority";
import {
  getStatusColor,
  getStatusLabel,
  STATUS_OPTIONS,
} from "@/hooks/status/useStatus";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Contact, ContactStatus, Priority } from "@/types/contact";
import {
  Building2,
  Calendar,
  Clock,
  CreditCard,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactDetailsProps {
  contact: Contact;
}

export function ContactDetails({ contact }: ContactDetailsProps) {
  const [status, setStatus] = useState(contact.status);
  const [priority, setPriority] = useState(contact.priority);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }

      setStatus(newStatus as ContactStatus);
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: newPriority }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la priorité");
      }

      setPriority(newPriority as Priority);
      toast.success("Priorité mise à jour avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la mise à jour de la priorité");
    }
  };

  return (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4 rounded-lg shadow-sm hover:shadow-lg hover:bg-muted/10 transition-all duration-300g">
          <div className="flex justify-between gap-4">
            <h2 className="text-lg font-semibold">Informations personnelles</h2>
            <div className="flex gap-4">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-auto p-0 border-0 bg-transparent">
                  <Badge className={getStatusColor(status as ContactStatus)}>
                    <Clock className="h-4 w-4 mr-1" />
                    {getStatusLabel(status as ContactStatus)}
                  </Badge>
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        className={getStatusColor(
                          option.value as ContactStatus
                        )}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-auto p-0 border-0 bg-transparent">
                  <Badge className={getPriorityColor(priority as Priority)}>
                    {getPriorityLabel(priority as Priority)}
                  </Badge>
                </SelectTrigger>

                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        className={getPriorityColor(option.value as Priority)}
                      >
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{contact.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:underline"
              >
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-primary hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.company && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{contact.company}</span>
              </div>
            )}
            {contact.clientType && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Type de client:</span>
                <span>{contact.clientType}</span>
              </div>
            )}
            {contact.companySize && (
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Taille de l&apos;entreprise:
                </span>
                <span>{contact.companySize}</span>
              </div>
            )}
            {contact.industry && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Industrie:</span>
                <span>{contact.industry}</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-4 rounded-lg shadow-sm hover:shadow-lg hover:bg-muted/10 transition-all duration-300">
          <h2 className="text-lg font-semibold">Détails du projet</h2>
          <div className="space-y-2">
            {contact.projectType && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Type de projet:</span>
                <span>{contact.projectType}</span>
              </div>
            )}
            {contact.budget && (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Budget: {formatCurrency(contact.budget)}</span>
              </div>
            )}
            {contact.deadline && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: {formatDate(contact.deadline)}</span>
              </div>
            )}
            {contact.existingSite && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={contact.existingSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Site existant
                </a>
              </div>
            )}
          </div>
        </Card>

        {/* Message */}
        <Card className="col-span-2 p-4 space-y-4 rounded-lg shadow-sm hover:shadow-lg hover:bg-muted/10 transition-all duration-300">
          <h2 className="text-lg font-semibold">Message</h2>
          <p className="whitespace-pre-wrap">{contact.message}</p>
        </Card>
      </div>
    </div>
  );
}
