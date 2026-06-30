import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Conversation } from "./Conversation.js";
import { number } from "zod";
import { User } from "./User.js";

@Entity()
export class Participant {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  @JoinColumn({ name: "conversationId" })
  conversation!: Conversation;

  @Column({ nullable: false, type: "integer" })
  conversationId!: number;

  @ManyToOne(() => User, (user) => user.participants)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "integer", nullable: false })
  userId!: number;
}
