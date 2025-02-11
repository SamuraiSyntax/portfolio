import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/ui/tag-input";
import { UseFormReturn } from "react-hook-form";

export function ValidationField({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="validationCriteria"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Critères de validation</FormLabel>
            <FormControl>
              <TagInput
                placeholder="Ajouter un critère de validation..."
                tags={field.value || []}
                setTags={(newTags) => field.onChange(newTags)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="communicationMethods"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Moyens de communication</FormLabel>
            <FormControl>
              <TagInput
                placeholder="Ajouter un moyen de communication..."
                tags={field.value || []}
                setTags={(newTags) => field.onChange(newTags)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nextSteps"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Prochaines étapes</FormLabel>
            <FormControl>
              <TagInput
                placeholder="Ajouter une prochaine étape..."
                tags={field.value || []}
                setTags={(newTags) => field.onChange(newTags)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
