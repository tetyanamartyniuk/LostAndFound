import type { Request, RequestHandler, Response } from "express"
import type { NextFunction } from "express-serve-static-core"

export function asyncErrorHandler(func: RequestHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) =>{
        try {
            await func(req, res, next)
        } catch (err) {
            next(err)
        }
    }

}