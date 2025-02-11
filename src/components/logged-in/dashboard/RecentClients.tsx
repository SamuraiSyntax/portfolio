import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getPriorityColor,
  getPriorityLabel,
} from "@/hooks/priority/usePriority";
import { getStatusColor, getStatusLabel } from "@/hooks/status/useStatus";
import { Contact, ContactStatus, Priority } from "@/types/contact";
import { Clock, UserPlus } from "lucide-react";
import Link from "next/link";

interface RecentClientsProps {
  contacts: Contact[];
}

export function RecentClients({ contacts }: RecentClientsProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Clients récents
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {contacts.length} nouveaux clients ce mois-ci
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 overflow-auto max-h-[350px]">
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Link
              key={contact.id}
              href={`/dashboard/contacts/${contact.id}`}
              className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {getInitials(contact.firstName, contact.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {contact.email}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end shrink-0">
                <Badge
                  className={`${getStatusColor(
                    contact.status as ContactStatus
                  )} text-xs whitespace-nowrap`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {getStatusLabel(contact.status as ContactStatus)}
                </Badge>

                <Badge
                  variant="outline"
                  className={`${getPriorityColor(
                    contact.priority as Priority
                  )} text-xs whitespace-nowrap`}
                >
                  {getPriorityLabel(contact.priority as Priority)}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
