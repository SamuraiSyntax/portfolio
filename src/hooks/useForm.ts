import { useCallback, useState } from "react";

interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

interface UseFormOptions {
  initialValues: Record<string, string>;
  validate?: (values: Record<string, string>) => Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

export function useForm({ initialValues, validate, onSubmit }: UseFormOptions) {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        touched: { ...prev.touched, [name]: true },
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = event.target;
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      if (validate) {
        const errors = validate(state.values);
        setState((prev) => ({ ...prev, errors }));

        if (Object.keys(errors).length > 0) {
          setIsSubmitting(false);
          return;
        }
      }

      try {
        await onSubmit(state.values);
        setState((prev) => ({ ...prev, values: initialValues, touched: {} }));
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [state.values, validate, onSubmit, initialValues]
  );

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
