import type { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
export function ScopesExcludedField({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  const [scopeExcluded, setScopeExcluded] = useState<string[]>(
    form.getValues("scopeExcluded") || []
  );
  const [userInput, setUserInput] = useState("");

  const handleAddScope = () => {
    if (userInput.trim() === "") return;
    const updatedScope = [...scopeExcluded, userInput];
    setScopeExcluded(updatedScope);
    form.setValue("scopeExcluded", updatedScope);
    setUserInput("");
  };

  const handleRemoveScope = (index: number) => {
    const updatedScope = scopeExcluded.filter((_, i) => i !== index);
    setScopeExcluded(updatedScope);
    form.setValue("scopeExcluded", updatedScope);
  };

  const handleEditScope = (index: number, newValue: string) => {
    const updatedScope = scopeExcluded.map((scope, i) =>
      i === index ? newValue : scope
    );
    setScopeExcluded(updatedScope);
    form.setValue("scopeExcluded", updatedScope);
  };

  return (
    <FormField
      control={form.control}
      name="scopeExcluded"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Périmètre exclu</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter un élément au périmètre exclu"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddScope();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddScope}
                  variant="secondary"
                >
                  Ajouter
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {scopeExcluded.map((scope, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border rounded-md"
                  >
                    <span className="flex-grow">{scope}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newValue = prompt(
                          "Modifier l'élément du périmètre",
                          scope
                        );
                        if (newValue) handleEditScope(index, newValue);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveScope(index)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
