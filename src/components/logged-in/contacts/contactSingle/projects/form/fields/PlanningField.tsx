"use client";

import { FormData } from "@/components/logged-in/contacts/contactSingle/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export function PlanningField({ form }: { form: UseFormReturn<FormData> }) {
  const { users, isLoading } = useUsers();

  const addPhase = () => {
    const currentPhases = form.getValues("phases") || [];
    form.setValue("phases", [
      ...currentPhases,
      {
        name: "",
        startDate: new Date(),
        endDate: new Date(),
        responsible: "",
      },
    ]);
  };

  React.useEffect(() => {
    if (!form.getValues("phases")) {
      form.setValue("phases", []);
    }
  }, [form]);

  const phases = form.watch("phases") || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Planning Prévisionnel</h3>
      {phases.map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name={`phases.${index}.name`}
            render={({ field }) => (
              <Input {...field} placeholder="Nom de la phase" />
            )}
          />
          <FormField
            control={form.control}
            name={`phases.${index}.startDate`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Date de début</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`phases.${index}.endDate`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Date de fin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`phases.${index}.responsible`}
            render={({ field }) => (
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un responsable" />
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
      ))}
      <Button type="button" onClick={addPhase}>
        Ajouter une phase
      </Button>
    </div>
  );
}
