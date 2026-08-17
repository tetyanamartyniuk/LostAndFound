import { useEffect, useState } from "react";
import { categoryService } from "../../../services/categoryService";
import type { Category } from "../../../types/Category";
import styles from "./CategoriesList.module.css";

export interface CategoriesListProps {
  refreshTrigger: number; // Слухаємо зміни цього числа
}

export function CategoriesList({ refreshTrigger }: CategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await categoryService.getAll();
        setCategories(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [refreshTrigger]); // Запит іде ТІЛЬКИ при завантаженні та після створення нової

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listTitle}>Existing Categories</h3>

      {categories.length > 0 ? (
        <ul className={styles.tagsWrapper}>
          {categories.map((category) => (
            <li key={category.id} className={styles.tagItem}>
              {category.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>No categories found.</p>
      )}
    </div>
  );
}
