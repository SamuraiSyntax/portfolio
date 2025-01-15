"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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

interface ContactDetailsProps {
  contact: Contact;
}

export function ContactDetails({ contact }: ContactDetailsProps) {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Informations personnelles</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{contact.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-blue-600">
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-blue-600">
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
          </div>
        </Card>

        <Card className="p-4 space-y-4">
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
                  className="text-blue-600"
                >
                  Site existant
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Statut et priorité */}
      <div className="flex gap-4">
        <Badge className={getStatusColor(contact.status)}>
          <Clock className="h-4 w-4 mr-1" />
          {contact.status}
        </Badge>
        <Badge className={getPriorityColor(contact.priority)}>
          {contact.priority}
        </Badge>
      </div>

      {/* Message */}
      <Card className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Message</h2>
        <p className="whitespace-pre-wrap">{contact.message}</p>
      </Card>

      {/* Métadonnées */}
      <div className="text-sm text-muted-foreground">
        <p>Créé le {formatDate(contact.createdAt)}</p>
        <p>Dernière modification le {formatDate(contact.updatedAt)}</p>
      </div>
    </div>
  );
}
