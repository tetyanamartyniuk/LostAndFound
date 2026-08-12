import { useState } from "react";
import type z from "zod";
import { ZodObject } from "zod";

export function useFormValidation<T extends z.ZodObject>(
  schema: T,
  initialValues: z.infer<T>,
) {
  const [values, setValues] = useState<z.infer<T>>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof z.infer<T>, string>>
  >({});

  const validateFullForm = () => {
    const result = schema.safeParse(values);
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof z.infer<T>, string>> = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0] as keyof z.infer<T>;
        if (key) {
          formattedErrors[key] = i.message;
        }
      });
      setErrors(formattedErrors);
      return { success: false, data: null };
    }
    setErrors({});
    return { success: true, data: result.data };
  };

  const handleFormInput = (e: React.FormEvent) => {
    const event = e.target as HTMLInputElement;
    const fieldName = event.name as keyof z.infer<T>;
    const fieldValue = event.value;

    const newValues = { ...values, [fieldName]: fieldValue };
    setValues(newValues);

    if (fieldValue.trim() === "") {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        nextErrors[fieldName] = "This field is required";
        return nextErrors;
      });
      return;
    }

    const result = schema.partial().safeParse({ [fieldName]: fieldValue });
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      if (issue) {
        setErrors((prev) => {
          return { ...prev, [fieldName]: issue.message };
        });
        return;
      }
    }

    setErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const isValid = schema.safeParse(values).success;

  return {
    values,
    errors,
    isValid,
    validateFullForm,
    handleFormInput,
    setErrors,
  };
}
