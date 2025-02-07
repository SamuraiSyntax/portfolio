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

export function ObjectifsField({ form }: { form: UseFormReturn<FormData> }) {
  const [objectives, setObjectives] = useState<string[]>(
    form.getValues("objectives") || []
  );

  const [userInput, setUserInput] = useState("");

  const handleAddObjective = () => {
    if (userInput.trim() === "") return;
    const updatedObjectives = [...objectives, userInput];
    setObjectives(updatedObjectives);
    form.setValue("objectives", updatedObjectives);
    setUserInput("");
  };

  const handleRemoveObjective = (index: number) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    form.setValue("objectives", updatedObjectives);
  };

  const handleEditObjective = (index: number, newValue: string) => {
    const updatedObjectives = objectives.map((obj, i) =>
      i === index ? newValue : obj
    );
    setObjectives(updatedObjectives);
    form.setValue("objectives", updatedObjectives);
  };

  return (
    <FormField
      control={form.control}
      name="objectives"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Objectifs</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter un objectif"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddObjective();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddObjective}
                  variant="secondary"
                >
                  Ajouter
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border rounded-md"
                  >
                    <span className="flex-grow">{objective}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newValue = prompt(
                          "Modifier l'objectif",
                          objective
                        );
                        if (newValue) handleEditObjective(index, newValue);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveObjective(index)}
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
