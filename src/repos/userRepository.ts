import { AppDataSource } from "../database/database.js";
import { User } from "../entity/User.js";

//тут можуть бути якісь кастомні запити до бд
export const userRepo = AppDataSource.getRepository(User)

