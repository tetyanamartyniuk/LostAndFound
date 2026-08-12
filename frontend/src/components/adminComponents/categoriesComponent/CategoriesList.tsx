import { useEffect, useState } from "react";
import { categoryService } from "../../../services/categoryService";
import type { Category, CreateCategoryDto } from "../../../types/Category";

export interface CategoriesListProps {
  category: CreateCategoryDto;
}

export function CategoriesList({ category }: CategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await categoryService.getAll();
        setCategories(categories);
      } catch (error) {}
    }
    fetchCategories();
  }, [category]);
  return (
    <div>
      {categories.length > 0 && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
