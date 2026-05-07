import type { StatusEnum } from "../entity/Item.js";

export type Item = {
  id: number;
  title: string;
  description: string;
  place: string;
  foundAt: Date;
  status: StatusEnum;
  userId: number;
  image?: string[] | null;
};

export type CreateItemBody = {
  title: string;
  description: string;
  place: string;
  foundAt: Date;
  status: StatusEnum;
  userId: number;
  categoryId: number;
  //image?: string | null;
};
