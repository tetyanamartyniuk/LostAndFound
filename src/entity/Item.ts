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
} from "typeorm";
import { User } from "./User.js";
export enum StatusEnum {
  LOST = "lost",
  FOUND = "found",
  RETURNED = "returned",
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
    type: "varchar",
    nullable: true,
  })
  image?: string | null;
}
