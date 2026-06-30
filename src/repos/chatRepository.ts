// import { Brackets } from "typeorm";
// import { AppDataSource } from "../database/database.js";
// import { Chat } from "../entity/Chat.js";

// export const chatRepo = AppDataSource.getRepository(Chat).extend({
//   // Перший метод (легкий)
//   async checkChatExists(
//     itemId: number,
//     user1id: number,
//     user2id: number,
//   ): Promise<Chat | null> {
//     return this.createQueryBuilder("chat")
//       .where("chat.itemId = :itemId", { itemId })
//       .andWhere(
//         new Brackets((qb) => {
//           qb.where("chat.user1id = :user1id AND chat.user2id = :user2id", {
//             user1id,
//             user2id,
//           }).orWhere("chat.user2id = :user1id AND chat.user1id = :user2id", {
//             user1id,
//             user2id,
//           });
//         }),
//       )
//       .getOne();
//   },

//   // Другий метод (важкий, з повідомленнями)
//   async getExactChat(itemId: number, user1id: number, user2id: number) {
//     return this.createQueryBuilder("chat")
//       .leftJoinAndSelect("chat.messages", "message")
//       .where("chat.itemId = :itemId", { itemId })
//       .andWhere(
//         new Brackets((qb) => {
//           qb.where("chat.user1id = :user1id AND chat.user2id = :user2id", {
//             user1id,
//             user2id,
//           }).orWhere("chat.user2id = :user1id AND chat.user1id = :user2id", {
//             user1id,
//             user2id,
//           });
//         }),
//       )
//       .orderBy("message.sentAt", "ASC")
//       .getOne();
//   },

//   async getChats(userId: number): Promise<Chat[] | null> {
//     return this.createQueryBuilder("chat")
//       .leftJoinAndSelect("chat.messages", "message")
//       .where("chat.user1id = :userId", { userId })
//       .orWhere("chat.user2id = :userId", { userId })
//       .orderBy("message.sentAt", "ASC")
//       .getMany();
//   },
// });
