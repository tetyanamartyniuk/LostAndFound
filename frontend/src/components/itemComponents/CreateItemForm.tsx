import { useState, type FormEvent } from "react";
import { CategorySelect } from "../CategorySelect";
import { itemSchema } from "../../../../src/schemas";

export interface CreateItemFormProps {
  onCreate: (formData: any) => void;
}

export function CreateItemForm({ onCreate }: CreateItemFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateFullForm = (formElement: HTMLFormElement) => {
    const formData = new FormData(formElement); //нам не треба збирати всі властивості через append, бо браузер робить це за нас
    //formData зараз у вигляді спеціального бінарного контейнера
    const rawData = Object.fromEntries(formData.entries()); //перетворюємо на звичайний JS об'єкт
    const result = itemSchema.safeParse(rawData);
    return result;
  };

  //ф-ція для валідації інпутів "на льоту"
  const handleFormInput = (e: FormEvent<HTMLFormElement>) => {
    const formCheck = validateFullForm(e.currentTarget);
    setIsValid(formCheck.success);
    //дістаємо з форми інпути та їх назви
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const fieldName = target.name;
    const fieldValue = target.value;

    if (fieldValue.trim() === "") {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        nextErrors[fieldName] = "Це поле є обов'язковим";
        return nextErrors;
      });
      return;
    }
    //робимо всі поля необов'язковими, щоб мати можливість перевіряти по одному
    const result = itemSchema.partial().safeParse({ [fieldName]: fieldValue });

    //якщо результат не був успішним, шукаємо помилку конкретно для нашого поля
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName); //result.error.issues - масив усіх помилок, які виявив zod
      if (issue) {
        //якщо помилка трапилась
        //prev це попередній стан реакту (о'бєкт), ми його розпаковуємо і додаємо нову помилку
        setErrors((prev) => ({ ...prev, [fieldName]: issue.message }));
        return;
      }
    }
    //у реакт не можна змінювати стейт напряму
    setErrors((prev) => {
      //тому тут ми клонуємо наш об'єкт
      const nextErrors = { ...prev };
      //вбудований оператор дозволяє повністю видалити з об'єкта властивість і її значення
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
    <form onSubmit={handleSubmit} onChange={handleFormInput}>
      <label>
        <input type="text" name="title" placeholder="title" />
        {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      </label>
      <label>
        <input type="text" name="description" placeholder="description" />
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description}</span>
        )}
      </label>
      <label>
        <input type="place" placeholder="place" name="place" />
        {errors.place && <span style={{ color: "red" }}>{errors.place}</span>}
      </label>
      <label>
        <input type="date" placeholder="foundAt" name="foundAt" />
        {errors.foundAt && (
          <span style={{ color: "red" }}>{errors.foundAt}</span>
        )}
      </label>
      <label>
        <select name="status">
          <option value=""></option>
          <option value="lost">lost</option>
          <option value="found">found</option>
        </select>
        {errors.status && <span style={{ color: "red" }}>{errors.status}</span>}
      </label>
      <label>
        <input
          type="file"
          name="image"
          placeholder="Drag photo here"
          multiple
        />
      </label>
      <label>
        <CategorySelect defaultText="Виберіть категорію"></CategorySelect>
      </label>
      <button type="submit" disabled={!isValid}>
        Створити
      </button>
    </form>
  );
}
