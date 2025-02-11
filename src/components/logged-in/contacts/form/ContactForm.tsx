import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ContactFormData, contactFormSchema } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ContactFormFields } from "./ContactFormFields";

interface ContactFormProps {
  initialData?: ContactFormData;
  onSuccess?: () => void;
  contactId?: string;
}

export function ContactForm({
  initialData,
  onSuccess,
  contactId,
}: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const totalSteps = 4;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialData || {
      status: "NEW",
      priority: "NORMAL",
      source: "WEBSITE",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/contacts${contactId ? `/${contactId}` : ""}`,
        {
          method: contactId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error();

      toast.success(contactId ? "Contact modifié" : "Contact créé");
      onSuccess?.();
      router.refresh();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création du contact " + error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFormFields form={form} step={step} />

        <div className="flex justify-end gap-2">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Précédent
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Chargement..."
              : step === totalSteps
              ? contactId
                ? "Modifier"
                : "Créer"
              : "Suivant"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
