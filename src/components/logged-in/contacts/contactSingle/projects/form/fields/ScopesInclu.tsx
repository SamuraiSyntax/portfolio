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

export function ScopesIncludedField({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  return (
    <FormField
      control={form.control}
      name="scopeIncluded"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Périmètre inclus</FormLabel>
          <FormControl>
            <TagInput
              placeholder="Ajouter un élément au périmètre inclus..."
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
