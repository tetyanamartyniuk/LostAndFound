import express from "express";

import { asyncErrorHandler } from "../middlewares/asyncHandler.js";
import { userController } from "../controllers/UserController.js";

import { checkToken, checkRole } from "../middlewares/authMiddleware.js";
import { validateInput } from "../middlewares/inputMiddleware.js";
import { messageSchema } from "../schemas.js";
import { conversationController } from "../controllers/ConversationController.js";

const userRouter = express.Router();

userRouter.get("/users", checkRole, asyncErrorHandler(userController.getUsers));

userRouter.get("/users/:id", asyncErrorHandler(userController.getUserById));

userRouter.delete(
  "/users/:id",
  checkRole,
  asyncErrorHandler(userController.deleteUser),
);

userRouter.put(
  "/users/:id",
  checkRole,
  asyncErrorHandler(userController.updateuser),
);

userRouter.post(
  "/messages/:itemId",
  checkToken,
  validateInput(messageSchema),
  conversationController.createConversationAndSendMessage,
);

userRouter.get(
  "/conversations",
  checkToken,
  conversationController.getAllConversations,
);

userRouter.get(
  "/messages/:itemId",
  checkToken,
  conversationController.getExactConversation,
);

export default userRouter;
