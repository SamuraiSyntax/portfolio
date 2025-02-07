"use client";

import { Button } from "@/components/ui/button";

export function BackButton() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => window.history.back()}
    >
      Annuler
    </Button>
  );
}
