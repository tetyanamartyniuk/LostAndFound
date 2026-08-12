import { th } from "zod/locales";
import { AppDataSource } from "../database/database.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { conversationRepo } from "../repos/conversationRepo.js";
import { participantRepo } from "../repos/participantRepo.js";
import { itemRepo } from "../repos/itemRepository.js";
import { Item } from "../entity/Item.js";
import { messageRepo } from "../repos/MessageRepo.js";
import { Conversation } from "../entity/Conversation.js";
import { Participant } from "../entity/Participant.js";
import { Message } from "../entity/Message.js";

class ConversationService {
  constructor(
    private _conversationRepo: typeof conversationRepo,
    private _dataSource: typeof AppDataSource,
    private _participantRepo: typeof participantRepo,
    private _messageRepo: typeof messageRepo,
  ) {}

  async getConversation(itemId: number) {
    const result = await this._conversationRepo.findOne({
      where: {
        itemId: itemId,
      },
    });
    if (!result) {
      throw new NotFoundError(`Conversation with id ${id} wasn't found`);
    }
    return result;
  }

  async createConversationAndSendMessage(
    itemId: number,
    senderId: number,
    text: string,
  ): Promise<{ conversation: Conversation; message: Message }> {
    return await this._dataSource.transaction(
      async (transactionalEntityManager) => {
        const tempConversationRepo = transactionalEntityManager.withRepository(
          this._conversationRepo,
        );
        const item: Item | null = await transactionalEntityManager.findOne(
          Item,
          {
            where: {
              id: itemId,
            },
          },
        );
        if (!item) {
          throw new NotFoundError(`Item with id ${itemId} wasn't found`);
        }

        let conversation = await tempConversationRepo.checkConversationExists(
          senderId,
          item.userId,
          item.id,
        );

        if (!conversation) {
          if (senderId === item.userId) {
            throw new Error("You cannot send a message to yourself");
          }
          conversation = await transactionalEntityManager.save(Conversation, {
            itemId,
          });

          await transactionalEntityManager.save(Participant, {
            conversationId: conversation.id,
            userId: senderId,
          });
          await transactionalEntityManager.save(Participant, {
            conversationId: conversation.id,
            userId: item.userId,
          });
        }

        const message = await transactionalEntityManager.save(Message, {
          text,
          senderId: senderId,
          conversationId: conversation.id,
        });
        return { conversation: conversation, message: message };
      },
    );
  }

  async getExactConversation(itemId: number, userId: number) {
    const conversation = await this._conversationRepo.getExactConversation(
      itemId,
      userId,
    );
    return conversation;
  }

  async getAllConversations(userId: number) {
    const conversations =
      await this._conversationRepo.getAllConversations(userId);
    return conversations;
  }
}

export const conversationService = new ConversationService(
  conversationRepo,
  AppDataSource,
  participantRepo,
  messageRepo,
);
