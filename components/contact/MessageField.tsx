"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormValues } from "@/lib/types/contact";
import { UseFormReturn } from "react-hook-form";
import { FaComment } from "react-icons/fa";

interface MessageFieldProps {
  form: UseFormReturn<FormValues>;
}

export function MessageField({ form }: MessageFieldProps) {
  const message = form.watch("message");
  const minLength = 10; // Longueur minimale du message
  const maxLength = 1000;
  const currentLength = message?.length || 0;

  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <FaComment className="h-4 w-4" />
              Votre message*
            </span>
            <span className="hidden md:block text-xs text-muted-foreground">
              {minLength} caractères minimum
            </span>
            <span className="hidden md:block text-xs text-muted-foreground">
              {currentLength}/{maxLength}
            </span>
          </FormLabel>
          <FormControl className="bg-background/70 hover:bg-background backdrop-blur-xs">
            <Textarea
              placeholder="Décrivez votre projet ou votre besoin..."
              className={`min-h-[100px] text-xs`}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          <div className="flex justify-between">
            <span className="block md:hidden text-xs text-muted-foreground">
              {minLength} caractères minimum
            </span>
            <span className="block md:hidden text-xs text-muted-foreground">
              {currentLength}/{maxLength}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
