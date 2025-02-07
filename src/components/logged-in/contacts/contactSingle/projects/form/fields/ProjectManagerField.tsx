import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "@/hooks/useUsers";
import { UseFormReturn } from "react-hook-form";

export function ProjectManagerField({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  const { users, isLoading } = useUsers();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Chef de projet</h3>
      <FormField
        control={form.control}
        name="projectManagerId"
        render={({ field }) => (
          <Select
            disabled={isLoading}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un chef de projet" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name || user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
