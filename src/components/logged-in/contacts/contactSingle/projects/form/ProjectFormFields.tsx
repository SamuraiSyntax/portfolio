import { AssumptionsField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/AssumptionsField";
import { ClientField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ClientField";
import { ConstraintsBudgetField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ConstraintsBudget";
import { ConstraintsTechniquesField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ConstraintsTechniques";
import { ContextField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ContextField";
import { ObjectifsField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ObjectifsField";
import { PlanningField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/PlanningField";
import { ProjectDatesFields } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ProjectDatesFields";
import { ProjectManagerField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ProjectManagerField";
import { ProjectNameField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ProjectNameField";
import { RisksField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/RisksField";
import { ScopesExcludedField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ScopesExclu";
import { ScopesIncludedField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ScopesInclu";
import { ValidationField } from "@/components/logged-in/contacts/contactSingle/projects/form/fields/ValidationField";
import type { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import type { Contact } from "@/types/contact";
import type { UseFormReturn } from "react-hook-form";
import { DeliverableField } from "./fields/DeliverableField";
import { SecurityMeasuresField } from "./fields/SecurityMeasuresField";
import { TargetAndKPIsField } from "./fields/TargetAndKPIsField";
import { TechnicalDetailsField } from "./fields/TechnicalDetailsField";

interface ProjectFormFieldsProps {
  form: UseFormReturn<FormData>;
  contact: Contact;
  currentStep: number;
}

export function ProjectFormFields({
  form,
  contact,
  currentStep,
}: ProjectFormFieldsProps) {
  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <ProjectNameField form={form} />
          <ClientField form={form} contact={contact} />
          <ProjectManagerField form={form} />
          <ProjectDatesFields form={form} />
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          <ContextField form={form as unknown as UseFormReturn<FormData>} />
          <ObjectifsField form={form as unknown as UseFormReturn<FormData>} />
          <TargetAndKPIsField form={form} />
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <ScopesIncludedField
            form={form as unknown as UseFormReturn<FormData>}
          />
          <ScopesExcludedField
            form={form as unknown as UseFormReturn<FormData>}
          />
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <ConstraintsTechniquesField
            form={form as unknown as UseFormReturn<FormData>}
          />
          <ConstraintsBudgetField
            form={form as unknown as UseFormReturn<FormData>}
          />
          <AssumptionsField form={form as unknown as UseFormReturn<FormData>} />
        </div>
      );
    case 5:
      return (
        <div className="space-y-6">
          <PlanningField form={form} />
        </div>
      );
    case 6:
      return (
        <div className="space-y-6">
          <RisksField form={form} />
        </div>
      );
    case 7:
      return (
        <div className="space-y-6">
          <ValidationField form={form} />
        </div>
      );
    case 8:
      return (
        <div className="space-y-6">
          <TechnicalDetailsField form={form} />
          <DeliverableField form={form} />
          <SecurityMeasuresField form={form} />
        </div>
      );
    default:
      return null;
  }
}
