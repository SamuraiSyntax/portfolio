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

import type { Contact } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  clientId: z.string(),
  startDate: z.date().optional().default(new Date()),
  estimatedDeliveryDate: z.date().optional().default(new Date()),
  objectives: z.array(z.string()).nullable().default([]),
  scopeIncluded: z.array(z.string()).nullable().default([]),
  scopeExcluded: z.array(z.string()).nullable().default([]),
  budgetConstraints: z.string().optional(),
  technicalConstraints: z.string().optional(),
  context: z.string().optional(),
  assumptions: z.array(z.string()).nullable().default([]),
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
  validationCriteria: z.array(z.string()).default([]),
  communicationMethods: z.array(z.string()).default([]),
  nextSteps: z.array(z.string()).default([]),
  projectManagerId: z.string().min(1, "Le chef de projet est requis"),
  technologies: z.array(z.string()).nullable().default([]),
  targetAudience: z.array(z.string()).nullable().default([]),
  kpis: z.array(z.string()).nullable().default([]),
  legalConstraints: z.string().optional(),
  integrationDetails: z.string().optional(),
  deliverables: z.array(z.string()).nullable().default([]),
  validationSteps: z.array(z.string()).nullable().default([]),
  securityMeasures: z.string().optional(),
  contingencyPlan: z.string().optional(),
  productionUrl: z.string().optional(),
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

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: existingProject?.name || "",
      clientId: existingProject?.clientId || contact.id,
      startDate: existingProject?.startDate
        ? new Date(existingProject.startDate)
        : new Date(),
      estimatedDeliveryDate: existingProject?.estimatedDeliveryDate
        ? new Date(existingProject.estimatedDeliveryDate)
        : new Date(),
      projectManagerId: existingProject?.projectManagerId || "",
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
      legalConstraints: existingProject?.legalConstraints || "",
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
  });

  useEffect(() => {
    if (existingProject) {
      console.log("Existing project data:", existingProject);
      console.log("Form values:", form.getValues());
    }
  }, [existingProject, form]);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (data: FormData) => {
    if (step === totalSteps) {
      setIsSubmitting(true);
      try {
        const endpoint = existingProject
          ? `/api/projects/${existingProject.id}`
          : "/api/projects";

        const method = existingProject ? "PUT" : "POST";

        // Formatage des données avant l'envoi
        const formattedData = {
          ...data,
          projectId: existingProject?.id || null,
          // S'assurer que les tableaux restent des tableaux
          assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
          objectives: Array.isArray(data.objectives) ? data.objectives : [],
          scopeIncluded: Array.isArray(data.scopeIncluded)
            ? data.scopeIncluded
            : [],
          scopeExcluded: Array.isArray(data.scopeExcluded)
            ? data.scopeExcluded
            : [],
          technologies: Array.isArray(data.technologies)
            ? data.technologies
            : [],
          targetAudience: Array.isArray(data.targetAudience)
            ? data.targetAudience
            : [],
          kpis: Array.isArray(data.kpis) ? data.kpis : [],
          deliverables: Array.isArray(data.deliverables)
            ? data.deliverables
            : [],
          validationSteps: Array.isArray(data.validationSteps)
            ? data.validationSteps
            : [],
          communicationMethods: Array.isArray(data.communicationMethods)
            ? data.communicationMethods
            : [],
          nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps : [],
          validationCriteria: Array.isArray(data.validationCriteria)
            ? data.validationCriteria
            : [],
        };

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const project = await response.json();
        onSubmit(project);
        toast.success(
          existingProject
            ? "Projet modifié avec succès"
            : "Projet créé avec succès"
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erreur:", error);
        toast.error(
          existingProject
            ? "Erreur lors de la modification du projet"
            : "Erreur lors de la création du projet"
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[850px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 w-full h-full"
          >
            <DialogHeader>
              <DialogTitle>
                {existingProject
                  ? "Modifier le projet"
                  : "Créer un nouveau projet"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 w-full max-h-[70vh] overflow-y-auto">
              <ProjectFormFields
                form={form as unknown as UseFormReturn<FormData>}
                contact={contact}
                currentStep={step}
              />
            </div>
            <DialogFooter>
              <div className="flex justify-end gap-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    className="w-32"
                    disabled={isSubmitting}
                  >
                    Précédent
                  </Button>
                )}
                <Button type="submit" className="w-32" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Chargement..."
                    : step === totalSteps
                    ? existingProject
                      ? "Modifier"
                      : "Créer"
                    : "Suivant"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
