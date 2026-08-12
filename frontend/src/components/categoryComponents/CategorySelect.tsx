import { useEffect, useState } from "react";

import styles from "./CategorySelect.module.css";
import { useCategories } from "../../context/CategoriesContext";

interface CategorySelectProps {
  defaultText: string;
}
export function CategorySelect({ defaultText }: CategorySelectProps) {
  const categories = useCategories();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <select name="categoryId" className={styles.select}>
      <option value="" className={styles.option}>
        {defaultText}
      </option>
      {categories.map((category) => (
        <option value={category.name}>{category.name}</option>
      ))}
    </select>

    // <div className={styles.customListContainer}>
    //   <input type="hidden" name="categoryId" value={selectedId ?? ""}></input>
    //   <ul className={styles.scrollableList}>
    //     <li
    //       className={`${styles.listItem} ${selectedId === null ? styles.activeItem : ""}`}
    //       onClick={(e) => setSelectedId(null)}
    //     >
    //       {defaultText}
    //     </li>

    //     {categories.map((category) => (
    //       <li
    //         key={category.id}
    //         onClick={() => setSelectedId(category.id)}
    //         className={`${styles.listItem} ${selectedId === category.id ? styles.activeItem : ""}`}
    //       >
    //         {category.name}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
