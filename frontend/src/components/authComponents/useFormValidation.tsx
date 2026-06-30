import { useState } from "react";
import type z from "zod";
import { ZodObject } from "zod";

export function useFormValidation<T extends z.ZodObject>( //ф-ція приймає значення типу T, які мають бути zod об'єктами
  schema: T, //T - змінна для типу схеми валідації
  initialValues: z.infer<T>, //initialValues мають мати тип, такий як схема T
) {
  const [values, setValues] = useState<z.infer<T>>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof z.infer<T>, string>> //{email?: string, password?: string}, keyof дістає ключі
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
    const fieldName = event.name as keyof z.infer<T>; //як ключ з схеми, тобто або email або password
    const fieldValue = event.value;

    const newValues = { ...values, [fieldName]: fieldValue };
    setValues(newValues);

    //ця умова має стояти вище валідації, бо
    if (fieldValue.trim() === "") {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        nextErrors[fieldName] = "Це поле є обов'язковим";
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

  const isValid = schema.safeParse(values).success; //якщо success true --> форма валідна

  return {
    values,
    errors,
    isValid,
    validateFullForm,
    handleFormInput,
    setErrors,
  };
}
