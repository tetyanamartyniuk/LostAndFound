import type { Request, Response } from "express";
import { userController } from "./UserController.js";
import { itemController } from "./ItemController.js";
import { itemService } from "../services/ItemService.js";
import type { IdParams } from "../types/idParamsType.js";
import { StatusEnum } from "../entity/Item.js";
import { validateStatusInput } from "../middlewares/inputMiddleware.js";
import { userService } from "../services/UserService.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { UnauthorizedError } from "../exceptions/exceptions.js";
import { categoryService } from "../services/CategoryService.js";

export async function itemsPageRenderer(req: Request, res: Response) {
  const items = await itemService.getApprovedItems();
  res.render("items", { items });
}

export async function addItemPageRenderer(req: Request, res: Response) {
  const categories = await categoryService.getCategories();
  res.render("addItemPage", { categories });
}

export async function filtredByStatusRenderer(req: Request, res: Response) {
  const status = validateStatusInput(req.query.status);
  if (!status) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }
  const items = await itemService.filterByStatus(status);
  return res.render("items", { items });
}

export async function filtredByDateRenderer(req: Request, res: Response) {
  const { startDate, endDate } = req.query;
  const items = await itemService.filterByDate(
    new Date(startDate as string),
    new Date(endDate as string),
  );
  return res.render("items", { items });
}

export async function filteredByPlaceRenderer(req: Request, res: Response) {
  const place = String(req.query.place);
  const items = await itemService.filterByPlace(place);
  return res.render("items", { items });
}

export async function itemPageRenderer(req: Request<IdParams>, res: Response) {
  const id = Number(req.params.id);
  const item = await itemService.getItemById(id);
  res.render("item", item);
}

export async function updateItemPageRenderer(
  req: Request<IdParams>,
  res: Response,
) {
  const id = Number(req.params.id);
  const item = await itemService.getItemById(id);
  res.render("updateItemPage", item);
}

export async function pendingItemsPageRenderer(req: Request, res: Response) {
  const pendingItems = await itemService.getPendingItems();
  res.render("admin-panel", { pendingItems });
}

export async function userAccountRenderer(req: AuthRequest, res: Response) {
  const id = Number(req.user?.id);
  if (!req.user) {
    //треба завжди кидати перевірку на роутах, де авторизація обов'язкова
    throw new UnauthorizedError("User is not authorized");
  }
  console.log(req.user);
  console.log(id);
  const user = await userService.getUserById(id);
  res.render("account", { user });
}
