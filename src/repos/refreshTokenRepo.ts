import { AppDataSource } from "../database/database.js";
import { RefreshToken } from "../entity/RefreshToken.js";

export const tokenRepo = AppDataSource.getRepository(RefreshToken)