"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/lib/types/contact";
import { UseFormReturn } from "react-hook-form";
import { FaBuilding, FaCalendar, FaGlobe, FaMoneyBill } from "react-icons/fa";

interface OptionalFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function OptionalFields({ form }: OptionalFieldsProps) {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaBuilding className="h-4 w-4" />
              Entreprise
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-sm">
              <Input
                placeholder="Nom de votre entreprise"
                className="text-xs"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaMoneyBill className="h-4 w-4" />
              Budget estimé
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-sm">
              <Input
                placeholder="Budget en euros"
                type="number"
                className="text-xs"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaCalendar className="h-4 w-4" />
              Date souhaitée
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-sm">
              <Input type="date" className="text-xs" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="existingSite"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaGlobe className="h-4 w-4" />
              Site web existant
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-sm">
              <Input
                placeholder="https://www.votresite.com"
                className="text-xs"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
