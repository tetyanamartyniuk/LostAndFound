import { AppDataSource } from "../database/database.js";
import { Participant } from "../entity/Participant.js";

export const participantRepo = AppDataSource.getRepository(Participant);
