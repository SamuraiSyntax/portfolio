import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface TechnicalDetailsFieldProps {
  form: UseFormReturn<FormData>;
}

export function TechnicalDetailsField({ form }: TechnicalDetailsFieldProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Technologies</Label>
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <TagInput
              placeholder="Ajouter une technologie..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          )}
        />
      </div>

      <div>
        <Label>URL de production</Label>
        <FormField
          control={form.control}
          name="productionUrl"
          render={({ field }) => <Input placeholder="https://..." {...field} />}
        />
      </div>

      <div>
        <Label>Détails d&apos;intégration</Label>
        <FormField
          control={form.control}
          name="integrationDetails"
          render={({ field }) => (
            <Textarea
              placeholder="Détails sur l'intégration avec les systèmes existants..."
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
