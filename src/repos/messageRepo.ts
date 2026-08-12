import { AppDataSource } from "../database/database.js";
import { Message } from "../entity/Message.js";

export const messageRepo = AppDataSource.getRepository(Message);
