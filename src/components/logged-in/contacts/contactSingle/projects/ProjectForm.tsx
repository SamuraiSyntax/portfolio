"use client";

import { ProjectFormFields } from "@/components/logged-in/contacts/contactSingle/projects/form/ProjectFormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Phase, Prisma, Project, Risk } from "@prisma/client";

import { StepIndicator } from "@/components/ui/step-indicator";
import type { Contact } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  // Section 1: Informations de base
  name: z.string().min(1, "Le nom est requis."),
  clientId: z.string(),
  projectManagerId: z.string().min(1, "Le chef de projet est requis"),
  startDate: z.date(),
  estimatedDeliveryDate: z.date(),

  // Section 2: Contexte et objectifs
  context: z.string().optional(),
  objectives: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  kpis: z.array(z.string()).default([]),

  // Section 3: Périmètre
  scopeIncluded: z.array(z.string()).default([]),
  scopeExcluded: z.array(z.string()).default([]),

  // Section 4: Contraintes
  budgetConstraints: z.string().optional(),
  technicalConstraints: z.string().optional(),
  assumptions: z.array(z.string()).default([]),

  // Section 5: Planning
  phases: z
    .array(
      z.object({
        name: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        responsible: z.string(),
      })
    )
    .default([]),

  // Section 6: Risques
  risks: z
    .array(
      z.object({
        description: z.string(),
        probability: z.string(),
        impact: z.string(),
        solution: z.string(),
      })
    )
    .default([]),

  // Section 7: Validation
  validationCriteria: z.array(z.string()).default([]),
  communicationMethods: z.array(z.string()).default([]),
  nextSteps: z.array(z.string()).default([]),

  // Section 8: Technique
  technologies: z.array(z.string()).default([]),
  productionUrl: z.string().url().optional(),
  integrationDetails: z.string().optional(),
  securityMeasures: z.string().optional(),
  contingencyPlan: z.string().optional(),
  deliverables: z.array(z.string()).default([]),
  validationSteps: z.array(z.string()).default([]),
});

export type FormData = z.infer<typeof FormSchema>;

// Définir le type ProjectWithRelations qui inclut les relations

export type ProjectWithRelations = Project & {
  phases: Phase[];
  risks: Risk[];
};

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  existingProject?: ProjectWithRelations | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  contact: Contact;
}

const convertJsonToStringArray = (
  jsonValue: Prisma.JsonValue | null
): string[] => {
  if (!jsonValue) return [];

  if (Array.isArray(jsonValue)) {
    return jsonValue.filter((item): item is string => typeof item === "string");
  }

  if (typeof jsonValue === "string") {
    return jsonValue.split("\n").filter((line) => line.trim());
  }

  return [];
};

export function ProjectForm({
  onSubmit,
  existingProject,
  isModalOpen,
  setIsModalOpen,
  contact,
}: ProjectFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 8;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: existingProject?.name || "",
      clientId: existingProject?.clientId || contact.id,
      projectManagerId: existingProject?.projectManagerId || "",
      startDate: existingProject?.startDate
        ? new Date(existingProject.startDate)
        : new Date(),
      estimatedDeliveryDate: existingProject?.estimatedDeliveryDate
        ? new Date(existingProject.estimatedDeliveryDate)
        : new Date(),
      context: existingProject?.context || "",
      objectives: convertJsonToStringArray(
        existingProject?.objectives as Prisma.JsonArray
      ),
      scopeIncluded: convertJsonToStringArray(
        existingProject?.scopeIncluded as Prisma.JsonArray
      ),
      scopeExcluded: convertJsonToStringArray(
        existingProject?.scopeExcluded as Prisma.JsonArray
      ),
      budgetConstraints: existingProject?.budgetConstraints || "",
      technicalConstraints: existingProject?.technicalConstraints || "",
      assumptions: convertJsonToStringArray(
        existingProject?.assumptions as unknown as Prisma.JsonArray
      ),
      phases: existingProject?.phases || [],
      risks: existingProject?.risks || [],
      communicationMethods: convertJsonToStringArray(
        existingProject?.communicationMethods as Prisma.JsonArray
      ),
      nextSteps: convertJsonToStringArray(
        existingProject?.nextSteps as Prisma.JsonArray
      ),
      validationCriteria: convertJsonToStringArray(
        existingProject?.validationCriteria as Prisma.JsonArray
      ),
      technologies: convertJsonToStringArray(
        existingProject?.technologies as Prisma.JsonArray
      ),
      targetAudience: convertJsonToStringArray(
        existingProject?.targetAudience as Prisma.JsonArray
      ),
      kpis: convertJsonToStringArray(existingProject?.kpis as Prisma.JsonArray),
      integrationDetails: existingProject?.integrationDetails || "",
      deliverables: convertJsonToStringArray(
        existingProject?.deliverables as Prisma.JsonArray
      ),
      validationSteps: convertJsonToStringArray(
        existingProject?.validationSteps as Prisma.JsonArray
      ),
      securityMeasures: existingProject?.securityMeasures || "",
      contingencyPlan: existingProject?.contingencyPlan || "",
      productionUrl: existingProject?.productionUrl || "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (existingProject) {
      console.log("Existing project data:", existingProject);
      console.log("Form values:", form.getValues());
    }
  }, [existingProject, form]);

  const handleNext = async () => {
    let fieldsToValidate: string[] = [];

    // Définir les champs à valider pour chaque étape
    switch (step) {
      case 1:
        fieldsToValidate = [
          "name",
          "clientId",
          "projectManagerId",
          "startDate",
          "estimatedDeliveryDate",
        ];
        break;
      // Ajouter d'autres cas si nécessaire
    }

    const isStepValid = await form.trigger(fieldsToValidate as any);

    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      // Afficher un message d'erreur
      toast.error("Veuillez remplir tous les champs obligatoires");

      // Log des erreurs pour le débogage
      console.log("Form errors:", form.formState.errors);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (step < totalSteps) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        existingProject
          ? `/api/projects/${existingProject.id}`
          : "/api/projects",
        {
          method: existingProject ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error(response.statusText);

      const project = await response.json();
      onSubmit(project);
      toast.success(
        existingProject
          ? "Projet modifié avec succès"
          : "Projet créé avec succès"
      );
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du projet");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {existingProject ? "Modifier le projet" : "Nouveau projet"}
          </DialogTitle>
          <StepIndicator
            currentStep={step}
            totalSteps={totalSteps}
            labels={[
              "Informations",
              "Contexte",
              "Périmètre",
              "Contraintes",
              "Planning",
              "Risques",
              "Validation",
              "Technique",
            ]}
          />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <ProjectFormFields
                form={form}
                contact={contact}
                currentStep={step}
              />

              {/* Afficher les erreurs de validation */}
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="text-red-500 text-sm mt-4">
                  {Object.entries(form.formState.errors).map(([key, error]) => (
                    <p key={key}>{error.message}</p>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <div className="flex justify-between w-full gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1 || isSubmitting}
                >
                  Précédent
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Étape {step} sur {totalSteps}
                  </span>
                  <Button
                    type="button"
                    onClick={
                      step === totalSteps
                        ? form.handleSubmit(handleSubmit)
                        : handleNext
                    }
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting
                      ? "Chargement..."
                      : step === totalSteps
                      ? existingProject
                        ? "Modifier"
                        : "Créer"
                      : "Suivant"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
