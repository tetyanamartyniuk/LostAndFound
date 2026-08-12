import { AppDataSource } from "../database/database.js";
import { User } from "../entity/User.js";

export const userRepo = AppDataSource.getRepository(User);
