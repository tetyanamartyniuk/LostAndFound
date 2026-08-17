import { categoryService } from "../../../services/categoryService";
import type { CreateCategoryDto } from "../../../types/Category";
import styles from "./CreateCategory.module.css";

export interface CreateCategoryProps {
  category: CreateCategoryDto;
  setCategory: (category: CreateCategoryDto) => void;
  onSuccess: () => void; // Новий проп для оновлення списку
}

export function CreateCategory({
  category,
  setCategory,
  onSuccess,
}: CreateCategoryProps) {
  async function handleCreateCategoryFormSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    if (!category.name.trim()) return;

    try {
      await categoryService.createCategory(category);
      setCategory({ name: "" });
      onSuccess();
    } catch (error) {
      console.log(error);
      alert("Failed to create the category");
    }
  }

  return (
    <form
      onSubmit={handleCreateCategoryFormSubmit}
      className={styles.createForm}
    >
      <input
        type="text"
        name="name"
        placeholder="New category name..."
        value={category.name}
        onChange={(e) =>
          setCategory({ ...category, name: e.currentTarget.value })
        }
        className={styles.inputField}
        required
      />
      <button
        type="submit"
        className={styles.createBtn}
        disabled={!category.name.trim()}
      >
        Create
      </button>
    </form>
  );
}
