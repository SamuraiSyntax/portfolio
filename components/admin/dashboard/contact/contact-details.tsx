"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getPriorityColor,
  getPriorityLabel,
} from "@/hooks/priority/usePriority";
import { getStatusColor, getStatusLabel } from "@/hooks/status/useStatus";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
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
  return (
    <div className="space-y-6">
      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Informations personnelles</h2>
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
            {contact.locale && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Langue:</span>
                <span>{contact.locale}</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-4 shadow-md rounded-lg">
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
            {contact.notes && (
              <div className="flex flex-col items-start gap-2">
                <span className="font-medium">Notes:</span>
                <span>{contact.notes}</span>
              </div>
            )}
            {contact.objectives && (
              <div className="flex flex-col items-start gap-2">
                <span className="font-medium">Objectifs:</span>
                <span>{contact.objectives}</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Statut et priorité */}
      <div className="flex gap-4">
        <Badge className={getStatusColor(contact.status)}>
          <Clock className="h-4 w-4 mr-1" />
          {getStatusLabel(contact.status)}
        </Badge>
        <Badge className={getPriorityColor(contact.priority)}>
          {getPriorityLabel(contact.priority)}
        </Badge>
      </div>

      {/* Message */}
      <Card className="p-4 space-y-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold">Message</h2>
        <p className="whitespace-pre-wrap">{contact.message}</p>
      </Card>

      {/* Métadonnées */}
      <div className="flex flex-row justify-between gap-2 text-sm text-muted-foreground">
        <p>Créé le {formatDate(contact.createdAt)}</p>
        <p>Dernière modification le {formatDate(contact.updatedAt)}</p>
      </div>
    </div>
  );
}
