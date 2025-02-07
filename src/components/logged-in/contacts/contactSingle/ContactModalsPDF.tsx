"use client";

import {
  ContactInfosPDF,
  ContactMessagePDF,
  ContactPDFViewer,
  ProjectPDF,
} from "@/components/logged-in/contacts/contactSingle/ContactPDF";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact } from "@/types/contact";
import { ExtendedProject } from "@/types/project";
import { Project } from "@prisma/client";
import { pdf } from "@react-pdf/renderer";
import { Download, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactModalsPDFProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  contact: Contact;
  project: Project;
}

export function ContactModalsPDF({
  isModalOpen,
  setIsModalOpen,
  contact,
  project,
}: ContactModalsPDFProps) {
  const [typePDF, setTypePDF] = useState<"infos" | "message" | "project">(
    "infos"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectChange = (value: "infos" | "message" | "project") => {
    setTypePDF(value);
    setIsModalOpen(true); // Ouvre le modal lorsque l'élément est sélectionné
  };

  // Fonction pour générer le PDF
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      let component;
      if (typePDF === "infos") {
        component = <ContactInfosPDF contact={contact as Contact} />;
      } else if (typePDF === "project") {
        component = <ProjectPDF project={project as ExtendedProject} />;
      } else {
        component = <ContactMessagePDF contact={contact as Contact} />;
      }

      const blob = await pdf(component).toBlob();
      return blob;
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  // Fonction pour sauvegarder sur Google Drive
  const saveToGoogleDrive = async (blob: Blob, fileName: string) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, fileName);
      formData.append("name", fileName);
      formData.append("clientId", contact.id); // Ajouter l'ID du client

      const response = await fetch("/api/google-drive/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde sur Google Drive");
      }

      const data = await response.json();
      console.log("Fichier sauvegardé sur Google Drive:", data);

      // Vous pouvez utiliser data.webViewLink pour accéder au fichier
      return data;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde sur Google Drive:", error);
      throw error;
    }
  };

  // Modifier la fonction handleDownload
  const handleDownload = async () => {
    try {
      const blob = await generatePDF();
      const fileName = `${
        typePDF === "infos"
          ? "contact"
          : typePDF === "project"
          ? "projet"
          : "message"
      }_${contact.name}.pdf`;

      // Upload sur Google Drive
      const driveResponse = await saveToGoogleDrive(blob, fileName);

      if (driveResponse.success) {
        // Télécharger le fichier depuis Google Drive
        window.open(driveResponse.webViewLink, "_blank");

        // Afficher un message de succès
        toast.success(
          "Document sauvegardé sur Google Drive et téléchargé avec succès"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde du document");
    }
  };

  // Fonction pour envoyer par email
  const handleEmail = async () => {
    try {
      const blob = await generatePDF();
      const fileName = `${
        typePDF === "infos"
          ? "contact"
          : typePDF === "project"
          ? "projet"
          : "message"
      }_${contact.name}.pdf`;

      // Upload sur Google Drive
      const driveResponse = await saveToGoogleDrive(blob, fileName);

      if (driveResponse.success) {
        // Préparer l'email avec le lien Google Drive
        const subject = `${
          typePDF === "infos"
            ? "Informations contact"
            : typePDF === "project"
            ? "Cadrage projet"
            : "Message"
        } - ${contact.name}`;
        const body = `Veuillez trouver ci-joint le lien vers le document PDF : ${driveResponse.webViewLink}`;

        // Créer un lien mailto avec Gmail
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Ouvrir Gmail dans un nouvel onglet
        window.open(mailtoLink, "_blank");

        toast.success("Document sauvegardé sur Google Drive et email préparé");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi par email:", error);
      toast.error("Erreur lors de la préparation de l'email");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Prévisualisation d&apos;un PDF</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Choisissez une option</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleSelectChange("infos")}>
            <FileText className="w-4 h-4 mr-2" />
            Infos du contact
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectChange("project")}>
            <FileText className="w-4 h-4 mr-2" />
            Cadrage de projet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-full w-full min-w-[90vw] min-h-[90vh] overflow-y-auto flex flex-col">
          <DialogHeader className="h-auto">
            <DialogTitle>
              Prévisualisation du PDF{" "}
              {typePDF === "infos"
                ? "Infos"
                : typePDF === "project"
                ? "Cadrage de projet"
                : "Message"}
            </DialogTitle>
            <DialogDescription>
              {typePDF === "infos"
                ? "Prévisualisation du PDF avec les informations du contact"
                : typePDF === "project"
                ? "Prévisualisation du PDF avec les informations du cadrage de projet"
                : "Prévisualisation du PDF avec le message du contact"}
            </DialogDescription>
          </DialogHeader>

          <div
            id="preview-pdf"
            className="grid grid-cols-1 gap-4 py-4 h-full grow"
          >
            <ContactPDFViewer
              typePDF={typePDF}
              contact={contact}
              project={project as ExtendedProject}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
            <Button
              onClick={handleEmail}
              disabled={isGenerating}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Envoyer par email
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
