import { useState, type FormEvent } from "react";
import { CategorySelect } from "../categoryComponents/CategorySelect";
import { itemSchema } from "../../../../src/schemas";
import styles from "./CreateItemForm.module.css";
import { FileInput } from "./FileInput";

export interface CreateItemFormProps {
  onCreate: (formData: FormData) => void;
}

export function CreateItemForm({ onCreate }: CreateItemFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateFullForm = (formElement: HTMLFormElement) => {
    const formData = new FormData(formElement);
    const rawData = Object.fromEntries(formData.entries());
    const result = itemSchema.safeParse(rawData);
    return result;
  };

  const handleFormInput = (e: FormEvent<HTMLFormElement>) => {
    const formCheck = validateFullForm(e.currentTarget);
    setIsValid(formCheck.success);
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const fieldName = target.name;
    const fieldValue = target.value;

    if (fieldValue.trim() === "") {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        nextErrors[fieldName] = "This field is required";
        return nextErrors;
      });
      return;
    }
    const result = itemSchema.partial().safeParse({ [fieldName]: fieldValue });

    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      if (issue) {
        setErrors((prev) => ({ ...prev, [fieldName]: issue.message }));
        return;
      }
    }
    setErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateFullForm(e.currentTarget);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const fieldName = i.path[0] as string;
        formattedErrors[fieldName] = i.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    setIsValid(result.success);

    const formData = new FormData(e.currentTarget);
    onCreate(formData);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.createItemHeading}>
        Let us know what you have found/lost
      </h3>
      <form
        onSubmit={handleSubmit}
        onChange={handleFormInput}
        className={styles.createForm}
      >
        <label className={styles.inputLabel}>
          <input
            type="text"
            name="title"
            placeholder="title"
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title}</span>
          )}
        </label>
        <label className={styles.inputLabel}>
          <input
            type="text"
            name="description"
            placeholder="description"
            className={`${styles.input} ${errors.description ? styles.inputError : ""}`}
          />
          {errors.description && (
            <span className={styles.errorMessage}>{errors.description}</span>
          )}
        </label>
        <label className={styles.inputLabel}>
          <input
            type="text"
            placeholder="place"
            name="place"
            className={`${styles.input} ${errors.place ? styles.inputError : ""}`}
          />
          {errors.place && (
            <span className={styles.errorMessage}>{errors.place}</span>
          )}
        </label>
        <div className={styles.dateAndStatusInputs}>
          <label className={styles.inputLabel}>
            <input
              type="date"
              placeholder="foundAt"
              name="foundAt"
              className={`${styles.input} ${errors.foundAt ? styles.inputError : ""}`}
            />
            {errors.foundAt && (
              <span className={styles.errorMessage}>{errors.foundAt}</span>
            )}
          </label>
          <label className={styles.inputLabel}>
            <select
              name="status"
              className={`${styles.input} ${errors.status ? styles.inputError : ""}`}
              defaultValue=""
            >
              <option value="" disabled>
                Status
              </option>
              <option value="lost">lost</option>
              <option value="found">found</option>
            </select>
            {errors.status && (
              <span className={styles.errorMessage}>{errors.status}</span>
            )}
          </label>
        </div>

        <label className={styles.inputLabel}>
          <FileInput></FileInput>
        </label>

        <label className={styles.inputLabel}>
          <CategorySelect defaultText="Choose category"></CategorySelect>
        </label>
        <button type="submit" disabled={!isValid} className={styles.createBtn}>
          Create
        </button>
      </form>
    </div>
  );
}
