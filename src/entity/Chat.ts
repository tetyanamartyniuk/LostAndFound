// import {
//   Check,
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { Item } from "./Item.js";
// import { User } from "./User.js";
// import { Message } from "./Message.js";

// @Entity()
// @Check(`"user1id" <> "user2id"`)
// export class Chat {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne(() => Item, (item) => item.chats, {
//     onDelete: "SET NULL",
//     nullable: true,
//   })
//   @JoinColumn({ name: "itemId" })
//   item!: Item | null;

//   @Column({
//     type: "integer",
//     nullable: true,
//   })
//   itemId!: number | null;

//   @ManyToOne(() => User, (user) => user.user1chats)
//   @JoinColumn({ name: "user1id" })
//   user1!: User;

//   @Column({
//     type: "integer",
//     nullable: false,
//   })
//   user1id!: number;

//   @ManyToOne(() => User, (user) => user.user2chats)
//   @JoinColumn({ name: "user2id" })
//   user2!: Item;

//   @Column({
//     type: "integer",
//     nullable: false,
//   })
//   user2id!: number;

//   @CreateDateColumn({
//     type: "timestamp",
//     nullable: false,
//   })
//   createdAt!: Date;

//   @UpdateDateColumn({
//     type: "timestamp",
//     nullable: false,
//   })
//   updatedAt!: Date;

//   @OneToMany(() => Message, (message) => message.chat)
//   messages!: Message[];
// }
