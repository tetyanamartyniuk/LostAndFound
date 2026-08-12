import express, { Router } from "express";
import type { Request, Response } from "express";
import { authController } from "../controllers/AuthController.js";
import { asyncErrorHandler } from "../middlewares/asyncHandler.js";
import {
  checkRefreshToken,
  checkToken,
} from "../middlewares/authMiddleware.js";
import { validateInput } from "../middlewares/inputMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateInput(userRegisterSchema),
  asyncErrorHandler(authController.register),
);

authRouter.post(
  "/login",
  validateInput(userLoginSchema),
  asyncErrorHandler(authController.login),
);

authRouter.get("/currUser", checkToken, authController.getCurrentUser);

authRouter.get("/refreshToken", checkRefreshToken, authController.refresh);

export default authRouter;
