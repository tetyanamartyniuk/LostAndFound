import { CategoriesList } from "./categoriesComponent/CategoriesList";
import { CategoriesPanel } from "./categoriesComponent/CategoriesPanel";
import { CreateCategory } from "./categoriesComponent/CreateCategory";
import { PendingItems } from "./PendingItems";

export function AdminPanel() {
  return (
    <>
      <PendingItems></PendingItems>
      <CategoriesPanel></CategoriesPanel>
    </>
  );
}
