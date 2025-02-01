"use client";

import { ContactDetails } from "@/components/admin/dashboard/contact/contact-details";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Contact } from "@/types/contact";
import { ArrowLeft, Edit } from "lucide-react";
import { redirect } from "next/navigation";

export function ContactPage({ contact, id }: { contact: Contact; id: string }) {
  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redirect("/admin/contacts")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Détails du contact</h1>
        </div>
        <Button onClick={() => redirect(`/admin/contacts/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>

      <Card className="p-6">
        <ContactDetails contact={contact} />
      </Card>
    </div>
  );
}
