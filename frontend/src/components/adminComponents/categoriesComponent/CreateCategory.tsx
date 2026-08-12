import { categoryService } from "../../../services/categoryService";
import type { CreateCategoryDto } from "../../../types/Category";

export interface CreateCategoryProps {
  category: CreateCategoryDto;
  setCategory: (category: CreateCategoryDto) => void;
}

export function CreateCategory({ category, setCategory }: CreateCategoryProps) {
  async function handleCreateCategoryFormSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    try {
      await categoryService.createCategory(category);
      setCategory({ name: "" });
    } catch (error) {
      alert("Failed to create the category");
    }
  }

  return (
    <form onSubmit={handleCreateCategoryFormSubmit}>
      <label>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={(e) =>
            setCategory({ ...category, name: e.currentTarget.value })
          }
        />
      </label>
      <button>Create</button>
    </form>
  );
}
