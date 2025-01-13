"use client";

import { Button } from "@/components/ui/button";
import { FormValues } from "@/lib/types/contact";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BasicFields } from "./BasicFields";
import { MessageField } from "./MessageField";
import { OptionalFields } from "./OptionalFields";

interface ContactFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ContactFormFields({ form }: ContactFormFieldsProps) {
  const [showOptional, setShowOptional] = useState(false);

  return (
    <div className="space-y-6">
      <BasicFields form={form} />
      <MessageField form={form} />

      <div className="space-y-4">
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

        {showOptional && <OptionalFields form={form} />}
      </div>
    </div>
  );
}
