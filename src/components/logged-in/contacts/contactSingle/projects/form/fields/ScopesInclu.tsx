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
import type { UseFormReturn } from "react-hook-form";

export function ScopesIncludedField({
  form,
}: {
  form: UseFormReturn<FormData>;
}) {
  const [scopeIncluded, setScopeIncluded] = useState<string[]>(
    form.getValues("scopeIncluded") || []
  );
  const [userInput, setUserInput] = useState("");

  const handleAddScope = () => {
    if (userInput.trim() === "") return;
    const updatedScope = [...scopeIncluded, userInput];
    setScopeIncluded(updatedScope);
    form.setValue("scopeIncluded", updatedScope);
    setUserInput("");
  };

  const handleRemoveScope = (index: number) => {
    const updatedScope = scopeIncluded.filter((_, i) => i !== index);
    setScopeIncluded(updatedScope);
    form.setValue("scopeIncluded", updatedScope);
  };

  const handleEditScope = (index: number, newValue: string) => {
    const updatedScope = scopeIncluded.map((scope, i) =>
      i === index ? newValue : scope
    );
    setScopeIncluded(updatedScope);
    form.setValue("scopeIncluded", updatedScope);
  };

  return (
    <FormField
      control={form.control}
      name="scopeIncluded"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Périmètre inclus</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter un périmètre inclus"
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
                {scopeIncluded.map((scope, index) => (
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
                          "Modifier le périmètre inclus",
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
