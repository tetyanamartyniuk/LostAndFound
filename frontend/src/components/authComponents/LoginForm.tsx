import { type FormEvent } from "react";
import { userLoginSchema } from "../../../../src/schemas";
import { useFormValidation } from "./useFormValidation";
import type { z } from "zod";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

type LoginFormData = z.infer<typeof userLoginSchema>;

interface LoginFormProps {
  onLogin: (formData: LoginFormData) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const { values, errors, isValid, handleFormInput, validateFullForm } =
    useFormValidation(userLoginSchema, { email: "", password: "" });

  const handleLoginForm = (e: FormEvent) => {
    e.preventDefault();
    const result = validateFullForm();

    if (result.success && result.data) {
      onLogin(result.data);
    }
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleLoginForm}>
        <label className={styles.inputLabel}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleFormInput}
            className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </label>

        <label className={styles.inputLabel}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleFormInput}
            className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </label>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}
        >
          LOGIN
        </button>
        <p className={styles.redirectText}>
          Don`t have an account yet?{" "}
          <span className={styles.redirectLink}>
            <Link to="/auth/register">Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
