import { Repository } from "typeorm";
import {User} from "../entity/User.js"
import { userRepo } from "../repos/userRepository.js";
import { NotFoundError } from "../exceptions/exceptions.js";
import type { UserBody } from "../types/user.js";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/jwt.js";

type UpdateUserDto = Partial<UserBody>
type CreateUserDto = UserBody

class UserService{
    
    //private userRepo: Repository<User>;
    constructor(private userRepo: Repository<User>){ 
        //можна не писати тут this.userRepo = userRepo
    }

    async getUsers(): Promise<User[]>{
        return await this.userRepo.find()
    }

    async getUserById(id: number): Promise<User>{
        const user = await this.userRepo.findOne({where: {id: id}})
        if(!user){
            throw new NotFoundError("User with this id wasn`t found")
        }
        return user
    }

    async addUser(user: CreateUserDto): Promise<User> {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        console.log(user)
        user.password = await UserService.hashPassword(user.password)
        const savedUser = await this.userRepo.save(user)
        return savedUser
    }

    async deleteUser(id: number): Promise<void>{
        const {affected} = await this.userRepo.delete({id: id})
        if (affected === 0){
            throw new NotFoundError("User with this id wasn`t found")
        }
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<User>{
        
        const userFromDB = await this.getUserById(id)

        const updateData: UpdateUserDto = {}
        
        if(user.email !== undefined){
            updateData.email = user.email
        }
        if(user.password !== undefined){
            updateData.password = await UserService.hashPassword(user.password)
        }
        if(user.username !== undefined){
            updateData.username = user.username
        }

        const updatedUser = this.userRepo.merge(userFromDB, updateData)
        return this.userRepo.save(updatedUser)
    }

    async findUserByEmail(email: string): Promise<User | null>{ //повертаємо не помилку, а null, бо якщо кидати NotFound то хакери можуть взламааать
        return await this.userRepo.findOne({where: {email: email}})
    }

    static async hashPassword(password: string){
        return await bcrypt.hash(password, 10)
    }
}

export const userService = new UserService(userRepo)
