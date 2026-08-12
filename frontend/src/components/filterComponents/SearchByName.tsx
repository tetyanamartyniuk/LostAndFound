import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchByName.module.css";

export function SearchByName() {
  const [title, setTitle] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlTitle = searchParams.get("title") || "";
    setTitle(urlTitle);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const currentParams = Object.fromEntries(searchParams.entries());

      if (title.trim() !== "") {
        setSearchParams({ ...currentParams, title: title.trim() });
      } else {
        const { title: _, ...rest } = currentParams;
        setSearchParams(rest);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [title]);
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search by name..."
        className={styles.input}
      ></input>
      <span className={styles.searchIcon}>🔎︎</span>
    </div>
  );
}
