"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { FormValues } from "@/lib/types/contact";
import { UseFormReturn } from "react-hook-form";
import { FaComment } from "react-icons/fa";

interface MessageFieldProps {
  form: UseFormReturn<FormValues>;
}

export function MessageField({ form }: MessageFieldProps) {
  const message = form.watch("message");
  const minLength = 10; // Minimum length of the message
  const maxLength = 1000;
  const currentLength = message?.length || 0;

  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaComment className="h-4 w-4" />
              Votre message*
            </span>
            <span className="text-xs text-muted-foreground">
              {minLength} caractères minimum
            </span>
            <span className="text-sm text-muted-foreground">
              {currentLength}/{maxLength}
            </span>
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Décrivez votre projet ou votre besoin..."
              className={`${neobrutalismClassPrimary} min-h-[150px]`}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
