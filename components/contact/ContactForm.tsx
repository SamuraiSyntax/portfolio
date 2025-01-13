"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { FormValues, formSchema } from "@/lib/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";
import { ContactFormFields } from "./ContactFormFields";

interface ContactFormProps {
  onClose: () => void;
}

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isFieldValid = (value: string, fieldName: keyof FormValues) =>
    value.length > 0 && !errors[fieldName];

  const validFieldsCount = [
    isFieldValid(name || "", "name"),
    isFieldValid(email || "", "email"),
    isFieldValid(message || "", "message"),
  ].filter(Boolean).length;

  const progress = (validFieldsCount / 3) * 100;

  const handleSubmit = async (data: FormValues) => {
    if (progress !== 100) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Données soumises:", data);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      const result = await response.json();
      console.log("Réponse:", result);

      toast.success("Message envoyé avec succès!");
      form.reset();
      onClose();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        variants={formAnimation}
        initial="hidden"
        animate="show"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <ContactFormFields form={form} />

        {/* Barre de progression et bouton */}
        <motion.div
          variants={formAnimation}
          className="sticky bottom-0 space-y-2 bg-background/80 backdrop-blur-sm pt-4"
        >
          <div className="space-y-1">
            <Progress
              value={progress}
              className="h-1 transition-all duration-300"
            />
            <p className="text-xs text-muted-foreground text-center">
              {progress === 100 ? (
                <span className="text-primary">Formulaire complet ✨</span>
              ) : (
                `Progression : ${Math.round(progress)}%`
              )}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || progress !== 100}
            className={`w-full ${neobrutalismClassPrimary} transition-all duration-300 hover:scale-[1.02]`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FaPaperPlane
                  className={`transition-transform duration-300 ${
                    progress === 100
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-50"
                  }`}
                />
                {progress === 100
                  ? "Envoyer le message"
                  : "Complétez le formulaire"}
              </span>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
