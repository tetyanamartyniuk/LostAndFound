import { useState } from "react";
import styles from "./FilterByStatus.module.css";

export function FilterByStatus() {
  const [selectedStatus, setSelectedStatus] = useState<"lost" | "found" | "">(
    "",
  );
  return (
    <div className={styles.statusContainer}>
      <input type="hidden" name="status" value={selectedStatus}></input>
      <ul className={styles.statusList}>
        <li
          className={`${styles.status} ${selectedStatus === "lost" ? `${styles.activeStatus}` : ""}`}
          onClick={() => setSelectedStatus("lost")}
        >
          Lost
        </li>
        <li
          className={`${styles.status} ${selectedStatus === "found" ? `${styles.activeStatus}` : ""}`}
          onClick={() => setSelectedStatus("found")}
        >
          Found
        </li>
      </ul>
    </div>
  );
}
