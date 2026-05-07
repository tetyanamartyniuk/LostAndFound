import type { Request, Response } from "express";
import type { User } from "../entity/User.js";
import { itemService } from "../services/ItemService.js";
import type { IdParams } from "../types/idParamsType.js";
import type { CreateItemBody } from "../types/item.js";
import { json } from "node:stream/consumers";
import { UnauthorizedError } from "../exceptions/exceptions.js";
import { success } from "zod";
import { StatusEnum } from "../entity/Item.js";
import { validateStatusInput } from "../middlewares/inputMiddleware.js";

class ItemController {
  constructor(private service: typeof itemService) {}

  getItems = async (req: Request, res: Response): Promise<Response> => {
    const items = await this.service.getApprovedItems();
    return res.status(200).json({
      success: true,
      items: items,
    });
  };

  getPendingItems = async (req: Request, res: Response) => {
    const pendingItems = await this.service.getPendingItems();
    return res.status(200).json({
      success: true,
      pendingItems: pendingItems,
    });
  };

  getMyItems = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.user?.id);
    if (!req.user) {
      //треба завжди кидати перевірку на роутах, де авторизація обов'язкова
      throw new UnauthorizedError("Bla bla");
    }
    const myItems = await this.service.getMyItems(id);
    return res.status(200).json({
      success: true,
      myItems: myItems,
    });
  };

  getItemById = async (
    req: Request<IdParams>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Invalid id format", place: "getById" });
    }
    const item = await this.service.getItemById(id);
    return res.status(200).json({
      success: true,
      item: item,
    });
  };

  addItems = async (
    req: Request<{}, {}, CreateItemBody>,
    res: Response,
  ): Promise<Response> => {
    req.body.userId = req.user!.id;
    const files = req.files as Express.Multer.File[];
    const images = files.map((file: Express.Multer.File) => file.filename);
    const savedItem = await this.service.addItem(req.body, images!);
    return res.status(201).json({
      success: true,
      item: savedItem,
    });
  };

  deleteItems = async (
    req: Request<IdParams>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    console.log(id);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Invalid id format", place: "delete" });
    }
    const { userId } = await this.service.getItemById(id);
    console.log(userId);
    if (!req.user) {
      throw new UnauthorizedError("Req user нема");
    }
    console.log(req.user);
    console.log(userId);
    if (req.user!.id === userId) {
      await this.service.deleteItem(id);
    } else {
      console.log("blalalalal");
      return res
        .status(403)
        .json({ message: "You aren`t allowed to delete this item" });
    }

    return res.status(204).send();
  };

  updateItems = async (
    req: Request<IdParams, {}, CreateItemBody>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }
    const files = req.files as Express.Multer.File[];
    const images = files.map((file) => file.filename);
    const updatedItem = await this.service.updateItem(id, req.body, images);
    return res.status(200).json({
      success: true,
      updatedItem: updatedItem,
    });
  };

  filterByDate = async (req: Request, res: Response): Promise<Response> => {
    const { startDate, endDate } = req.query;
    const items = await this.service.filterByDate(
      new Date(startDate as string),
      new Date(endDate as string),
    );
    return res.status(200).json({
      success: true,
      filteredItems: items,
    });
  };

  filterByStatus = async (req: Request, res: Response): Promise<Response> => {
    const status = validateStatusInput(req.query.status);
    if (!status) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }
    const items = await this.service.filterByStatus(status);
    return res.status(200).json({
      success: true,
      items: items,
    });
  };
}

export const itemController = new ItemController(itemService);
