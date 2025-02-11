import type { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";
import { UseFormReturn } from "react-hook-form";

export function AssumptionsField({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <FormField
      control={form.control}
      name="assumptions"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Hypothèses</FormLabel>
          <FormControl>
            <TagInput
              placeholder="Ajouter une hypothèse..."
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
