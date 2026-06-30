import type { Category } from "../types/Category";
import type { ServerResponse } from "../types/Item";

export const categoryService = {
  getAll: async () => {
    const response = await fetch("/api/category");
    if (!response.ok) {
      throw new Error("Не вдалось отримати список категорій");
    }
    const data: ServerResponse<Category[]> = await response.json();
    return data;
  },
};
