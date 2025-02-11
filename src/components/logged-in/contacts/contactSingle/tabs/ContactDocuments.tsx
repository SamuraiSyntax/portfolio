"use client";

import { DocumentDropzone } from "@/components/logged-in/contacts/contactSingle/tabs/DocumentDropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatFileSize } from "@/lib/utils";
import { Document } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  File,
  FileText,
  Image,
  Paperclip,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const DOCUMENT_TYPES = {
  PDF: { icon: FileText, color: "text-red-500" },
  IMAGE: { icon: Image, color: "text-blue-500" },
  OTHER: { icon: File, color: "text-gray-500" },
};

interface ContactDocumentsProps {
  documents: Document[];
  contactId: string;
  isLoading?: boolean;
}

export function ContactDocuments({
  documents,
  contactId,
  isLoading,
}: ContactDocumentsProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm]);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("contactId", contactId);

        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Erreur lors de l'upload");

        setUploadProgress((prev) => prev + 100 / files.length);
      }

      toast.success("Documents téléchargés avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors du téléchargement des documents");
      console.error(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      toast.success("Document supprimé avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression du document");
      console.error(error);
    }
  };

  const getDocumentTypeIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (extension === "pdf") return DOCUMENT_TYPES.PDF;
    if (["jpg", "jpeg", "png", "gif"].includes(extension || ""))
      return DOCUMENT_TYPES.IMAGE;
    return DOCUMENT_TYPES.OTHER;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-md border bg-background"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter des documents</DialogTitle>
              </DialogHeader>
              <DocumentDropzone
                onUpload={handleUpload}
                isUploading={isUploading}
                progress={uploadProgress}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredDocuments.map((doc, index) => {
            const DocIcon = getDocumentTypeIcon(doc.filename).icon;
            const iconColor = getDocumentTypeIcon(doc.filename).color;

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${iconColor} bg-muted`}>
                      <DocIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-medium truncate">{doc.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(doc.size)} • Ajouté le{" "}
                            {formatDate(doc.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(doc.url, "_blank")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          <Paperclip className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucun document</p>
          <p className="text-sm">Ajoutez des documents pour ce contact</p>
        </Card>
      )}
    </div>
  );
}
