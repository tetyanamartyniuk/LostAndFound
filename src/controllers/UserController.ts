import type { Request, Response } from "express";
import type { UserBody } from "../types/User.js";
import type { User } from "../entity/User.js";
import type { IdParams } from "../types/idParamsType.js";
import { userService } from "../services/UserService.js";

class UserController {
  constructor(private service: typeof userService) {}

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.service.getUsers();
    return res.status(200).json({
      success: true,
      users: users,
    });
  };

  getUserById = async (
    req: Request<IdParams>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    console.log(id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id format" });
    }
    const user = await this.service.getUserById(id);
    console.log(user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  };

  deleteUser = async (req: Request<IdParams>, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id format" });
    }
    const result = await this.service.deleteUser(id);
    res.status(204).send();
  };

  updateuser = async (req: Request<IdParams, {}, UserBody>, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id format" });
    }
    const updatedUser = await this.service.updateUser(id, req.body);
    res.status(200).json({
      success: true,
      updatedUser: updatedUser,
    });
  };
}

export const userController = new UserController(userService);
