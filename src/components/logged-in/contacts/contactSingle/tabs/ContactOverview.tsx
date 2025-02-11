"use client";

import { BadgeWithLabel } from "@/components/ui/badge-with-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CreditCard,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { useMemo } from "react";

interface ContactOverviewProps {
  contact: Contact;
  isLoading?: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export function ContactOverview({ contact, isLoading }: ContactOverviewProps) {
  const leadScore = useMemo(() => {
    if (isLoading) return 0;

    let score = 0;
    const scoreMapping = {
      email: 20,
      phone: 15,
      company: 15,
      budget: 25,
      projectType: 25,
      industry: 10,
      website: 10,
      position: 10,
    };

    Object.entries(scoreMapping).forEach(([key, value]) => {
      if (contact[key as keyof Contact]) {
        score += value;
      }
    });

    return Math.min(score, 100);
  }, [contact, isLoading]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Informations personnelles */}
      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
        <Card className="h-full hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score du contact */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Score du contact
                </span>
                <span className={`font-medium ${getScoreColor(leadScore)}`}>
                  {leadScore}%
                </span>
              </div>
              <Progress value={leadScore} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium">
                  {contact.firstName} {contact.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">
                  {contact.position || "Non renseigné"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {contact.email && (
                <div className="flex items-center gap-2 group">
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:underline transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-2 group">
                  <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:underline transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.website && (
                <div className="flex items-center gap-2 group">
                  <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    {contact.website}
                  </a>
                </div>
              )}
            </div>

            {contact.ipAddress && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <p className="text-sm">{contact.ipAddress}</p>
              </div>
            )}

            <div className="pt-4 border-t space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Dernier contact
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">
                      {contact.lastContactDate
                        ? formatDate(contact.lastContactDate)
                        : "Jamais"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Prochaine action
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">
                      {contact.nextFollowUp
                        ? formatDate(contact.nextFollowUp)
                        : "Non planifiée"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-start">
                <p className="text-sm font-medium">Statut</p>
                <BadgeWithLabel
                  label={""}
                  className="justify-center items-center"
                  value={contact.status || "Nouveau"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Opportunité commerciale */}
      <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Opportunité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Valeur potentielle
                </p>
                <p className="font-medium">
                  {contact.potentialValue
                    ? formatCurrency(contact.potentialValue)
                    : "Non estimée"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget déclaré</p>
                <p className="font-medium">
                  {contact.budget
                    ? formatCurrency(contact.budget)
                    : "Non renseigné"}
                </p>
              </div>
            </div>

            {contact.projectType && (
              <BadgeWithLabel
                label="Type de projet"
                value={contact.projectType}
              />
            )}

            {contact.deadline && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: {formatDate(contact.deadline)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Message initial */}
      {contact.message && (
        <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message initial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{contact.message}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
