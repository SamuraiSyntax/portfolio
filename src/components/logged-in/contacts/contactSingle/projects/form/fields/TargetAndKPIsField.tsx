import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/tag-input";
import { UseFormReturn } from "react-hook-form";

interface TargetAndKPIsFieldProps {
  form: UseFormReturn<FormData>;
}

export function TargetAndKPIsField({ form }: TargetAndKPIsFieldProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Public cible</Label>
        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <TagInput
              placeholder="Ajouter un public cible..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          )}
        />
      </div>

      <div>
        <Label>KPIs</Label>
        <FormField
          control={form.control}
          name="kpis"
          render={({ field }) => (
            <TagInput
              placeholder="Ajouter un KPI..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          )}
        />
      </div>
    </div>
  );
}
