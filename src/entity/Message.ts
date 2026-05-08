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

@Entity()
@Check(`"senderId" <> "receiverId"`)
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
  readAt!: Date; //можливо треба поставити ?

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: "receiverId" })
  receiver!: User;

  @Column({
    type: "integer",
  })
  receiverId!: number;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: "senderId" })
  sender!: User;

  @Column({
    type: "integer",
  })
  senderId!: number;
}
