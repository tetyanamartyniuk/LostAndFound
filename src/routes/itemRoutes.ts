import express from "express";
import { itemController } from "../controllers/ItemController.js";
import { checkToken } from "../middlewares/authMiddleware.js";
import {
  filteredByPlaceRenderer,
  filtredByDateRenderer,
  filtredByStatusRenderer,
  itemPageRenderer,
  itemsPageRenderer,
  updateItemPageRenderer,
} from "../controllers/EjsRenderer.js";
import {
  validateInput,
  validateQueryInput,
} from "../middlewares/inputMiddleware.js";
import { filtredByDateSchema, itemSchema } from "../schemas.js";
import { upload } from "../utils/photoStorage.js";

const itemRouter = express.Router();

itemRouter.get("/", itemController.getItems);

itemRouter.get("/my", checkToken, itemController.getMyItems);

itemRouter.get("/addItem", upload.single("image"), (req, res) => {
  res.render("addItemPage");
});

itemRouter.get("/items-page", itemsPageRenderer);

itemRouter.get("/updateItemPage/:id", updateItemPageRenderer);

itemRouter.post(
  "/",
  checkToken,
  upload.single("image"),
  validateInput(itemSchema),
  itemController.addItems,
);

itemRouter.get(
  "/filterByDate",
  validateQueryInput(filtredByDateSchema),
  itemController.filterByDate,
);

itemRouter.get("/filterByStatus", itemController.filterByStatus);

itemRouter.get("/status-filter", filtredByStatusRenderer);

itemRouter.get("/place-filter", filteredByPlaceRenderer);

itemRouter.get(
  "/date-filter",
  validateQueryInput(filtredByDateSchema),
  filtredByDateRenderer,
);

itemRouter.put("/:id", checkToken, itemController.updateItems);

itemRouter.get("/:id/page", itemPageRenderer);

itemRouter.get("/:id", itemController.getItemById);

itemRouter.delete("/:id", checkToken, itemController.deleteItems);

export default itemRouter;
