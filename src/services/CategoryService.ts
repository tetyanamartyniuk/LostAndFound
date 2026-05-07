import type { Repository } from "typeorm";
import type { Category } from "../entity/Category.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import type { CreateCategoryBody } from "../types/Category.js";
import { categoryRepo } from "../repos/categoryRepository.js";

class CategoryService {
  constructor(private categoryRepo: Repository<Category>) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundError("Category with this id wasn`t found");
    }
    return category;
  }

  async addCategory(category: CreateCategoryBody): Promise<Category> {
    return await this.categoryRepo.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const { affected } = await this.categoryRepo.delete({ id: id });
    if (affected === 0) {
      throw new NotFoundError("Category with this id doesn`t exist");
    }
  }
}

export const categoryService = new CategoryService(categoryRepo);
