import { Badge } from "@/components/ui/badge";
import {
  CONTACT_SOURCE_LABELS,
  CONTACT_STATUS_LABELS,
  PREFERRED_CONTACT_METHOD_LABELS,
  PRIORITY_LABELS,
} from "@/lib/constants/contact";
import {
  INVOICE_STATUS,
  PROJECT_STATUS,
  QUOTE_STATUS,
} from "@/lib/constants/project";
import { cn } from "@/lib/utils";

interface BadgeWithLabelProps {
  label: string;
  value: string;
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
  useLabel?: boolean;
}

export function BadgeWithLabel({
  label,
  value,
  className,
  variant = "secondary",
  useLabel = false,
}: BadgeWithLabelProps) {
  const getLabel = (value: string): string => {
    const allLabels = {
      ...CONTACT_STATUS_LABELS,
      ...CONTACT_SOURCE_LABELS,
      ...PRIORITY_LABELS,
      ...PREFERRED_CONTACT_METHOD_LABELS,
      ...PROJECT_STATUS,
      ...QUOTE_STATUS,
      ...INVOICE_STATUS,
    };
    return allLabels[value as keyof typeof allLabels]?.label || value;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {useLabel && (
        <span className="text-sm text-muted-foreground">{label} :</span>
      )}
      <Badge variant={variant}>{getLabel(value)}</Badge>
    </div>
  );
}
