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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Invoice } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine,
  CreditCard,
  FileText,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InvoiceQuoteDropzone } from "./InvoiceQuoteDropzone";

interface Payment {
  id: string;
  date: Date;
  amount: number;
  method: string;
}

interface ContactInvoicesProps {
  invoices: (Invoice & { payments?: Payment[] })[];
  contactId: string;
  isLoading?: boolean;
}

const INVOICE_STATUS: Record<
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
  SENT: { label: "Envoyée", variant: "default" },
  PAID: { label: "Payée", variant: "success" },
  OVERDUE: { label: "En retard", variant: "destructive" },
  CANCELLED: { label: "Annulée", variant: "outline" },
  PARTIALLY_PAID: { label: "Partiellement payée", variant: "warning" },
};

export function ContactInvoices({
  invoices,
  contactId,
  isLoading,
}: ContactInvoicesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) =>
      invoice.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [invoices, searchTerm]);

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

      const response = await fetch("/api/invoices/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      setUploadProgress(100);
      toast.success("Facture téléchargée avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors du téléchargement de la facture " + error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSendInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/send`, {
        method: "POST",
      });
      if (!response.ok) throw new Error();
      toast.success("Facture envoyée avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la facture " + error);
    }
  };

  const handleDownloadPDF = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/pdf`);
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `facture-${invoiceId}.pdf`;
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
              Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une facture</DialogTitle>
            </DialogHeader>
            <InvoiceQuoteDropzone
              onUpload={handleUpload}
              isUploading={isUploading}
              progress={uploadProgress}
              type="invoice"
            />
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une facture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {filteredInvoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {invoice.reference}
                      </h3>
                      <BadgeWithLabel
                        label=""
                        value={invoice.status}
                        variant={
                          INVOICE_STATUS[
                            invoice.status as keyof typeof INVOICE_STATUS
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
                        {formatCurrency(Number(invoice.totalAmount))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{formatDate(invoice.issueDate)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPDF(invoice.id)}
                    >
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    {invoice.status === "DRAFT" && (
                      <Button
                        size="sm"
                        onClick={() => handleSendInvoice(invoice.id)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer
                      </Button>
                    )}
                    {["SENT", "PARTIALLY_PAID"].includes(invoice.status) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInvoice(invoice.id);
                          setIsDialogOpen(true);
                        }}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Enregistrer paiement
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enregistrer un paiement</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="amount">Montant</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Méthode de paiement</Label>
                <Input
                  id="paymentMethod"
                  placeholder="Ex: Virement, Carte, Chèque..."
                />
              </div>
              <div>
                <Label htmlFor="paymentDate">Date du paiement</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <Button type="submit" className="w-full">
                Enregistrer le paiement
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {filteredInvoices.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune facture</p>
            <p className="text-sm">
              Commencez par créer une nouvelle facture pour ce contact
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
