"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { Building2, CreditCard, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

interface ContactDetailsProps {
  contact: Contact;
}

export function ContactDetails({ contact }: ContactDetailsProps) {
  return (
    <div className="p-4 space-y-4 bg-muted/50">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Nom:</span> {contact.name}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>{" "}
              <Link
                href={`mailto:${contact.email}`}
                className="text-primary hover:underline"
              >
                {contact.email}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Téléphone:</span>{" "}
              {contact.phone || "-"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations professionnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Entreprise:</span>{" "}
              {contact.company || "-"}
            </div>
            <div>
              <span className="font-medium">Poste:</span>{" "}
              {contact.position || "-"}
            </div>
            <div>
              <span className="font-medium">Secteur:</span>{" "}
              {contact.industry || "-"}
            </div>
            <div>
              <span className="font-medium">Taille entreprise:</span>{" "}
              {contact.companySize || "-"}
            </div>
            {contact.annualRevenue && (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">CA annuel:</span>{" "}
                {formatCurrency(contact.annualRevenue)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suivi commercial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Dernier contact:</span>{" "}
              {contact.lastContactDate
                ? formatDate(contact.lastContactDate)
                : "-"}
            </div>
            <div>
              <span className="font-medium">Prochaine relance:</span>{" "}
              {contact.nextFollowUp ? formatDate(contact.nextFollowUp) : "-"}
            </div>
            <div>
              <span className="font-medium">Statut:</span> {contact.status}
            </div>
            <div>
              <span className="font-medium">Type de client:</span>{" "}
              {contact.clientType || "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      {contact.projectType || contact.budget ? (
        <Card>
          <CardHeader>
            <CardTitle>Projet potentiel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {contact.projectType && (
              <div>
                <span className="font-medium">Type de projet:</span>{" "}
                {contact.projectType}
              </div>
            )}
            {contact.budget && (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Budget:</span>{" "}
                {formatCurrency(contact.budget)}
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
