import express from "express";
import { itemController } from "../controllers/ItemController.js";
import { checkToken } from "../middlewares/authMiddleware.js";
import {
  validateInput,
  validateQueryInput,
} from "../middlewares/inputMiddleware.js";
import { filtredByDateSchema, itemSchema } from "../schemas.js";
import { upload } from "../utils/photoStorage.js";

const itemRouter = express.Router();

itemRouter.get("/", itemController.getItems);

itemRouter.get("/my", checkToken, itemController.getMyItems);

itemRouter.post(
  "/",
  checkToken,
  upload.array("image", 3),
  validateInput(itemSchema),
  itemController.createItem,
);

itemRouter.get(
  "/filterByDate",
  validateQueryInput(filtredByDateSchema),
  itemController.filterByDate,
);

itemRouter.get("/filterByStatus", itemController.filterByStatus);

itemRouter.put(
  "/:id",
  checkToken,
  upload.array("image", 3),
  validateInput(itemSchema),
  itemController.updateItem,
);

itemRouter.get("/:id", itemController.getItemById);

itemRouter.delete("/:id", checkToken, itemController.deleteItem);

export default itemRouter;
