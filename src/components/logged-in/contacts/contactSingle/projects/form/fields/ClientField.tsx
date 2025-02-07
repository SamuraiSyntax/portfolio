import type { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Contact } from "@/types/contact";
import { UseFormReturn } from "react-hook-form";

export function ClientField({
  form,
  contact,
}: {
  form: UseFormReturn<FormData>;
  contact: Contact;
}) {
  return (
    <FormField
      control={form.control}
      name="clientId"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Client</FormLabel>
          <FormControl>
            <Input value={contact.name} disabled className="bg-gray-50" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
