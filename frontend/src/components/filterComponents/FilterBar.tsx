import type React from "react";
import { FilterByDate } from "./FilterByDate";
import { FilterByPlace } from "./FilterByPlace";
import { FilterByStatus } from "./FilterByStatus";
import { useSearchParams } from "react-router-dom";
import { FilterByCategory } from "./FilterByCategory";
import { SearchByName } from "./SearchByName";

export function FilterBar() {
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
  return (
    <>
      <form onSubmit={handleFiltersSubmit}>
        <FilterByDate></FilterByDate>
        <FilterByStatus></FilterByStatus>
        <FilterByPlace></FilterByPlace>
        <FilterByCategory></FilterByCategory>
        <button type="submit">Фільтрувати</button>
      </form>
      <SearchByName></SearchByName>
    </>
  );
}
