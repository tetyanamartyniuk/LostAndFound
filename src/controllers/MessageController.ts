import type { Request, Response } from "express";
import { messageService } from "../services/MessageService.js";
import { NotFoundError, UnauthorizedError } from "../exceptions/exceptions.js";
import { itemService } from "../services/ItemService.js";
import type { IdParams } from "../types/idParamsType.js";
import type {
  CreateMessageDTO,
  CreateMessagePayload,
  itemId,
} from "../types/Message.js";
import { success } from "zod";

class MessageController {
  constructor(
    private _service: typeof messageService,
    private _itemService: typeof itemService,
  ) {}

  private getUserId = (req: Request) => {
    if (!req.user) {
      throw new UnauthorizedError("You are not authorized");
    }
    const id = Number(req.user.id);
    if (isNaN(id)) {
      throw new UnauthorizedError("Invalid user identification");
    }
    return id;
  };

  createMessage = async (
    req: Request<itemId, {}, CreateMessageDTO>,
    res: Response,
  ): Promise<Response> => {
    const senderId = this.getUserId(req);
    console.log("Id відправника" + senderId);
    const itemId = Number(req.params.itemId);
    console.log("ID речі: " + itemId);
    if (isNaN(itemId)) {
      throw new NotFoundError("Invalid item ID format");
    }
    const item = await this._itemService.getItemById(itemId);

    if (!item) {
      throw new NotFoundError("Item with this ID does not exist");
    }

    const receiverId = item.userId;
    console.log("ID отримувача: " + receiverId);
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You can not send message to yourself",
      });
    }
    const payload: CreateMessagePayload = {
      ...req.body,
      senderId,
      receiverId,
      itemId,
    };
    const savedMessage = await this._service.createMessage(payload);
    return res.status(201).json({
      success: true,
      message: savedMessage,
    });
  };

  getMyMessages = async (req: Request, res: Response): Promise<Response> => {
    const id = this.getUserId(req);
    const messages = await this._service.getMyMessages(id);
    return res.status(200).json({
      success: true,
      messages: messages,
    });
  };

  getReceivedMessages = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const id = this.getUserId(req);
    const messages = await this._service.getReceivedMessages(id);
    return res.status(200).json({
      success: true,
      receivedMessages: messages,
    });
  };

  getSentMessages = async (req: Request, res: Response): Promise<Response> => {
    const id = this.getUserId(req);
    const messages = await this._service.getSentMessages(id);
    return res.status(200).json({
      success: true,
      sentMessages: messages,
    });
  };

  //   getDialogue= async (req: Request, res: Response): Promise<Response> =>{

  //     await this._service.getDialogue(receiverId, senderId)
  //   }
}

export const messageController = new MessageController(
  messageService,
  itemService,
);
