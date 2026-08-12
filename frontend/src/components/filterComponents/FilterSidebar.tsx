import type React from "react";
import { FilterByDate } from "./FilterByDate";
import { FilterByPlace } from "./FilterByPlace";
import { FilterByStatus } from "./FilterByStatus";
import { useSearchParams } from "react-router-dom";
import { FilterByCategory } from "./FilterByCategory";
import { SearchByName } from "./SearchByName";
import styles from "./FilterSidebar.module.css";

export function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFiltersSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cleanParams: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        const trimmedValue = value.trim();

        if (trimmedValue !== "") {
          cleanParams[key] = value.trim();
        }
      }
    });

    setSearchParams(cleanParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };
  return (
    <div className={styles.filterSidebarContainer}>
      <div className={styles.filtersTitle}>
        <h3 className={styles.filtersHeader}>Filters</h3>
        <button className={styles.clearBtn} onClick={handleClearFilters}>
          Clear all
        </button>
      </div>

      <form onSubmit={handleFiltersSubmit} className={styles.filtersForm}>
        <div className={styles.placeInput}>
          <FilterByPlace></FilterByPlace>
        </div>

        <FilterByStatus></FilterByStatus>

        <div className={styles.dateInput}>
          <FilterByDate></FilterByDate>
        </div>

        <FilterByCategory></FilterByCategory>
        <button type="submit" className={styles.filterBtn}>
          Filter
        </button>
      </form>
    </div>
  );
}
