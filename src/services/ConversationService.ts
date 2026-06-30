import { th } from "zod/locales";
import { AppDataSource } from "../database/database.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import { conversationRepo } from "../repos/ConversationRepository.js";
import { participantRepo } from "../repos/ParticipantRepo.js";
import { itemRepo } from "../repos/itemRepository.js";
import { Item } from "../entity/Item.js";
import { messageRepo } from "../repos/MessageRepository.js";
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
      throw new NotFoundError("Розмову з таким id речі не знайдено");
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
          throw new NotFoundError("Не вдалось знайти річ з таким id");
        }

        // if (item.userId === senderId) {
        //   throw new Error("Ви не можете почати розмову щодо власної речі");
        // }
        let conversation = await tempConversationRepo.checkConversationExists(
          senderId,
          item.userId,
          item.id,
        );

        if (!conversation) {
          if (senderId === item.userId) {
            console.log("sender" + senderId);
            console.log("Item owner id" + item.userId);
            throw new Error("Ти не можеш почати чат сам із собою");
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
  // async createConversation(){
  //     await this._conversationRepo.save()
  // }
}

export const conversationService = new ConversationService(
  conversationRepo,
  AppDataSource,
  participantRepo,
  messageRepo,
);
