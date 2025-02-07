import type { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
            <Textarea
              placeholder="Décrivez les hypothèses du projet..."
              className="min-h-[100px] resize-y"
              {...field}
              value={
                Array.isArray(field.value)
                  ? field.value.join("\n")
                  : field.value || ""
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
