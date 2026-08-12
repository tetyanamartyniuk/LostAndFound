import { text } from "node:stream/consumers";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Check,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User.js";
import { Category } from "./Category.js";
import { Message } from "./Message.js";
import { Conversation } from "./Conversation.js";
export enum StatusEnum {
  LOST = "lost",
  FOUND = "found",
  RETURNED = "returned",
}

export enum isApproved {
  APPROVED = "approved",
  DISAPPROVED = "disapproved",
  PENDING = "pending",
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  title!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description!: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  place!: string;

  @Column({
    type: "date",
    nullable: false,
  })
  @Check(`"foundAt" <= CURRENT_DATE`)
  foundAt!: Date;

  @Column({
    type: "enum",
    enum: StatusEnum,
    nullable: false,
  })
  @Index()
  status!: StatusEnum;

  @Column({
    type: "int",
  })
  userId!: number;

  @ManyToOne(() => User, (user) => user.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  image?: string[] | null;

  @Column({
    type: "enum",
    enum: isApproved,
    default: isApproved.PENDING,
    nullable: false,
  })
  isApproved!: isApproved;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @Column({
    type: "varchar",
    nullable: true,
  })
  categoryId!: number;

  @OneToMany(() => Conversation, (conversation) => conversation.item)
  conversations!: Conversation[];

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt!: Date;
}
