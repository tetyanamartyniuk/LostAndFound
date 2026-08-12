import { check } from "zod";
import { AppDataSource } from "../database/database.js";
import { Conversation } from "../entity/Conversation.js";

export const conversationRepo = AppDataSource.getRepository(
  Conversation,
).extend({
  async checkConversationExists(
    senderId: number,
    receiverId: number,
    itemId: number,
  ) {
    return this.createQueryBuilder("conversation")
      .innerJoin("conversation.participants", "p1", "p1.userId = :senderId", {
        senderId,
      })
      .innerJoin("conversation.participants", "p2", "p2.userId = :receiverId", {
        receiverId,
      })
      .where("conversation.itemId = :itemId", { itemId })
      .getOne();
  },

  async getExactConversation(itemId: number, userId: number) {
    return this.createQueryBuilder("conversation")
      .innerJoin(
        "conversation.participants",
        "currParticipant",
        "currParticipant.userId = :userId",
        { userId },
      )
      .innerJoinAndSelect("conversation.participants", "allParticipants")
      .innerJoinAndSelect("allParticipants.user", "user")

      .innerJoinAndSelect("conversation.messages", "m")
      .where("conversation.itemId = :itemId", { itemId })
      .orderBy("m.sentAt", "ASC")
      .getOne();
  },
  async getAllConversations(userId: number) {
    return this.createQueryBuilder("conversation")
      .innerJoin("conversation.participants", "p", "p.userId = :userId", {
        userId,
      })
      .innerJoinAndSelect("conversation.participants", "allParticipants")
      .innerJoinAndSelect("conversation.messages", "m")
      .getMany();
  },
});
