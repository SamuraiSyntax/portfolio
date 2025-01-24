"use client";

import { BasicFields } from "@/components/contact/BasicFields";
import { MessageField } from "@/components/contact/MessageField";
import { OptionalFields } from "@/components/contact/OptionalFields";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { FormValues, formSchema } from "@/lib/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";

interface ContactFormProps {
  onClose: () => void;
}

const formAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const steps = [
  {
    title: "Informations de base",
    subtitle: "Commençons par faire connaissance",
  },
  { title: "Votre message", subtitle: "Décrivez votre projet" },
  {
    title: "Détails additionnels",
    subtitle: "Ajoutez plus d'informations (optionnel)",
  },
];

export function ContactForm({ onClose }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      company: "",
      clientType: "",
      projectType: "",
      budget: "",
      deadline: "",
      existingSite: "",
    },
  });

  const { name, email, message } = form.watch();
  const errors = form.formState.errors;

  const canProceedToStep2 = name && email && !errors.name && !errors.email;
  const canProceedToStep3 = message && !errors.message;

  const handleNext = () => {
    if (currentStep === 0 && !canProceedToStep2) {
      toast.error("Veuillez remplir correctement tous les champs");
      return;
    }
    if (currentStep === 1 && !canProceedToStep3) {
      toast.error("Veuillez ajouter un message valide");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        if (result.remainingTime) {
          const minutes = Math.ceil(result.remainingTime / (1000 * 60));
          toast.error(`${result.error} Réessayez dans ${minutes} minutes.`);
        } else {
          toast.error(result.error);
        }
        return;
      }

      toast.success("Message envoyé avec succès!");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <motion.div
        variants={formAnimation}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <DialogHeader className="space-y-3 mb-6">
          <DialogTitle className="text-xl font-semibold">
            {steps[currentStep].title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {steps[currentStep].subtitle}
          </p>
          <Progress
            value={(currentStep + 1) * (100 / steps.length)}
            className="h-1.5 transition-all duration-300"
          />
        </DialogHeader>

        <motion.form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={formAnimation}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <BasicFields form={form} />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <MessageField form={form} />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    {!showOptionalFields ? (
                      <div className="flex flex-col items-center gap-4 py-4">
                        <p className="text-center text-muted-foreground">
                          Souhaitez-vous ajouter plus de détails à votre message
                          ?
                        </p>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowOptionalFields(true)}
                          >
                            Ajouter des détails
                          </Button>
                          <Button
                            type="submit"
                            className={neobrutalismClassPrimary}
                            disabled={isSubmitting}
                          >
                            Envoyer maintenant
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <OptionalFields form={form} />
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between gap-4 pt-4 border-t">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <FaArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            )}

            {currentStep < 2 ? (
              <Button
                type="button"
                onClick={handleNext}
                className={`${neobrutalismClassPrimary} ml-auto`}
              >
                Suivant
                <FaArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              showOptionalFields && (
                <Button
                  type="submit"
                  className={`${neobrutalismClassPrimary} ml-auto`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Envoi...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaPaperPlane className="h-4 w-4" />
                      Envoyer
                    </span>
                  )}
                </Button>
              )
            )}
          </div>
        </motion.form>
      </motion.div>
    </Form>
  );
}
