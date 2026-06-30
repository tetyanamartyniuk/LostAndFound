import { useEffect, useState } from "react";
import type { Category } from "../types/Category";
import { categoryService } from "../services/categoryService";

interface CategorySelectProps {
  defaultText: string;
}

export function CategorySelect({ defaultText }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getAll();
        setCategories(result.data);

        //  Дивимося в лог на data, а не на categories
        console.log("Отримані категорії:", result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <select name="categoryId">
      <option value="">{defaultText}</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
