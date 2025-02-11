import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatBudget, formatDate } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { Building2, Edit, Globe, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

export function InfosClient({ project }: { project: ProjectWithRelations }) {
  const client = project.client;
  const fullName = `${client.firstName} ${client.lastName}`.trim();

  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle>Informations Client</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex-1 space-y-6">
              {/* En-tête avec nom et actions */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`}
                    />
                    <AvatarFallback className="text-xl bg-primary/5">
                      {fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-semibold mb-2">
                      <Link
                        href={`/dashboard/contacts/${client.id}`}
                        className="hover:text-primary transition-colors hover:underline"
                      >
                        {fullName}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-sm">
                        {client.industry || "Secteur non spécifié"}
                      </Badge>
                      {client.position && (
                        <Badge variant="secondary" className="text-sm">
                          {client.position}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/contacts/${client.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                </Button>
              </div>

              <Separator />

              {/* Informations de contact principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactInfo
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={client.email}
                  isLink
                />
                <ContactInfo
                  icon={<Phone className="h-4 w-4" />}
                  label="Téléphone"
                  value={client.phone}
                />
                <ContactInfo
                  icon={<Building2 className="h-4 w-4" />}
                  label="Entreprise"
                  value={client.company}
                  badge={
                    client.companySize
                      ? `${client.companySize} employés`
                      : undefined
                  }
                />
                <ContactInfo
                  icon={<Globe className="h-4 w-4" />}
                  label="Site web"
                  value={client.existingSite}
                  isLink
                />
              </div>

              <Separator />

              {/* Informations complémentaires */}
              <div>
                <h4 className="text-sm font-medium mb-4">
                  Informations complémentaires
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 rounded-lg p-6">
                  <MetricCard
                    label="Chiffre d'affaires"
                    value={
                      client.annualRevenue
                        ? formatBudget(client.annualRevenue)
                        : "Non renseigné"
                    }
                    icon={<Building2 className="h-4 w-4" />}
                  />
                  <MetricCard
                    label="Dernier contact"
                    value={
                      client.lastContact
                        ? formatDate(client.lastContact)
                        : "Non renseigné"
                    }
                    icon={<User className="h-4 w-4" />}
                  />
                  <MetricCard
                    label="Prochain suivi"
                    value={
                      client.nextFollowUp
                        ? formatDate(client.nextFollowUp)
                        : "Non planifié"
                    }
                    className={
                      client.nextFollowUp && isDateSoon(client.nextFollowUp)
                        ? "text-orange-600"
                        : ""
                    }
                  />
                  <MetricCard
                    label="Méthode de contact préférée"
                    value={client.preferredContactMethod || "Non spécifiée"}
                    icon={<Phone className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
  isLink?: boolean;
  badge?: string;
}

function ContactInfo({ icon, label, value, isLink, badge }: ContactInfoProps) {
  if (!value) return null;

  const content = (
    <div className="flex items-center gap-3 group">
      <div className="p-2 rounded-md bg-muted/50 group-hover:bg-muted/80 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">{value}</p>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  if (isLink) {
    const href = value.startsWith("http")
      ? value
      : label.toLowerCase() === "email"
      ? `mailto:${value}`
      : label.toLowerCase() === "téléphone"
      ? `tel:${value}`
      : value;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target={value.startsWith("http") ? "_blank" : undefined}
            rel={value.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:text-primary transition-colors flex flex-col items-start"
          >
            {content}
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Cliquez pour{" "}
            {label.toLowerCase() === "email" ? "envoyer un email" : "ouvrir"}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

interface MetricCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

function MetricCard({ label, value, icon, className = "" }: MetricCardProps) {
  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  );
}

function isDateSoon(date: Date): boolean {
  const now = new Date();
  const followUpDate = new Date(date);
  const diffDays = Math.ceil(
    (followUpDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 7 && diffDays >= 0;
}
