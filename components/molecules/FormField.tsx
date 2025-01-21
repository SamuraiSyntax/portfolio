import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
}

export function FormField({
  label,
  error,
  type = "text",
  multiline = false,
  className,
  ...props
}: FormFieldProps) {
  const id = useId();

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {multiline ? (
        <Textarea
          id={id}
          className={cn(error && "border-destructive")}
          {...props}
        />
      ) : (
        <Input
          id={id}
          type={type}
          className={cn(error && "border-destructive")}
          {...props}
        />
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
