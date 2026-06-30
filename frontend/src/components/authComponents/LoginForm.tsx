import { type FormEvent } from "react";
import { userLoginSchema } from "../../../src/schemas";
import { useFormValidation } from "./useFormValidation";
import type { z } from "zod";

// Тип витягується автоматично зі схеми! Жодних any.
type LoginFormData = z.infer<typeof userLoginSchema>;

interface LoginFormProps {
  onLogin: (formData: LoginFormData) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  // Передаємо схему та початкові значення. Хук повертає все необхідне.
  const { values, errors, isValid, handleFormInput, validateFullForm } =
    useFormValidation(userLoginSchema, { email: "", password: "" });

  const handleLoginForm = (e: FormEvent) => {
    e.preventDefault();
    const result = validateFullForm();

    if (result.success && result.data) {
      onLogin(result.data); // Дані вже 100% валідні і типізовані
    }
  };

  return (
    <form onSubmit={handleLoginForm}>
      <label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleFormInput} // Вішаємо обробник прямо на інпут
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </label>

      <label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleFormInput}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </label>

      <button type="submit" disabled={!isValid}>
        УВІЙТИ
      </button>
    </form>
  );
}
