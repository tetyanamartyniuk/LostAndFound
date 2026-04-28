import { AppDataSource } from "../database/database.js";
import { Item } from "../entity/Item.js";

export const itemRepo = AppDataSource.getRepository(Item)