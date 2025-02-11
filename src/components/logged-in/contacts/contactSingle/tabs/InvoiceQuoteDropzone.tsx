"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface InvoiceQuoteDropzoneProps {
  onUpload: (files: File[], reference: string) => Promise<void>;
  isUploading: boolean;
  progress: number;
  type: "invoice" | "quote";
}

export function InvoiceQuoteDropzone({
  onUpload,
  isUploading,
  progress,
  type,
}: InvoiceQuoteDropzoneProps) {
  const [reference, setReference] = useState("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onUpload(files, reference),
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reference">Référence</Label>
        <Input
          id="reference"
          placeholder={`Référence ${
            type === "invoice" ? "de la facture" : "du devis"
          }`}
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Déposez le fichier ici"
            : `Glissez-déposez un fichier PDF ${
                type === "invoice" ? "de facture" : "de devis"
              } ou cliquez pour sélectionner`}
        </p>
      </div>

      {isUploading && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </Card>
      )}
    </div>
  );
}
