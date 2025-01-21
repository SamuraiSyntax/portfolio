"use client";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { FaDownload, FaShare } from "react-icons/fa";
import { toast } from "sonner";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PDFViewerModal({
  isOpen,
  onClose,
  pdfUrl,
}: PDFViewerModalProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "CV Bernard Rogier",
          text: "Découvrez mon CV",
          url: window.location.origin + pdfUrl,
        });
      } else {
        await navigator.clipboard.writeText(window.location.origin + pdfUrl);
        toast.success("Lien copié dans le presse-papier !");
      }
    } catch (error) {
      toast.error("Le partage a échoué" + error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] gap-4">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold">Mon CV</DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={neobrutalismClassPrimary}
              onClick={handleShare}
            >
              <FaShare className="mr-2 h-4 w-4" />
              Partager
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={neobrutalismClassPrimary}
              onClick={() => window.open(pdfUrl, "_blank")}
            >
              <FaDownload className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full bg-muted rounded-lg overflow-hidden">
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="w-full h-full"
            title="CV Preview"
          />
        </div>
      </div>
    </Modal>
  );
}
