import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item.js";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @OneToMany(() => Item, (items) => items.category)
  items!: Item[];
}
