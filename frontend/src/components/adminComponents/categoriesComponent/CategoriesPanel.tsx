import { useState } from "react";
import type { CreateCategoryDto } from "../../../types/Category";
import { CategoriesList } from "./CategoriesList";
import { CreateCategory } from "./CreateCategory";
import styles from "./CategoriesPanel.module.css";

export function CategoriesPanel() {
  const [category, setCategory] = useState<CreateCategoryDto>({ name: "" });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className={styles.panelCard}>
      <h2 className={styles.panelHeading}>Manage Categories</h2>

      <div className={styles.panelContent}>
        <CreateCategory
          category={category}
          setCategory={setCategory}
          onSuccess={handleSuccess}
        />
        <CategoriesList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
