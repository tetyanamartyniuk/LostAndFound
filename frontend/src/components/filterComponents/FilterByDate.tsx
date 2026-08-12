import { useState } from "react";
import styles from "./FilterByDate.module.css";

export function FilterByDate() {
  const [isStartActive, setIsStartActive] = useState<boolean>(false);
  const [isEndActive, setIsEndActive] = useState<boolean>(false);

  return (
    // Загальний контейнер для дати, щоб вони гарно стояли один під одним
    <div className={styles.dateFilterContainer}>
      <label className={styles.dateLabel}>
        {/* Огортаємо текст у span, щоб керувати його шириною */}
        <span className={styles.labelText}>From:</span>
        <input
          type={isStartActive ? "date" : "text"}
          name="startDate"
          // Трохи спростив синтаксис класів (без зайвих лапок)
          className={isStartActive ? styles.dateInput : styles.textInput}
          onFocus={() => setIsStartActive(true)}
          onBlur={(e) => setIsStartActive(e.target.value !== "")}
        />
      </label>

      <label className={styles.dateLabel}>
        <span className={styles.labelText}>To:</span>
        <input
          type={isEndActive ? "date" : "text"}
          name="endDate"
          className={isEndActive ? styles.dateInput : styles.textInput}
          onFocus={() => setIsEndActive(true)}
          onBlur={(e) => setIsEndActive(e.target.value !== "")}
        />
      </label>
    </div>
  );
}
