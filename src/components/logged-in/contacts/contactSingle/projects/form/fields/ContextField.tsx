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

export function ContextField({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <FormField
      control={form.control}
      name="context"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Contexte du projet</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Décrivez le contexte du projet..."
              className="min-h-[100px] resize-y"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
