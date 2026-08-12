import { useState } from "react";
import type { CreateCategoryDto } from "../../../types/Category";
import { CategoriesList } from "./CategoriesList";
import { CreateCategory } from "./CreateCategory";

export function CategoriesPanel() {
  const [category, setCategory] = useState<CreateCategoryDto>({ name: "" });

  return (
    <div>
      <CategoriesList category={category}></CategoriesList>
      <CreateCategory
        category={category}
        setCategory={setCategory}
      ></CreateCategory>
    </div>
  );
}
