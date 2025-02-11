"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Contact, ContactFormData, contactFormSchema } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ContactFormFields } from "./ContactFormFields";
import { StepIndicator } from "./StepIndicator";

interface EditContactFormProps {
  contact?: Contact;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

const steps = [
  { id: 1, title: "Informations personnelles" },
  { id: 2, title: "Informations professionnelles" },
  { id: 3, title: "Projet" },
  { id: 4, title: "Statut et suivi" },
];

export function EditContactForm({
  contact,
  onSuccess,
  mode = "edit",
}: EditContactFormProps) {
  const [isOpen, setIsOpen] = useState(mode === "create");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: contact?.firstName || "",
      lastName: contact?.lastName || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
      mobilePhone: contact?.mobilePhone || "",
      company: contact?.company || "",
      position: contact?.position || "",
      message: contact?.message || "",
      projectType: contact?.projectType || "",
      budget: contact?.budget || undefined,
      deadline: contact?.deadline || undefined,
      existingSite: contact?.existingSite || "",
      status: contact?.status || "NEW",
      priority: contact?.priority || "NORMAL",
      source: contact?.source || "WEBSITE",
      industry: contact?.industry || "",
      companySize: contact?.companySize || "",
      nextFollowUp: contact?.nextFollowUp || undefined,
      newsletter: contact?.newsletter || false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/contacts${contact?.id ? `/${contact.id}` : ""}`,
        {
          method: contact?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok)
        throw new Error(
          mode === "edit"
            ? "Erreur lors de la modification"
            : "Erreur lors de la création"
        );

      toast.success(
        mode === "edit"
          ? "Contact modifié avec succès"
          : "Contact créé avec succès"
      );
      setIsOpen(false);
      onSuccess?.();
      router.refresh();
    } catch (error) {
      toast.error(
        mode === "edit"
          ? "Erreur lors de la modification du contact"
          : "Erreur lors de la création du contact"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Modifier
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {mode === "edit" ? "Modifier le contact" : "Nouveau contact"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ContactFormFields
                  form={form as unknown as UseFormReturn<ContactFormData>}
                  step={currentStep}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-end gap-2 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                >
                  Précédent
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Modification en cours...
                  </>
                ) : currentStep === steps.length ? (
                  "Enregistrer"
                ) : (
                  "Suivant"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
