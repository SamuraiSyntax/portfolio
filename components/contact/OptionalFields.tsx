"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { FormValues } from "@/lib/types/contact";
import { UseFormReturn } from "react-hook-form";
import { FaBuilding, FaCalendar, FaGlobe, FaMoneyBill } from "react-icons/fa";

interface OptionalFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function OptionalFields({ form }: OptionalFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FaBuilding className="h-4 w-4" />
              Entreprise
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Nom de votre entreprise"
                className={neobrutalismClassPrimary}
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
            <FormLabel className="flex items-center gap-2">
              <FaMoneyBill className="h-4 w-4" />
              Budget estimé
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Budget en euros"
                type="number"
                className={neobrutalismClassPrimary}
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
            <FormLabel className="flex items-center gap-2">
              <FaCalendar className="h-4 w-4" />
              Date souhaitée
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className={neobrutalismClassPrimary}
                {...field}
              />
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
            <FormLabel className="flex items-center gap-2">
              <FaGlobe className="h-4 w-4" />
              Site web existant
            </FormLabel>
            <FormControl>
              <Input
                placeholder="https://www.votresite.com"
                className={neobrutalismClassPrimary}
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
