import type { Category, CreateCategoryDto } from "../types/Category";
import type { ServerResponse } from "../types/Item";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch("/api/categories");
    if (!response.ok) {
      throw new Error("Failed to get the categories list");
    }
    const data: ServerResponse<Category[]> = await response.json();
    return data.data;
  },

  createCategory: async (category: CreateCategoryDto): Promise<Category> => {
    console.log(category);
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to create the category");
    }
    const { data } = await response.json();
    console.log(data);
    return data;
  },
};
