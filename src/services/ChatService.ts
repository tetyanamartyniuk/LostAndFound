// import { DataSource, Repository } from "typeorm";
// import { Chat } from "../entity/Chat.js";
// import { Message } from "../entity/Message.js";
// import { AppDataSource } from "../database/database.js";
// import { chatRepo } from "../repos/chatRepository.js";
// import { messageRepo } from "../repos/MessageRepository.js";
// import type { ZodNumberFormat } from "zod";
// import { NotFoundError } from "../exceptions/exceptions.js";
// import { Item } from "../entity/Item.js";
// import { itemRepo } from "../repos/itemRepository.js";

// export interface ProcessMessagePayload {
//   itemId: number;
//   senderId: number;
//   receiverId: number;
//   text: string;
// }

// class ChatService {
//   private chatRepo: typeof chatRepo;
//   private messageRepo: typeof messageRepo;
//   private itemRepo: typeof itemRepo;

//   constructor(private dataSource: DataSource) {
//     ((this.chatRepo = chatRepo),
//       (this.messageRepo = messageRepo),
//       (this.itemRepo = itemRepo));
//   }

//   async startChatAndSendMessage(
//     payload: ProcessMessagePayload,
//   ): Promise<{ chat: Chat; message: Message }> {
//     if (payload.itemId === undefined || payload.itemId === null) {
//       throw new Error(
//         "Помилка: itemId є обовʼязковим і не може бути порожнім чи null!",
//       );
//     }
//     const itemExists = this.itemRepo.findOne({
//       where: {
//         id: payload.itemId,
//       },
//     });
//     if (!itemExists) {
//       throw new NotFoundError(`Річ з id ${payload.itemId} не була знайдена`);
//     }


//     return await this.dataSource.transaction(
//       async (transactionalEntityManager) => {
//         const txChatRepo = transactionalEntityManager.withRepository(
//           this.chatRepo,
//         );
//         const itemExists = await transactionalEntityManager.findOne(Item, {
//           where: {
//             id: payload.itemId,
//           },
//         });

//         if (!itemExists) {
//           throw new NotFoundError(`Товар з ID ${payload.itemId} не знайдено!`);
//         }

//         let chat = await txChatRepo.checkChatExists(
//           payload.itemId,
//           payload.receiverId,
//           payload.senderId,
//         );

//         if (!chat) {
//           const newChat = transactionalEntityManager.create(Chat, {
//             itemId: payload.itemId,
//             user1id: payload.senderId,
//             user2id: payload.receiverId,
//           });
//           chat = await transactionalEntityManager.save(newChat);
//         }
//         const newMessage = transactionalEntityManager.create(Message, {
//           senderId: payload.senderId,
//           text: payload.text,
//           chatId: chat.id,
//         });
//         const savedMessage = await transactionalEntityManager.save(newMessage);
//         return { chat: chat, message: savedMessage };
//       },
//     );
//   }

//   async getChat(
//     user1Id: number,
//     user2id: number,
//     itemId: number,
//   ): Promise<Chat | null> {
//     const result = await this.chatRepo.getExactChat(itemId, user1Id, user2id);
//     console.log("ЧАТИ", result);
//     return result;
//   }

//   async getChats(userId: number): Promise<Chat[] | null> {
//     const result = await this.chatRepo.getChats(userId);
//     return result;
//   }
// }
// export const chatService = new ChatService(AppDataSource);
