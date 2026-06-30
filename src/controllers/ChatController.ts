// import { UnauthorizedError } from "../exceptions/exceptions.js";
// import { chatService } from "../services/ChatService.js";
// import type { Request, Response } from "express";
// import type { IdParams } from "../types/idParamsType.js";
// import { success } from "zod";
// import { itemService } from "../services/ItemService.js";

// class ChatController {
//   constructor(
//     private _chatService: typeof chatService,
//     private _itemService: typeof itemService,
//   ) {}

//   private getUserId = (req: Request) => {
//     if (!req.user) {
//       throw new UnauthorizedError("You are not authorized");
//     }
//     const id = Number(req.user.id);
//     if (isNaN(id)) {
//       throw new UnauthorizedError("Invalid user identification");
//     }
//     return id;
//   };

//   getChats = async (req: Request, res: Response) => {
//     const id = this.getUserId(req);
//     const chats = await this._chatService.getChats(id);

//     console.log(
//       "CHATS",
//       chats?.forEach((chat) => chat.messages[0]),
//     );
//     return res.status(200).json({
//       success: true,
//       data: chats,
//     });
//   };

//   getExactChat = async (req: Request<IdParams>, res: Response) => {
//     const itemId = Number(req.params.id);
//     if (!req.user) {
//       throw new UnauthorizedError("You are not authorized");
//     }
//     const item = await this._itemService.getItemById(itemId);
//     const chat = await this._chatService.getChat(
//       req.user.id,
//       item.userId,
//       itemId,
//     );
//     const id = Number(req.user.id);
//     if (isNaN(id)) {
//       throw new UnauthorizedError("Invalid user identification");
//     }
//     //const chats = await this._chatService.getChats(id);
//     //console.log(chats);
//     const messages = chat ? chat.messages : [""];
//     return res.status(200).json({
//       success: true,
//       data: { item, messages },
//     });
//   };
// }

// export const chatController = new ChatController(chatService, itemService);
