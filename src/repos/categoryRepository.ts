import { AppDataSource } from "../database/database.js";
import { Category } from "../entity/Category.js";

export const categoryRepo = AppDataSource.getRepository(Category);
