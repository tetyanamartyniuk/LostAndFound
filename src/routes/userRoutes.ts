import express from "express";
//import { addUser, getUserById, getUsers, deleteUser, updateUser } from '../controllers/userController.js'

import { asyncErrorHandler } from "../middlewares/asyncHandler.js";
import { userController } from "../controllers/UserController.js";
import { userAccountRenderer } from "../controllers/EjsRenderer.js";
import { checkToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/my-account", checkToken, userAccountRenderer);

userRouter.get("/users", asyncErrorHandler(userController.getUsers)); //за допомогою bind ми жостко прив'язуємо методи до об'єкта userController

userRouter.get("/users/:id", asyncErrorHandler(userController.getUserById));

userRouter.delete("/users/:id", asyncErrorHandler(userController.deleteUser));

userRouter.put("/users/:id", asyncErrorHandler(userController.updateuser));

export default userRouter;
