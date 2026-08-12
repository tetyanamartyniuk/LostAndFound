import { categoryService } from "../services/CategoryService.js";
import type { Request, Response } from "express";
import type { CreateCategoryBody } from "../types/Category.js";
import type { IdParams } from "../types/idParamsType.js";

class CategoryController {
  constructor(private service: typeof categoryService) {}

  getCategories = async (req: Request, res: Response): Promise<Response> => {
    const categories = await this.service.getCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  };

  createCategory = async (
    req: Request<{}, {}, CreateCategoryBody>,
    res: Response,
  ): Promise<Response> => {
    console.log("req.body: ", req.body);
    const category = await this.service.createCategory(req.body);
    return res.status(201).json({
      success: true,
      data: category,
    });
  };

  deleteCategory = async (
    req: Request<IdParams>,
    res: Response,
  ): Promise<Response> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id format" });
    }
    await this.service.deleteCategory(id);
    return res.status(204).send();
  };
}

export const categoryController = new CategoryController(categoryService);
