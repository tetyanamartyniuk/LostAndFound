import type { Request, Response } from "express";
import { conversationService } from "../services/ConversationService.js";
import { NotFoundError, UnauthorizedError } from "../exceptions/exceptions.js";
import type { IdParams } from "../types/idParamsType.js";
import { success } from "zod";

class ConversationController {
  constructor(private _conversationService: typeof conversationService) {}

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

  createConversationAndSendMessage = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    console.log("Сирий req.params.id:", req.params.itemId);
    const itemId = Number(req.params.itemId);
    if (isNaN(itemId)) {
      throw new NotFoundError("Invalid item ID format");
    }
    const senderId = this.getUserId(req);
    console.log("senderId: " + senderId);
    const { text } = req.body;
    const result =
      await this._conversationService.createConversationAndSendMessage(
        itemId,
        senderId,
        text,
      );
    return res.status(201).json({
      success: true,
      data: { conversation: result.conversation, message: result.message },
    });
  };

  getExactConversation = async (req: Request, res: Response) => {
    const itemId = Number(req.params.itemId);
    if (isNaN(itemId)) {
      throw new NotFoundError("Invalid item ID format");
    }
    if (!req.user) {
      throw new UnauthorizedError("You are not authorized");
    }
    const userId = req.user.id;
    const conversation = await this._conversationService.getExactConversation(
      itemId,
      userId,
    );

    return res.status(200).json({
      success: true,
      data: conversation,
    });
  };
  getAllConversations = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const conversations =
      await this._conversationService.getAllConversations(userId);
    return res.status(200).json({
      success: true,
      data: conversations,
    });
  };
}

export const conversationController = new ConversationController(
  conversationService,
);
