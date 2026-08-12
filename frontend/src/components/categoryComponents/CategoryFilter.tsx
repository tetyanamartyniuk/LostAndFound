import { useEffect, useState } from "react";
import type { Category } from "../../types/Category";
import { categoryService } from "../../services/categoryService";
import styles from "./CategoryFilter.module.css";
import { useCategories } from "../../context/CategoriesContext";

interface CategoryFilterProps {
  defaultText: string;
}
export function CategoryFilter({ defaultText }: CategoryFilterProps) {
  const categories = useCategories();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className={styles.customListContainer}>
      <input type="hidden" name="categoryId" value={selectedId ?? ""}></input>
      <ul className={styles.scrollableList}>
        <li
          className={`${styles.listItem} ${selectedId === null ? styles.activeItem : ""}`}
          onClick={(e) => setSelectedId(null)}
        >
          {defaultText}
        </li>

        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => setSelectedId(category.id)}
            className={`${styles.listItem} ${selectedId === category.id ? styles.activeItem : ""}`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
