import "reflect-metadata";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
  JoinColumn,
} from "typeorm";
import { RefreshToken } from "./RefreshToken.js";
import { Item } from "./Item.js";
import { Message } from "./Message.js";
import { Participant } from "./Participant.js";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  password!: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 55,
    unique: true,
  })
  username!: string;

  @Column({
    type: "enum",
    nullable: false,
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role!: UserRole;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens!: RefreshToken[];

  @OneToMany(() => Item, (item) => item.user)
  items!: Item[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages!: Message[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participants!: Participant[];
}
