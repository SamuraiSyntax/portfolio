"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function RGPDRights() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rightType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    // Par exemple, envoyer un email ou sauvegarder dans une base de données
    console.log("Formulaire soumis:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Nom complet
        </label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rightType" className="block text-sm font-medium">
          Type de droit à exercer
        </label>
        <Select
          value={formData.rightType}
          onValueChange={(value) =>
            setFormData({ ...formData, rightType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un droit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="access">
              Droit d&apos;accès aux données
            </SelectItem>
            <SelectItem value="rectification">
              Droit de rectification
            </SelectItem>
            <SelectItem value="erasure">Droit à l&apos;effacement</SelectItem>
            <SelectItem value="limitation">Droit à la limitation</SelectItem>
            <SelectItem value="portability">Droit à la portabilité</SelectItem>
            <SelectItem value="opposition">Droit d&apos;opposition</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Détails de votre demande
        </label>
        <Textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        Envoyer ma demande
      </Button>

      <p className="text-sm text-gray-500 mt-4">
        Votre demande sera traitée dans un délai maximum d&apos;un mois
        conformément au RGPD. Une copie de votre pièce d&apos;identité pourra
        vous être demandée pour confirmer votre identité.
      </p>
    </form>
  );
}
