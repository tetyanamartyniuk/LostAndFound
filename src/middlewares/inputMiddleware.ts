import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import type { ZodObject } from "zod";
import { StatusEnum } from "../entity/Item.js";

export const validateInput = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export const validateQueryInput = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      Object.assign(req.query, schema.parse(req.query));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export const validateStatusInput = (status: any): StatusEnum | null => {
  if (
    typeof status === "string" &&
    Object.values(StatusEnum).includes(status as StatusEnum)
  ) {
    return status as StatusEnum;
  }
  return null;
};
