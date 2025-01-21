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
import { FaEnvelope, FaUser } from "react-icons/fa";

interface BasicFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function BasicFields({ form }: BasicFieldsProps) {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaUser className="h-4 w-4" />
              Nom complet*
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-sm">
              <Input placeholder="John Doe" className="text-xs" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-xs">
              <FaEnvelope className="h-4 w-4" />
              Email*
            </FormLabel>
            <FormControl className="bg-background/70 hover:bg-background backdrop-blur-xs">
              <Input
                type="email"
                placeholder="john@example.com"
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
