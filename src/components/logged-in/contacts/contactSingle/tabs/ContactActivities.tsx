"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { JsonValue } from "@prisma/client/runtime/library";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity as ActivityIcon,
  AlertCircle,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Activity {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  details: JsonValue | null;
  createdAt: Date;
  userId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  contactId: string | null;
}

interface ActivityFormData {
  action: string;
  entityType: string;
  details: {
    description?: string;
    outcome?: string;
    nextSteps?: string;
  };
}

interface ActivityDetails {
  description?: string;
  nextSteps?: string;
  outcome?: string;
}

const ITEMS_PER_PAGE = 10;

const ACTION_TYPES = {
  EMAIL_SENT: { label: "Email envoyé", icon: Mail },
  CALL_MADE: { label: "Appel effectué", icon: Phone },
  MEETING_SCHEDULED: { label: "Rendez-vous planifié", icon: Calendar },
  DOCUMENT_SHARED: { label: "Document partagé", icon: FileText },
  STATUS_UPDATED: { label: "Statut mis à jour", icon: Settings },
  NOTE_ADDED: { label: "Note ajoutée", icon: MessageSquare },
  CONTACT_CREATED: { label: "Contact créé", icon: User },
  ALERT_TRIGGERED: { label: "Alerte déclenchée", icon: AlertCircle },
};

export function ContactActivities({
  activities,
  contactId,
  isLoading,
}: {
  activities: Activity[];
  contactId: string;
  isLoading: boolean;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const details = activity.details as ActivityDetails;
      return (
        details?.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [activities, searchTerm]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddActivity = async (formData: ActivityFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/contacts/${contactId}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'activité");

      toast.success("Activité ajoutée avec succès");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'activité");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Activités récentes</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[200px]"
          />
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <div className="space-y-4">
            {paginatedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 bg-muted rounded-full">
                  {(() => {
                    const Icon =
                      ACTION_TYPES[activity.action as keyof typeof ACTION_TYPES]
                        .icon;
                    return <Icon className="h-4 w-4" />;
                  })()}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {ACTION_TYPES[
                          activity.action as keyof typeof ACTION_TYPES
                        ]?.label || activity.action}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                    {activity.userId && (
                      <Badge variant="outline" className="ml-2">
                        {activity.userId}
                      </Badge>
                    )}
                  </div>

                  {(activity.details as ActivityDetails)?.description && (
                    <p className="mt-2 text-sm">
                      {(activity.details as ActivityDetails).description}
                    </p>
                  )}

                  {(activity.details as ActivityDetails)?.nextSteps && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm font-medium">Prochaines étapes</p>
                      <p className="text-sm text-muted-foreground">
                        {(activity.details as ActivityDetails).nextSteps}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <ActivityIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune activité trouvée</p>
              </div>
            )}
          </div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
