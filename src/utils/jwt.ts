import jwt from 'jsonwebtoken'
import type { User, UserLoginBody } from '../types/user.js'
import { UserRole } from '../entity/User.js'
import type { TokenPayload } from '../middlewares/authMiddleware.js'


//відповідає чисто за генерацію токенів
export async function generateAccessToken(user: TokenPayload): Promise<string> {
    try{
        const {id, email} = user
        const token: string = jwt.sign({id: id, email: email, role: UserRole}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '15m'})
        console.log(token)
        return token
    }catch(err){
        throw new Error("Token can not be provided")
    }
}

export async function generateRefreshToken(user: User, token: string) {
    try{
        const {id, email} = user
        const refreshToken: string = jwt.sign({id: id, email: email, role: UserRole}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '30d'})
        return refreshToken
    }catch(err){
        throw new Error("Refresh token can not be provided")
    }
}