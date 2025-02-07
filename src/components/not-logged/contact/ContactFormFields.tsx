"use client";

import { BasicFields } from "@/components/not-logged/contact/form/BasicFields";
import { MessageField } from "@/components/not-logged/contact/form/MessageField";
import { OptionalFields } from "@/components/not-logged/contact/form/OptionalFields";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FormValues } from "@/lib/types/contact";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ContactFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

const optionalFieldsAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3 },
};

export function ContactFormFields({ form }: ContactFormFieldsProps) {
  const [showOptional, setShowOptional] = useState(false);

  return (
    <div className="space-y-6">
      <BasicFields form={form} />
      <MessageField form={form} />

      <div className="space-y-4">
        <Separator className="my-4" />

        <Button
          type="button"
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
          onClick={() => setShowOptional(!showOptional)}
        >
          {showOptional ? (
            <>
              <FaChevronUp className="h-4 w-4" />
              Masquer les détails optionnels
            </>
          ) : (
            <>
              <FaChevronDown className="h-4 w-4" />
              Ajouter plus de détails
            </>
          )}
        </Button>

        <AnimatePresence>
          {showOptional && (
            <motion.div
              {...optionalFieldsAnimation}
              className="overflow-hidden"
            >
              <OptionalFields form={form} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
