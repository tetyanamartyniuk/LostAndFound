import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.js";
import { Item } from "./Item.js";
import { Conversation } from "./Conversation.js";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
    nullable: false,
  })
  text!: string;

  @CreateDateColumn({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  sentAt!: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  readAt!: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: "senderId" })
  sender!: User;

  @Column({
    type: "integer",
  })
  senderId!: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: "conversationId" })
  conversation!: Conversation;

  @Column({
    type: "integer",
    nullable: false,
  })
  conversationId!: number;
}
