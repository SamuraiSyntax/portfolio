import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface SecurityMeasuresFieldProps {
  form: UseFormReturn<FormData>;
}

export function SecurityMeasuresField({ form }: SecurityMeasuresFieldProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Mesures de sécurité</Label>
        <FormField
          control={form.control}
          name="securityMeasures"
          render={({ field }) => (
            <Textarea
              placeholder="Détails des mesures de sécurité à mettre en place..."
              {...field}
            />
          )}
        />
      </div>

      <div>
        <Label>Plan de contingence</Label>
        <FormField
          control={form.control}
          name="contingencyPlan"
          render={({ field }) => (
            <Textarea
              placeholder="Plan de secours en cas de problème..."
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
