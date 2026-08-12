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
}

export const messageController = new MessageController(
  messageService,
  itemService,
);
