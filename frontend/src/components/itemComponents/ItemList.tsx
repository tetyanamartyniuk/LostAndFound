import { useEffect, useState } from "react";
import type { Item } from "../../types/Item";
import { ItemCard } from "./ItemCard";
import { itemService } from "../../services/itemService";
import { useSearchParams } from "react-router-dom";
import { FilterSidebar } from "../filterComponents/FilterSidebar";
import styles from "./ItemList.module.css";
import { SearchByName } from "../filterComponents/SearchByName";

export function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const filters = Object.fromEntries(searchParams.entries());
        const result = await itemService.getAll(filters);
        setItems(result);
      } catch (error) {
        console.error("Request error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [searchParams]);
  if (loading) return <p>Loading ...</p>;

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.filtersSidebar}>
        <FilterSidebar></FilterSidebar>
      </aside>

      <main className={styles.main}>
        <div className={styles.searchPanel}>
          <p>1000 active items</p>
          <SearchByName></SearchByName>
        </div>
        {items.length === 0 ? (
          "There are no items"
        ) : (
          <ul className={styles.itemList}>
            {items.map((item) => (
              <ItemCard key={item.id} item={item}></ItemCard>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default ItemList;
