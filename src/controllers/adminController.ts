import type { Request, Response } from "express";
import { adminService } from "../services/AdminService.js";
import { success } from "zod";
import type { IdParams } from "../types/idParamsType.js";

class AdminController {
  constructor(private service: typeof adminService) {}

  approveItem = async (
    req: Request<IdParams>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    const approvedItem = await this.service.approveItem(id);
    return res.status(200).json({
      success: true,
      data: approvedItem,
    });
  };

  disapproveItem = async (req: Request<IdParams>, res: Response) => {
    const id = Number(req.params.id);
    const disapprovedItem = await this.service.disapproveItem(id);
    return res.status(200).json({
      success: true,
      data: disapprovedItem,
    });
  };
}

export const adminController = new AdminController(adminService);
