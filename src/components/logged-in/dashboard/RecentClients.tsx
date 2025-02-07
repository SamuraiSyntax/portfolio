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
import { Clock } from "lucide-react";
import Link from "next/link";

interface RecentClientsProps {
  contacts: Contact[];
}

export function RecentClients({ contacts }: RecentClientsProps) {
  return (
    <div className="col-span-2 md:col-span-1">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Clients récents</CardTitle>
          <CardDescription>
            Vous avez eu {contacts.length} nouveaux clients ce mois-ci.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 px-4 pb-4">
          <div className="mt-4">
            {contacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/dashboard/contacts/${contact.id}`}
                className="flex items-center gap-2 hover:bg-primary/10 p-2 rounded-md"
              >
                <Avatar>
                  <AvatarFallback className="text-lg bg-primary text-white">
                    {contact.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1 grow">
                  <p className="text-sm font-medium">{contact.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {contact.email}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge
                    className={`${getStatusColor(
                      contact.status as ContactStatus
                    )} whitespace-nowrap`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {getStatusLabel(contact.status as ContactStatus)}
                  </Badge>

                  <Badge
                    className={`${getPriorityColor(
                      contact.priority as Priority
                    )} whitespace-nowrap`}
                  >
                    {getPriorityLabel(contact.priority as Priority)}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
