"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { Communication } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  LucideIcon,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 5;

type CommunicationType = "EMAIL" | "PHONE" | "MEETING" | "OTHER";

const COMMUNICATION_TYPES: Record<
  CommunicationType,
  {
    label: string;
    icon: LucideIcon;
  }
> = {
  EMAIL: { label: "Email", icon: Mail },
  PHONE: { label: "Téléphone", icon: Phone },
  MEETING: { label: "Rendez-vous", icon: Calendar },
  OTHER: { label: "Autre", icon: MessageSquare },
};

interface ContactCommunicationsProps {
  communications: Communication[];
  contactId: string;
  isLoading?: boolean;
}

export function ContactCommunications({
  communications,
  contactId,
  isLoading,
}: ContactCommunicationsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrage et recherche optimisés avec useMemo
  const filteredCommunications = useMemo(() => {
    return communications.filter((comm) =>
      comm.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communications, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredCommunications.length / ITEMS_PER_PAGE);
  const paginatedCommunications = filteredCommunications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddCommunication = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/contacts/${contactId}/communications`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      toast.success("Communication ajoutée avec succès");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la communication");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between">
        <CardTitle>Communications</CardTitle>
        <div className="flex items-center flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle communication
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une communication</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCommunication(new FormData(e.currentTarget));
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="type">Type de communication</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(COMMUNICATION_TYPES).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <value.icon className="h-4 w-4" />
                              {value.label}
                            </div>
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea
                    id="content"
                    name="content"
                    required
                    placeholder="Détails de la communication..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcome">Résultat</Label>
                  <Textarea
                    id="outcome"
                    name="outcome"
                    placeholder="Résultat de la communication..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextSteps">Prochaines étapes</Label>
                  <Textarea
                    id="nextSteps"
                    name="nextSteps"
                    placeholder="Actions à suivre..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Ajout en cours..." : "Ajouter"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence>
          <div className="space-y-4">
            {paginatedCommunications.map((comm, index) => (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-muted rounded-full">
                    {(() => {
                      const Icon =
                        COMMUNICATION_TYPES[comm.type as CommunicationType]
                          .icon;
                      return <Icon className="h-4 w-4" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {
                            COMMUNICATION_TYPES[comm.type as CommunicationType]
                              .label
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(comm.date)}
                        </p>
                      </div>
                      <Badge variant="outline">{comm.type}</Badge>
                    </div>

                    <p className="mt-2 text-sm">{comm.content}</p>

                    {comm.outcome && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-sm font-medium">Résultat</p>
                        <p className="text-sm text-muted-foreground">
                          {comm.outcome}
                        </p>
                      </div>
                    )}

                    {comm.nextSteps && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-sm font-medium">Prochaines étapes</p>
                        <p className="text-sm text-muted-foreground">
                          {comm.nextSteps}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Pagination améliorée */}
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

        {filteredCommunications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune communication trouvée</p>
            <p className="text-sm">
              Commencez par ajouter une nouvelle communication
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
