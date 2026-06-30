import { useEffect, useState } from "react";
import type { Item } from "../../types/Item";
import { ItemCard } from "./ItemCard";
import { itemService } from "../../services/itemService";
import { useSearchParams } from "react-router-dom";
import { FilterBar } from "../filterComponents/FilterBar";
import styles from "./ItemList.module.css";

// 2. Описуємо пропси для компонента.
// Якщо компонент приймає всю річ і, наприклад, якийсь додатковий заголовок:

export function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams(); //отримуємо доступ до URL-параметрів

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const filters = Object.fromEntries(searchParams.entries()); //перетворюємо параметри з url в звичайний об'єкт
        const result = await itemService.getAll(filters);
        setItems(result.data);
      } catch (error) {
        console.error("Помилка запиту:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [searchParams]);
  if (loading) return <p>Завантаження даних з сервера...</p>;

  return (
    <div>
      <h1>Речі</h1>
      <FilterBar></FilterBar>
      {items.length === 0 ? (
        "Список речей порожній"
      ) : (
        <ul className={styles.itemList}>
          {items.map((item) => (
            <ItemCard key={item.id} item={item}></ItemCard>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
