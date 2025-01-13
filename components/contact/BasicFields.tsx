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
import { FaEnvelope, FaUser } from "react-icons/fa";

interface BasicFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function BasicFields({ form }: BasicFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FaUser className="h-4 w-4" />
              Nom complet*
            </FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
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
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FaEnvelope className="h-4 w-4" />
              Email*
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john@example.com"
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
