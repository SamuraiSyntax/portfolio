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
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

interface BasicFieldsProps {
  form: UseFormReturn<FormValues>;
}

const inputAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
};

export function BasicFields({ form }: BasicFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <motion.div {...inputAnimation} transition={{ delay: 0.1 }}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-2 px-2">
              <FormLabel className="flex items-center gap-2">
                <FaUser className="h-4 w-4" />
                Prénom*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  className="bg-background/70 hover:bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div {...inputAnimation} transition={{ delay: 0.2 }}>
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-2 px-2">
              <FormLabel className="flex items-center gap-2">
                <FaUser className="h-4 w-4" />
                Nom*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  className="bg-background/70 hover:bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div {...inputAnimation} transition={{ delay: 0.3 }}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2 px-2">
              <FormLabel className="flex items-center gap-2">
                <FaEnvelope className="h-4 w-4" />
                Email*
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-background/70 hover:bg-background focus:bg-background transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div {...inputAnimation} transition={{ delay: 0.4 }}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2 px-2">
              <FormLabel className="flex items-center gap-2">
                <FaPhone className="h-4 w-4" />
                Téléphone
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  className="bg-background/70 hover:bg-background focus:bg-background transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
}
