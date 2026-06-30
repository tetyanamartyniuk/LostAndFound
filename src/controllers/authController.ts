import type { Request, Response } from "express";
import type { UserBody, UserLoginBody } from "../types/user.js";
import { authService } from "../services/AuthService.js";
import { RefreshToken } from "../entity/RefreshToken.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { UnauthorizedError } from "../exceptions/exceptions.js";

class AuthController {
  constructor(private service: typeof authService) {}

  register = async (
    req: Request<{}, {}, UserBody>,
    res: Response,
  ): Promise<Response> => {
    //console.log(req.body)
    const result = await this.service.register(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(201).json({
      success: true,
      savedUser: result.savedUser,
    });
  };

  login = async (
    req: Request<{}, {}, UserLoginBody>,
    res: Response,
  ): Promise<Response> => {
    const result = await this.service.login(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({
      success: true,
      user: result.user,
      token: result.token,
      refreshToken: result.refreshToken,
    });
  };

  refresh = async (req: AuthRequest, res: Response) => {
    const userPayload = req.user;
    console.log(req.user);
    const newAccessToken = await this.service.refresh(userPayload!);
    console.log("NEW ACCESS TOKEN", newAccessToken);
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ success: true });
  };

  getCurrentUser = async (req: Request, res: Response) => {
    const currUser = req.user;
    if (!req.user) {
      throw new UnauthorizedError("Ви не авторизовані в системі");
    }
    res.status(200).json(currUser);
  };
}

export const authController = new AuthController(authService);
