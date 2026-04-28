import "reflect-metadata"

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Check } from "typeorm"
import { RefreshToken } from "./RefreshToken.js";
import { Item } from "./Item.js";
 
export enum UserRole { //можна не типом, а масивом прямо в сутності
    USER = "user",
    ADMIN = "admin"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255,
        unique: true
    })
    email!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    password!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 55,
        unique: true
    })
    username!: string;

    @Column({
        type: 'enum',
        nullable: false,
        enum: UserRole, //можна тут отак: ['guest', 'user', 'admin']
        default: UserRole.USER // 'guest'
    })
    role!: UserRole

    @OneToMany( () => RefreshToken, (refreshToken) => refreshToken.user) //сам зв'язок
    refreshTokens!: RefreshToken[]

    @OneToMany(()=> Item, (item) => item.user)
    items!: Item[] 
}