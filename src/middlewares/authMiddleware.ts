import type { NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../types/user.js";
import type { IdParams } from "../types/idParamsType.js";

import type { Response, Request } from "express";
import { ForbiddenError, UnauthorizedError } from "../exceptions/exceptions.js";
import { userService } from "../services/UserService.js";
import type { UserRole } from "../entity/User.js";
import cookieParser from "cookie-parser";
import { authService } from "../services/AuthService.js";
import { generateAccessToken } from "../utils/jwt.js";

export interface AuthRequest extends Request { //розширюємо тип Request, щоб додати до запиту і-цію про нашого юзера  
    user?: {
        id: number;
        role: string;
        email: string;
    };
}

export interface TokenPayload {
    id: number;
    role: string;
    email: string;
}

export function checkToken(req: AuthRequest, res: Response, next:NextFunction) {

    const token = req.cookies.token

    if(!token){
        throw new UnauthorizedError("Your token wasn`t found")
    }
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload
        req.user = {id: decoded.id, role: decoded.role, email: decoded.email}
        next()
    }catch(err){
        return res.status(403).json( {message: "Invalid access token"})
    }
}

export async function checkRefreshToken(req: AuthRequest, res: Response, next: NextFunction){
    const refreshToken: string = req.cookies.refreshToken
    if(!refreshToken){
        throw new UnauthorizedError("Your token wasn`t found")
    }
    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload
        req.user = {id: decoded.id, role: decoded.role, email: decoded.email}
        const tokenFromDB = await authService.getTokenFromDB(refreshToken)
        console.log(tokenFromDB)
        next();
    }catch(err){
        console.error(err)
        return res.status(403).json( {message: "Invalid access token bebeb"})
    }
}
// export async function checkOwner(req: Request<IdParams>, res: Response, next: NextFunction){
//     const id = Number(req.params.id)
//     const user = await userService.getUserById(id)
//     next();

// }

export function checkRole(req: AuthRequest, res: Response, next: NextFunction){
    if(req.user?.role !== 'admin'){
        throw new ForbiddenError("You don`t have access to this")
    }
    next() //НЕ ЗАБУВАЙ NEXT В МІДЛВЕРАХ
}

export function checkOwner(req: AuthRequest, res: Response, next: NextFunction){
    
}