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

export function ScopesExcludedField({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  return (
    <FormField
      control={form.control}
      name="scopeExcluded"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Périmètre exclu</FormLabel>
          <FormControl>
            <TagInput
              placeholder="Ajouter un élément au périmètre exclu..."
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
