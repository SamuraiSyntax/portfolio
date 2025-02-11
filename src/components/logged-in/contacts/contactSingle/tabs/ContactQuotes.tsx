"use client";

import { BadgeWithLabel } from "@/components/ui/badge-with-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Quote } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, FileText, Plus, Search, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InvoiceQuoteDropzone } from "./InvoiceQuoteDropzone";

interface ContactQuotesProps {
  quotes: Quote[];
  contactId: string;
  isLoading?: boolean;
}

const QUOTE_STATUS: Record<
  string,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "success"
      | "destructive"
      | "warning"
      | "outline";
  }
> = {
  DRAFT: { label: "Brouillon", variant: "secondary" },
  SENT: { label: "Envoyé", variant: "secondary" },
  ACCEPTED: { label: "Accepté", variant: "success" },

  REJECTED: { label: "Refusé", variant: "destructive" },
  EXPIRED: { label: "Expiré", variant: "warning" },
};

export function ContactQuotes({
  quotes,
  contactId,
  isLoading,
}: ContactQuotesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) =>
      quote.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quotes, searchTerm]);

  const handleUpload = async (files: File[], reference: string) => {
    if (!reference) {
      toast.error("La référence est obligatoire");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("reference", reference);
      formData.append("contactId", contactId);

      const response = await fetch("/api/quotes/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      setUploadProgress(100);
      toast.success("Devis téléchargé avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors du téléchargement du devis " + error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSendQuote = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}/send`, {
        method: "POST",
      });
      if (!response.ok) throw new Error();
      toast.success("Devis envoyé avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du devis " + error);
    }
  };

  const handleDownloadPDF = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}/pdf`);
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `devis-${quoteId}.pdf`;
      a.click();
    } catch (error) {
      toast.error("Erreur lors du téléchargement du PDF " + error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau devis
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un devis</DialogTitle>
            </DialogHeader>
            <InvoiceQuoteDropzone
              onUpload={handleUpload}
              isUploading={isUploading}
              progress={uploadProgress}
              type="quote"
            />
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un devis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {filteredQuotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {quote.reference}
                      </h3>
                      <BadgeWithLabel
                        label=""
                        value={quote.status}
                        variant={
                          QUOTE_STATUS[
                            quote.status as keyof typeof QUOTE_STATUS
                          ].variant
                        }
                        useLabel={true}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Montant</p>
                      <p className="text-lg font-medium">
                        {formatCurrency(Number(quote.totalAmount))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{formatDate(quote.issueDate)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPDF(quote.id)}
                    >
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    {quote.status === "DRAFT" && (
                      <Button
                        size="sm"
                        onClick={() => handleSendQuote(quote.id)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredQuotes.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucun devis</p>
            <p className="text-sm">Créez un nouveau devis pour ce contact</p>
          </Card>
        )}
      </div>
    </div>
  );
}
