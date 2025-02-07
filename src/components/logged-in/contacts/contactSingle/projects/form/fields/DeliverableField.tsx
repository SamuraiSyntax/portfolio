import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/tag-input";
import { UseFormReturn } from "react-hook-form";

interface DeliverableFieldProps {
  form: UseFormReturn<FormData>;
}

export function DeliverableField({ form }: DeliverableFieldProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Livrables attendus</Label>
        <FormField
          control={form.control}
          name="deliverables"
          render={({ field }) => (
            <TagInput
              placeholder="Ajouter un livrable..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          )}
        />
      </div>

      <div>
        <Label>Étapes de validation</Label>
        <FormField
          control={form.control}
          name="validationSteps"
          render={({ field }) => (
            <TagInput
              placeholder="Ajouter une étape de validation..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          )}
        />
      </div>
    </div>
  );
}
