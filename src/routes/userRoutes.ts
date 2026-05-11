import express from "express";
//import { addUser, getUserById, getUsers, deleteUser, updateUser } from '../controllers/userController.js'

import { asyncErrorHandler } from "../middlewares/asyncHandler.js";
import { userController } from "../controllers/UserController.js";
import {
  renderChatPage,
  userAccountRenderer,
} from "../controllers/EjsRenderer.js";
import { checkToken } from "../middlewares/authMiddleware.js";
import { messageController } from "../controllers/MessageController.js";

const userRouter = express.Router();

userRouter.get("/my-account", checkToken, userAccountRenderer);

userRouter.get("/users", asyncErrorHandler(userController.getUsers)); //за допомогою bind ми жостко прив'язуємо методи до об'єкта userController

userRouter.get("/users/:id", asyncErrorHandler(userController.getUserById));

userRouter.delete("/users/:id", asyncErrorHandler(userController.deleteUser));

userRouter.put("/users/:id", asyncErrorHandler(userController.updateuser));

userRouter.post(
  "/send-message/:itemId",
  checkToken,
  messageController.createMessage,
);

userRouter.get("/my-messages", checkToken, messageController.getMyMessages);

userRouter.get("/received", checkToken, messageController.getReceivedMessages);

userRouter.get("/sent", checkToken, messageController.getSentMessages);

userRouter.get("/messages/:id", checkToken, renderChatPage);

export default userRouter;
