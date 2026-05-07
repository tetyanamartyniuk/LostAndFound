import express from "express";
import { adminController } from "../controllers/adminController.js";
import { itemController } from "../controllers/ItemController.js";
import { pendingItemsPageRenderer } from "../controllers/EjsRenderer.js";
import { checkRole, checkToken } from "../middlewares/authMiddleware.js";
import { categoryController } from "../controllers/categoryController.js";

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

adminRouter.get("/items-page", checkToken, checkRole, pendingItemsPageRenderer);

categoryRouter.get(
  "/",
  checkToken,
  checkRole,
  categoryController.getCategories,
);

categoryRouter.post("/", checkToken, checkRole, categoryController.addCategory);
