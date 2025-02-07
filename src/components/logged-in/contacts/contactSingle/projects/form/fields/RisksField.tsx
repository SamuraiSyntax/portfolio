import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const PROBABILITY_OPTIONS = ["Faible", "Moyenne", "Élevée"];
const IMPACT_OPTIONS = ["Faible", "Moyen", "Élevé"];

export function RisksField({ form }: { form: UseFormReturn<FormData> }) {
  const addRisk = () => {
    const currentRisks = form.getValues("risks") || [];
    form.setValue("risks", [
      ...currentRisks,
      {
        description: "",
        probability: "Moyenne",
        impact: "Moyen",
        solution: "",
      },
    ]);
  };

  React.useEffect(() => {
    if (!form.getValues("risks")) {
      form.setValue("risks", []);
    }
  }, [form]);

  const risks = form.watch("risks") || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Risques Identifiés</h3>
      {risks.map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name={`risks.${index}.description`}
            render={({ field }) => (
              <Input {...field} placeholder="Description du risque" />
            )}
          />
          <FormField
            control={form.control}
            name={`risks.${index}.probability`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Probabilité" />
                </SelectTrigger>
                <SelectContent>
                  {PROBABILITY_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            control={form.control}
            name={`risks.${index}.impact`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Impact" />
                </SelectTrigger>
                <SelectContent>
                  {IMPACT_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            control={form.control}
            name={`risks.${index}.solution`}
            render={({ field }) => (
              <Input {...field} placeholder="Solution proposée" />
            )}
          />
        </div>
      ))}
      <Button type="button" onClick={addRisk}>
        Ajouter un risque
      </Button>
    </div>
  );
}
