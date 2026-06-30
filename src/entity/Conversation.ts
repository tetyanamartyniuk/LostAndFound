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

import { Item } from "./Item.js";
import { Participant } from "./Participant.js";
import { Message } from "./Message.js";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item) => item.conversations)
  @JoinColumn({ name: "itemId" })
  item!: Item;

  @Column({
    nullable: false,
    type: "integer",
  })
  itemId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages!: Message[];

  @OneToMany(() => Participant, (participant) => participant.conversation)
  participants!: Participant[];
}
