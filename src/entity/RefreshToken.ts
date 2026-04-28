import "reflect-metadata"

import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class RefreshToken{
    
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "varchar",
        nullable: false,
        length: 255
    })
    refreshToken!: string

    @CreateDateColumn({
        type: 'date',
        nullable: false
    })
    createdAt!: Date

    @Column({type: 'int', nullable: false}) //чисто, щоб TypeORM не матюкався
    userId!: number

    @ManyToOne( ()=> User, (user) => user.refreshTokens, {eager: true})
    @JoinColumn({name: "userId"}) //сам зв'язок
    user!: User //об'єкт юзера, можна додати relations, щоб він був не undefined

}
