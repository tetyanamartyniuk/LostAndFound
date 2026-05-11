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
} from "typeorm";
import { User } from "./User.js";
import { Category } from "./Category.js";
import { Message } from "./Message.js";
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
//@Check(`length(title) >= 3`)
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
    //додати на бекенд і фронт логіку перевірки дати, щоб вона не була майбутньою
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

  @ManyToOne(() => User, (user) => user.items, { onDelete: "CASCADE" }) //визначаємо зв'язок на рівні ORM
  @JoinColumn({ name: "userId" }) //JoinColumn() в комбінації з ManyToOne сам створює foreign key
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

  @OneToMany(() => Message, (message) => message.itemId)
  messages!: Message[];
}
