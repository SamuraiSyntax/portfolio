"use client";

import { BasicFields } from "@/components/contact/BasicFields";
import { MessageField } from "@/components/contact/MessageField";
import { OptionalFields } from "@/components/contact/OptionalFields";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/lib/types/contact";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ContactFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ContactFormFields({ form }: ContactFormFieldsProps) {
  const [showOptional, setShowOptional] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-3">
      <BasicFields form={form} />
      <MessageField form={form} />

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="ghost"
          className="p-1 h-auto w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary text-xs"
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
