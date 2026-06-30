import type { Repository } from "typeorm";
import type { Message } from "../entity/Message.js";
import { messageRepo } from "../repos/MessageRepository.js";
import type {
  CreateMessageDTO,
  CreateMessagePayload,
} from "../types/Message.js";
import type { Item } from "../entity/Item.js";

class MessageService {
  constructor(private messageRepo: Repository<Message>) {}

  // async getMyMessages(id: number): Promise<Message[]> {
  //   const messages = await this.messageRepo.find({
  //     where: [{ receiverId: id }, { senderId: id }],
  //     order: {
  //       id: "DESC",
  //     },
  //   });
  //   return messages;
  // }

  // async getSentMessages(id: number) {
  //   return await this.getMessagesByRole(id, "senderId");
  // }

  // async getReceivedMessages(id: number) {
  //   return await this.getMessagesByRole(id, "receiverId");
  // }

  async createMessage(payload: CreateMessagePayload): Promise<Message> {
    const newMessage = this.messageRepo.create(payload);
    console.log(newMessage);
    const savedMessage = await this.messageRepo.save(newMessage);
    return savedMessage;
  }

  // async getChatByItem(userId: number, itemId: number): Promise<Item[]>{
  //   const messages = await this.messageRepo.find({where:{
  //     itemId: itemId
  //   }})

  //   return
  // }

  // private async getMessagesByRole(
  //   id: number,
  //   role: "receiverId" | "senderId",
  // ): Promise<Message[]> {
  //   const messages = await this.messageRepo.find({
  //     where: {
  //       [role]: id,
  //     },
  //     order: {
  //       id: "DESC",
  //     },
  //   });
  //   if (messages.length === 0) {
  //     console.log(`There are no messages for ${role}: ${id}`);
  //   }
  //   return messages;
  // }
}

export const messageService = new MessageService(messageRepo);
