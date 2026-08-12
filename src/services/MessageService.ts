import type { Repository } from "typeorm";
import type { Message } from "../entity/Message.js";
import { messageRepo } from "../repos/MessageRepo.js";
import type {
  CreateMessageDTO,
  CreateMessagePayload,
} from "../types/Message.js";
import type { Item } from "../entity/Item.js";

class MessageService {
  constructor(private messageRepo: Repository<Message>) {}

  async createMessage(payload: CreateMessagePayload): Promise<Message> {
    const newMessage = this.messageRepo.create(payload);
    const savedMessage = await this.messageRepo.save(newMessage);
    return savedMessage;
  }
}

export const messageService = new MessageService(messageRepo);
