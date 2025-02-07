import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export function ValidationField({ form }: { form: UseFormReturn<FormData> }) {
  const addCriteria = () => {
    const current = form.getValues("validationCriteria") || [];
    form.setValue("validationCriteria", [...current, ""]);
  };

  const addMethod = () => {
    const current = form.getValues("communicationMethods") || [];
    form.setValue("communicationMethods", [...current, ""]);
  };

  const addStep = () => {
    const current = form.getValues("nextSteps") || [];
    form.setValue("nextSteps", [...current, ""]);
  };

  React.useEffect(() => {
    if (!form.getValues("validationCriteria")) {
      form.setValue("validationCriteria", []);
    }
    if (!form.getValues("communicationMethods")) {
      form.setValue("communicationMethods", []);
    }
    if (!form.getValues("nextSteps")) {
      form.setValue("nextSteps", []);
    }
  }, [form]);

  const validationCriteria = form.watch("validationCriteria") || [];
  const communicationMethods = form.watch("communicationMethods") || [];
  const nextSteps = form.watch("nextSteps") || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Critères de validation</h3>
        {validationCriteria.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`validationCriteria.${index}`}
            render={({ field }) => (
              <Input {...field} placeholder="Critère de validation" />
            )}
          />
        ))}
        <Button type="button" onClick={addCriteria}>
          Ajouter un critère
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Moyens de communication</h3>
        {communicationMethods.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`communicationMethods.${index}`}
            render={({ field }) => (
              <Input {...field} placeholder="Moyen de communication" />
            )}
          />
        ))}
        <Button type="button" onClick={addMethod}>
          Ajouter un moyen
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Prochaines étapes</h3>
        {nextSteps.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`nextSteps.${index}`}
            render={({ field }) => (
              <Input {...field} placeholder="Prochaine étape" />
            )}
          />
        ))}
        <Button type="button" onClick={addStep}>
          Ajouter une étape
        </Button>
      </div>
    </div>
  );
}
