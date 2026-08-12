import { type FormEvent } from "react";
import { userRegisterSchema } from "../../../../src/schemas";
import { useFormValidation } from "../authComponents/useFormValidation";
import type { z } from "zod"; // Виправив імпорт type { z }
import styles from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

type RegisterFormData = z.infer<typeof userRegisterSchema>;

interface RegisterFormProps {
  onRegister: (formData: RegisterFormData) => void;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const { errors, values, isValid, validateFullForm, handleFormInput } =
    useFormValidation(userRegisterSchema, {
      email: "",
      password: "",
      username: "",
    });

  const handleRegisterForm = (e: FormEvent) => {
    e.preventDefault();

    const result = validateFullForm();
    if (result.success && result.data) {
      onRegister(result.data);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleRegisterForm}>
      <label className={styles.inputLabel}>
        <input
          type="email" /* Змінено з text на email */
          id="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          onChange={handleFormInput}
          className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
          required
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </label>

      <label className={styles.inputLabel}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username"
          value={values.username}
          onChange={handleFormInput}
          className={`${styles.formInput} ${errors.username ? styles.inputError : ""}`}
          required
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username}</span>
        )}
      </label>

      <label className={styles.inputLabel}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          value={values.password}
          onChange={handleFormInput}
          className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
          required
        />
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password}</span>
        )}
      </label>

      <button type="submit" className={styles.submitButton} disabled={!isValid}>
        REGISTER
      </button>
      <p className={styles.redirectText}>
        Already have an account?{" "}
        <span className={styles.redirectLink}>
          <Link to="/auth/login">Login</Link>
        </span>
      </p>
    </form>
  );
}
