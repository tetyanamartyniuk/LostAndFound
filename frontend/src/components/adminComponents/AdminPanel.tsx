import { CategoriesPanel } from "./categoriesComponent/CategoriesPanel";
import { PendingItems } from "./PendingItems";
import styles from "./AdminPanel.module.css";

export function AdminPanel() {
  return (
    <div className={styles.adminPage}>
      <h1 className={styles.pageTitle}>Administration Panel</h1>
      <div className={styles.adminLayout}>
        <div className={styles.pendingColumn}>
          <PendingItems />
        </div>
        <div className={styles.verticalDivider}></div>
        <div className={styles.categoriesColumn}>
          <CategoriesPanel />
        </div>
      </div>
    </div>
  );
}
