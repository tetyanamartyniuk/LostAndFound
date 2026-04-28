import { UserRole } from "../entity/User.js"

export type User = {
    id: number,
    email: string,
    password: string,
    username: string,
    role: UserRole
}


export type UserBody = {
    email: string,
    password: string,
    username: string
}

export type UserLoginBody = {
    email: string,
    password: string
}