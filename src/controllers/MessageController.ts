import type { Request, Response } from "express";
import { messageService } from "../services/MessageService.js";
import { UnauthorizedError } from "../exceptions/exceptions.js";
import { itemService } from "../services/ItemService.js";
import type { IdParams } from "../types/idParamsType.js";
import type { CreateMessageDTO, itemId } from "../types/Message.js";

class MessageController {
  constructor(
    private _service: typeof messageService,
    private _itemService: typeof itemService,
  ) {}

  createMessage = async (
    req: Request<itemId, {}, CreateMessageDTO>,
    res: Response,
  ): Promise<Response> => {
    if (!req.user) {
      throw new UnauthorizedError("You are not authorized");
    }

    const senderId = req.user?.id;

    const id = Number(req.params.itemId);
    console.log("Id sendera" + senderId);
    const { userId } = await this._itemService.getItemById(id);
    const receiverId = userId;

    const savedMessage = await this._service.createMessage(
      req.body,
      senderId,
      receiverId,
    );
    return res.status(201).json({
      success: true,
      message: savedMessage,
    });
  };

  getMyMessages = async (req: Request, res: Response): Promise<Response> => {
    const id = req.user!.id;
    const messages = await this._service.getMyMessages(id);
    return res.status(200).json({
      success: true,
      messages: messages,
    });
  };
}

export const messageController = new MessageController(
  messageService,
  itemService,
);
