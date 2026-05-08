import type { Repository } from "typeorm";
import type { Message } from "../entity/Message.js";
import { messageRepo } from "../repos/messageRepository.js";
import type { CreateMessageDTO } from "../types/Message.js";

class MessageService {
  constructor(private messageRepo: Repository<Message>) {}

  async getMyMessages(id: number): Promise<Message[]> {
    const messages = await this.messageRepo.find({
      where: [{ receiverId: id }, { senderId: id }],
      order: {
        id: "DESC",
      },
    });
    return messages;
  }

  async createMessage(
    data: CreateMessageDTO,
    receiverId: number,
    senderId: number,
  ): Promise<Message> {
    const newMessage = this.messageRepo.create({
      ...data,
      receiverId,
      senderId,
    });
    const savedMessage = await this.messageRepo.save(newMessage);
    return savedMessage;
  }
}

export const messageService = new MessageService(messageRepo);
