import { useState } from "react";
import {
  userRegisterSchema,
  type RegisterFormData,
} from "../../../src/schemas";
import { useFormValidation } from "./useFormValidation";

type RegisterFormData = z.infer<typeof userRegisterSchema>;

interface RegisterFormProps {
  //«Компонент, який буде використовувати цей інтерфейс, обов'язково повинен отримати пропс із назвою onRegister. І цей пропс має бути функцією».
  onRegister: (formData: RegisterFormData) => void; //батько передає дитині ф-цію, як пропс
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const {
    errors,
    values,
    setErrors,
    isValid,
    validateFullForm,
    handleFormInput,
  } = useFormValidation(userRegisterSchema, {
    email: "",
    password: "",
    username: "",
  });

  //робимо обробник натискання кнопки "Зареєструватись"
  const handleRegisterForm = (e: FormEvent) => {
    e.preventDefault(); //зупиняємо дефолтну поведінку браузера - перезавантаження сторінки

    const result = validateFullForm();
    if (result.success && result.data) {
      onRegister(result.data); // Дані вже 100% валідні і типізовані
    }
  };

  return (
    <form onSubmit={handleRegisterForm}>
      <label>
        {/* e.target.value - показує стан певного поля в кожен момент вводу тексту */}
        <input
          type="text"
          id="email"
          name="email"
          placeholder="your email"
          value={values.email}
          onChange={handleFormInput}
          required
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </label>

      <label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="your password"
          value={values.password}
          onChange={handleFormInput}
          required
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </label>
      <label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="your username"
          value={values.username}
          onChange={handleFormInput}
          required
        />
        {errors.username && (
          <span style={{ color: "red" }}>{errors.username}</span>
        )}
      </label>
      <button type="submit" disabled={!isValid}>
        Зареєструватись
      </button>
    </form>
  );
}
