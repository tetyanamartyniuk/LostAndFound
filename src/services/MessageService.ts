import type { Repository } from "typeorm";
import type { Message } from "../entity/Message.js";
import { messageRepo } from "../repos/MessageRepository.js";
import type {
  CreateMessageDTO,
  CreateMessagePayload,
} from "../types/Message.js";

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

  async getSentMessages(id: number) {
    return await this.getMessagesByRole(id, "senderId");
  }

  async getReceivedMessages(id: number) {
    return await this.getMessagesByRole(id, "receiverId");
  }

  async createMessage(payload: CreateMessagePayload): Promise<Message> {
    const newMessage = this.messageRepo.create(payload);
    console.log(newMessage);
    const savedMessage = await this.messageRepo.save(newMessage);
    return savedMessage;
  }

  async getDialogue(user1id: number, user2id: number, itemId: number) {
    const dialogue = await this.messageRepo.find({
      where: [
        { receiverId: user1id, senderId: user2id, itemId: itemId },
        { receiverId: user2id, senderId: user1id, itemId: itemId },
      ],
      order: {
        id: "DESC",
      },
    });
    if (dialogue.length === 0) {
      console.log("You don`t have a dialogue with this person yet");
    }
    return dialogue;
  }

  async getChat(userId: number, itemId: number): Promise<Message[]> {
    const messages = await this.messageRepo.find({
      where: [
        { receiverId: userId, itemId: itemId },
        { senderId: userId, itemId: itemId },
      ],
    });
    return messages;
  }

  private async getMessagesByRole(
    id: number,
    role: "receiverId" | "senderId",
  ): Promise<Message[]> {
    const messages = await this.messageRepo.find({
      where: {
        [role]: id,
      },
      order: {
        id: "DESC",
      },
    });
    if (messages.length === 0) {
      console.log(`There are no messages for ${role}: ${id}`);
    }
    return messages;
  }
}

export const messageService = new MessageService(messageRepo);
