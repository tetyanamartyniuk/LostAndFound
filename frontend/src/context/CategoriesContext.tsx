import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Category } from "../types/Category";
import { categoryService } from "../services/categoryService";

const CategoriesContext = createContext<Category[] | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await categoryService.getAll();
        setCategories(categories);
      } catch (err) {
        console.error("Failed to get categories");
      }
    }
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories ?? []}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used inside of categoriesProvider");
  }
  return context;
};
