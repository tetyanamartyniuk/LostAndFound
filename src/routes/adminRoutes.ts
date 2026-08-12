import express from "express";
import { adminController } from "../controllers/AdminController.js";
import { itemController } from "../controllers/ItemController.js";
import { checkRole, checkToken } from "../middlewares/authMiddleware.js";
import { categoryController } from "../controllers/CategoryController.js";

export const adminRouter = express.Router();
export const categoryRouter = express.Router();

adminRouter.patch(
  "/panel/:id/approve",
  checkToken,
  checkRole,
  adminController.approveItem,
);

adminRouter.patch(
  "/panel/:id/disapprove",
  checkToken,
  checkRole,
  adminController.disapproveItem,
);

adminRouter.get(
  "/items",
  checkToken,
  checkRole,
  itemController.getPendingItems,
);

adminRouter.get(
  "/pendingItems",
  checkToken,
  checkRole,
  itemController.getPendingItems,
);

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.post(
  "/",
  checkToken,
  checkRole,
  categoryController.createCategory,
);
