import { useEffect, useState } from "react";
import { itemService } from "../services/itemService";
import { useSearchParams } from "react-router-dom";

export function SearchByName() {
  const [title, setTitle] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlTitle = searchParams.get("title") || "";
    setTitle(urlTitle);
  }, []);

  useEffect(() => {
    // 1. Створюємо таймер
    const timerId = setTimeout(() => {
      // Перетворюємо поточні параметри URL в об'єкт, щоб не затерти інші фільтри
      const currentParams = Object.fromEntries(searchParams.entries());

      if (title.trim() !== "") {
        // Якщо в інпуті є текст — додаємо/оновлюємо його в URL
        setSearchParams({ ...currentParams, title: title.trim() });
      } else {
        // Якщо інпут очистили — видаляємо параметр title з URL взагалі
        const { title: _, ...rest } = currentParams; // Магія деструктуризації: видаляємо title
        setSearchParams(rest);
      }
    }, 500); // Затримка 500 мілісекунд

    // Щоразу, коли юзер натискає нову літеру, цей useEffect перезапускається,
    // і React ПЕРШИМ ДІЛОМ виконає цю функцію — видалить попередній таймер!
    return () => clearTimeout(timerId);
  }, [title]);
  return (
    <input
      type="text"
      value={title}
      name="title"
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Пошук"
    ></input>
  );
}
