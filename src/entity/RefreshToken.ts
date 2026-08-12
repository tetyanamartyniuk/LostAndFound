import "reflect-metadata";

import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  refreshToken!: string;

  @CreateDateColumn({
    type: "date",
    nullable: false,
  })
  createdAt!: Date;

  @Column({ type: "int", nullable: false })
  userId!: number;

  @ManyToOne(() => User, (user) => user.refreshTokens, { eager: true })
  @JoinColumn({ name: "userId" })
  user!: User;
}
